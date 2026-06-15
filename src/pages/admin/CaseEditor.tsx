import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Loader2,
  ArrowLeft,
  Send,
  FileText,
  Clock,
  Pencil,
  Eye,
  Plus,
  Trash2,
  Table as TableIcon,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { FORM_TYPES, FORM_TYPE_META } from '@/data/registrationForms'

type PublishMode = 'draft' | 'scheduled' | 'published'

type RecallCell = { text: string; link?: string }
type RecallTable = { columns: string[]; rows: RecallCell[][] }

interface CaseForm {
  slug: string
  title: string
  status: 'Active' | 'Settled' | 'On Appeal' | 'Investigating'
  category: string
  year: string
  court: string
  summary: string
  body_html: string
  key_date: string
  wordpress_link: string
  detail_slug: string
  recalls: RecallTable[]
  order_index: number
  published: boolean
  publish_at: string | null
  form_type: string
  form_notify_email: string
}

const EMPTY: CaseForm = {
  slug: '',
  title: '',
  status: 'Active',
  category: '',
  year: String(new Date().getFullYear()),
  court: '',
  summary: '',
  body_html: '',
  key_date: '',
  wordpress_link: '',
  detail_slug: '',
  recalls: [],
  order_index: 0,
  published: false,
  publish_at: null,
  form_type: '',
  form_notify_email: '',
}

const STATUSES: CaseForm['status'][] = ['Active', 'Settled', 'On Appeal', 'Investigating']
const CATEGORIES = [
  'Securities',
  'Financial Products',
  'Consumer',
  'Environmental',
  'Nuisance',
  'Insolvency',
  'Investigation',
]

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 96)
}

function isoToLocalInput(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}`
  )
}

function localInputToIso(local: string): string {
  return new Date(local).toISOString()
}

function computeMode(form: CaseForm): PublishMode {
  if (!form.published) return 'draft'
  if (form.publish_at && new Date(form.publish_at) > new Date()) return 'scheduled'
  return 'published'
}

// Recall data normalisation — DB stores cells as (string | {link,label})[][]
// We convert to a friendlier {text, link?} shape for the form.
type DbRecallCell = string | { link: string; label: string }
type DbRecallTable = { columns: string[]; rows: DbRecallCell[][] }

function dbToFormRecalls(db: DbRecallTable[] | null): RecallTable[] {
  if (!db) return []
  return db.map((t) => ({
    columns: t.columns,
    rows: t.rows.map((row) =>
      row.map((cell) =>
        typeof cell === 'string'
          ? { text: cell }
          : { text: cell.label, link: cell.link },
      ),
    ),
  }))
}

function formToDbRecalls(form: RecallTable[]): DbRecallTable[] {
  return form.map((t) => ({
    columns: t.columns,
    rows: t.rows.map((row) =>
      row.map((cell) =>
        cell.link ? { link: cell.link, label: cell.text } : cell.text,
      ),
    ),
  }))
}

export function CaseEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState<CaseForm>(EMPTY)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [view, setView] = useState<'edit' | 'preview'>('edit')

  const mode = useMemo(() => computeMode(form), [form])

  useEffect(() => {
    if (!isEdit || !supabase) return
    let cancelled = false
    supabase
      .from('cases')
      .select('*')
      .eq('id', id!)
      .maybeSingle()
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) {
          setError(err.message)
          setLoading(false)
          return
        }
        if (!data) {
          setError('Case not found.')
          setLoading(false)
          return
        }
        setForm({
          slug: data.slug,
          title: data.title,
          status: data.status,
          category: data.category ?? '',
          year: data.year ?? '',
          court: data.court ?? '',
          summary: data.summary ?? '',
          body_html: data.body_html ?? '',
          key_date: data.key_date ?? '',
          wordpress_link: data.wordpress_link ?? '',
          detail_slug: data.detail_slug ?? '',
          recalls: dbToFormRecalls(data.recalls),
          order_index: data.order_index ?? 0,
          published: data.published,
          publish_at: data.publish_at,
          form_type: data.form_type ?? '',
          form_notify_email: data.form_notify_email ?? '',
        })
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, isEdit])

  const update = <K extends keyof CaseForm>(key: K, value: CaseForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const onTitleChange = (v: string) => {
    update('title', v)
    if (!slugTouched) update('slug', slugify(v))
  }

  const save = async (target: PublishMode) => {
    if (!supabase) return
    setSaving(true)
    setError(null)

    let published = false
    let publish_at: string | null = null
    if (target === 'published') {
      published = true
      publish_at = null
    } else if (target === 'scheduled') {
      if (!form.publish_at) {
        setSaving(false)
        setError('Pick a publish date and time to schedule.')
        return
      }
      published = true
      publish_at = form.publish_at
    }

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      status: form.status,
      category: form.category,
      year: form.year,
      court: form.court || null,
      summary: form.summary.trim(),
      body_html: form.body_html || null,
      key_date: form.key_date || null,
      wordpress_link: form.wordpress_link || null,
      detail_slug: form.detail_slug || null,
      recalls: formToDbRecalls(form.recalls),
      order_index: form.order_index,
      published,
      publish_at,
      form_type: form.form_type || null,
      form_notify_email: form.form_notify_email || null,
    }
    const run = (body: Record<string, unknown>) =>
      isEdit
        ? supabase!.from('cases').update(body).eq('id', id!)
        : supabase!.from('cases').insert(body)
    let res = await run(payload)
    // Graceful fallback if the form_type / form_notify_email columns haven't
    // been added yet (migration 002 not run). Retry without them so saving
    // still works; the admin just can't assign a form until they migrate.
    if (res.error && /form_type|form_notify_email/.test(res.error.message)) {
      const { form_type: _ft, form_notify_email: _fne, ...rest } = payload
      res = await run(rest)
    }
    setSaving(false)
    if (res.error) {
      setError(res.error.message)
      return
    }
    navigate('/admin/cases')
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    save('draft')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#1C3A64]" size={24} />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/admin/cases')}
          className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] hover:underline"
        >
          <ArrowLeft size={13} />
          Back to cases
        </button>
        <StatusBadge mode={mode} />
      </div>

      <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight mb-2">
        {isEdit ? 'Edit case' : 'New case'}
      </h1>
      <p className="text-[#888888] text-[13px] mb-8">
        {isEdit
          ? 'Update the case details. Changes go live as soon as you save.'
          : 'Fill in the case details, then save as draft, schedule or publish.'}
      </p>

      {error && (
        <div className="mb-6 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        <Section title="Basics">
          <Field label="Title" required>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => onTitleChange(e.target.value)}
              className={inputCls}
              placeholder="Arrium Class Action"
            />
          </Field>
          <Field label="URL slug / anchor id" hint="Used for /class-actions#<slug>">
            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true)
                update('slug', slugify(e.target.value))
              }}
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Status" required>
              <select
                required
                value={form.status}
                onChange={(e) => update('status', e.target.value as CaseForm['status'])}
                className={inputCls}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Category" required>
              <input
                required
                list="case-categories"
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className={inputCls}
                placeholder="Securities"
              />
              <datalist id="case-categories">
                {CATEGORIES.map((c) => <option key={c} value={c} />)}
              </datalist>
            </Field>
            <Field label="Year" required>
              <input
                required
                type="text"
                value={form.year}
                onChange={(e) => update('year', e.target.value)}
                className={inputCls}
                placeholder="2025"
              />
            </Field>
          </div>
          <Field label="Court / jurisdiction" hint="Optional. Example: 'Federal Court' or 'Victorian Supreme Court'.">
            <input
              type="text"
              value={form.court}
              onChange={(e) => update('court', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field
            label="Summary"
            hint="One sentence shown on the closed case card (truncated to 2 lines on the list)."
            required
          >
            <textarea
              required
              rows={2}
              maxLength={280}
              value={form.summary}
              onChange={(e) => update('summary', e.target.value)}
              className={inputCls}
            />
            <div className="text-[11px] text-[#888888] mt-1 text-right">{form.summary.length}/280</div>
          </Field>
          <Field label="Key date / status line" hint="Optional one-liner under the title. Example: 'Trial 3 Aug 2026'.">
            <input
              type="text"
              value={form.key_date}
              onChange={(e) => update('key_date', e.target.value)}
              className={inputCls}
              placeholder="Trial 3 Aug 2026"
            />
          </Field>
        </Section>

        <Section
          title="Case body"
          hint="Use the toolbar for bold, italic, headings, lists and links — same editor as the blog."
        >
          <div className="flex items-center gap-1 mb-3">
            <Tab active={view === 'edit'} onClick={() => setView('edit')}>
              <Pencil size={12} /> Write
            </Tab>
            <Tab active={view === 'preview'} onClick={() => setView('preview')}>
              <Eye size={12} /> Preview
            </Tab>
          </div>
          {view === 'edit' ? (
            <RichTextEditor
              value={form.body_html}
              onChange={(html) => update('body_html', html)}
              placeholder="Describe the case…"
            />
          ) : (
            <div className="border border-[#1C3A64]/15 rounded-lg p-6 bg-white">
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: form.body_html || '<p class="text-gray-400 italic">No body yet.</p>' }}
              />
            </div>
          )}
        </Section>

        <Section
          title="Recall tables (optional)"
          hint="Only used for product-recall matters (e.g. Hyundai / Kia ABS). Most cases leave this empty."
        >
          <RecallsEditor
            tables={form.recalls}
            onChange={(t) => update('recalls', t)}
          />
        </Section>

        <Section title="Links (optional)">
          <Field label="WordPress canonical URL" hint="Link to the matter's page on the legacy bantongroup.com site.">
            <input
              type="url"
              value={form.wordpress_link}
              onChange={(e) => update('wordpress_link', e.target.value)}
              className={inputCls}
              placeholder="https://bantongroup.com/…"
            />
          </Field>
          <Field label="Internal detail page slug" hint="Only set this if a custom React detail page exists at /class-actions/&lt;slug&gt;.">
            <input
              type="text"
              value={form.detail_slug}
              onChange={(e) => update('detail_slug', e.target.value)}
              className={inputCls}
              placeholder="arrium"
            />
          </Field>
        </Section>

        <Section
          title="Registration form"
          hint="Pick which form the public /register page shows for this case. Leave as 'No online form' to hide registration."
        >
          <Field label="Form type">
            <select
              value={form.form_type}
              onChange={(e) => update('form_type', e.target.value)}
              className={inputCls + ' max-w-[360px]'}
            >
              <option value="">No online form</option>
              {FORM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {FORM_TYPE_META[t].label}
                </option>
              ))}
            </select>
            {form.form_type && (
              <p className="text-[11px] text-[#888888] mt-1.5">
                {FORM_TYPE_META[form.form_type as keyof typeof FORM_TYPE_META]?.description}
              </p>
            )}
          </Field>
          <Field
            label="Notification email"
            hint="Where enquiries for this form are directed (shown on the form / used for notifications)."
          >
            <input
              type="email"
              value={form.form_notify_email}
              onChange={(e) => update('form_notify_email', e.target.value)}
              className={inputCls + ' max-w-[360px]'}
              placeholder="enquiries@bantongroup.com"
            />
          </Field>
        </Section>

        <Section title="Ordering">
          <Field label="Order index" hint="Lower numbers appear first. New cases default to 0.">
            <input
              type="number"
              value={form.order_index}
              onChange={(e) => update('order_index', Number(e.target.value) || 0)}
              className={inputCls + ' max-w-[120px]'}
            />
          </Field>
        </Section>

        <Section title="Publishing">
          <Field label="Schedule for (optional)" hint="Leave empty to publish immediately when you click Publish.">
            <input
              type="datetime-local"
              value={isoToLocalInput(form.publish_at)}
              onChange={(e) =>
                update('publish_at', e.target.value ? localInputToIso(e.target.value) : null)
              }
              className={inputCls + ' max-w-[260px]'}
            />
          </Field>
          <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-[#1C3A64]/10 mt-2">
            <button
              type="button"
              onClick={() => navigate('/admin/cases')}
              className="px-4 py-2.5 text-[#1C3A64] text-[13px] font-medium hover:bg-[#1C3A64]/[0.06] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <PublishBtn onClick={() => save('draft')} disabled={saving} icon={<FileText size={14} />} variant="outline">
              Save draft
            </PublishBtn>
            <PublishBtn
              onClick={() => save('scheduled')}
              disabled={saving || !form.publish_at}
              icon={<Clock size={14} />}
              variant="outline"
              title={!form.publish_at ? 'Pick a date and time first' : 'Schedule for later'}
            >
              Schedule
            </PublishBtn>
            <PublishBtn
              onClick={() => save('published')}
              disabled={saving}
              icon={saving ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              variant="primary"
            >
              Publish now
            </PublishBtn>
          </div>
        </Section>
      </form>
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────

const inputCls =
  'w-full px-3.5 py-2.5 border border-[#1C3A64]/15 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1C3A64]/30 focus:border-[#1C3A64]/40 bg-white'

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-6 md:p-7">
      <div className="mb-5">
        <h2 className="text-[#1C3A64] text-[15px] font-medium">{title}</h2>
        {hint && <p className="text-[#888888] text-[12px] mt-0.5">{hint}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-[#1C3A64] mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-[#888888] mt-1" dangerouslySetInnerHTML={{ __html: hint }} />}
    </div>
  )
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors',
        active ? 'bg-[#1C3A64] text-white' : 'text-[#1C3A64] hover:bg-[#1C3A64]/[0.06]',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function StatusBadge({ mode }: { mode: PublishMode }) {
  const styles: Record<PublishMode, string> = {
    draft: 'bg-amber-50 text-amber-700 border-amber-200',
    scheduled: 'bg-violet-50 text-violet-700 border-violet-200',
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  }
  const labels: Record<PublishMode, string> = {
    draft: 'Draft',
    scheduled: 'Scheduled',
    published: 'Published',
  }
  return (
    <span className={`text-[10px] tracking-[0.15em] uppercase font-medium border px-2.5 py-1 rounded-full ${styles[mode]}`}>
      {labels[mode]}
    </span>
  )
}

function PublishBtn({
  onClick,
  disabled,
  icon,
  children,
  variant,
  title,
}: {
  onClick: () => void
  disabled?: boolean
  icon: React.ReactNode
  children: React.ReactNode
  variant: 'primary' | 'outline'
  title?: string
}) {
  const base =
    'inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
  const cls =
    variant === 'primary'
      ? 'bg-[#1C3A64] hover:bg-[#2A4E72] text-white'
      : 'border border-[#1C3A64]/20 text-[#1C3A64] hover:bg-[#1C3A64]/[0.06]'
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title} className={`${base} ${cls}`}>
      {icon}
      {children}
    </button>
  )
}

// ─── Recall tables editor ──────────────────────────────────────────

function RecallsEditor({
  tables,
  onChange,
}: {
  tables: RecallTable[]
  onChange: (next: RecallTable[]) => void
}) {
  const addTable = () => {
    onChange([
      ...tables,
      {
        columns: ['Model', 'Series', 'Model Years', 'Acquired prior to', 'Recall Notice'],
        rows: [
          [{ text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }],
        ],
      },
    ])
  }
  const updateTable = (idx: number, t: RecallTable) =>
    onChange(tables.map((x, i) => (i === idx ? t : x)))
  const removeTable = (idx: number) => onChange(tables.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      {tables.length === 0 && (
        <p className="text-[#888888] text-[12px] italic">No recall tables. Most cases don't need one.</p>
      )}
      {tables.map((t, i) => (
        <SingleRecallTable
          key={i}
          index={i}
          table={t}
          onChange={(next) => updateTable(i, next)}
          onRemove={() => removeTable(i)}
        />
      ))}
      <button
        type="button"
        onClick={addTable}
        className="inline-flex items-center gap-2 text-[12px] font-medium text-[#1C3A64] border border-[#1C3A64]/20 hover:bg-[#1C3A64]/[0.06] px-3 py-2 rounded-lg transition-colors"
      >
        <TableIcon size={13} /> Add recall table
      </button>
    </div>
  )
}

function SingleRecallTable({
  index,
  table,
  onChange,
  onRemove,
}: {
  index: number
  table: RecallTable
  onChange: (t: RecallTable) => void
  onRemove: () => void
}) {
  const setColumn = (ci: number, value: string) => {
    const columns = [...table.columns]
    columns[ci] = value
    onChange({ ...table, columns })
  }
  const addColumn = () => {
    const columns = [...table.columns, 'New column']
    const rows = table.rows.map((r) => [...r, { text: '' }])
    onChange({ columns, rows })
  }
  const removeColumn = (ci: number) => {
    if (table.columns.length <= 1) return
    onChange({
      columns: table.columns.filter((_, i) => i !== ci),
      rows: table.rows.map((r) => r.filter((_, i) => i !== ci)),
    })
  }
  const addRow = () => {
    onChange({
      ...table,
      rows: [...table.rows, table.columns.map(() => ({ text: '' }))],
    })
  }
  const removeRow = (ri: number) =>
    onChange({ ...table, rows: table.rows.filter((_, i) => i !== ri) })
  const setCell = (ri: number, ci: number, patch: Partial<RecallCell>) => {
    const rows = table.rows.map((row, r) =>
      r === ri
        ? row.map((cell, c) => (c === ci ? { ...cell, ...patch } : cell))
        : row,
    )
    onChange({ ...table, rows })
  }

  return (
    <div className="border border-[#1C3A64]/15 rounded-xl p-4 bg-[#FAFBFD]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] tracking-[0.15em] uppercase font-medium text-[#6D8FB5]">
          Table {index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="text-[11px] text-red-600 hover:underline inline-flex items-center gap-1"
        >
          <Trash2 size={11} /> Remove table
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-[12px] border border-[#1C3A64]/10 rounded">
          <thead className="bg-[#1C3A64]/[0.06]">
            <tr>
              {table.columns.map((col, ci) => (
                <th key={ci} className="text-left p-1 border-b border-[#1C3A64]/10 min-w-[120px]">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={col}
                      onChange={(e) => setColumn(ci, e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-[#1C3A64]/15 rounded text-[12px] font-medium text-[#1C3A64] focus:outline-none focus:ring-1 focus:ring-[#1C3A64]/30"
                    />
                    <button
                      type="button"
                      onClick={() => removeColumn(ci)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Remove column"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                </th>
              ))}
              <th className="p-1">
                <button
                  type="button"
                  onClick={addColumn}
                  className="p-1.5 text-[#1C3A64] hover:bg-[#1C3A64]/10 rounded"
                  title="Add column"
                >
                  <Plus size={12} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-[#1C3A64]/[0.06]">
                {row.map((cell, ci) => (
                  <td key={ci} className="p-1 align-top">
                    <input
                      type="text"
                      value={cell.text}
                      onChange={(e) => setCell(ri, ci, { text: e.target.value })}
                      className="w-full px-2 py-1 bg-white border border-[#1C3A64]/15 rounded text-[12px] focus:outline-none focus:ring-1 focus:ring-[#1C3A64]/30"
                      placeholder="Text"
                    />
                    <input
                      type="text"
                      value={cell.link ?? ''}
                      onChange={(e) =>
                        setCell(ri, ci, { link: e.target.value || undefined })
                      }
                      className="w-full mt-1 px-2 py-1 bg-white border border-[#1C3A64]/15 rounded text-[11px] text-[#1C3A64] focus:outline-none focus:ring-1 focus:ring-[#1C3A64]/30"
                      placeholder="Optional link URL"
                    />
                  </td>
                ))}
                <td className="p-1 align-top">
                  <button
                    type="button"
                    onClick={() => removeRow(ri)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                    title="Remove row"
                  >
                    <Trash2 size={11} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addRow}
        className="mt-3 inline-flex items-center gap-1 text-[12px] text-[#1C3A64] hover:underline"
      >
        <Plus size={12} /> Add row
      </button>
    </div>
  )
}
