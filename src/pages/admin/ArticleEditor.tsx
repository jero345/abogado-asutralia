import { useEffect, useMemo, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Loader2,
  ArrowLeft,
  X,
  Calendar,
  Send,
  FileText,
  Clock,
  Pencil,
  Eye,
  Image as ImageIcon,
  Upload,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { RichTextEditor } from '@/components/admin/RichTextEditor'

type PublishMode = 'draft' | 'scheduled' | 'published'

interface ArticleForm {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  author: string
  tags: string[]
  source_name: string
  source_url: string
  cover_image: string
  body_html: string
  seo_title: string
  seo_description: string
  seo_og_image: string
  published: boolean
  publish_at: string | null
}

const EMPTY: ArticleForm = {
  slug: '',
  title: '',
  date: new Date().toISOString().slice(0, 10),
  excerpt: '',
  category: '',
  author: '',
  tags: [],
  source_name: '',
  source_url: '',
  cover_image: '',
  body_html: '',
  seo_title: '',
  seo_description: '',
  seo_og_image: '',
  published: false,
  publish_at: null,
}

const CATEGORIES = [
  'Case Update',
  'Commentary',
  'Class Actions',
  'Firm Update',
  'Press Release',
  'Media',
  'Careers',
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

// Convert ISO timestamptz to the value expected by <input type="datetime-local">
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

function computeMode(form: ArticleForm): PublishMode {
  if (!form.published) return 'draft'
  if (form.publish_at && new Date(form.publish_at) > new Date()) return 'scheduled'
  return 'published'
}

export function ArticleEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState<ArticleForm>(EMPTY)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [view, setView] = useState<'edit' | 'preview'>('edit')
  const [coverUploading, setCoverUploading] = useState(false)

  const mode = useMemo(() => computeMode(form), [form])

  useEffect(() => {
    if (!isEdit || !supabase) return
    let cancelled = false
    supabase
      .from('articles')
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
          setError('Article not found.')
          setLoading(false)
          return
        }
        setForm({
          slug: data.slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          category: data.category ?? '',
          author: data.author ?? '',
          tags: (data.tags as string[] | null) ?? [],
          source_name: data.source_name ?? '',
          source_url: data.source_url ?? '',
          cover_image: data.cover_image ?? '',
          body_html: data.body_html ?? '',
          seo_title: data.seo_title ?? '',
          seo_description: data.seo_description ?? '',
          seo_og_image: data.seo_og_image ?? '',
          published: data.published,
          publish_at: data.publish_at,
        })
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, isEdit])

  const update = <K extends keyof ArticleForm>(key: K, value: ArticleForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const onTitleChange = (v: string) => {
    update('title', v)
    if (!slugTouched) update('slug', slugify(v))
  }

  const uploadCover = async (file: File) => {
    if (!supabase) return
    if (!file.type.startsWith('image/')) {
      setError('Cover must be an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Cover image is too large (max 5 MB).')
      return
    }
    setCoverUploading(true)
    setError(null)
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `covers/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error: upErr } = await supabase.storage
      .from('article-images')
      .upload(path, file, { cacheControl: '3600', upsert: false })
    if (upErr) {
      setCoverUploading(false)
      setError(upErr.message)
      return
    }
    const { data } = supabase.storage.from('article-images').getPublicUrl(path)
    update('cover_image', data.publicUrl)
    setCoverUploading(false)
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
      date: form.date,
      excerpt: form.excerpt.trim(),
      category: form.category || null,
      author: form.author || null,
      tags: form.tags,
      source_name: form.source_name || null,
      source_url: form.source_url || null,
      cover_image: form.cover_image || null,
      body_html: form.body_html || null,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      seo_og_image: form.seo_og_image || null,
      published,
      publish_at,
      // Clear legacy block content when saving from the new editor so the
      // public renderer doesn't show both at once.
      content: [],
    }
    const res = isEdit
      ? await supabase.from('articles').update(payload).eq('id', id!)
      : await supabase.from('articles').insert(payload)
    setSaving(false)
    if (res.error) {
      setError(res.error.message)
      return
    }
    navigate('/admin')
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    // Default submit = save draft. The dedicated buttons handle publish/schedule.
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
          onClick={() => navigate('/admin')}
          className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] hover:underline"
        >
          <ArrowLeft size={13} />
          Back to articles
        </button>
        <StatusBadge mode={mode} />
      </div>

      <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight mb-2">
        {isEdit ? 'Edit article' : 'New article'}
      </h1>
      <p className="text-[#888888] text-[13px] mb-8">
        {isEdit ? 'Update the article. Changes go live as soon as you save.' : 'Compose the article, then save as draft, schedule or publish.'}
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
            />
          </Field>
          <Field label="URL slug" hint="Shows in the article URL (/blog/<slug>)">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Publication date" required>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className={inputCls}
              >
                <option value="">— None —</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Author">
            <input
              type="text"
              value={form.author}
              onChange={(e) => update('author', e.target.value)}
              className={inputCls}
              placeholder="Amanda Banton & Melissa Morgan"
            />
          </Field>
          <Field label="Tags" hint="Press Enter or comma to add. Click × to remove.">
            <TagsInput value={form.tags} onChange={(v) => update('tags', v)} />
          </Field>
          <Field
            label="Summary"
            hint="ONE short sentence shown on the list and at the top of the article. Keep it brief — the full body goes below."
            required
          >
            <textarea
              required
              rows={3}
              maxLength={280}
              value={form.excerpt}
              onChange={(e) => update('excerpt', e.target.value)}
              className={inputCls}
            />
            <div className="text-[11px] text-[#888888] mt-1 text-right">
              {form.excerpt.length}/280
            </div>
          </Field>
        </Section>

        <Section title="Cover image" hint="Shown on the list card and at the top of the article.">
          <CoverImageInput
            value={form.cover_image}
            onChange={(v) => update('cover_image', v)}
            onFile={uploadCover}
            uploading={coverUploading}
          />
        </Section>

        <Section
          title="Article body"
          hint="Visual editor with a toolbar — use the buttons for bold, italic, headings, lists, images, PDFs and quotes."
        >
          <EditorHelp />
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
              placeholder="Start writing the article…"
            />
          ) : (
            <PreviewPane form={form} />
          )}
        </Section>

        <Section
          title="External source (optional)"
          hint="Only for press pieces that link out to another publication."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Source name">
              <input
                type="text"
                value={form.source_name}
                onChange={(e) => update('source_name', e.target.value)}
                className={inputCls}
                placeholder="Lawyers Weekly"
              />
            </Field>
            <Field label="Source URL">
              <input
                type="url"
                value={form.source_url}
                onChange={(e) => update('source_url', e.target.value)}
                className={inputCls}
                placeholder="https://…"
              />
            </Field>
          </div>
        </Section>

        <Section
          title="SEO"
          hint="What people see in Google results and when sharing on LinkedIn / WhatsApp. Optional — defaults to the article title and summary."
        >
          <Field
            label="SEO title"
            hint="Shown as the page tab title and the headline on Google. Up to ~60 characters."
          >
            <input
              type="text"
              maxLength={70}
              value={form.seo_title}
              onChange={(e) => update('seo_title', e.target.value)}
              className={inputCls}
              placeholder={form.title || 'Article title'}
            />
            <div className="text-[11px] text-[#888888] mt-1 text-right">
              {form.seo_title.length}/70
            </div>
          </Field>
          <Field
            label="SEO description"
            hint="The grey paragraph under the Google headline. ~155 characters works best."
          >
            <textarea
              rows={3}
              maxLength={170}
              value={form.seo_description}
              onChange={(e) => update('seo_description', e.target.value)}
              className={inputCls}
              placeholder={form.excerpt || 'Short summary…'}
            />
            <div className="text-[11px] text-[#888888] mt-1 text-right">
              {form.seo_description.length}/170
            </div>
          </Field>
          <Field
            label="Social share image (OG image)"
            hint="The image that appears when the article is shared on LinkedIn / WhatsApp / X. Defaults to the cover."
          >
            <input
              type="url"
              value={form.seo_og_image}
              onChange={(e) => update('seo_og_image', e.target.value)}
              className={inputCls}
              placeholder={form.cover_image || 'https://…'}
            />
          </Field>
        </Section>

        <Section title="Publishing" hint="Pick what happens when you save.">
          <div className="flex items-end gap-3 flex-wrap">
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
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-[#1C3A64]/10 mt-2">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-4 py-2.5 text-[#1C3A64] text-[13px] font-medium hover:bg-[#1C3A64]/[0.06] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <PublishBtn
              onClick={() => save('draft')}
              disabled={saving}
              icon={<FileText size={14} />}
              variant="outline"
            >
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

// ─── Helper UI ──────────────────────────────────────────────────────

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
      {hint && <p className="text-[11px] text-[#888888] mt-1">{hint}</p>}
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
        active
          ? 'bg-[#1C3A64] text-white'
          : 'text-[#1C3A64] hover:bg-[#1C3A64]/[0.06]',
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
    <span
      className={`text-[10px] tracking-[0.15em] uppercase font-medium border px-2.5 py-1 rounded-full ${styles[mode]}`}
    >
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

function TagsInput({
  value,
  onChange,
}: {
  value: string[]
  onChange: (next: string[]) => void
}) {
  const [draft, setDraft] = useState('')

  const commit = (raw: string) => {
    const tag = raw.trim().replace(/^#/, '')
    if (!tag) return
    if (value.includes(tag)) return
    onChange([...value, tag])
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      commit(draft)
      setDraft('')
    } else if (e.key === 'Backspace' && draft === '' && value.length) {
      onChange(value.slice(0, -1))
    }
  }

  return (
    <div
      className={
        inputCls + ' flex flex-wrap items-center gap-1.5 cursor-text min-h-[42px] py-2'
      }
      onClick={(e) => {
        const input = (e.currentTarget as HTMLDivElement).querySelector('input')
        input?.focus()
      }}
    >
      {value.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 bg-[#1C3A64]/[0.08] text-[#1C3A64] text-[12px] px-2 py-0.5 rounded-md"
        >
          {t}
          <button
            type="button"
            onClick={() => onChange(value.filter((x) => x !== t))}
            className="hover:text-red-600"
            aria-label={`Remove ${t}`}
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKey}
        onBlur={() => {
          if (draft) {
            commit(draft)
            setDraft('')
          }
        }}
        placeholder={value.length ? '' : 'class-actions, hague-convention…'}
        className="flex-1 min-w-[120px] outline-none bg-transparent text-[14px]"
      />
    </div>
  )
}

function CoverImageInput({
  value,
  onChange,
  onFile,
  uploading,
}: {
  value: string
  onChange: (v: string) => void
  onFile: (f: File) => void
  uploading: boolean
}) {
  return (
    <div className="space-y-3">
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
        placeholder="https://…  (or upload below)"
      />
      <div className="flex items-center gap-3">
        <label
          className={
            'inline-flex items-center gap-2 cursor-pointer text-[13px] font-medium px-4 py-2.5 rounded-lg border border-[#1C3A64]/20 text-[#1C3A64] hover:bg-[#1C3A64]/[0.06] transition-colors ' +
            (uploading ? 'opacity-60 cursor-wait' : '')
          }
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          {uploading ? 'Uploading…' : 'Upload image'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0]
              e.target.value = ''
              if (f) onFile(f)
            }}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[12px] text-red-600 hover:underline"
          >
            Remove
          </button>
        )}
      </div>
      {value && (
        <div className="rounded-xl overflow-hidden border border-[#1C3A64]/10 bg-[#F4F6FB] max-w-md">
          <img src={value} alt="Cover preview" className="w-full h-auto" />
        </div>
      )}
      {!value && (
        <div className="flex items-center gap-2 text-[#888888] text-[12px]">
          <ImageIcon size={14} /> No cover image set
        </div>
      )}
    </div>
  )
}

function EditorHelp() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mb-4 rounded-xl border border-[#1C3A64]/15 bg-[#F4F6FB] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-[#1C3A64]/[0.04] transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium">
          <FileText size={14} />
          How to add images, PDFs and quotes
        </span>
        <span className="text-[#6D8FB5] text-[11px] tracking-wide">
          {open ? 'Hide' : 'Show'}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 text-[13px] text-[#1C3A64] space-y-4 border-t border-[#1C3A64]/10">
          <HelpItem
            title="Insert an image"
            steps={[
              'Click where you want the image inside the article.',
              'In the toolbar, press the image icon (the small picture).',
              'Pick a file from your computer (JPG or PNG, up to 5 MB).',
              'The image uploads automatically and appears inside the article.',
            ]}
            note="Images are stored in the article-images bucket on Supabase Storage, under editor/. Reuse one by copy-pasting it inside the editor — no need to re-upload."
          />
          <HelpItem
            title="Insert a PDF (full inline viewer)"
            steps={[
              'Click where you want the PDF.',
              'In the toolbar, press the document icon (sheet of paper).',
              'Pick a PDF from your computer (up to 25 MB).',
              'The PDF appears as a scrollable viewer inside the article — readers see every page without leaving the page.',
            ]}
            note="PDFs are stored in the article-documents bucket on Supabase Storage, under editor/. The reader still has a Download fallback link below the viewer."
          />
          <HelpItem
            title="Insert a legal quote (blue, italic, left border)"
            steps={[
              'Select the text you want to turn into a quote (or place the cursor on an empty line).',
              'In the toolbar, press the quotation marks icon (Quote).',
              'The block turns into a styled quote: blue italic text with a blue left border on a light background.',
              'Press the Quote button again on the same block to remove it.',
            ]}
            note="The Preview tab (next to Write) shows the quote exactly as readers will see it."
          />
        </div>
      )}
    </div>
  )
}

function HelpItem({
  title,
  steps,
  note,
}: {
  title: string
  steps: string[]
  note?: string
}) {
  return (
    <div>
      <h4 className="text-[#1C3A64] text-[13px] font-semibold mb-1.5">{title}</h4>
      <ol className="list-decimal pl-5 space-y-1 text-[#1C3A64]/85 text-[12.5px] leading-[1.6]">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
      {note && (
        <p className="mt-1.5 text-[11.5px] text-[#6D8FB5] leading-[1.5]">{note}</p>
      )}
    </div>
  )
}

function PreviewPane({ form }: { form: ArticleForm }) {
  return (
    <div className="border border-[#1C3A64]/15 rounded-lg overflow-hidden bg-white">
      <div className="bg-[#F4F6FB] px-4 py-2 border-b border-[#1C3A64]/10 text-[11px] tracking-[0.15em] uppercase text-[#6D8FB5] font-medium">
        Preview — exactly how it will look on the public blog
      </div>
      <div className="p-6 md:p-8">
        {form.category && (
          <div className="text-[10px] tracking-[0.18em] uppercase font-medium text-[#6D8FB5] mb-3">
            {form.category}
          </div>
        )}
        <h1 className="text-[#1C3A64] text-[28px] md:text-[34px] font-medium leading-tight tracking-tight mb-3">
          {form.title || 'Untitled article'}
        </h1>
        {form.excerpt && (
          <p className="text-[#555555] text-[15px] leading-[1.7] mb-6">
            {form.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 text-[12px] text-[#888888] mb-6 pb-4 border-b border-[#1C3A64]/10">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={11} />
            {form.date}
          </span>
          {form.author && <span>· {form.author}</span>}
        </div>
        {form.cover_image && (
          <img
            src={form.cover_image}
            alt=""
            className="w-full h-auto rounded-xl mb-6"
          />
        )}
        {form.body_html ? (
          <div
            className={[
              'prose prose-slate max-w-none',
              'prose-headings:text-[#1C3A64] prose-headings:font-medium',
              'prose-p:text-[#555555] prose-p:leading-[1.8]',
              'prose-a:text-[#1C3A64]',
              'prose-blockquote:border-l-[4px] prose-blockquote:border-l-[#1C3A64]',
              'prose-blockquote:bg-[#F4F6FB] prose-blockquote:rounded-r-xl',
              'prose-blockquote:not-italic',
              '[&_blockquote_p]:text-[#1C3A64] [&_blockquote_p]:italic [&_blockquote_p]:font-medium',
              'prose-img:rounded-xl',
              '[&_.pdf-embed]:my-6 [&_.pdf-embed]:rounded-xl [&_.pdf-embed]:overflow-hidden',
              '[&_.pdf-embed]:border [&_.pdf-embed]:border-[#1C3A64]/15',
              '[&_.pdf-embed_iframe]:block [&_.pdf-embed_iframe]:w-full',
              '[&_.pdf-embed_iframe]:h-[520px] [&_.pdf-embed_iframe]:border-0',
              '[&_.pdf-embed_iframe]:bg-[#F4F6FB]',
              '[&_.pdf-embed-fallback]:hidden',
            ].join(' ')}
            dangerouslySetInnerHTML={{ __html: form.body_html }}
          />
        ) : (
          <p className="text-[#aaa] italic text-[14px]">No body yet — start writing in the Write tab.</p>
        )}
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-8 pt-6 border-t border-[#1C3A64]/10">
            {form.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] bg-[#1C3A64]/[0.06] text-[#1C3A64] px-2 py-0.5 rounded"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
