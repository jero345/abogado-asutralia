// Registration form schemas.
// Each public class-action page renders one of four form variants;
// the variant is picked by `formType` on the CaseDetail.

export type FormType =
  | 'shareholder'        // Arrium, CuDeco, Phoslock, MDBA — 3-section shareholder form
  | 'investment-detailed' // Fitch SCDO — full trade-info capture
  | 'investment-interest' // Fitch UK / S&P UK / S&P CDO — light "register interest" form
  | 'vehicle'            // Hyundai, Kia — vehicle + signature

// ─── Reusable field declarations ─────────────────────────────────
// Field schema for case-specific extra inputs that vary case-by-case.
// We render these inside the appropriate section of the form
// (between the standard inputs and the supporting-docs section).
export type ExtraField =
  | { kind: 'text'; name: string; label: string; required?: boolean; placeholder?: string; helper?: string }
  | { kind: 'number'; name: string; label: string; required?: boolean; placeholder?: string; helper?: string }
  | { kind: 'date'; name: string; label: string; required?: boolean; helper?: string }
  | { kind: 'textarea'; name: string; label: string; required?: boolean; placeholder?: string; helper?: string; rows?: number }
  | { kind: 'select'; name: string; label: string; required?: boolean; helper?: string; options: { value: string; label: string }[] }
  | { kind: 'radio'; name: string; label: string; required?: boolean; helper?: string; options: { value: string; label: string }[] }
  | { kind: 'checkboxes'; name: string; label: string; required?: boolean; helper?: string; options: { value: string; label: string }[] }

// Per-case configuration. Lives next to the CaseDetail (linked by slug).
export interface CaseFormConfig {
  caseSlug: string
  formType: FormType
  /** Email the admin sends notifications to (used later by Resend). */
  notifyEmail: string
  /** Optional hidden context appended to every submission's payload —
   * used so Hyundai/Kia (which share a form & email) record which brand. */
  hiddenContext?: Record<string, string>
  /** Form-type-specific extra fields injected into the right section. */
  shareholderExtras?: {
    /** Header text for the shares-holding block (e.g. "Number of Arrium shares held"). */
    holdingsHeading?: string
    fields: ExtraField[]
  }
  investmentExtras?: ExtraField[]
  vehicleExtras?: {
    /** Vehicle model options for the Model dropdown. */
    models?: { value: string; label: string }[]
  }
  /** Optional intro paragraph rendered above the form. */
  intro?: string
}

// ─── Per-case configurations ─────────────────────────────────────
export const caseFormConfigs: CaseFormConfig[] = [
  // ─── SHAREHOLDER ─────────────────────────────────────────────
  {
    caseSlug: 'arrium',
    formType: 'shareholder',
    notifyEmail: 'arrium@bantongroup.com',
    shareholderExtras: {
      holdingsHeading: 'Arrium shareholding',
      fields: [
        {
          kind: 'number',
          name: 'sharesAt18Aug2014',
          label: 'Number of Arrium shares held at close of trade 18 August 2014',
          required: true,
          helper: 'This is the opening balance on the shareholder register.',
        },
        {
          kind: 'number',
          name: 'sharesAt4Apr2016',
          label: 'Number of Arrium shares held at close of trade 4 April 2016',
          required: true,
          helper: 'This is the closing balance on the shareholder register.',
        },
      ],
    },
  },
  {
    caseSlug: 'cudeco',
    formType: 'shareholder',
    notifyEmail: 'CuDeco@bantongroup.com',
    shareholderExtras: {
      holdingsHeading: 'CuDeco shareholding',
      fields: [
        {
          kind: 'number',
          name: 'sharesAtPeriodStart',
          label: 'Number of CuDeco shares held at start of the relevant period',
          required: true,
        },
        {
          kind: 'number',
          name: 'sharesAtPeriodEnd',
          label: 'Number of CuDeco shares held at end of the relevant period',
          required: true,
        },
      ],
    },
  },
  {
    caseSlug: 'phoslock',
    formType: 'shareholder',
    notifyEmail: 'phoslockclassaction@bantongroup.com',
    shareholderExtras: {
      holdingsHeading: 'Phoslock shareholding',
      fields: [
        {
          kind: 'number',
          name: 'sharesAtPeriodStart',
          label: 'Number of Phoslock shares held at start of the relevant period',
          required: true,
        },
        {
          kind: 'number',
          name: 'sharesAtPeriodEnd',
          label: 'Number of Phoslock shares held at end of the relevant period',
          required: true,
        },
      ],
    },
  },
  {
    caseSlug: 'murray-darling',
    formType: 'shareholder',
    notifyEmail: 'mdbaclassaction@bantongroup.com',
    shareholderExtras: {
      holdingsHeading: 'Your interest in the Murray-Darling Basin',
      fields: [
        {
          kind: 'textarea',
          name: 'interestDescription',
          label: 'Brief description of your interest or loss',
          required: true,
          rows: 4,
          helper:
            'Examples: water entitlements held, land affected, business losses suffered in connection with the Basin Plan.',
        },
      ],
    },
  },

  // ─── INVESTMENT (DETAILED) ───────────────────────────────────
  {
    caseSlug: 'fitch-scdo',
    formType: 'investment-detailed',
    notifyEmail: 'fitchcdos@bantongroup.com',
    investmentExtras: [
      {
        kind: 'radio',
        name: 'fundingStatus',
        label: 'Whether the group member is a Funded Group Member or an Unfunded Group Member',
        required: true,
        options: [
          { value: 'funded', label: 'Funded' },
          { value: 'unfunded', label: 'Unfunded' },
        ],
      },
      {
        kind: 'checkboxes',
        name: 'capacities',
        label: 'In what capacity did you hold an interest/interests in the Claim SCDO(s)?',
        required: true,
        options: [
          { value: 'acquired', label: 'Acquired interest(s) in the Claim SCDO(s)' },
          { value: 'facilitated', label: 'Facilitated or provided services to another person/persons to acquire an interest/interests in the Claim SCDO(s)' },
          { value: 'advised', label: 'Advised another person/persons to acquire an interest/interests in the Claim SCDO(s) or promoted the Claim SCDO(s) to another/others' },
          { value: 'on-behalf', label: 'Acquired the Claim SCDO(s) on behalf of another/others' },
          { value: 'sold', label: 'Sold the Claim SCDO(s)' },
          { value: 'other', label: 'Otherwise dealt in the Claim SCDO(s)' },
        ],
      },
      { kind: 'text', name: 'personCompleting', label: 'Person completing registration', required: true },
      { kind: 'text', name: 'completingAuthority', label: 'Authority of person completing this form (e.g. company director, lawyer)', required: true },
    ],
  },

  // ─── INVESTMENT (LIGHT — register interest) ─────────────────
  {
    caseSlug: 'fitch-ratings-uk',
    formType: 'investment-interest',
    notifyEmail: 'fitchukclaim@bantongroup.com',
  },
  {
    caseSlug: 'sp-global-uk',
    formType: 'investment-interest',
    notifyEmail: 'standardandpoorsukclaim@bantongroup.com',
  },
  {
    caseSlug: 'sp-cdo-cpdo',
    formType: 'investment-interest',
    notifyEmail: 'sandpcdos@bantongroup.com',
  },

  // ─── VEHICLE (Hyundai + Kia share email and template) ───────
  {
    caseSlug: 'hyundai-abs',
    formType: 'vehicle',
    notifyEmail: 'Hyundaikia@bantongroup.com',
    hiddenContext: { brand: 'Hyundai' },
    intro:
      'The Hyundai ABS Class Action concerns allegations of loss arising from a defect present in Hyundai brand vehicle models sold in Australia between 2005 and 2019, which breached the standards required under the Australian Consumer Law (ACL). If you, or a person or entity you represent, purchased, leased or otherwise acquired a legal interest in one or more of the Affected Vehicles, you may be eligible to participate.',
    vehicleExtras: {
      models: [
        { value: 'i30', label: 'i30' },
        { value: 'tucson', label: 'Tucson' },
        { value: 'santa-fe', label: 'Santa Fe' },
        { value: 'elantra', label: 'Elantra' },
        { value: 'accent', label: 'Accent' },
        { value: 'getz', label: 'Getz' },
        { value: 'i20', label: 'i20' },
        { value: 'ix35', label: 'iX35' },
        { value: 'sonata', label: 'Sonata' },
        { value: 'other', label: 'Other Hyundai model' },
      ],
    },
  },
  {
    caseSlug: 'kia-abs',
    formType: 'vehicle',
    notifyEmail: 'Hyundaikia@bantongroup.com',
    hiddenContext: { brand: 'Kia' },
    intro:
      'The Kia ABS Class Action concerns allegations of loss arising from a defect present in Kia brand vehicle models sold in Australia between 2005 and 2019, which breached the standards required under the Australian Consumer Law (ACL). If you, or a person or entity you represent, purchased, leased or otherwise acquired a legal interest in one or more of the Affected Vehicles, you may be eligible to participate.',
    vehicleExtras: {
      models: [
        { value: 'cerato', label: 'Cerato' },
        { value: 'rio', label: 'Rio' },
        { value: 'sportage', label: 'Sportage' },
        { value: 'sorento', label: 'Sorento' },
        { value: 'carnival', label: 'Carnival' },
        { value: 'picanto', label: 'Picanto' },
        { value: 'soul', label: 'Soul' },
        { value: 'optima', label: 'Optima' },
        { value: 'stinger', label: 'Stinger' },
        { value: 'other', label: 'Other Kia model' },
      ],
    },
  },
]

export function getFormConfig(slug: string): CaseFormConfig | undefined {
  return caseFormConfigs.find((c) => c.caseSlug === slug)
}
