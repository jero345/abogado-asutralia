import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Send } from 'lucide-react'
import type { CaseDetail } from '@/data/caseDetails'
import type { CaseFormConfig } from '@/data/registrationForms'
import { submitRegistration, RegistrationError } from '@/lib/registrations'
import { inputClass, FieldLabel, FieldError } from './FormField'
import { SuccessPanel } from './SuccessPanel'

// Minimal "register your interest" form used by matters that don't warrant a
// bespoke form (e.g. early-stage investigations). Mirrors the firm's generic
// class-action-form: name, contact, a single dropdown and a privacy consent.
const DEFAULT_SELECT = {
  label: 'I am a…',
  options: [
    'Class member',
    'Lawyer for a class member',
    'Director of a class member',
    'Other',
  ],
}

export function MiniInterestForm({
  caseData,
  config,
}: {
  caseData: CaseDetail
  config: CaseFormConfig
}) {
  const select = config.interestSelect ?? DEFAULT_SELECT

  const [v, setV] = useState<Record<string, string>>({})
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const set = (name: string) => (val: string) => {
    setV((prev) => ({ ...prev, [name]: val }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    for (const f of ['firstName', 'lastName', 'phone', 'email', 'interest']) {
      if (!v[f]?.trim()) errs[f] = 'Required'
    }
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) errs.email = 'Invalid email'
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
        formType: 'mini-interest',
        common: {
          firstName: v.firstName ?? '',
          lastName: v.lastName ?? '',
          email: v.email ?? '',
          phone: v.phone ?? '',
        },
        payload: {
          interest: v.interest ?? '',
          agreePrivacy: agreePrivacy ? 'yes' : 'no',
          ...(config.hiddenContext ?? {}),
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

  if (submitted) return <SuccessPanel caseData={caseData} />

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
            <span>
              {serverError ?? 'Please complete all fields before submitting.'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[#555555] text-[14px] leading-[1.7] mb-6">
        If you are interested in registering to be a class member or would like further information,
        please fill out the form below.
      </p>

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
          <FieldLabel label="Phone" required />
          <input className={inputClass} value={v.phone ?? ''} onChange={(e) => set('phone')(e.target.value)} />
          <FieldError message={errors.phone} />
        </div>
        <div>
          <FieldLabel label="Email" required />
          <input type="email" className={inputClass} value={v.email ?? ''} onChange={(e) => set('email')(e.target.value)} />
          <FieldError message={errors.email} />
        </div>
        <div className="col-span-full">
          <FieldLabel label={select.label} required />
          <select className={inputClass} value={v.interest ?? ''} onChange={(e) => set('interest')(e.target.value)}>
            <option value="">Select…</option>
            {select.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <FieldError message={errors.interest} />
        </div>
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
              . <span className="text-[#888888]">All fields are required.</span>
              <span className="text-[#1C3A64] ml-1">*</span>
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
