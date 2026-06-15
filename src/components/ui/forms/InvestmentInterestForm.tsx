import { useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Send } from 'lucide-react'
import type { CaseDetail } from '@/data/caseDetails'
import type { CaseFormConfig, ExtraField } from '@/data/registrationForms'
import { submitRegistration, RegistrationError } from '@/lib/registrations'
import { ExtraFieldInput, SectionHeader } from './FormField'
import { SuccessPanel } from './SuccessPanel'

// Light "registration of interest" form used by Fitch UK, S&P UK and S&P CDO.
const identityFields: ExtraField[] = [
  { kind: 'text', name: 'firstName', label: 'First Name', required: true },
  { kind: 'text', name: 'lastName', label: 'Last Name', required: true },
  {
    kind: 'text',
    name: 'smsfOrCustodian',
    label: 'If your investment was made through your SMSF or with an alternate custodian, please provide the name',
  },
]

const contactFields: ExtraField[] = [
  { kind: 'text', name: 'email', label: 'Email', required: true },
  { kind: 'text', name: 'phone', label: 'Phone Number', required: true },
]

const addressFields: ExtraField[] = [
  { kind: 'text', name: 'address1', label: 'Address Line 1', required: true },
  { kind: 'text', name: 'address2', label: 'Address Line 2' },
  { kind: 'text', name: 'city', label: 'City' },
  { kind: 'text', name: 'state', label: 'State' },
  { kind: 'text', name: 'postal', label: 'Postcode' },
  { kind: 'text', name: 'country', label: 'Country' },
]

const investmentFields: ExtraField[] = [
  {
    kind: 'radio',
    name: 'canProvideTradeInfo',
    label: 'I can provide my trade information now',
    required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'later', label: 'No, I will provide it at a later date' },
    ],
  },
]

const consentFields: ExtraField[] = [
  {
    kind: 'radio',
    name: 'agreeUpdatesThisCase',
    label: 'I agree to receive further updates regarding the proposed class action',
    required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    kind: 'radio',
    name: 'agreeUpdatesAnyCase',
    label: 'I agree to receive updates regarding any class action in which Banton Group acts or is investigating',
    required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
]

export function InvestmentInterestForm({
  caseData,
  config,
}: {
  caseData: CaseDetail
  config: CaseFormConfig
}) {
  const allFields = useMemo(
    () => [
      ...identityFields,
      ...contactFields,
      ...addressFields,
      ...investmentFields,
      ...consentFields,
    ],
    [],
  )

  const [values, setValues] = useState<Record<string, string>>({ country: 'Australia' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const setValue = (name: string) => (v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    for (const f of allFields) {
      if (f.required && !values[f.name]?.trim()) errs[f.name] = 'Required'
    }
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errs.email = 'Invalid email'
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
        formType: 'investment-interest',
        common: {
          firstName: values.firstName ?? '',
          lastName: values.lastName ?? '',
          email: values.email ?? '',
          phone: values.phone ?? '',
          addressLine1: values.address1,
          addressLine2: values.address2,
          city: values.city,
          state: values.state,
          postal: values.postal,
          country: values.country,
        },
        payload: {
          smsfOrCustodian: values.smsfOrCustodian,
          canProvideTradeInfo: values.canProvideTradeInfo,
          agreeUpdatesThisCase: values.agreeUpdatesThisCase,
          agreeUpdatesAnyCase: values.agreeUpdatesAnyCase,
          ...(config.hiddenContext ?? {}),
        },
      })
      setSubmitted(true)
    } catch (err) {
      const message =
        err instanceof RegistrationError
          ? err.message
          : 'Something went wrong. Please try again.'
      setServerError(message)
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
              {serverError ??
                'Please complete the required fields highlighted below before submitting.'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid sm:grid-cols-2 gap-5">
        <SectionHeader label="Personal details" />
        {identityFields.map((f) => (
          <ExtraFieldInput
            key={f.name}
            field={f}
            value={values[f.name] ?? ''}
            onChange={setValue(f.name)}
            error={errors[f.name]}
          />
        ))}

        <SectionHeader label="Contact" />
        {contactFields.map((f) => (
          <ExtraFieldInput
            key={f.name}
            field={f}
            value={values[f.name] ?? ''}
            onChange={setValue(f.name)}
            error={errors[f.name]}
          />
        ))}

        <SectionHeader label="Address" />
        {addressFields.map((f) => (
          <ExtraFieldInput
            key={f.name}
            field={f}
            value={values[f.name] ?? ''}
            onChange={setValue(f.name)}
            error={errors[f.name]}
          />
        ))}

        <SectionHeader label="Investment information" />
        {investmentFields.map((f) => (
          <ExtraFieldInput
            key={f.name}
            field={f}
            value={values[f.name] ?? ''}
            onChange={setValue(f.name)}
            error={errors[f.name]}
          />
        ))}

        <SectionHeader label="Consent to updates" />
        {consentFields.map((f) => (
          <ExtraFieldInput
            key={f.name}
            field={f}
            value={values[f.name] ?? ''}
            onChange={setValue(f.name)}
            error={errors[f.name]}
          />
        ))}
      </div>

      <p className="text-[#888888] text-[12px] mt-6 leading-[1.6]">
        By submitting this form, you agree that the information will be used in accordance with
        the{' '}
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
            Register your interest
            <Send size={14} />
          </>
        )}
      </motion.button>

      {config.contactNote && (
        <div className="mt-8 pt-6 border-t border-[#1C3A64]/10">
          <h3 className="text-[#1C3A64] text-[13px] md:text-[15px] font-semibold tracking-[0.16em] uppercase mb-2">
            Contact us
          </h3>
          <p className="text-[#555555] text-[13px] leading-[1.7]">
            {config.contactNote.text}{' '}
            <a
              href={`mailto:${config.contactNote.email}`}
              className="text-[#1C3A64] underline"
            >
              {config.contactNote.email}
            </a>
            .
          </p>
        </div>
      )}
    </form>
  )
}
