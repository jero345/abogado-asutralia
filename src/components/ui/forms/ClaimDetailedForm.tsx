import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Send } from 'lucide-react'
import type { CaseDetail } from '@/data/caseDetails'
import type { CaseFormConfig } from '@/data/registrationForms'
import { submitRegistration, RegistrationError } from '@/lib/registrations'
import { inputClass, FieldLabel, FieldError, SectionHeader } from './FormField'
import { SuccessPanel } from './SuccessPanel'

// Detailed claim-registration form — mirrors the firm's S&P CDO / CPDO
// "register your claim" form: class member identity, the person completing
// the form, the instrument(s) acquired, and a signed declaration block.
const COMPLETING_AS = [
  'Class member',
  'Lawyer for a class member',
  'Director of a class member',
  'Other',
]

export function ClaimDetailedForm({
  caseData,
  config,
}: {
  caseData: CaseDetail
  config: CaseFormConfig
}) {
  const instrument = config.instrumentLabel ?? 'CDO'

  const [v, setV] = useState<Record<string, string>>({ country: 'Australia' })
  const [agreeAccurate, setAgreeAccurate] = useState(false)
  const [wishRegister, setWishRegister] = useState(false)
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
    const required = [
      'classMemberName',
      'firstName',
      'lastName',
      'email',
      'phone',
      'address1',
      'signatoryFirst',
      'signatoryLast',
      'todaysDate',
      'completingAs',
    ]
    for (const f of required) if (!v[f]?.trim()) errs[f] = 'Required'
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) errs.email = 'Invalid email'
    if (!agreeAccurate) errs.agreeAccurate = 'Required'
    if (!wishRegister) errs.wishRegister = 'Required'
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
        formType: 'claim-detailed',
        common: {
          firstName: v.firstName ?? '',
          lastName: v.lastName ?? '',
          email: v.email ?? '',
          phone: v.phone ?? '',
          addressLine1: v.address1,
          addressLine2: v.address2,
          city: v.city,
          state: v.state,
          postal: v.postal,
          country: v.country,
        },
        payload: {
          classMemberName: v.classMemberName ?? '',
          authority: v.authority ?? '',
          instrumentNames: v.instrumentNames ?? '',
          seriesIsin: v.seriesIsin ?? '',
          purchaseAmount: v.purchaseAmount ?? '',
          lossAmount: v.lossAmount ?? '',
          acquisitionDate: v.acquisitionDate ?? '',
          soldDate: v.soldDate ?? '',
          lastPaymentDate: v.lastPaymentDate ?? '',
          agreeAccurate: agreeAccurate ? 'yes' : 'no',
          wishRegister: wishRegister ? 'yes' : 'no',
          signatoryFirst: v.signatoryFirst ?? '',
          signatoryLast: v.signatoryLast ?? '',
          signatoryCompany: v.signatoryCompany ?? '',
          todaysDate: v.todaysDate ?? '',
          completingAs: v.completingAs ?? '',
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

  // Rendered via a plain function call ({Text({...})}) rather than as a JSX
  // element (<Text/>). Defining a component inside render and using it as an
  // element remounts it every keystroke, which makes inputs lose focus.
  const Text = ({
    name,
    label,
    required,
    full,
    type = 'text',
  }: {
    name: string
    label: string
    required?: boolean
    full?: boolean
    type?: string
  }) => (
    <div key={name} className={full ? 'col-span-full' : undefined}>
      <FieldLabel label={label} required={required} />
      <input
        type={type}
        className={inputClass}
        value={v[name] ?? ''}
        onChange={(e) => set(name)(e.target.value)}
      />
      <FieldError message={errors[name]} />
    </div>
  )

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
              {serverError ??
                'Please complete the required fields highlighted below before submitting.'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[#555555] text-[13px] leading-[1.7] mb-8 bg-[#F4F6FB] border border-[#1C3A64]/10 rounded-xl px-5 py-4">
        Please input the following to the best of your ability. By completing the form below, the
        class member named below will register their claim with Banton Group.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {Text({
          name: 'classMemberName',
          label: `Name of class member (i.e. person or entity who held an interest in a Claim ${instrument})`,
          required: true,
          full: true,
        })}

        <SectionHeader label="Person completing this form" />
        {Text({ name: 'firstName', label: 'First Name', required: true })}
        {Text({ name: 'lastName', label: 'Last Name', required: true })}
        {Text({
          name: 'authority',
          label: 'Authority of person completing this form (e.g. company director, lawyer)',
          full: true,
        })}

        <SectionHeader label="Contact" />
        {Text({ name: 'email', label: 'Email', required: true, type: 'email' })}
        {Text({ name: 'phone', label: 'Telephone', required: true })}

        <SectionHeader label="Postal address" />
        {Text({ name: 'address1', label: 'Street Address', required: true, full: true })}
        {Text({ name: 'address2', label: 'Address Line 2', full: true })}
        {Text({ name: 'city', label: 'City' })}
        {Text({ name: 'state', label: 'State / Province / Region' })}
        {Text({ name: 'postal', label: 'ZIP / Postal Code' })}
        {Text({ name: 'country', label: 'Country' })}

        <SectionHeader
          label={`${instrument}(s) acquired`}
          hint="Please provide as much of the below information as possible, to the best of your state of knowledge, if known."
        />
        {Text({ name: 'instrumentNames', label: `Name of ${instrument}(s) acquired` })}
        {Text({ name: 'seriesIsin', label: 'Series / ISIN' })}
        {Text({ name: 'purchaseAmount', label: 'Purchase Amount $AUS', type: 'number' })}
        {Text({ name: 'lossAmount', label: 'Amount of loss $AUS', type: 'number' })}
        {Text({ name: 'acquisitionDate', label: `Date of acquisition of ${instrument}`, type: 'date' })}
        {Text({ name: 'soldDate', label: 'Date Sold', type: 'date' })}
        {Text({ name: 'lastPaymentDate', label: 'Date of last payment received', type: 'date' })}

        <SectionHeader label="Declaration" />
        <div className="col-span-full space-y-3">
          <label className="flex items-start gap-3 p-3 border border-[#1C3A64]/15 rounded-xl cursor-pointer hover:bg-[#1C3A64]/[0.03] transition-colors">
            <input
              type="checkbox"
              checked={agreeAccurate}
              onChange={(e) => {
                setAgreeAccurate(e.target.checked)
                if (errors.agreeAccurate) setErrors((er) => ({ ...er, agreeAccurate: '' }))
              }}
              className="accent-[#1C3A64] mt-1"
            />
            <span className="text-[#1C3A64] text-[14px] leading-[1.4]">
              I agree that I have filled this form out to the best of my knowledge
              <span className="text-[#1C3A64] ml-1">*</span>
            </span>
          </label>
          <FieldError message={errors.agreeAccurate} />
          <label className="flex items-start gap-3 p-3 border border-[#1C3A64]/15 rounded-xl cursor-pointer hover:bg-[#1C3A64]/[0.03] transition-colors">
            <input
              type="checkbox"
              checked={wishRegister}
              onChange={(e) => {
                setWishRegister(e.target.checked)
                if (errors.wishRegister) setErrors((er) => ({ ...er, wishRegister: '' }))
              }}
              className="accent-[#1C3A64] mt-1"
            />
            <span className="text-[#1C3A64] text-[14px] leading-[1.4]">
              I wish to register as a class member
              <span className="text-[#1C3A64] ml-1">*</span>
            </span>
          </label>
          <FieldError message={errors.wishRegister} />
        </div>

        <SectionHeader label="Signatory" />
        {Text({ name: 'signatoryFirst', label: 'Signatory First Name', required: true })}
        {Text({ name: 'signatoryLast', label: 'Signatory Last Name', required: true })}
        {Text({ name: 'signatoryCompany', label: 'Signatory Company' })}
        {Text({ name: 'todaysDate', label: "Today's Date", required: true, type: 'date' })}
        <div className="col-span-full">
          <FieldLabel label="I am completing this form as a…" required />
          <select
            className={inputClass}
            value={v.completingAs ?? ''}
            onChange={(e) => set('completingAs')(e.target.value)}
          >
            <option value="">Select one…</option>
            {COMPLETING_AS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <FieldError message={errors.completingAs} />
        </div>
      </div>

      <p className="text-[#888888] text-[12px] mt-6 leading-[1.6]">
        By submitting this form, you agree that the information will be used in accordance with the{' '}
        <a href="/privacy-policy" className="text-[#1C3A64] underline">
          Banton Group Privacy Policy
        </a>
        .
      </p>

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
            Submit registration
            <Send size={14} />
          </>
        )}
      </motion.button>
    </form>
  )
}
