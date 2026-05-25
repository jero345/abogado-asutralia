import { useEffect, useState, type KeyboardEvent } from 'react'
import { Loader2, Plus, Trash2, ListChecks, GripVertical } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface PastRow {
  id: string
  name: string
  order_index: number
}

export function PastActionsAdmin() {
  const [rows, setRows] = useState<PastRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = async () => {
    if (!supabase) return
    const { data, error: err } = await supabase
      .from('past_actions')
      .select('*')
      .order('order_index', { ascending: true })
    if (err) {
      setError(err.message)
      return
    }
    setRows((data as PastRow[]) ?? [])
  }

  useEffect(() => { load() }, [])

  const add = async () => {
    const name = draft.trim()
    if (!name || !supabase) return
    setBusyId('new')
    setError(null)
    const nextOrder = rows && rows.length ? Math.max(...rows.map((r) => r.order_index)) + 1 : 0
    const { error: err } = await supabase
      .from('past_actions')
      .insert({ name, order_index: nextOrder })
    setBusyId(null)
    if (err) {
      setError(err.message)
      return
    }
    setDraft('')
    load()
  }

  const remove = async (row: PastRow) => {
    if (!supabase) return
    setBusyId(row.id)
    const { error: err } = await supabase.from('past_actions').delete().eq('id', row.id)
    setBusyId(null)
    if (err) {
      setError(err.message)
      return
    }
    load()
  }

  const updateOrder = async (row: PastRow, value: number) => {
    if (!supabase) return
    setBusyId(row.id)
    const { error: err } = await supabase
      .from('past_actions')
      .update({ order_index: value })
      .eq('id', row.id)
    setBusyId(null)
    if (err) {
      setError(err.message)
      return
    }
    load()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      add()
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight inline-flex items-center gap-2 mb-2">
        <ListChecks size={22} /> Past actions
      </h1>
      <p className="text-[#888888] text-[13px] mb-8">
        The list of past matters shown as chips under "Past Class Actions and Schemes" on /class-actions.
        Add a new name per row.
      </p>

      {error && (
        <div className="mb-4 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-5 md:p-6 mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Name of the matter (e.g. Bell Group)"
            className="flex-1 px-3.5 py-2.5 border border-[#1C3A64]/15 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1C3A64]/30 focus:border-[#1C3A64]/40 bg-white"
          />
          <button
            onClick={add}
            disabled={!draft.trim() || busyId === 'new'}
            className="inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] disabled:opacity-50 text-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            {busyId === 'new' ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            Add
          </button>
        </div>
      </div>

      {rows === null ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#1C3A64]" size={20} />
        </div>
      ) : rows.length === 0 ? (
        <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-10 text-center">
          <p className="text-[#555555] text-[13px]">No past actions yet. Add one above.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#1C3A64]/10 rounded-2xl overflow-hidden">
          <ul className="divide-y divide-[#1C3A64]/10">
            {rows.map((r) => (
              <li key={r.id} className="px-5 py-3 flex items-center gap-3">
                <GripVertical size={14} className="text-[#1C3A64]/30 flex-shrink-0" />
                <span className="flex-1 text-[#1C3A64] text-[14px]">{r.name}</span>
                <label className="text-[11px] text-[#888888] flex items-center gap-1.5">
                  Order
                  <input
                    type="number"
                    value={r.order_index}
                    onChange={(e) => updateOrder(r, Number(e.target.value) || 0)}
                    className="w-16 px-2 py-1 border border-[#1C3A64]/15 rounded text-[12px]"
                    disabled={busyId === r.id}
                  />
                </label>
                <button
                  onClick={() => remove(r)}
                  disabled={busyId === r.id}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
