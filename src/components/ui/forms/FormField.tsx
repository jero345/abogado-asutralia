import { AlertCircle } from 'lucide-react'
import type { ExtraField } from '@/data/registrationForms'

export const inputClass =
  'w-full bg-white border border-[#1C3A64]/25 rounded-xl px-5 py-3.5 text-[#1C3A64] text-[15px] placeholder:text-[#888888] focus:outline-none focus:border-[#1C3A64] focus:bg-white focus:ring-2 focus:ring-[#1C3A64]/10 transition-all duration-200'

export function FieldLabel({
  label,
  required,
}: {
  label: string
  required?: boolean
}) {
  return (
    <label className="block text-[#1C3A64] text-[13px] font-medium mb-2 tracking-wide">
      {label}
      {required && <span className="text-[#1C3A64] ml-1">*</span>}
    </label>
  )
}

export function FieldHelper({ text }: { text?: string }) {
  if (!text) return null
  return <p className="text-[#888888] text-[11px] mt-1.5 leading-[1.5]">{text}</p>
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="flex items-center gap-1.5 text-red-600 text-[11px] mt-1.5">
      <AlertCircle size={11} />
      {message}
    </p>
  )
}

export function SectionHeader({
  label,
  hint,
}: {
  label: string
  hint?: string
}) {
  return (
    <div className="col-span-full pt-6 first:pt-0">
      <div className="flex items-center gap-3">
        <div className="h-px w-6 bg-[#1C3A64]/40" />
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#1C3A64]">
          {label}
        </span>
        <div className="h-px flex-1 bg-[#1C3A64]/10" />
      </div>
      {hint && <p className="text-[#888888] text-[12px] mt-2">{hint}</p>}
    </div>
  )
}

/**
 * Renders a single ExtraField (case-specific input).
 * `value` is always string for scalar inputs, comma-joined for checkboxes.
 */
export function ExtraFieldInput({
  field,
  value,
  onChange,
  error,
}: {
  field: ExtraField
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  const fullWidth =
    field.kind === 'textarea' ||
    field.kind === 'radio' ||
    field.kind === 'checkboxes'

  return (
    <div className={fullWidth ? 'col-span-full' : undefined}>
      <FieldLabel label={field.label} required={field.required} />
      {(() => {
        switch (field.kind) {
          case 'text':
            return (
              <input
                type="text"
                className={inputClass}
                value={value}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(e) => onChange(e.target.value)}
              />
            )
          case 'number':
            return (
              <input
                type="number"
                className={inputClass}
                value={value}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(e) => onChange(e.target.value)}
              />
            )
          case 'date':
            return (
              <input
                type="date"
                className={inputClass}
                value={value}
                required={field.required}
                onChange={(e) => onChange(e.target.value)}
              />
            )
          case 'textarea':
            return (
              <textarea
                className={`${inputClass} resize-none`}
                rows={field.rows ?? 4}
                value={value}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(e) => onChange(e.target.value)}
              />
            )
          case 'select':
            return (
              <select
                className={inputClass}
                value={value}
                required={field.required}
                onChange={(e) => onChange(e.target.value)}
              >
                <option value="">Select…</option>
                {field.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            )
          case 'radio':
            return (
              <div className="space-y-2">
                {field.options.map((o) => (
                  <label
                    key={o.value}
                    className="flex items-center gap-3 p-3 border border-[#1C3A64]/15 rounded-xl cursor-pointer hover:bg-[#1C3A64]/[0.03] transition-colors"
                  >
                    <input
                      type="radio"
                      name={field.name}
                      value={o.value}
                      checked={value === o.value}
                      required={field.required}
                      onChange={() => onChange(o.value)}
                      className="accent-[#1C3A64]"
                    />
                    <span className="text-[#1C3A64] text-[14px]">{o.label}</span>
                  </label>
                ))}
              </div>
            )
          case 'checkboxes': {
            const selected = value ? value.split(',').filter(Boolean) : []
            const toggle = (val: string) => {
              const next = selected.includes(val)
                ? selected.filter((x) => x !== val)
                : [...selected, val]
              onChange(next.join(','))
            }
            return (
              <div className="space-y-2">
                {field.options.map((o) => (
                  <label
                    key={o.value}
                    className="flex items-start gap-3 p-3 border border-[#1C3A64]/15 rounded-xl cursor-pointer hover:bg-[#1C3A64]/[0.03] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(o.value)}
                      onChange={() => toggle(o.value)}
                      className="accent-[#1C3A64] mt-1"
                    />
                    <span className="text-[#1C3A64] text-[14px] leading-[1.4]">{o.label}</span>
                  </label>
                ))}
              </div>
            )
          }
          default:
            return null
        }
      })()}
      <FieldHelper text={field.helper} />
      <FieldError message={error} />
    </div>
  )
}
