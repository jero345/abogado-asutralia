import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, Download, Inbox, ClipboardList, ArrowUpRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { FORM_TYPES, FORM_TYPE_META, getFormConfig, type FormType } from '@/data/registrationForms'

interface CaseRow {
  slug: string
  title: string
  form_type?: string | null
  published?: boolean
}
interface RegRow {
  form_type: string
  [k: string]: unknown
}

function csvEscape(v: unknown): string {
  if (v == null) return ''
  const s = typeof v === 'string' ? v : JSON.stringify(v)
  return /["\n,]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

const EXPORT_HEADERS = [
  'created_at', 'case_slug', 'case_title', 'form_type', 'status',
  'first_name', 'last_name', 'email', 'phone',
  'address_line1', 'address_line2', 'city', 'state', 'postal', 'country',
  'retainer', 'payload', 'documents', 'notes',
]

export function FormsAdmin() {
  const [cases, setCases] = useState<CaseRow[] | null>(null)
  const [regs, setRegs] = useState<RegRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    Promise.all([
      supabase.from('cases').select('*').order('order_index', { ascending: true }),
      supabase.from('registrations').select('*').order('created_at', { ascending: false }),
    ]).then(([c, r]) => {
      if (cancelled) return
      if (c.error) setError(c.error.message)
      setCases((c.data as CaseRow[]) ?? [])
      setRegs((r.data as RegRow[]) ?? [])
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Effective form type per case: DB form_type (if migrated) else the code default.
  const casesByForm = useMemo(() => {
    const map: Record<string, { slug: string; title: string }[]> = {}
    for (const ft of FORM_TYPES) map[ft] = []
    for (const c of cases ?? []) {
      const ft = (c.form_type as FormType) || getFormConfig(c.slug)?.formType
      if (ft && map[ft]) map[ft].push({ slug: c.slug, title: c.title })
    }
    return map
  }, [cases])

  const regCountByForm = useMemo(() => {
    const m: Record<string, number> = {}
    for (const r of regs ?? []) m[r.form_type] = (m[r.form_type] || 0) + 1
    return m
  }, [regs])

  const exportForm = (ft: FormType) => {
    const rows = (regs ?? []).filter((r) => r.form_type === ft)
    if (!rows.length) return
    const lines = [EXPORT_HEADERS.join(',')]
    for (const r of rows) {
      lines.push(EXPORT_HEADERS.map((h) => csvEscape((r as Record<string, unknown>)[h])).join(','))
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `registrations-${ft}-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const loading = cases === null || regs === null

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight">Forms</h1>
          <p className="text-[#888888] text-[13px] mt-1">
            The registration forms available across the site, which cases use each one, and the
            submissions captured. Assign a form to a case from the case editor.
          </p>
        </div>
        <Link
          to="/admin/registrations"
          className="inline-flex items-center gap-2 bg-white border border-[#1C3A64]/20 hover:bg-[#1C3A64]/[0.06] text-[#1C3A64] text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <Inbox size={14} />
          All registrations
        </Link>
      </div>

      {error && (
        <div className="mb-6 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#1C3A64]" size={24} />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {FORM_TYPES.map((ft) => {
            const meta = FORM_TYPE_META[ft]
            const usedBy = casesByForm[ft] ?? []
            const count = regCountByForm[ft] ?? 0
            return (
              <div key={ft} className="bg-white border border-[#1C3A64]/10 rounded-2xl p-6 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <ClipboardList size={16} className="text-[#1C3A64]" />
                    <h2 className="text-[#1C3A64] text-[15px] font-medium">{meta.label}</h2>
                  </div>
                  <span className="text-[11px] text-[#6D8FB5] bg-[#1C3A64]/[0.05] px-2 py-0.5 rounded font-mono">
                    {ft}
                  </span>
                </div>
                <p className="text-[#555555] text-[13px] leading-[1.6] mb-4">{meta.description}</p>

                <div className="mb-4">
                  <div className="text-[11px] tracking-[0.12em] uppercase text-[#888888] font-medium mb-1.5">
                    Used by ({usedBy.length})
                  </div>
                  {usedBy.length === 0 ? (
                    <p className="text-[#888888] text-[12px] italic">Not assigned to any case yet.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {usedBy.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/class-actions/${c.slug}/register`}
                          className="inline-flex items-center gap-1 text-[12px] text-[#1C3A64] bg-[#1C3A64]/[0.05] hover:bg-[#1C3A64]/[0.1] px-2 py-1 rounded transition-colors"
                        >
                          {c.title}
                          <ArrowUpRight size={10} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1C3A64]/10">
                  <span className="text-[13px] text-[#555555]">
                    <span className="text-[#1C3A64] font-medium tabular-nums">{count}</span> submission
                    {count === 1 ? '' : 's'}
                  </span>
                  <button
                    onClick={() => exportForm(ft)}
                    disabled={count === 0}
                    className="inline-flex items-center gap-2 text-[12px] font-medium text-[#1C3A64] border border-[#1C3A64]/20 hover:bg-[#1C3A64]/[0.06] px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Download size={13} />
                    Export CSV
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
