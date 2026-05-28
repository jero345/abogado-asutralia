import type { CaseDetail } from '@/data/caseDetails'
import { getFormConfig } from '@/data/registrationForms'
import { ShareholderForm } from './forms/ShareholderForm'
import { InvestmentDetailedForm } from './forms/InvestmentDetailedForm'
import { InvestmentInterestForm } from './forms/InvestmentInterestForm'
import { VehicleForm } from './forms/VehicleForm'

/**
 * Registration form dispatcher.
 *
 * Picks the right form variant for the case based on `formType` in
 * src/data/registrationForms.ts. If a case isn't configured we fall
 * back to the shareholder form (the legacy behaviour).
 */
export function CaseRegistrationForm({ caseData }: { caseData: CaseDetail }) {
  const config = getFormConfig(caseData.slug)

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
    case 'vehicle':
      return <VehicleForm caseData={caseData} config={config} />
    default:
      return null
  }
}
