import { useEffect, useState } from 'react'
import { Loader2, Plus, Trash2, Save, Search, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface InvRow {
  id: string
  title: string
  summary: string
  body: string
  link_label: string | null
  link_href: string | null
  order_index: number
  published: boolean
}

const EMPTY: Omit<InvRow, 'id'> = {
  title: '',
  summary: '',
  body: '',
  link_label: '',
  link_href: '',
  order_index: 0,
  published: true,
}

export function InvestigationsAdmin() {
  const [rows, setRows] = useState<InvRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [draft, setDraft] = useState({ ...EMPTY })
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = async () => {
    if (!supabase) return
    const { data, error: err } = await supabase
      .from('investigations')
      .select('*')
      .order('order_index', { ascending: true })
    if (err) {
      setError(err.message)
      return
    }
    setRows((data as InvRow[]) ?? [])
  }

  useEffect(() => { load() }, [])

  const create = async () => {
    if (!supabase) return
    if (!draft.title.trim()) {
      setError('Title is required.')
      return
    }
    setBusyId('new')
    setError(null)
    const { error: err } = await supabase.from('investigations').insert({
      title: draft.title.trim(),
      summary: draft.summary.trim(),
      body: draft.body.trim(),
      link_label: draft.link_label || null,
      link_href: draft.link_href || null,
      order_index: draft.order_index,
      published: draft.published,
    })
    setBusyId(null)
    if (err) {
      setError(err.message)
      return
    }
    setDraft({ ...EMPTY })
    setCreating(false)
    load()
  }

  const save = async (row: InvRow) => {
    if (!supabase) return
    setBusyId(row.id)
    const { error: err } = await supabase
      .from('investigations')
      .update({
        title: row.title.trim(),
        summary: row.summary.trim(),
        body: row.body.trim(),
        link_label: row.link_label || null,
        link_href: row.link_href || null,
        order_index: row.order_index,
        published: row.published,
      })
      .eq('id', row.id)
    setBusyId(null)
    if (err) {
      setError(err.message)
      return
    }
    load()
  }

  const remove = async (row: InvRow) => {
    if (!supabase) return
    if (!window.confirm(`Delete "${row.title}"?`)) return
    setBusyId(row.id)
    const { error: err } = await supabase.from('investigations').delete().eq('id', row.id)
    setBusyId(null)
    if (err) {
      setError(err.message)
      return
    }
    load()
  }

  const updateRow = (id: string, patch: Partial<InvRow>) => {
    setRows((rs) => (rs ? rs.map((r) => (r.id === id ? { ...r, ...patch } : r)) : rs))
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight inline-flex items-center gap-2">
            <Search size={22} /> Current investigations
          </h1>
          <p className="text-[#888888] text-[13px] mt-1">
            Shown in the "Current Investigations" block on the Class Actions page.
          </p>
        </div>
        {!creating && (
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] text-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus size={14} /> New investigation
          </button>
        )}
      </div>

      {error && (
        <div className="my-4 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {creating && (
        <Card>
          <Form
            row={{ ...draft, id: 'new' } as InvRow}
            onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))}
          />
          <Actions>
            <Btn variant="ghost" onClick={() => { setCreating(false); setDraft({ ...EMPTY }) }}>
              Cancel
            </Btn>
            <Btn variant="primary" onClick={create} disabled={busyId === 'new'}>
              {busyId === 'new' ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
              Create
            </Btn>
          </Actions>
        </Card>
      )}

      {rows === null ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#1C3A64]" size={24} />
        </div>
      ) : rows.length === 0 && !creating ? (
        <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-12 text-center mt-6">
          <p className="text-[#555555] text-[14px]">No investigations yet.</p>
        </div>
      ) : (
        <div className="space-y-4 mt-6">
          {rows!.map((r) => (
            <Card key={r.id}>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded ${
                    r.published ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                  }`}
                >
                  {r.published ? 'Published' : 'Hidden'}
                </span>
                <span className="text-[11px] text-[#888888]">Order: {r.order_index}</span>
              </div>
              <Form row={r} onChange={(patch) => updateRow(r.id, patch)} />
              <Actions>
                <Btn
                  variant="ghost"
                  onClick={() => updateRow(r.id, { published: !r.published })}
                >
                  {r.published ? <EyeOff size={13} /> : <Eye size={13} />}
                  {r.published ? 'Mark hidden' : 'Mark published'}
                </Btn>
                <Btn variant="ghost" onClick={() => remove(r)}>
                  <Trash2 size={13} /> Delete
                </Btn>
                <Btn variant="primary" onClick={() => save(r)} disabled={busyId === r.id}>
                  {busyId === r.id ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                  Save
                </Btn>
              </Actions>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-5 md:p-6">{children}</div>
}

function Actions({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-[#1C3A64]/10">
      {children}
    </div>
  )
}

const inputCls =
  'w-full px-3.5 py-2.5 border border-[#1C3A64]/15 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1C3A64]/30 focus:border-[#1C3A64]/40 bg-white'

function Form({
  row,
  onChange,
}: {
  row: InvRow
  onChange: (patch: Partial<InvRow>) => void
}) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Title (required)"
        value={row.title}
        onChange={(e) => onChange({ title: e.target.value })}
        className={inputCls + ' font-medium'}
      />
      <textarea
        rows={2}
        placeholder="Summary (one short sentence)"
        value={row.summary}
        onChange={(e) => onChange({ summary: e.target.value })}
        className={inputCls}
      />
      <textarea
        rows={4}
        placeholder="Body — a paragraph or two describing the investigation"
        value={row.body}
        onChange={(e) => onChange({ body: e.target.value })}
        className={inputCls}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Link label (e.g. 'Read more')"
          value={row.link_label ?? ''}
          onChange={(e) => onChange({ link_label: e.target.value })}
          className={inputCls}
        />
        <input
          type="url"
          placeholder="https://…"
          value={row.link_href ?? ''}
          onChange={(e) => onChange({ link_href: e.target.value })}
          className={inputCls}
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-[12px] text-[#1C3A64] flex items-center gap-2">
          Order
          <input
            type="number"
            value={row.order_index}
            onChange={(e) => onChange({ order_index: Number(e.target.value) || 0 })}
            className="w-20 px-2 py-1 border border-[#1C3A64]/15 rounded text-[13px]"
          />
        </label>
      </div>
    </div>
  )
}

function Btn({
  variant,
  onClick,
  disabled,
  children,
}: {
  variant: 'primary' | 'ghost'
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  const base =
    'inline-flex items-center gap-1.5 text-[12.5px] font-medium px-3 py-2 rounded-lg transition-colors disabled:opacity-60'
  const cls =
    variant === 'primary'
      ? 'bg-[#1C3A64] hover:bg-[#2A4E72] text-white'
      : 'text-[#1C3A64] hover:bg-[#1C3A64]/[0.06]'
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`${base} ${cls}`}>
      {children}
    </button>
  )
}
