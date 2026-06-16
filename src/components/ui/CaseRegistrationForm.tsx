import type { CaseDetail } from '@/data/caseDetails'
import { resolveFormConfig } from '@/data/registrationForms'
import { ShareholderForm } from './forms/ShareholderForm'
import { InvestmentDetailedForm } from './forms/InvestmentDetailedForm'
import { InvestmentInterestForm } from './forms/InvestmentInterestForm'
import { ClaimDetailedForm } from './forms/ClaimDetailedForm'
import { MiniInterestForm } from './forms/MiniInterestForm'
import { CustomForm } from './forms/CustomForm'
import { VehicleForm } from './forms/VehicleForm'

/**
 * Registration form dispatcher.
 *
 * Picks the right form variant for the case based on `formType` in
 * src/data/registrationForms.ts. If a case isn't configured we fall
 * back to the shareholder form (the legacy behaviour).
 */
export function CaseRegistrationForm({ caseData }: { caseData: CaseDetail }) {
  // Embedded Formstack form (URL set on the case).
  if (caseData.formType === 'formstack') {
    if (!caseData.formstackUrl) {
      return (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 text-[13px] rounded-xl p-4">
          This matter is set to use a Formstack form but no form URL has been configured yet.
        </div>
      )
    }
    return (
      <iframe
        src={caseData.formstackUrl}
        title={`${caseData.title} registration form`}
        className="w-full min-h-[1000px] border-0 rounded-xl bg-white"
        loading="lazy"
      />
    )
  }

  // Admin-built custom form: caseData.formType looks like "custom:<form id>".
  if (caseData.formType?.startsWith('custom:')) {
    return <CustomForm caseData={caseData} formId={caseData.formType.slice('custom:'.length)} />
  }

  const config = resolveFormConfig(caseData.slug, caseData.formType, caseData.formNotifyEmail)

  if (!config) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-900 text-[13px] rounded-xl p-4">
        Registration is not currently available online for this matter. Please email{' '}
        {caseData.email ? (
          <a href={`mailto:${caseData.email}`} className="underline">
            {caseData.email}
          </a>
        ) : (
          'enquiries@bantongroup.com'
        )}{' '}
        to register.
      </div>
    )
  }

  switch (config.formType) {
    case 'shareholder':
      return <ShareholderForm caseData={caseData} config={config} />
    case 'investment-detailed':
      return <InvestmentDetailedForm caseData={caseData} config={config} />
    case 'investment-interest':
      return <InvestmentInterestForm caseData={caseData} config={config} />
    case 'claim-detailed':
      return <ClaimDetailedForm caseData={caseData} config={config} />
    case 'mini-interest':
      return <MiniInterestForm caseData={caseData} config={config} />
    case 'vehicle':
      return <VehicleForm caseData={caseData} config={config} />
    default:
      return null
  }
}
