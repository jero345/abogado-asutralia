import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, Plus, Pencil, Trash2, Calendar, Eye, EyeOff, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface ArticleRow {
  id: string
  slug: string
  title: string
  date: string
  category: string | null
  published: boolean
  updated_at: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function AdminDashboard() {
  const [rows, setRows] = useState<ArticleRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = async () => {
    if (!supabase) return
    const { data, error: err } = await supabase
      .from('articles')
      .select('id, slug, title, date, category, published, updated_at')
      .order('date', { ascending: false })
    if (err) {
      setError(err.message)
      return
    }
    setRows((data as ArticleRow[]) ?? [])
  }

  useEffect(() => {
    load()
  }, [])

  const togglePublished = async (row: ArticleRow) => {
    if (!supabase) return
    setBusyId(row.id)
    const { error: err } = await supabase
      .from('articles')
      .update({ published: !row.published })
      .eq('id', row.id)
    setBusyId(null)
    if (err) {
      setError(err.message)
      return
    }
    load()
  }

  const remove = async (row: ArticleRow) => {
    if (!supabase) return
    const ok = window.confirm(`Delete “${row.title}”? This cannot be undone.`)
    if (!ok) return
    setBusyId(row.id)
    const { error: err } = await supabase.from('articles').delete().eq('id', row.id)
    setBusyId(null)
    if (err) {
      setError(err.message)
      return
    }
    load()
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight">Articles</h1>
          <p className="text-[#888888] text-[13px] mt-1">Create, edit, publish or unpublish blog articles.</p>
        </div>
        <Link
          to="/admin/new"
          className="inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] text-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={14} />
          New article
        </Link>
      </div>

      {error && (
        <div className="mb-6 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {rows === null ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#1C3A64]" size={24} />
        </div>
      ) : rows.length === 0 ? (
        <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-12 text-center">
          <p className="text-[#555555] text-[14px] mb-4">No articles yet.</p>
          <Link
            to="/admin/new"
            className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium hover:underline"
          >
            <Plus size={13} />
            Create your first article
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-[#1C3A64]/10 rounded-2xl overflow-hidden">
          <ul className="divide-y divide-[#1C3A64]/10">
            {rows.map((r) => (
              <li key={r.id} className="px-5 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#1C3A64] text-[14px] font-medium truncate">{r.title}</span>
                    {r.category && (
                      <span className="text-[10px] tracking-[0.12em] uppercase text-[#6D8FB5] bg-[#1C3A64]/[0.05] px-2 py-0.5 rounded">
                        {r.category}
                      </span>
                    )}
                    {!r.published && (
                      <span className="text-[10px] tracking-[0.12em] uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[12px] text-[#888888]">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={11} />
                      {formatDate(r.date)}
                    </span>
                    <span>/{r.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {r.published && (
                    <a
                      href={`/blog/${r.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View on site"
                      className="p-2 rounded-lg hover:bg-[#1C3A64]/[0.06] text-[#1C3A64] transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => togglePublished(r)}
                    disabled={busyId === r.id}
                    title={r.published ? 'Unpublish' : 'Publish'}
                    className="p-2 rounded-lg hover:bg-[#1C3A64]/[0.06] text-[#1C3A64] transition-colors disabled:opacity-50"
                  >
                    {r.published ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <Link
                    to={`/admin/edit/${r.id}`}
                    title="Edit"
                    className="p-2 rounded-lg hover:bg-[#1C3A64]/[0.06] text-[#1C3A64] transition-colors"
                  >
                    <Pencil size={14} />
                  </Link>
                  <button
                    onClick={() => remove(r)}
                    disabled={busyId === r.id}
                    title="Delete"
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
