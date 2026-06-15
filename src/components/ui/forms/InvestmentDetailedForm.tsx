import { useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Send } from 'lucide-react'
import type { CaseDetail } from '@/data/caseDetails'
import type { CaseFormConfig, ExtraField } from '@/data/registrationForms'
import { submitRegistration, RegistrationError } from '@/lib/registrations'
import { ExtraFieldInput, SectionHeader, FieldLabel, FieldHelper } from './FormField'
import { FileUploadField } from './FileUploadField'
import { SuccessPanel } from './SuccessPanel'

// Fitch SCDO full registration form.
// Sections: Identity → Capacity → Contact → Address → Investment details → Documents → Statutory Declaration
const identityFields: ExtraField[] = [
  { kind: 'text', name: 'firstName', label: 'First Name (of group member)', required: true },
  { kind: 'text', name: 'lastName', label: 'Last Name', required: true },
]

const contactFields: ExtraField[] = [
  { kind: 'text', name: 'email', label: 'Email address', required: true },
  { kind: 'text', name: 'phone', label: 'Telephone contact', required: true },
]

const addressFields: ExtraField[] = [
  { kind: 'text', name: 'address1', label: 'Address Line 1', required: true },
  { kind: 'text', name: 'address2', label: 'Address Line 2' },
  { kind: 'text', name: 'city', label: 'City' },
  { kind: 'text', name: 'state', label: 'State / Province' },
  { kind: 'text', name: 'postal', label: 'ZIP / Postal Code' },
  { kind: 'text', name: 'country', label: 'Country' },
]

const investmentFields: ExtraField[] = [
  { kind: 'text', name: 'scdoNames', label: 'Name of SCDO(s) acquired' },
  { kind: 'text', name: 'seriesIsin', label: 'Series / ISIN (if known)' },
  { kind: 'number', name: 'purchaseAmount', label: 'Purchase amount (in $AUD)' },
  { kind: 'number', name: 'lossAmount', label: 'Amount of loss (in $AUD)' },
  { kind: 'date', name: 'acquisitionDate', label: 'Date of acquisition of SCDO (if known)' },
  { kind: 'date', name: 'soldDate', label: 'Date sold (if known)' },
  { kind: 'date', name: 'lastPaymentDate', label: 'Date of last payment received (if known)' },
]

export function InvestmentDetailedForm({
  caseData,
  config,
}: {
  caseData: CaseDetail
  config: CaseFormConfig
}) {
  const extras = config.investmentExtras ?? []
  const allFields = useMemo(
    () => [...identityFields, ...extras, ...contactFields, ...addressFields, ...investmentFields],
    [extras],
  )

  const [values, setValues] = useState<Record<string, string>>({})
  const [supportingFiles, setSupportingFiles] = useState<File[]>([])
  const [statDeclarationFiles, setStatDeclarationFiles] = useState<File[]>([])
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
      // Both file groups go to the same `documents` array; we tag them
      // with a `category` so admin can tell them apart.
      const taggedFiles: File[] = [...supportingFiles, ...statDeclarationFiles]
      await submitRegistration({
        caseSlug: caseData.slug,
        caseTitle: caseData.title,
        formType: 'investment-detailed',
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
          ...Object.fromEntries(investmentFields.map((f) => [f.name, values[f.name] ?? ''])),
          ...Object.fromEntries(extras.map((f) => [f.name, values[f.name] ?? ''])),
          supportingFileCount: supportingFiles.length,
          statDeclarationFileCount: statDeclarationFiles.length,
          ...(config.hiddenContext ?? {}),
        },
        files: taggedFiles,
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
        <SectionHeader label="Group member identity" hint="Name of the person or entity who held an interest in a Claim SCDO." />
        {identityFields.map((f) => (
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
            <SectionHeader label="Capacity & funding" />
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

        <SectionHeader label="Contact details" />
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

        <SectionHeader
          label="Investment information"
          hint="Please provide as much of the below information as possible, to the best of your knowledge."
        />
        {investmentFields.map((f) => (
          <ExtraFieldInput
            key={f.name}
            field={f}
            value={values[f.name] ?? ''}
            onChange={setValue(f.name)}
            error={errors[f.name]}
          />
        ))}

        <SectionHeader label="Supporting documents" />
        <FileUploadField
          label="Supporting documents (holding statements, contract notes, trade info)"
          helper="Excel preferred (but not essential) for trade information if claiming on behalf of multiple funds."
          maxSizeMb={30}
          accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/*"
          files={supportingFiles}
          onChange={setSupportingFiles}
        />

        <SectionHeader
          label="Statutory declaration (optional)"
          hint="Only required if you cannot provide all information requested above, e.g. records have been lost."
        />
        <div className="col-span-full">
          <p className="text-[#555555] text-[12px] leading-[1.6] mb-3">
            If you are unable to provide any of the information requested above, please provide a
            signed statutory declaration explaining your inability and the steps you took to
            obtain the information. The Commonwealth template is available at{' '}
            <a
              href="https://www.ag.gov.au/Publications/Statutory-declarations/Pages/default.aspx"
              target="_blank"
              rel="noopener"
              className="text-[#1C3A64] underline"
            >
              ag.gov.au
            </a>
            .
          </p>
          <FileUploadField
            label="Upload signed statutory declaration"
            maxSizeMb={10}
            accept="application/pdf,image/*"
            files={statDeclarationFiles}
            onChange={setStatDeclarationFiles}
          />
        </div>

        <div className="col-span-full mt-2 text-[#555555] text-[12px] leading-[1.6] bg-[#F4F6FB] border border-[#1C3A64]/10 rounded-xl px-4 py-3">
          <FieldLabel label="Personal information" />
          <FieldHelper text="In accordance with the Court's orders, information in your completed Group Member Registration Form will be provided to Fitch for the purposes of the class action only and to facilitate any settlement." />
        </div>
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

      {config.statutoryDeclarationUrl && (
        <p className="text-[#555555] text-[12px] mt-6 leading-[1.6]">
          The form of statutory declaration is available{' '}
          <a
            href={config.statutoryDeclarationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1C3A64] underline"
          >
            here
          </a>
          .
        </p>
      )}
    </form>
  )
}
