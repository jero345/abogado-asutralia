import { useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Send } from 'lucide-react'
import type { CaseDetail } from '@/data/caseDetails'
import type { CaseFormConfig, ExtraField } from '@/data/registrationForms'
import { submitRegistration, RegistrationError } from '@/lib/registrations'
import { ExtraFieldInput, SectionHeader, FieldLabel, inputClass } from './FormField'
import { FileUploadField } from './FileUploadField'
import { SignaturePad } from './SignaturePad'
import { SuccessPanel } from './SuccessPanel'

const identityFields: ExtraField[] = [
  { kind: 'text', name: 'firstName', label: 'First Name', required: true },
  { kind: 'text', name: 'lastName', label: 'Last Name', required: true },
  {
    kind: 'text',
    name: 'altPurchaseName',
    label: 'If your purchase was made in another name or through a company, please provide that name',
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

const consentFields = (caseTitle: string): ExtraField[] => [
  {
    kind: 'radio',
    name: 'agreeUpdatesThisCase',
    label: `I agree to receive further updates regarding the ${caseTitle}`,
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

export function VehicleForm({
  caseData,
  config,
}: {
  caseData: CaseDetail
  config: CaseFormConfig
}) {
  const consent = useMemo(() => consentFields(caseData.title), [caseData.title])
  const modelOptions = config.vehicleExtras?.models ?? []

  const [values, setValues] = useState<Record<string, string>>({ country: 'Australia' })
  const [stillOwn, setStillOwn] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [signature, setSignature] = useState('')
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
    for (const f of [...identityFields, ...contactFields, ...addressFields, ...consent]) {
      if (f.required && !values[f.name]?.trim()) errs[f.name] = 'Required'
    }
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errs.email = 'Invalid email'
    if (!signature) errs.signature = 'Please draw your signature.'
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
        formType: 'vehicle',
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
          altPurchaseName: values.altPurchaseName,
          vehicleModel: values.vehicleModel,
          vehicleVin: values.vehicleVin,
          vehicleAcquiredDate: values.vehicleAcquiredDate,
          vehiclePurchaseLocation: values.vehiclePurchaseLocation,
          stillOwn,
          issuesExperienced: values.issuesExperienced,
          agreeUpdatesThisCase: values.agreeUpdatesThisCase,
          agreeUpdatesAnyCase: values.agreeUpdatesAnyCase,
          signedAt: new Date().toISOString(),
          ...(config.hiddenContext ?? {}),
        },
        files,
        signatureData: signature,
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
      {config.intro && (
        <div className="mb-8 text-[#555555] text-[14px] leading-[1.7]">
          <p>{config.intro}</p>
        </div>
      )}

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

        <SectionHeader label="Vehicle information" />
        <div>
          <FieldLabel label="Vehicle Model" />
          {modelOptions.length > 0 ? (
            <select
              className={inputClass}
              value={values.vehicleModel ?? ''}
              onChange={(e) => setValue('vehicleModel')(e.target.value)}
            >
              <option value="">Select…</option>
              {modelOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className={inputClass}
              value={values.vehicleModel ?? ''}
              onChange={(e) => setValue('vehicleModel')(e.target.value)}
            />
          )}
        </div>
        <div>
          <FieldLabel label="Vehicle VIN Number" />
          <input
            type="text"
            className={inputClass}
            value={values.vehicleVin ?? ''}
            onChange={(e) => setValue('vehicleVin')(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel label="What date did you acquire your vehicle?" />
          <input
            type="date"
            className={inputClass}
            value={values.vehicleAcquiredDate ?? ''}
            onChange={(e) => setValue('vehicleAcquiredDate')(e.target.value)}
          />
        </div>
        <div className="col-span-full">
          <FieldLabel label="Where did you acquire/purchase your vehicle?" />
          <textarea
            className={`${inputClass} resize-none`}
            rows={3}
            value={values.vehiclePurchaseLocation ?? ''}
            onChange={(e) => setValue('vehiclePurchaseLocation')(e.target.value)}
          />
        </div>
        <div className="col-span-full">
          <FieldLabel label="Do you still own the vehicle?" />
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
                  name="stillOwn"
                  value={o.value}
                  checked={stillOwn === o.value}
                  onChange={() => setStillOwn(o.value)}
                  className="accent-[#1C3A64]"
                />
                <span className="text-[#1C3A64] text-[14px]">{o.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="col-span-full">
          <FieldLabel label="Have you experienced any issues with your vehicle?" />
          <textarea
            className={`${inputClass} resize-none`}
            rows={4}
            value={values.issuesExperienced ?? ''}
            onChange={(e) => setValue('issuesExperienced')(e.target.value)}
          />
        </div>

        <SectionHeader label="Supporting documents" />
        <FileUploadField
          label="Supporting documents"
          helper={`If files are too large, please email them to ${config.notifyEmail}.`}
          maxSizeMb={100}
          accept="application/pdf,image/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          files={files}
          onChange={setFiles}
        />

        <SectionHeader label="Signature" />
        <SignaturePad
          label="Signature"
          required
          helper="Use your mouse or finger to draw your signature above."
          value={signature}
          onChange={setSignature}
          error={errors.signature}
        />
        <div>
          <FieldLabel label="Date" />
          <input
            type="text"
            disabled
            value={new Date().toLocaleDateString('en-AU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            className={inputClass + ' opacity-70'}
          />
        </div>

        <SectionHeader label="Consent to updates" />
        {consent.map((f) => (
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
            Submit registration
            <Send size={14} />
          </>
        )}
      </motion.button>
    </form>
  )
}
