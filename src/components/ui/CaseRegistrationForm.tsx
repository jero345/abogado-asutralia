import { useState, useMemo, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, FileText, AlertCircle } from 'lucide-react'
import { baseFields, retainerField, type FormField, type CaseDetail } from '@/data/caseDetails'

/**
 * Case registration form.
 * Renders base fields + case-specific fields + retainer question.
 * Submit handler is a stub for now — it console.logs the payload and
 * shows a success state. Backend (Vercel serverless + Resend) to be
 * wired separately.
 */

const inputClass =
  'w-full bg-white border border-[#1C3A64]/25 rounded-xl px-5 py-3.5 text-[#1C3A64] text-[15px] placeholder:text-[#888888] focus:outline-none focus:border-[#1C3A64] focus:bg-white focus:ring-2 focus:ring-[#1C3A64]/10 transition-all duration-200'

function Field({
  field,
  value,
  onChange,
  error,
}: {
  field: FormField
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  if (field.kind === 'divider') {
    return (
      <div className="col-span-full pt-6 first:pt-0">
        <div className="flex items-center gap-3">
          <div className="h-px w-6 bg-[#1C3A64]/40" />
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#1C3A64]">
            {field.label}
          </span>
          <div className="h-px flex-1 bg-[#1C3A64]/10" />
        </div>
      </div>
    )
  }

  const labelNode = (
    <label className="block text-[#1C3A64] text-[13px] font-medium mb-2 tracking-wide">
      {field.label}
      {field.required && <span className="text-[#1C3A64] ml-1">*</span>}
    </label>
  )

  const helperNode = field.helper && (
    <p className="text-[#888888] text-[11px] mt-1.5 leading-[1.5]">{field.helper}</p>
  )

  const errorNode = error && (
    <p className="flex items-center gap-1.5 text-red-600 text-[11px] mt-1.5">
      <AlertCircle size={11} />
      {error}
    </p>
  )

  const common = { required: field.required, className: inputClass }

  switch (field.kind) {
    case 'text':
      return (
        <div>
          {labelNode}
          <input
            type="text"
            {...common}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
          {helperNode}
          {errorNode}
        </div>
      )
    case 'email':
      return (
        <div>
          {labelNode}
          <input
            type="email"
            {...common}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
          {helperNode}
          {errorNode}
        </div>
      )
    case 'tel':
      return (
        <div>
          {labelNode}
          <input
            type="tel"
            {...common}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
          {helperNode}
          {errorNode}
        </div>
      )
    case 'number':
      return (
        <div>
          {labelNode}
          <input
            type="number"
            {...common}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
          {helperNode}
          {errorNode}
        </div>
      )
    case 'textarea':
      return (
        <div className="col-span-full">
          {labelNode}
          <textarea
            required={field.required}
            className={`${inputClass} resize-none`}
            rows={field.rows ?? 4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
          {helperNode}
          {errorNode}
        </div>
      )
    case 'select':
      return (
        <div>
          {labelNode}
          <select
            required={field.required}
            className={inputClass}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {helperNode}
          {errorNode}
        </div>
      )
    case 'radio':
      return (
        <div className="col-span-full">
          {labelNode}
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
                  onChange={() => onChange(o.value)}
                  required={field.required}
                  className="accent-[#1C3A64]"
                />
                <span className="text-[#1C3A64] text-[14px]">{o.label}</span>
              </label>
            ))}
          </div>
          {helperNode}
          {errorNode}
        </div>
      )
    default:
      return null
  }
}

export function CaseRegistrationForm({ caseData }: { caseData: CaseDetail }) {
  const fields = useMemo<FormField[]>(
    () => [...baseFields, ...(caseData.caseSpecificFields ?? []), retainerField],
    [caseData]
  )

  const [values, setValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const setValue = (name: string) => (v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    for (const f of fields) {
      if (f.kind === 'divider') continue
      if (f.required && !values[f.name]?.trim()) {
        e[f.name] = 'Required'
      }
      if (f.kind === 'email' && values[f.name] && !/^\S+@\S+\.\S+$/.test(values[f.name])) {
        e[f.name] = 'Invalid email'
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    // STUB — real backend comes later (Vercel serverless + Resend)
    // For now we log + wait 1.2s to simulate network
    // eslint-disable-next-line no-console
    console.log('[Banton register]', { case: caseData.slug, email: caseData.email, data: values })
    await new Promise((r) => setTimeout(r, 1200))

    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-[#1A6B41]/30 rounded-2xl p-10 md:p-12 text-center max-w-2xl mx-auto shadow-sm"
      >
        <div className="w-16 h-16 rounded-full bg-[#E6F4EE] border border-[#1A6B41]/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={30} className="text-[#1A6B41]" />
        </div>
        <h2 className="text-[#1C3A64] text-[24px] md:text-[28px] font-medium leading-[1.2] mb-4 tracking-tight">
          Registration received.
        </h2>
        <p className="text-[#555555] text-[15px] leading-[1.7] max-w-md mx-auto">
          Thank you for registering your interest in the{' '}
          <span className="text-[#1C3A64] font-medium">{caseData.title}</span>. A member of the
          Banton Group team will be in touch within one business day to confirm your registration
          and request any supporting documents.
        </p>
        {caseData.email && (
          <p className="text-[#888888] text-[13px] mt-6">
            For urgent enquiries contact{' '}
            <a href={`mailto:${caseData.email}`} className="text-[#1C3A64] underline">
              {caseData.email}
            </a>
          </p>
        )}
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AnimatePresence>
        {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] flex items-start gap-3"
          >
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>Please complete the required fields highlighted below before submitting.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid sm:grid-cols-2 gap-5">
        {fields.map((f, i) => (
          <Field
            key={f.kind === 'divider' ? `div-${i}` : f.name}
            field={f}
            value={f.kind === 'divider' ? '' : values[f.name] ?? ''}
            onChange={f.kind === 'divider' ? () => {} : setValue(f.name)}
            error={f.kind === 'divider' ? undefined : errors[f.name]}
          />
        ))}
      </div>

      {/* Supporting documents note */}
      <div className="mt-8 flex items-start gap-3 p-4 bg-[#F4F6FB] border border-[#1C3A64]/10 rounded-xl">
        <FileText size={16} className="text-[#1C3A64] flex-shrink-0 mt-0.5" />
        <p className="text-[#555555] text-[13px] leading-[1.6]">
          After submission, a member of our team will contact you to collect the supporting
          documents of the above share holding purchases, sales and holdings.
        </p>
      </div>

      {/* Privacy note */}
      <p className="text-[#888888] text-[12px] mt-4 leading-[1.6]">
        By submitting this form, you agree that the information will be used in accordance with
        the{' '}
        <a href="/privacy-policy" className="text-[#1C3A64] underline">
          Banton Group Privacy Policy
        </a>
        . All information is strictly confidential and subject to legal professional privilege.
      </p>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#1C3A64] text-white text-[13px] font-medium rounded-full hover:bg-[#2A4E72] transition-colors disabled:opacity-60 tracking-[0.02em]"
      >
        {submitting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
          />
        ) : (
          <>
            Register as a group member
            <Send size={14} />
          </>
        )}
      </motion.button>
    </form>
  )
}
