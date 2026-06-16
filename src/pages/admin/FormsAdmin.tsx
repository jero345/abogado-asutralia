import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Download, Inbox, ClipboardList, ArrowUpRight, Plus, Pencil, Trash2, Wand2, Copy, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { FORM_TYPES, FORM_TYPE_META, getFormConfig, type FormType } from '@/data/registrationForms'
import { fetchForms, deleteForm, saveForm, builtinFormTemplate, type CustomFormDef } from '@/lib/forms'

const FORMSTACK_CREATE_URL = 'https://www.formstack.com/admin/forms'

// Accent colour per form type so the cards are easy to tell apart at a glance.
type Accent = { border: string; chip: string; icon: string; btn: string }
const FORM_COLOR: Record<string, Accent> = {
  shareholder:           { border: 'border-l-sky-400',     chip: 'bg-sky-50 text-sky-700',         icon: 'text-sky-600',     btn: 'bg-sky-50 text-sky-700 hover:bg-sky-100 border-sky-200' },
  'investment-detailed': { border: 'border-l-violet-400',  chip: 'bg-violet-50 text-violet-700',   icon: 'text-violet-600',  btn: 'bg-violet-50 text-violet-700 hover:bg-violet-100 border-violet-200' },
  'investment-interest': { border: 'border-l-teal-400',    chip: 'bg-teal-50 text-teal-700',       icon: 'text-teal-600',    btn: 'bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200' },
  'claim-detailed':      { border: 'border-l-amber-400',   chip: 'bg-amber-50 text-amber-700',     icon: 'text-amber-600',   btn: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200' },
  'mini-interest':       { border: 'border-l-emerald-400', chip: 'bg-emerald-50 text-emerald-700', icon: 'text-emerald-600', btn: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200' },
  formstack:             { border: 'border-l-rose-400',    chip: 'bg-rose-50 text-rose-700',       icon: 'text-rose-600',    btn: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200' },
  vehicle:               { border: 'border-l-indigo-400',  chip: 'bg-indigo-50 text-indigo-700',   icon: 'text-indigo-600',  btn: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200' },
}
const MANUAL_ACCENT: Accent = { border: 'border-l-fuchsia-400', chip: 'bg-fuchsia-50 text-fuchsia-700', icon: 'text-fuchsia-600', btn: '' }
const FALLBACK_ACCENT: Accent = { border: 'border-l-[#1C3A64]/30', chip: 'bg-[#1C3A64]/[0.05] text-[#6D8FB5]', icon: 'text-[#1C3A64]', btn: 'bg-[#1C3A64]/[0.06] text-[#1C3A64] hover:bg-[#1C3A64]/[0.12] border-[#1C3A64]/20' }

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
  const [customForms, setCustomForms] = useState<CustomFormDef[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    if (!supabase) return
    Promise.all([
      supabase.from('cases').select('*').order('order_index', { ascending: true }),
      supabase.from('registrations').select('*').order('created_at', { ascending: false }),
      fetchForms(),
    ]).then(([c, r, forms]) => {
      if (c.error) setError(c.error.message)
      setCases((c.data as CaseRow[]) ?? [])
      setRegs((r.data as RegRow[]) ?? [])
      setCustomForms(forms)
    })
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  const removeForm = async (f: CustomFormDef) => {
    if (!window.confirm(`Delete the form "${f.name}"? This cannot be undone.`)) return
    const { error: err } = await deleteForm(f.id)
    if (err) {
      setError(err)
      return
    }
    setCustomForms((prev) => (prev ? prev.filter((x) => x.id !== f.id) : prev))
  }

  // Built-in forms are code, so "edit" makes an editable manual COPY and opens it.
  const duplicateBuiltin = async (ft: FormType) => {
    const tpl = builtinFormTemplate(ft)
    if (!tpl) return
    const { id, error: err } = await saveForm({ ...tpl, notify_email: null })
    if (err || !id) {
      setError(err ?? 'Could not create the editable copy.')
      return
    }
    navigate(`/admin/forms/edit/${id}`)
  }

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

  const exportForm = (ft: string) => {
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

  const loading = cases === null || regs === null || customForms === null

  // Cases assigned to each custom form (cases.form_type === 'custom:<id>').
  const casesByCustomForm = useMemo(() => {
    const map: Record<string, { slug: string; title: string }[]> = {}
    for (const c of cases ?? []) {
      const ft = c.form_type ?? ''
      if (ft.startsWith('custom:')) {
        const id = ft.slice('custom:'.length)
        ;(map[id] ??= []).push({ slug: c.slug, title: c.title })
      }
    }
    return map
  }, [cases])

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight">Forms</h1>
          <p className="text-[#888888] text-[13px] mt-1 max-w-2xl">
            Two ways to add a registration form to a case:{' '}
            <strong className="text-[#1C3A64]">Manual form</strong> — built here for basic capture
            (name, email, phone, address, a short description); or{' '}
            <strong className="text-[#1C3A64]">Embedded Formstack</strong> — paste a Formstack URL
            for complex / legal forms (conditional logic, uploads, declarations). Assign either to a
            case from the case editor.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/registrations"
            className="inline-flex items-center gap-2 bg-white border border-[#1C3A64]/20 hover:bg-[#1C3A64]/[0.06] text-[#1C3A64] text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Inbox size={14} />
            All registrations
          </Link>
          <Link
            to="/admin/forms/new"
            className="inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] text-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus size={14} />
            New manual form
          </Link>
          <a
            href={FORMSTACK_CREATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-[#1C3A64]/20 hover:bg-[#1C3A64]/[0.06] text-[#1C3A64] text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            Create in Formstack
            <ExternalLink size={14} />
          </a>
        </div>
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
        <>
        <div className="text-[11px] tracking-[0.15em] uppercase text-[#888888] font-medium mb-3">
          System forms (built-in)
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {FORM_TYPES.map((ft) => {
            const meta = FORM_TYPE_META[ft]
            const usedBy = casesByForm[ft] ?? []
            const count = regCountByForm[ft] ?? 0
            const c = FORM_COLOR[ft] ?? FALLBACK_ACCENT
            return (
              <div key={ft} className={`bg-white border border-[#1C3A64]/10 border-l-4 ${c.border} rounded-2xl p-6 flex flex-col`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <ClipboardList size={16} className={c.icon} />
                    <h2 className="text-[#1C3A64] text-[15px] font-medium">{meta.label}</h2>
                  </div>
                  <span className={`text-[11px] ${c.chip} px-2 py-0.5 rounded font-mono`}>
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
                  <div className="flex items-center gap-2">
                    {ft !== 'formstack' && (
                      <button
                        onClick={() => duplicateBuiltin(ft)}
                        title="Create an editable manual copy of this form"
                        className={`inline-flex items-center gap-1.5 text-[12px] font-semibold border px-3 py-1.5 rounded-lg transition-colors ${c.btn}`}
                      >
                        <Copy size={13} />
                        Edit as manual
                      </button>
                    )}
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
              </div>
            )
          })}
        </div>

        <div className="text-[11px] tracking-[0.15em] uppercase text-[#888888] font-medium mt-10 mb-3">
          Manual forms ({customForms?.length ?? 0})
        </div>
        {(customForms?.length ?? 0) === 0 ? (
          <div className="bg-white border border-dashed border-[#1C3A64]/20 rounded-2xl p-8 text-center">
            <Wand2 size={26} className="mx-auto text-[#1C3A64]/30 mb-2" />
            <p className="text-[#555555] text-[13px] mb-3">
              No manual forms yet. Build one and assign it to a case from the case editor.
            </p>
            <Link
              to="/admin/forms/new"
              className="inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={14} /> New manual form
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {customForms!.map((f) => {
              const usedBy = casesByCustomForm[f.id] ?? []
              const count = regCountByForm[`custom:${f.id}`] ?? 0
              return (
                <div key={f.id} className={`bg-white border border-[#1C3A64]/10 border-l-4 ${MANUAL_ACCENT.border} rounded-2xl p-6 flex flex-col`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Wand2 size={16} className={MANUAL_ACCENT.icon} />
                      <h2 className="text-[#1C3A64] text-[15px] font-medium">{f.name}</h2>
                      <span className={`text-[11px] ${MANUAL_ACCENT.chip} px-2 py-0.5 rounded font-mono`}>manual</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link to={`/admin/forms/edit/${f.id}`} className="p-1.5 text-[#1C3A64] hover:bg-[#1C3A64]/[0.08] rounded-lg" title="Edit form">
                        <Pencil size={13} />
                      </Link>
                      <button onClick={() => removeForm(f)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg" title="Delete form">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[#555555] text-[13px] leading-[1.6] mb-4">
                    {f.description || <span className="italic text-[#888888]">No intro text.</span>}
                  </p>
                  <div className="text-[12px] text-[#888888] mb-4">
                    {f.fields.length} custom field{f.fields.length === 1 ? '' : 's'} · contact fields always included
                  </div>

                  <div className="mb-4">
                    <div className="text-[11px] tracking-[0.12em] uppercase text-[#888888] font-medium mb-1.5">
                      Used by ({usedBy.length})
                    </div>
                    {usedBy.length === 0 ? (
                      <p className="text-[#888888] text-[12px] italic">Not assigned to any case yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {usedBy.map((c) => (
                          <Link key={c.slug} to={`/class-actions/${c.slug}/register`} className="inline-flex items-center gap-1 text-[12px] text-[#1C3A64] bg-[#1C3A64]/[0.05] hover:bg-[#1C3A64]/[0.1] px-2 py-1 rounded transition-colors">
                            {c.title}
                            <ArrowUpRight size={10} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1C3A64]/10">
                    <span className="text-[13px] text-[#555555]">
                      <span className="text-[#1C3A64] font-medium tabular-nums">{count}</span> submission{count === 1 ? '' : 's'}
                    </span>
                    <button
                      onClick={() => exportForm(`custom:${f.id}`)}
                      disabled={count === 0}
                      className="inline-flex items-center gap-2 text-[12px] font-medium text-[#1C3A64] border border-[#1C3A64]/20 hover:bg-[#1C3A64]/[0.06] px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Download size={13} /> Export CSV
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        </>
      )}
    </div>
  )
}
