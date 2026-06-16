import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2, ArrowLeft, Plus, Trash2, Send, GripVertical } from 'lucide-react'
import {
  fetchForm,
  saveForm,
  fieldKey,
  FIELD_TYPE_LABELS,
  OPTION_FIELD_TYPES,
  type CustomField,
  type CustomFieldType,
} from '@/lib/forms'

const TYPES = Object.keys(FIELD_TYPE_LABELS) as CustomFieldType[]

const inputCls =
  'w-full px-3.5 py-2.5 border border-[#1C3A64]/15 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1C3A64]/30 focus:border-[#1C3A64]/40 bg-white'

export function FormEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [notifyEmail, setNotifyEmail] = useState('')
  const [fields, setFields] = useState<CustomField[]>([])
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isEdit || !id) return
    let cancelled = false
    fetchForm(id).then((d) => {
      if (cancelled) return
      if (!d) {
        setError('Form not found.')
      } else {
        setName(d.name)
        setDescription(d.description)
        setNotifyEmail(d.notify_email ?? '')
        setFields(d.fields ?? [])
      }
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [id, isEdit])

  const addField = () =>
    setFields((f) => [...f, { name: '', label: '', type: 'text', required: false }])
  const updateField = (i: number, patch: Partial<CustomField>) =>
    setFields((f) => f.map((x, j) => (j === i ? { ...x, ...patch } : x)))
  const removeField = (i: number) => setFields((f) => f.filter((_, j) => j !== i))
  const moveField = (i: number, dir: -1 | 1) =>
    setFields((f) => {
      const j = i + dir
      if (j < 0 || j >= f.length) return f
      const next = [...f]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim()) {
      setError('Give the form a name.')
      return
    }
    // Derive stable keys from labels (deduped).
    const seen = new Set<string>()
    const cleanedFields = fields
      .filter((f) => f.label.trim())
      .map((f, i) => {
        let key = fieldKey(f.label, `field_${i + 1}`)
        while (seen.has(key)) key = `${key}_${i + 1}`
        seen.add(key)
        const out: CustomField = { name: key, label: f.label.trim(), type: f.type, required: f.required }
        if (OPTION_FIELD_TYPES.includes(f.type)) out.options = (f.options ?? []).filter(Boolean)
        return out
      })
    setSaving(true)
    const res = await saveForm({
      id,
      name,
      description,
      notify_email: notifyEmail,
      fields: cleanedFields,
    })
    setSaving(false)
    if (res.error) {
      setError(res.error)
      return
    }
    navigate('/admin/forms')
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
        onClick={() => navigate('/admin/forms')}
        className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] hover:underline mb-6"
      >
        <ArrowLeft size={13} />
        Back to forms
      </button>

      <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight mb-2">
        {isEdit ? 'Edit manual form' : 'New manual form'}
      </h1>
      <p className="text-[#888888] text-[13px] mb-8">
        Build a manual form for basic capture, then assign it to a case from the case editor. First
        Name, Last Name, Email and Phone are always collected — add any extra fields below. For
        complex / legal forms (uploads, declarations, conditional logic) use Embedded Formstack
        instead.
      </p>

      {error && (
        <div className="mb-6 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-[#1C3A64] mb-1.5">
              Form name <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
              placeholder="e.g. Acme Investors — register interest"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#1C3A64] mb-1.5">
              Intro text
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className={inputCls}
              placeholder="Shown above the form on the public page (optional)."
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#1C3A64] mb-1.5">
              Notification email
            </label>
            <input
              type="email"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              className={inputCls + ' max-w-[360px]'}
              placeholder="enquiries@bantongroup.com"
            />
          </div>
        </div>

        <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#1C3A64] text-[15px] font-medium">Custom fields</h2>
            <span className="text-[#888888] text-[12px]">
              Contact fields (name, email, phone) are added automatically.
            </span>
          </div>

          <div className="space-y-3">
            {fields.length === 0 && (
              <p className="text-[#888888] text-[12px] italic">
                No extra fields yet. Add one below.
              </p>
            )}
            {fields.map((f, i) => (
              <div key={i} className="border border-[#1C3A64]/12 rounded-xl p-3 bg-[#FAFBFD]">
                <div className="flex items-start gap-2">
                  <div className="flex flex-col pt-2">
                    <button
                      type="button"
                      onClick={() => moveField(i, -1)}
                      className="text-[#888888] hover:text-[#1C3A64] disabled:opacity-30"
                      disabled={i === 0}
                      title="Move up"
                    >
                      <GripVertical size={13} />
                    </button>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_150px_auto] gap-2 items-center">
                    <input
                      value={f.label}
                      onChange={(e) => updateField(i, { label: e.target.value })}
                      className={inputCls}
                      placeholder="Field label (e.g. Number of shares)"
                    />
                    <select
                      value={f.type}
                      onChange={(e) => updateField(i, { type: e.target.value as CustomFieldType })}
                      className={inputCls}
                    >
                      {TYPES.map((t) => (
                        <option key={t} value={t}>
                          {FIELD_TYPE_LABELS[t]}
                        </option>
                      ))}
                    </select>
                    <label className="inline-flex items-center gap-2 text-[12px] text-[#1C3A64] whitespace-nowrap px-1">
                      <input
                        type="checkbox"
                        checked={f.required}
                        onChange={(e) => updateField(i, { required: e.target.checked })}
                        className="accent-[#1C3A64]"
                      />
                      Required
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(i)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg mt-0.5"
                    title="Remove field"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                {OPTION_FIELD_TYPES.includes(f.type) && (
                  <input
                    value={(f.options ?? []).join(', ')}
                    onChange={(e) =>
                      updateField(i, { options: e.target.value.split(',').map((s) => s.trim()) })
                    }
                    className={inputCls + ' mt-2'}
                    placeholder="Options, comma-separated (e.g. Yes, No, Maybe)"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addField}
            className="mt-4 inline-flex items-center gap-2 text-[12px] font-medium text-[#1C3A64] border border-[#1C3A64]/20 hover:bg-[#1C3A64]/[0.06] px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={13} /> Add field
          </button>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/admin/forms')}
            className="px-4 py-2.5 text-[#1C3A64] text-[13px] font-medium hover:bg-[#1C3A64]/[0.06] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] text-white text-[13px] font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            {isEdit ? 'Save changes' : 'Create form'}
          </button>
        </div>
      </form>
    </div>
  )
}
