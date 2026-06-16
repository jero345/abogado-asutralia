// Registration form schemas.
// Each public class-action page renders one of four form variants;
// the variant is picked by `formType` on the CaseDetail.

export type FormType =
  | 'shareholder'        // Arrium, CuDeco, Phoslock, MDBA — 3-section shareholder form
  | 'investment-detailed' // Fitch SCDO — full trade-info capture
  | 'investment-interest' // Fitch UK / S&P UK — light "register interest" form
  | 'claim-detailed'     // S&P CDO & CPDO — detailed "register your claim" form
  | 'mini-interest'      // Investigations / formless matters — minimal interest form
  | 'formstack'          // Embed an external Formstack form (URL on the case)
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
  /** Optional "form of statutory declaration" PDF link rendered at the foot of the form. */
  statutoryDeclarationUrl?: string
  /** Optional "Contact us" note rendered at the foot of the form. The email is
   * shown as a mailto link after the text. */
  contactNote?: { text: string; email: string }
  /** Label for the financial instrument in the claim-detailed form
   * (e.g. 'CDO' for S&P, 'SCDO' for Fitch). Defaults to 'CDO'. */
  instrumentLabel?: string
  /** Dropdown for the mini-interest form. Defaults to an "I am a…" role select. */
  interestSelect?: { label: string; options: string[] }
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
    statutoryDeclarationUrl:
      'https://ehymdracjodyxiyeimfb.supabase.co/storage/v1/object/public/article-documents/cases-migrated/Fitch-Form-of-Statutory-Declaration-for-Registrants.pdf',
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
    contactNote: {
      text:
        'If you are uncertain whether you are a represented person, or you would like further information, please contact Banton Group by email at',
      email: 'standardandpoorsukclaim@bantongroup.com',
    },
  },
  {
    caseSlug: 'sp-cdo-cpdo',
    formType: 'claim-detailed',
    instrumentLabel: 'CDO',
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

  // ─── MINI INTEREST (investigations / formless matters) ──────
  {
    caseSlug: 'salt-lake',
    formType: 'mini-interest',
    notifyEmail: 'enquiries@bantongroup.com',
  },
  {
    caseSlug: 'zip-co',
    formType: 'mini-interest',
    notifyEmail: 'enquiries@bantongroup.com',
  },
  {
    caseSlug: 'highlow',
    formType: 'mini-interest',
    notifyEmail: 'enquiries@bantongroup.com',
  },
  {
    caseSlug: 'tyro',
    formType: 'mini-interest',
    notifyEmail: 'enquiries@bantongroup.com',
  },
]

export function getFormConfig(slug: string): CaseFormConfig | undefined {
  return caseFormConfigs.find((c) => c.caseSlug === slug)
}

// Human-friendly metadata for each form type — shared by the admin (Forms
// section, Registrations labels, Case editor) so labels stay consistent.
export const FORM_TYPE_META: Record<FormType, { label: string; description: string }> = {
  shareholder: {
    label: 'Shareholder',
    description: 'Securities / shareholder matters — identity, shareholding details and contact.',
  },
  'investment-detailed': {
    label: 'Investment (detailed)',
    description: 'Full trade-info capture (Fitch SCDO) — investment details + supporting documents.',
  },
  'investment-interest': {
    label: 'Register interest (light)',
    description: 'Light "register your interest" form — identity, contact and consent.',
  },
  'claim-detailed': {
    label: 'Claim (detailed)',
    description: 'Detailed claim form (S&P CDO) — class member, instruments acquired and a signed declaration.',
  },
  'mini-interest': {
    label: 'Mini interest',
    description: 'Minimal form for investigations — name, contact, a dropdown and privacy consent.',
  },
  formstack: {
    label: 'Formstack (embedded)',
    description: "Embed an existing Formstack form via its URL. Submissions can flow into this panel via the Formstack webhook.",
  },
  vehicle: {
    label: 'Vehicle',
    description: 'Vehicle matters (Hyundai / Kia) — vehicle details + signature.',
  },
}

export const FORM_TYPES = Object.keys(FORM_TYPE_META) as FormType[]

/**
 * Resolve the effective form config for a case. A `form_type` assigned in the
 * admin (DB) takes precedence over the hard-coded config; any code-defined
 * extras for that slug (custom fields, instrument label…) are preserved.
 */
export function resolveFormConfig(
  slug: string,
  dbFormType?: string | null,
  dbNotifyEmail?: string | null,
): CaseFormConfig | undefined {
  const hardcoded = getFormConfig(slug)
  const dbValid = dbFormType && dbFormType in FORM_TYPE_META ? (dbFormType as FormType) : undefined
  const formType = dbValid ?? hardcoded?.formType
  if (!formType) return undefined
  return {
    ...(hardcoded ?? {}),
    caseSlug: slug,
    formType,
    notifyEmail: dbNotifyEmail || hardcoded?.notifyEmail || 'enquiries@bantongroup.com',
  }
}
