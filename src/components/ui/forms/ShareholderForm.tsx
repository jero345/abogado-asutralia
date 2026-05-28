import { useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, AlertCircle, FileText } from 'lucide-react'
import type { CaseDetail } from '@/data/caseDetails'
import type { CaseFormConfig, ExtraField } from '@/data/registrationForms'
import { submitRegistration, RegistrationError } from '@/lib/registrations'
import {
  ExtraFieldInput,
  FieldError,
  FieldHelper,
  FieldLabel,
  SectionHeader,
  inputClass,
} from './FormField'
import { FileUploadField } from './FileUploadField'
import { SuccessPanel } from './SuccessPanel'

// Shared schema (Personal / Address / Shareholding) shown for every shareholder case.
const personalFields: ExtraField[] = [
  { kind: 'text', name: 'firstName', label: 'First Name', required: true },
  { kind: 'text', name: 'lastName', label: 'Last Name', required: true },
  { kind: 'text', name: 'phone', label: 'Phone Number', required: true, placeholder: '+61 4__ ___ ___' },
  { kind: 'text', name: 'email', label: 'Email', required: true, placeholder: 'your@email.com' },
]

const addressFields: ExtraField[] = [
  { kind: 'text', name: 'address1', label: 'Address Line 1', required: true },
  { kind: 'text', name: 'address2', label: 'Address Line 2' },
  { kind: 'text', name: 'city', label: 'City' },
  { kind: 'text', name: 'state', label: 'State / Province' },
  { kind: 'text', name: 'postal', label: 'ZIP / Postal Code' },
  { kind: 'text', name: 'country', label: 'Country' },
]

const shareholdingFields: ExtraField[] = [
  {
    kind: 'text',
    name: 'securityHolder',
    label: 'Security Holder Name / Custodian / Trustee',
    required: true,
    helper: 'i.e. name of person/entity who purchased/received the shares',
  },
  {
    kind: 'text',
    name: 'accountTrust',
    label: 'Name of Account/Trust (if shares held beneficially for someone else)',
  },
  {
    kind: 'text',
    name: 'acnAbn',
    label: 'ACN/ABN (if Custodian is a business)',
  },
  {
    kind: 'text',
    name: 'hinSrn',
    label: 'HIN/SRN/Reference number',
    required: true,
  },
]

export function ShareholderForm({
  caseData,
  config,
}: {
  caseData: CaseDetail
  config: CaseFormConfig
}) {
  const extras = config.shareholderExtras?.fields ?? []

  // All field names rendered in the form (used for validation).
  const allFields = useMemo(
    () => [...personalFields, ...addressFields, ...shareholdingFields, ...extras],
    [extras],
  )

  const [values, setValues] = useState<Record<string, string>>({})
  const [files, setFiles] = useState<File[]>([])
  const [transactionsCorrect, setTransactionsCorrect] = useState('')
  const [transactionAmendments, setTransactionAmendments] = useState('')
  const [signedBy, setSignedBy] = useState('')
  const [capacityToSign, setCapacityToSign] = useState('')
  const [retainer, setRetainer] = useState('')
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
    if (!transactionsCorrect) errs.transactionsCorrect = 'Required'
    if (transactionsCorrect === 'no' && !transactionAmendments.trim())
      errs.transactionAmendments = 'Please describe the corrections.'
    if (!signedBy.trim()) errs.signedBy = 'Required'
    if (!retainer) errs.retainer = 'Required'
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
        formType: 'shareholder',
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
          securityHolder: values.securityHolder,
          accountTrust: values.accountTrust,
          acnAbn: values.acnAbn,
          hinSrn: values.hinSrn,
          transactionsCorrect,
          transactionAmendments:
            transactionsCorrect === 'no' ? transactionAmendments : null,
          signedBy,
          capacityToSign,
          signedAt: new Date().toISOString(),
          ...Object.fromEntries(extras.map((f) => [f.name, values[f.name] ?? ''])),
          ...(config.hiddenContext ?? {}),
        },
        files,
        retainer,
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

  if (submitted) {
    return <SuccessPanel caseData={caseData} />
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
            <span>
              {serverError ??
                'Please complete the required fields highlighted below before submitting.'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid sm:grid-cols-2 gap-5">
        <SectionHeader label="Personal details" />
        {personalFields.map((f) => (
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

        <SectionHeader label="Shareholding details" />
        {shareholdingFields.map((f) => (
          <ExtraFieldInput
            key={f.name}
            field={f}
            value={values[f.name] ?? ''}
            onChange={setValue(f.name)}
            error={errors[f.name]}
          />
        ))}

        {extras.length > 0 && (
          <>
            <SectionHeader
              label={config.shareholderExtras?.holdingsHeading ?? 'Case-specific details'}
            />
            {extras.map((f) => (
              <ExtraFieldInput
                key={f.name}
                field={f}
                value={values[f.name] ?? ''}
                onChange={setValue(f.name)}
                error={errors[f.name]}
              />
            ))}
          </>
        )}

        <SectionHeader label="Transaction confirmation" />
        <div className="col-span-full">
          <FieldLabel
            label="Were the share transactions mailed with the Notice sent to you correct?"
            required
          />
          <div className="space-y-2">
            {[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ].map((o) => (
              <label
                key={o.value}
                className="flex items-center gap-3 p-3 border border-[#1C3A64]/15 rounded-xl cursor-pointer hover:bg-[#1C3A64]/[0.03] transition-colors"
              >
                <input
                  type="radio"
                  name="transactionsCorrect"
                  value={o.value}
                  checked={transactionsCorrect === o.value}
                  onChange={() => {
                    setTransactionsCorrect(o.value)
                    if (errors.transactionsCorrect)
                      setErrors((e) => ({ ...e, transactionsCorrect: '' }))
                  }}
                  className="accent-[#1C3A64]"
                />
                <span className="text-[#1C3A64] text-[14px]">{o.label}</span>
              </label>
            ))}
          </div>
          <FieldHelper text="If not, please describe the amendments in the next field." />
          <FieldError message={errors.transactionsCorrect} />
        </div>

        {transactionsCorrect === 'no' && (
          <div className="col-span-full">
            <FieldLabel label="Please describe the corrections" required />
            <textarea
              className={`${inputClass} resize-none`}
              rows={4}
              value={transactionAmendments}
              onChange={(e) => {
                setTransactionAmendments(e.target.value)
                if (errors.transactionAmendments)
                  setErrors((er) => ({ ...er, transactionAmendments: '' }))
              }}
              placeholder="Describe what should be amended in the transaction history we sent you."
            />
            <FieldError message={errors.transactionAmendments} />
          </div>
        )}

        <SectionHeader label="Supporting documents" />
        <FileUploadField
          label="Supporting documents"
          helper={`If files are not presently available or too large, please email them to ${config.notifyEmail}.`}
          maxSizeMb={50}
          accept="application/pdf,image/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          files={files}
          onChange={setFiles}
        />

        <SectionHeader label="Signature" />
        <div className="col-span-full text-[13px] text-[#555555] leading-[1.6] bg-[#F4F6FB] border border-[#1C3A64]/10 rounded-xl px-4 py-3">
          By signing below, you agree to the share transactions provided to you (with any
          changes or new information you have made above) being submitted for your
          registration as a registered group member in the <strong>{caseData.title}</strong>.
        </div>
        <div>
          <FieldLabel label="Signed By" required />
          <input
            type="text"
            value={signedBy}
            onChange={(e) => {
              setSignedBy(e.target.value)
              if (errors.signedBy) setErrors((er) => ({ ...er, signedBy: '' }))
            }}
            className={inputClass}
            placeholder="Type the name of the person completing this form"
          />
          <FieldError message={errors.signedBy} />
        </div>
        <div>
          <FieldLabel label="Capacity to sign" />
          <input
            type="text"
            value={capacityToSign}
            onChange={(e) => setCapacityToSign(e.target.value)}
            className={inputClass}
            placeholder="i.e. Director, Trustee"
          />
        </div>

        <SectionHeader label="Retainer" />
        <div className="col-span-full">
          <FieldLabel
            label="By completing this form, you will be a registered group member in these proceedings. Do you wish to be issued with a retainer from Banton Group?"
            required
          />
          <div className="space-y-2">
            {[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ].map((o) => (
              <label
                key={o.value}
                className="flex items-center gap-3 p-3 border border-[#1C3A64]/15 rounded-xl cursor-pointer hover:bg-[#1C3A64]/[0.03] transition-colors"
              >
                <input
                  type="radio"
                  name="retainer"
                  value={o.value}
                  checked={retainer === o.value}
                  onChange={() => {
                    setRetainer(o.value)
                    if (errors.retainer) setErrors((e) => ({ ...e, retainer: '' }))
                  }}
                  className="accent-[#1C3A64]"
                />
                <span className="text-[#1C3A64] text-[14px]">{o.label}</span>
              </label>
            ))}
          </div>
          <FieldError message={errors.retainer} />
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 p-4 bg-[#F4F6FB] border border-[#1C3A64]/10 rounded-xl">
        <FileText size={16} className="text-[#1C3A64] flex-shrink-0 mt-0.5" />
        <p className="text-[#555555] text-[13px] leading-[1.6]">
          After submission, a member of our team will contact you to collect any further
          supporting documents required.
        </p>
      </div>

      <p className="text-[#888888] text-[12px] mt-4 leading-[1.6]">
        By submitting this form, you agree that the information will be used in accordance with
        the{' '}
        <a href="/privacy-policy" className="text-[#1C3A64] underline">
          Banton Group Privacy Policy
        </a>
        . All information is strictly confidential and subject to legal professional privilege.
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
            Register as a group member
            <Send size={14} />
          </>
        )}
      </motion.button>
    </form>
  )
}
