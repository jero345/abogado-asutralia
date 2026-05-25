import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, Plus, Pencil, Trash2, Calendar, Eye, EyeOff, ExternalLink, Scale } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface CaseRow {
  id: string
  slug: string
  title: string
  status: string
  category: string
  year: string
  order_index: number
  published: boolean
  publish_at: string | null
  updated_at: string
}

type Status = 'draft' | 'scheduled' | 'published'

function statusOf(r: CaseRow): Status {
  if (!r.published) return 'draft'
  if (r.publish_at && new Date(r.publish_at) > new Date()) return 'scheduled'
  return 'published'
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function CasesAdminDashboard() {
  const [rows, setRows] = useState<CaseRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = async () => {
    if (!supabase) return
    const { data, error: err } = await supabase
      .from('cases')
      .select('id, slug, title, status, category, year, order_index, published, publish_at, updated_at')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })
    if (err) {
      setError(err.message)
      return
    }
    setRows((data as CaseRow[]) ?? [])
  }

  useEffect(() => {
    load()
  }, [])

  const togglePublished = async (row: CaseRow) => {
    if (!supabase) return
    setBusyId(row.id)
    const { error: err } = await supabase
      .from('cases')
      .update({ published: !row.published, publish_at: null })
      .eq('id', row.id)
    setBusyId(null)
    if (err) {
      setError(err.message)
      return
    }
    load()
  }

  const remove = async (row: CaseRow) => {
    if (!supabase) return
    const ok = window.confirm(`Delete “${row.title}”? This cannot be undone.`)
    if (!ok) return
    setBusyId(row.id)
    const { error: err } = await supabase.from('cases').delete().eq('id', row.id)
    setBusyId(null)
    if (err) {
      setError(err.message)
      return
    }
    load()
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight inline-flex items-center gap-2">
            <Scale size={22} /> Class Action cases
          </h1>
          <p className="text-[#888888] text-[13px] mt-1">
            Create, edit, publish or unpublish class-action matters shown on /class-actions.
          </p>
        </div>
        <Link
          to="/admin/cases/new"
          className="inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] text-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={14} />
          New case
        </Link>
      </div>

      <div className="mb-6 text-[12px] text-[#888888] bg-[#F4F6FB] border border-[#1C3A64]/10 rounded-lg px-4 py-3">
        <strong className="text-[#1C3A64]">Note:</strong> The 15 historical cases (Arrium, CuDeco, Hyundai, etc.)
        live in the codebase and are not listed here — they stay visible on the public page automatically.
        New cases you create here are merged on top.
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
          <p className="text-[#555555] text-[14px] mb-4">No new cases yet.</p>
          <Link
            to="/admin/cases/new"
            className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium hover:underline"
          >
            <Plus size={13} />
            Create your first case
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-[#1C3A64]/10 rounded-2xl overflow-hidden">
          <ul className="divide-y divide-[#1C3A64]/10">
            {rows.map((r) => {
              const status = statusOf(r)
              return (
                <li key={r.id} className="px-5 py-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#1C3A64] text-[14px] font-medium truncate">{r.title}</span>
                      <StatusBadge status={r.status} />
                      {r.category && (
                        <span className="text-[10px] tracking-[0.12em] uppercase text-[#6D8FB5] bg-[#1C3A64]/[0.05] px-2 py-0.5 rounded">
                          {r.category}
                        </span>
                      )}
                      <StatusChip status={status} />
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[12px] text-[#888888]">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={11} />
                        {r.year}
                      </span>
                      <span>/{r.slug}</span>
                      {status === 'scheduled' && r.publish_at && (
                        <span className="text-violet-700">
                          · goes live {formatDateTime(r.publish_at)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {r.published && (
                      <a
                        href={`/class-actions#${r.slug}`}
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
                      to={`/admin/cases/edit/${r.id}`}
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
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: 'text-white bg-[#1C3A64]',
    Settled: 'text-[#1C3A64] bg-[#E8F0FA] border border-[#1C3A64]/25',
    'On Appeal': 'text-white bg-[#385078]',
    Investigating: 'text-[#1C3A64] bg-white border border-[#1C3A64]/40',
  }
  const cls = map[status] ?? 'text-[#1C3A64] bg-[#1C3A64]/[0.05]'
  return (
    <span className={`text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded font-medium ${cls}`}>
      {status}
    </span>
  )
}

function StatusChip({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    draft: 'text-amber-700 bg-amber-50',
    scheduled: 'text-violet-700 bg-violet-50',
    published: 'text-emerald-700 bg-emerald-50',
  }
  const labels: Record<Status, string> = {
    draft: 'Draft',
    scheduled: 'Scheduled',
    published: 'Published',
  }
  return (
    <span className={`text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
