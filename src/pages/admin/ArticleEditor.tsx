import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Loader2,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { ArticleBlock } from '@/data/news'

interface ArticleForm {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  author: string
  source_name: string
  source_url: string
  cover_image: string
  content: ArticleBlock[]
  published: boolean
}

const EMPTY: ArticleForm = {
  slug: '',
  title: '',
  date: new Date().toISOString().slice(0, 10),
  excerpt: '',
  category: '',
  author: '',
  source_name: '',
  source_url: '',
  cover_image: '',
  content: [],
  published: false,
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

export function ArticleEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState<ArticleForm>(EMPTY)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slugTouched, setSlugTouched] = useState(isEdit)

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
          source_name: data.source_name ?? '',
          source_url: data.source_url ?? '',
          cover_image: data.cover_image ?? '',
          content: (data.content as ArticleBlock[]) ?? [],
          published: data.published,
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

  const addBlock = (kind: ArticleBlock['kind']) => {
    let block: ArticleBlock
    switch (kind) {
      case 'ul':
        block = { kind: 'ul', items: [''] }
        break
      case 'quote':
        block = { kind: 'quote', text: '', attribution: '' }
        break
      case 'link':
        block = { kind: 'link', label: '', href: '' }
        break
      case 'image':
        block = { kind: 'image', src: '', caption: '' }
        break
      default:
        block = { kind, text: '' }
    }
    update('content', [...form.content, block])
  }

  const updateBlock = (idx: number, patch: Partial<ArticleBlock>) => {
    const next = form.content.map((b, i) =>
      i === idx ? ({ ...b, ...patch } as ArticleBlock) : b,
    )
    update('content', next)
  }

  const removeBlock = (idx: number) => {
    update(
      'content',
      form.content.filter((_, i) => i !== idx),
    )
  }

  const moveBlock = (idx: number, dir: -1 | 1) => {
    const target = idx + dir
    if (target < 0 || target >= form.content.length) return
    const next = [...form.content]
    ;[next[idx], next[target]] = [next[target], next[idx]]
    update('content', next)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    setSaving(true)
    setError(null)
    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      date: form.date,
      excerpt: form.excerpt.trim(),
      category: form.category || null,
      author: form.author || null,
      source_name: form.source_name || null,
      source_url: form.source_url || null,
      cover_image: form.cover_image || null,
      content: form.content,
      published: form.published,
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#1C3A64]" size={24} />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/admin')}
        className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] mb-6 hover:underline"
      >
        <ArrowLeft size={13} />
        Back to articles
      </button>

      <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight mb-8">
        {isEdit ? 'Edit article' : 'New article'}
      </h1>

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
              className={input}
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
              className={input}
            />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Publication date" required>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className={input}
              />
            </Field>
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className={input}
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
              className={input}
              placeholder="Amanda Banton & Melissa Morgan"
            />
          </Field>
          <Field
            label="Summary"
            hint="One short sentence shown on the list and at the top of the article."
            required
          >
            <textarea
              required
              rows={3}
              value={form.excerpt}
              onChange={(e) => update('excerpt', e.target.value)}
              className={input}
            />
          </Field>
        </Section>

        <Section title="External source (optional)" hint="Only for press pieces that link out to another publication.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Source name">
              <input
                type="text"
                value={form.source_name}
                onChange={(e) => update('source_name', e.target.value)}
                className={input}
                placeholder="Lawyers Weekly"
              />
            </Field>
            <Field label="Source URL">
              <input
                type="url"
                value={form.source_url}
                onChange={(e) => update('source_url', e.target.value)}
                className={input}
                placeholder="https://…"
              />
            </Field>
          </div>
        </Section>

        <Section title="Cover image (optional)" hint="Paste an image URL — must be publicly accessible.">
          <Field label="Image URL">
            <input
              type="url"
              value={form.cover_image}
              onChange={(e) => update('cover_image', e.target.value)}
              className={input}
              placeholder="https://…"
            />
          </Field>
        </Section>

        <Section title="Article body" hint="Add blocks of text. Reorder with the arrows.">
          <div className="space-y-3">
            {form.content.length === 0 && (
              <p className="text-[#888888] text-[13px] italic">No blocks yet. Add one below.</p>
            )}
            {form.content.map((block, idx) => (
              <BlockEditor
                key={idx}
                block={block}
                onChange={(patch) => updateBlock(idx, patch)}
                onRemove={() => removeBlock(idx)}
                onMoveUp={() => moveBlock(idx, -1)}
                onMoveDown={() => moveBlock(idx, 1)}
                isFirst={idx === 0}
                isLast={idx === form.content.length - 1}
              />
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              <AddBlockBtn onClick={() => addBlock('p')}>+ Paragraph</AddBlockBtn>
              <AddBlockBtn onClick={() => addBlock('h2')}>+ Heading</AddBlockBtn>
              <AddBlockBtn onClick={() => addBlock('h3')}>+ Subheading</AddBlockBtn>
              <AddBlockBtn onClick={() => addBlock('ul')}>+ List</AddBlockBtn>
              <AddBlockBtn onClick={() => addBlock('quote')}>+ Quote</AddBlockBtn>
              <AddBlockBtn onClick={() => addBlock('link')}>+ Link</AddBlockBtn>
              <AddBlockBtn onClick={() => addBlock('image')}>+ Image</AddBlockBtn>
            </div>
          </div>
        </Section>

        <Section title="Publish">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => update('published', e.target.checked)}
              className="w-4 h-4 accent-[#1C3A64]"
            />
            <span className="text-[14px] text-[#1C3A64]">
              Published <span className="text-[#888888]">— visible on the public blog</span>
            </span>
          </label>
        </Section>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="px-5 py-2.5 text-[#1C3A64] text-[13px] font-medium hover:bg-[#1C3A64]/[0.06] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] disabled:opacity-60 text-white text-[13px] font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isEdit ? 'Save changes' : 'Create article'}
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── Small UI helpers ─────────────────────────────────────────────────

const input =
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

function AddBlockBtn({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[12px] font-medium text-[#1C3A64] border border-[#1C3A64]/15 hover:bg-[#1C3A64]/[0.06] px-3 py-1.5 rounded-lg transition-colors"
    >
      {children}
    </button>
  )
}

function BlockEditor({
  block,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  block: ArticleBlock
  onChange: (patch: Partial<ArticleBlock>) => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}) {
  return (
    <div className="border border-[#1C3A64]/12 rounded-xl p-4 bg-[#FAFBFD]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] tracking-[0.15em] uppercase font-medium text-[#6D8FB5]">
          {blockLabel(block.kind)}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            className="p-1 text-[#1C3A64] hover:bg-[#1C3A64]/[0.06] rounded disabled:opacity-30"
            title="Move up"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            className="p-1 text-[#1C3A64] hover:bg-[#1C3A64]/[0.06] rounded disabled:opacity-30"
            title="Move down"
          >
            <ChevronDown size={14} />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            title="Remove block"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      <BlockBody block={block} onChange={onChange} />
    </div>
  )
}

function BlockBody({
  block,
  onChange,
}: {
  block: ArticleBlock
  onChange: (patch: Partial<ArticleBlock>) => void
}) {
  switch (block.kind) {
    case 'p':
    case 'h2':
    case 'h3':
      return (
        <textarea
          rows={block.kind === 'p' ? 5 : 2}
          value={block.text}
          onChange={(e) => onChange({ text: e.target.value })}
          className={input}
          placeholder={
            block.kind === 'p' ? 'Write the paragraph…' : 'Heading text'
          }
        />
      )
    case 'quote':
      return (
        <div className="space-y-2">
          <textarea
            rows={3}
            value={block.text}
            onChange={(e) => onChange({ text: e.target.value })}
            className={input}
            placeholder="Quote text"
          />
          <input
            type="text"
            value={block.attribution ?? ''}
            onChange={(e) => onChange({ attribution: e.target.value })}
            className={input}
            placeholder="Attribution (optional)"
          />
        </div>
      )
    case 'ul':
      return (
        <div className="space-y-2">
          {block.items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const items = [...block.items]
                  items[i] = e.target.value
                  onChange({ items })
                }}
                className={input}
                placeholder={`Item ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => onChange({ items: block.items.filter((_, k) => k !== i) })}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                title="Remove item"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange({ items: [...block.items, ''] })}
            className="text-[12px] font-medium text-[#1C3A64] hover:underline inline-flex items-center gap-1"
          >
            <Plus size={12} /> Add item
          </button>
        </div>
      )
    case 'link':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
            type="text"
            value={block.label}
            onChange={(e) => onChange({ label: e.target.value })}
            className={input}
            placeholder="Label"
          />
          <input
            type="url"
            value={block.href}
            onChange={(e) => onChange({ href: e.target.value })}
            className={input}
            placeholder="https://…"
          />
        </div>
      )
    case 'image':
      return (
        <div className="space-y-2">
          <input
            type="url"
            value={block.src}
            onChange={(e) => onChange({ src: e.target.value })}
            className={input}
            placeholder="Image URL"
          />
          <input
            type="text"
            value={block.caption ?? ''}
            onChange={(e) => onChange({ caption: e.target.value })}
            className={input}
            placeholder="Caption (optional)"
          />
        </div>
      )
  }
}

function blockLabel(kind: ArticleBlock['kind']) {
  switch (kind) {
    case 'p':
      return 'Paragraph'
    case 'h2':
      return 'Heading'
    case 'h3':
      return 'Subheading'
    case 'ul':
      return 'List'
    case 'quote':
      return 'Quote'
    case 'link':
      return 'Link'
    case 'image':
      return 'Image'
  }
}
