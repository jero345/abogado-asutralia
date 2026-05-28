import { useEffect, useMemo, useState } from 'react'
import {
  Loader2,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  FileText,
  Archive,
  CheckCircle2,
  Inbox,
  X,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getDocumentSignedUrl } from '@/lib/registrations'

type FormType = 'shareholder' | 'investment-detailed' | 'investment-interest' | 'vehicle'
type Status = 'new' | 'contacted' | 'archived'

interface Doc {
  name: string
  url: string
  size: number
  contentType: string
}

interface Row {
  id: string
  created_at: string
  case_slug: string
  case_title: string
  form_type: FormType
  first_name: string
  last_name: string
  email: string
  phone: string
  address_line1: string | null
  address_line2: string | null
  city: string | null
  state: string | null
  postal: string | null
  country: string | null
  payload: Record<string, unknown>
  documents: Doc[]
  signature_data: string | null
  retainer: string | null
  status: Status
  notes: string | null
  email_sent_at: string | null
}

const FORM_LABELS: Record<FormType, string> = {
  shareholder: 'Shareholder',
  'investment-detailed': 'Investment (detailed)',
  'investment-interest': 'Investment (interest)',
  vehicle: 'Vehicle',
}

const STATUS_STYLES: Record<Status, string> = {
  new: 'bg-amber-50 text-amber-700 border-amber-200',
  contacted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  archived: 'bg-slate-100 text-slate-600 border-slate-200',
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function csvEscape(v: unknown): string {
  if (v == null) return ''
  const s = typeof v === 'string' ? v : JSON.stringify(v)
  if (/["\n,]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export function RegistrationsAdmin() {
  const [rows, setRows] = useState<Row[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filterCase, setFilterCase] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all')
  const [selected, setSelected] = useState<Row | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = async () => {
    if (!supabase) return
    const { data, error: err } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })
    if (err) {
      setError(err.message)
      return
    }
    setRows((data as Row[]) ?? [])
  }

  useEffect(() => {
    load()
  }, [])

  const cases = useMemo(() => {
    if (!rows) return []
    const map = new Map<string, string>()
    for (const r of rows) map.set(r.case_slug, r.case_title)
    return [...map.entries()].sort(([, a], [, b]) => a.localeCompare(b))
  }, [rows])

  const filtered = useMemo(() => {
    if (!rows) return []
    const q = search.trim().toLowerCase()
    return rows.filter((r) => {
      if (filterCase !== 'all' && r.case_slug !== filterCase) return false
      if (filterStatus !== 'all' && r.status !== filterStatus) return false
      if (q) {
        const blob = [
          r.first_name,
          r.last_name,
          r.email,
          r.phone,
          r.case_title,
        ]
          .join(' ')
          .toLowerCase()
        if (!blob.includes(q)) return false
      }
      return true
    })
  }, [rows, search, filterCase, filterStatus])

  const counts = useMemo(() => {
    if (!rows) return { total: 0, new: 0, contacted: 0, archived: 0 }
    return {
      total: rows.length,
      new: rows.filter((r) => r.status === 'new').length,
      contacted: rows.filter((r) => r.status === 'contacted').length,
      archived: rows.filter((r) => r.status === 'archived').length,
    }
  }, [rows])

  const updateStatus = async (row: Row, status: Status) => {
    if (!supabase) return
    setBusyId(row.id)
    const { error: err } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', row.id)
    setBusyId(null)
    if (err) {
      setError(err.message)
      return
    }
    setRows((prev) =>
      prev ? prev.map((r) => (r.id === row.id ? { ...r, status } : r)) : prev,
    )
    if (selected?.id === row.id) setSelected({ ...row, status })
  }

  const saveNotes = async (row: Row, notes: string) => {
    if (!supabase) return
    const { error: err } = await supabase
      .from('registrations')
      .update({ notes })
      .eq('id', row.id)
    if (err) {
      setError(err.message)
      return
    }
    setRows((prev) =>
      prev ? prev.map((r) => (r.id === row.id ? { ...r, notes } : r)) : prev,
    )
  }

  const exportCsv = () => {
    if (!filtered.length) return
    const headers = [
      'created_at',
      'case_slug',
      'case_title',
      'form_type',
      'status',
      'first_name',
      'last_name',
      'email',
      'phone',
      'address_line1',
      'address_line2',
      'city',
      'state',
      'postal',
      'country',
      'retainer',
      'payload',
      'documents',
      'notes',
    ]
    const lines = [headers.join(',')]
    for (const r of filtered) {
      lines.push(
        headers
          .map((h) => csvEscape((r as unknown as Record<string, unknown>)[h]))
          .join(','),
      )
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `registrations-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight">Registrations</h1>
          <p className="text-[#888888] text-[13px] mt-1">
            Submissions from the public class-action registration forms.
          </p>
        </div>
        <button
          onClick={exportCsv}
          disabled={!filtered.length}
          className="inline-flex items-center gap-2 bg-white border border-[#1C3A64]/20 hover:bg-[#1C3A64]/[0.06] text-[#1C3A64] text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
        >
          <Download size={14} />
          Export CSV ({filtered.length})
        </button>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="All" value={counts.total} active={filterStatus === 'all'} icon={<Inbox size={14} />} onClick={() => setFilterStatus('all')} />
        <StatCard label="New" value={counts.new} active={filterStatus === 'new'} icon={<Mail size={14} />} onClick={() => setFilterStatus('new')} accent="amber" />
        <StatCard label="Contacted" value={counts.contacted} active={filterStatus === 'contacted'} icon={<CheckCircle2 size={14} />} onClick={() => setFilterStatus('contacted')} accent="emerald" />
        <StatCard label="Archived" value={counts.archived} active={filterStatus === 'archived'} icon={<Archive size={14} />} onClick={() => setFilterStatus('archived')} accent="slate" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone…"
            className="w-full pl-9 pr-4 py-2.5 border border-[#1C3A64]/15 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#1C3A64]/30 bg-white"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <select
            value={filterCase}
            onChange={(e) => setFilterCase(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-[#1C3A64]/15 rounded-lg text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3A64]/30"
          >
            <option value="all">All cases ({cases.length})</option>
            {cases.map(([slug, title]) => (
              <option key={slug} value={slug}>{title}</option>
            ))}
          </select>
        </div>
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
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-12 text-center">
          <Inbox size={32} className="mx-auto text-[#1C3A64]/30 mb-3" />
          <p className="text-[#555555] text-[14px]">
            {rows.length === 0
              ? 'No registrations yet. Submissions from the public forms will appear here.'
              : 'No registrations match the current filters.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#1C3A64]/10 rounded-2xl overflow-hidden">
          <ul className="divide-y divide-[#1C3A64]/10">
            {filtered.map((r) => (
              <li
                key={r.id}
                className="px-5 py-4 flex items-center gap-4 hover:bg-[#1C3A64]/[0.02] cursor-pointer"
                onClick={() => setSelected(r)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#1C3A64] text-[14px] font-medium">
                      {r.first_name} {r.last_name}
                    </span>
                    <span className={`text-[10px] tracking-[0.12em] uppercase font-medium border px-2 py-0.5 rounded ${STATUS_STYLES[r.status]}`}>
                      {r.status}
                    </span>
                    <span className="text-[11px] text-[#6D8FB5] bg-[#1C3A64]/[0.05] px-2 py-0.5 rounded">
                      {FORM_LABELS[r.form_type]}
                    </span>
                    {r.documents?.length > 0 && (
                      <span className="text-[11px] text-[#1C3A64] inline-flex items-center gap-1">
                        <FileText size={11} />
                        {r.documents.length}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[12px] text-[#888888] flex-wrap">
                    <span className="text-[#1C3A64]">{r.case_title}</span>
                    <span className="inline-flex items-center gap-1">
                      <Mail size={11} />
                      {r.email}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Phone size={11} />
                      {r.phone}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={11} />
                      {fmtDate(r.created_at)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selected && (
        <DetailDrawer
          row={selected}
          onClose={() => setSelected(null)}
          onStatusChange={(s) => updateStatus(selected, s)}
          onNotesChange={(n) => saveNotes(selected, n)}
          busy={busyId === selected.id}
        />
      )}
    </div>
  )
}

function StatCard({
  label,
  value,
  active,
  icon,
  onClick,
  accent,
}: {
  label: string
  value: number
  active: boolean
  icon: React.ReactNode
  onClick: () => void
  accent?: 'amber' | 'emerald' | 'slate'
}) {
  const ring = active
    ? 'border-[#1C3A64] bg-[#1C3A64]/[0.04]'
    : 'border-[#1C3A64]/12 bg-white hover:border-[#1C3A64]/30'
  const accentText =
    accent === 'amber' ? 'text-amber-700' :
    accent === 'emerald' ? 'text-emerald-700' :
    accent === 'slate' ? 'text-slate-500' :
    'text-[#1C3A64]'
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-3 rounded-xl border transition-colors ${ring}`}
    >
      <div className={`flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase ${accentText}`}>
        {icon}
        {label}
      </div>
      <div className="text-[#1C3A64] text-[22px] font-medium mt-1 tabular-nums">{value}</div>
    </button>
  )
}

function DetailDrawer({
  row,
  onClose,
  onStatusChange,
  onNotesChange,
  busy,
}: {
  row: Row
  onClose: () => void
  onStatusChange: (s: Status) => void
  onNotesChange: (n: string) => void
  busy: boolean
}) {
  const [notes, setNotes] = useState(row.notes ?? '')
  const [savingNotes, setSavingNotes] = useState(false)

  useEffect(() => {
    setNotes(row.notes ?? '')
  }, [row.id, row.notes])

  const saveNotes = async () => {
    setSavingNotes(true)
    await onNotesChange(notes)
    setSavingNotes(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <aside className="relative ml-auto w-full max-w-xl h-full bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C3A64]/10">
          <div>
            <h2 className="text-[#1C3A64] text-[18px] font-medium">
              {row.first_name} {row.last_name}
            </h2>
            <p className="text-[#888888] text-[12px] mt-0.5">
              {row.case_title} · {FORM_LABELS[row.form_type]} · {fmtDate(row.created_at)}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#1C3A64]/[0.06] rounded-lg">
            <X size={16} className="text-[#1C3A64]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Status switcher */}
          <div>
            <Label>Status</Label>
            <div className="flex gap-2">
              {(['new', 'contacted', 'archived'] as Status[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(s)}
                  disabled={busy || row.status === s}
                  className={`text-[12px] px-3 py-1.5 rounded-full border font-medium uppercase tracking-wide ${
                    row.status === s
                      ? STATUS_STYLES[s]
                      : 'bg-white border-[#1C3A64]/15 text-[#1C3A64] hover:bg-[#1C3A64]/[0.06]'
                  } disabled:opacity-70`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <Section title="Contact">
            <FieldRow label="Email" value={<a href={`mailto:${row.email}`} className="text-[#1C3A64] hover:underline">{row.email}</a>} />
            <FieldRow label="Phone" value={<a href={`tel:${row.phone}`} className="text-[#1C3A64] hover:underline">{row.phone}</a>} />
            <FieldRow
              label="Address"
              value={
                [row.address_line1, row.address_line2, row.city, row.state, row.postal, row.country]
                  .filter(Boolean)
                  .join(', ') || '—'
              }
            />
          </Section>

          {/* Payload */}
          <Section title="Form data">
            {Object.entries(row.payload ?? {}).length === 0 ? (
              <p className="text-[#888888] text-[12px] italic">No extra fields.</p>
            ) : (
              <dl className="space-y-2">
                {Object.entries(row.payload ?? {}).map(([k, v]) => (
                  <FieldRow key={k} label={prettify(k)} value={renderValue(v)} />
                ))}
              </dl>
            )}
            {row.retainer && (
              <FieldRow label="Retainer requested" value={row.retainer === 'yes' ? 'Yes' : 'No'} />
            )}
          </Section>

          {/* Documents */}
          {row.documents?.length > 0 && (
            <Section title={`Supporting documents (${row.documents.length})`}>
              <ul className="space-y-2">
                {row.documents.map((d, i) => (
                  <DocLink key={i} doc={d} />
                ))}
              </ul>
            </Section>
          )}

          {/* Signature */}
          {row.signature_data && (
            <Section title="Signature">
              <div className="border border-[#1C3A64]/15 rounded-lg p-3 bg-white">
                <img src={row.signature_data} alt="Signature" className="max-h-32 mx-auto" />
              </div>
            </Section>
          )}

          {/* Notes */}
          <Section title="Internal notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={saveNotes}
              rows={4}
              placeholder="Internal notes about this registration (saved automatically on blur)."
              className="w-full px-3 py-2 border border-[#1C3A64]/15 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#1C3A64]/30 bg-white resize-none"
            />
            {savingNotes && <p className="text-[#888888] text-[11px] mt-1">Saving…</p>}
          </Section>
        </div>
      </aside>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[0.12em] uppercase text-[#888888] font-medium mb-1.5">{children}</div>
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[12px] tracking-[0.12em] uppercase text-[#1C3A64] font-medium mb-2 border-b border-[#1C3A64]/10 pb-1.5">
        {title}
      </h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function FieldRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 text-[13px]">
      <span className="text-[#888888]">{label}</span>
      <span className="text-[#1C3A64] break-words">{value || '—'}</span>
    </div>
  )
}

function DocLink({ doc }: { doc: Doc }) {
  const [signed, setSigned] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const open = async () => {
    setLoading(true)
    const url = await getDocumentSignedUrl(doc.url, 300)
    setLoading(false)
    if (url) {
      setSigned(url)
      window.open(url, '_blank', 'noopener')
    }
  }

  return (
    <li className="flex items-center gap-2 bg-white border border-[#1C3A64]/15 rounded-lg px-3 py-2">
      <FileText size={13} className="text-[#1C3A64]/70 flex-shrink-0" />
      <span className="text-[#1C3A64] text-[12px] truncate flex-1">{doc.name}</span>
      <span className="text-[#888888] text-[11px] tabular-nums flex-shrink-0">
        {(doc.size / 1024 / 1024).toFixed(2)} MB
      </span>
      <button
        onClick={open}
        disabled={loading}
        className="text-[#1C3A64] text-[11px] font-medium hover:underline disabled:opacity-60"
      >
        {loading ? '…' : signed ? 'Open' : 'Download'}
      </button>
    </li>
  )
}

function prettify(s: string): string {
  return s
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .replace(/_/g, ' ')
    .trim()
}

function renderValue(v: unknown): React.ReactNode {
  if (v == null || v === '') return '—'
  if (typeof v === 'string') return v
  if (typeof v === 'number' || typeof v === 'boolean') return String(v)
  if (Array.isArray(v)) return v.join(', ')
  return JSON.stringify(v)
}
