import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Loader2, Send } from 'lucide-react'
import type { CaseDetail } from '@/data/caseDetails'
import { submitRegistration, RegistrationError } from '@/lib/registrations'
import { fetchForm, type CustomFormDef } from '@/lib/forms'
import { inputClass, FieldLabel, FieldError } from './FormField'
import { SuccessPanel } from './SuccessPanel'

// Renderer for admin-built custom forms. Always collects the standard contact
// fields (required by the registrations table) plus whatever extra fields the
// admin defined in the form builder.
export function CustomForm({ caseData, formId }: { caseData: CaseDetail; formId: string }) {
  const [def, setDef] = useState<CustomFormDef | null | undefined>(undefined)
  const [v, setV] = useState<Record<string, string>>({})
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchForm(formId).then((d) => {
      if (!cancelled) setDef(d ?? null)
    })
    return () => {
      cancelled = true
    }
  }, [formId])

  const set = (name: string) => (val: string) => {
    setV((prev) => ({ ...prev, [name]: val }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }))
  }

  if (def === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-[#1C3A64]" size={22} />
      </div>
    )
  }
  if (def === null) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-900 text-[13px] rounded-xl p-4">
        This form is no longer available. Please email{' '}
        <a href={`mailto:${caseData.email ?? 'enquiries@bantongroup.com'}`} className="underline">
          {caseData.email ?? 'enquiries@bantongroup.com'}
        </a>{' '}
        to register.
      </div>
    )
  }
  if (submitted) return <SuccessPanel caseData={caseData} />

  const validate = () => {
    const errs: Record<string, string> = {}
    for (const f of ['firstName', 'lastName', 'email', 'phone']) {
      if (!v[f]?.trim()) errs[f] = 'Required'
    }
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) errs.email = 'Invalid email'
    for (const f of def.fields) {
      if (f.required && !v[f.name]?.trim()) errs[f.name] = 'Required'
    }
    if (!agreePrivacy) errs.agreePrivacy = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setServerError(null)
    if (!validate()) return
    setSubmitting(true)
    try {
      await submitRegistration({
        caseSlug: caseData.slug,
        caseTitle: caseData.title,
        formType: `custom:${formId}`,
        common: {
          firstName: v.firstName ?? '',
          lastName: v.lastName ?? '',
          email: v.email ?? '',
          phone: v.phone ?? '',
        },
        payload: {
          _formName: def.name,
          ...Object.fromEntries(def.fields.map((f) => [f.name, v[f.name] ?? ''])),
          agreePrivacy: agreePrivacy ? 'yes' : 'no',
        },
      })
      setSubmitted(true)
    } catch (err) {
      setServerError(
        err instanceof RegistrationError ? err.message : 'Something went wrong. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AnimatePresence>
        {(Object.keys(errors).length > 0 || serverError) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] flex items-start gap-3"
          >
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{serverError ?? 'Please complete the required fields highlighted below.'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {def.description && (
        <p className="text-[#555555] text-[14px] leading-[1.7] mb-6">{def.description}</p>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel label="First Name" required />
          <input className={inputClass} value={v.firstName ?? ''} onChange={(e) => set('firstName')(e.target.value)} />
          <FieldError message={errors.firstName} />
        </div>
        <div>
          <FieldLabel label="Last Name" required />
          <input className={inputClass} value={v.lastName ?? ''} onChange={(e) => set('lastName')(e.target.value)} />
          <FieldError message={errors.lastName} />
        </div>
        <div>
          <FieldLabel label="Email" required />
          <input type="email" className={inputClass} value={v.email ?? ''} onChange={(e) => set('email')(e.target.value)} />
          <FieldError message={errors.email} />
        </div>
        <div>
          <FieldLabel label="Phone" required />
          <input className={inputClass} value={v.phone ?? ''} onChange={(e) => set('phone')(e.target.value)} />
          <FieldError message={errors.phone} />
        </div>

        {def.fields.map((f) => {
          const full = f.type === 'textarea' || f.type === 'checkbox'
          return (
            <div key={f.name} className={full ? 'col-span-full' : undefined}>
              {f.type === 'checkbox' ? (
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={v[f.name] === 'yes'}
                    onChange={(e) => set(f.name)(e.target.checked ? 'yes' : '')}
                    className="accent-[#1C3A64] mt-1"
                  />
                  <span className="text-[#1C3A64] text-[14px] leading-[1.4]">
                    {f.label}
                    {f.required && <span className="text-[#1C3A64] ml-1">*</span>}
                  </span>
                </label>
              ) : (
                <>
                  <FieldLabel label={f.label} required={f.required} />
                  {f.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      className={`${inputClass} resize-none`}
                      value={v[f.name] ?? ''}
                      onChange={(e) => set(f.name)(e.target.value)}
                    />
                  ) : f.type === 'select' ? (
                    <select className={inputClass} value={v[f.name] ?? ''} onChange={(e) => set(f.name)(e.target.value)}>
                      <option value="">Select…</option>
                      {(f.options ?? []).map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text'}
                      className={inputClass}
                      value={v[f.name] ?? ''}
                      onChange={(e) => set(f.name)(e.target.value)}
                    />
                  )}
                </>
              )}
              <FieldError message={errors[f.name]} />
            </div>
          )
        })}

        <div className="col-span-full">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreePrivacy}
              onChange={(e) => {
                setAgreePrivacy(e.target.checked)
                if (errors.agreePrivacy) setErrors((er) => ({ ...er, agreePrivacy: '' }))
              }}
              className="accent-[#1C3A64] mt-1"
            />
            <span className="text-[#555555] text-[13px] leading-[1.5]">
              I agree to Banton Group&rsquo;s{' '}
              <a href="/privacy-policy" className="text-[#1C3A64] underline">
                Privacy Policy
              </a>
              .<span className="text-[#1C3A64] ml-1">*</span>
            </span>
          </label>
          <FieldError message={errors.agreePrivacy} />
        </div>
      </div>

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
            Submit
            <Send size={14} />
          </>
        )}
      </motion.button>
    </form>
  )
}
