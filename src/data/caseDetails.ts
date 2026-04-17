// Class Action case detail pages.
// Content is taken verbatim (or as close as possible) from bantongroup.com
// as of April 2026. PDF links still point to the live WordPress uploads
// folder; migrate to /public/docs/ when the WP instance is retired.

export type CaseStatus = 'Active' | 'Settled' | 'On Appeal' | 'Investigating'

export type CaseBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'quote'; text: string; attribution?: string }
  | { kind: 'callout'; title: string; text: string; tone?: 'info' | 'warning' | 'success' }
  | { kind: 'documents'; heading?: string; items: { label: string; href: string }[] }
  | { kind: 'timeline'; heading?: string; items: { label: string; date: string }[] }
  | { kind: 'externalLink'; label: string; href: string; description?: string }
  | { kind: 'table'; heading?: string; columns: string[]; rows: (string | { link: string; label: string })[][] }

// ─── Registration form schema ───────────────────────────────────────
export type FormField =
  | { kind: 'text'; name: string; label: string; required?: boolean; placeholder?: string; helper?: string }
  | { kind: 'email'; name: string; label: string; required?: boolean; placeholder?: string; helper?: string }
  | { kind: 'tel'; name: string; label: string; required?: boolean; placeholder?: string; helper?: string }
  | { kind: 'number'; name: string; label: string; required?: boolean; placeholder?: string; helper?: string }
  | { kind: 'textarea'; name: string; label: string; required?: boolean; placeholder?: string; helper?: string; rows?: number }
  | { kind: 'radio'; name: string; label: string; required?: boolean; options: { value: string; label: string }[]; helper?: string }
  | { kind: 'select'; name: string; label: string; required?: boolean; options: { value: string; label: string }[]; helper?: string }
  | { kind: 'divider'; label: string }

export interface CaseDetail {
  slug: string
  title: string
  status: CaseStatus
  category: string
  year: string
  court?: string
  leadPlaintiff?: string
  fileNumber?: string
  funder?: string
  /** Email for case-specific enquiries. */
  email?: string
  /** Legacy WordPress registration flow URL. */
  registrationUrl?: string
  /** Does this case have an internal /register page? */
  hasInternalForm?: boolean
  /** One-line summary used on the list card header. */
  summary: string
  /** Main body content as structured blocks. */
  content: CaseBlock[]
  /** Case-specific form field schema (extends the base shared fields). */
  caseSpecificFields?: FormField[]
}

// ─── Shared base fields every registration form uses ────────────────
// These mirror the Formstack-powered forms on bantongroup.com.
export const baseFields: FormField[] = [
  { kind: 'divider', label: 'Personal details' },
  { kind: 'text', name: 'firstName', label: 'First Name', required: true },
  { kind: 'text', name: 'lastName', label: 'Last Name', required: true },
  { kind: 'tel', name: 'phone', label: 'Phone Number', required: true, placeholder: '+61 4__ ___ ___' },
  { kind: 'email', name: 'email', label: 'Email', required: true, placeholder: 'your@email.com' },

  { kind: 'divider', label: 'Address' },
  { kind: 'text', name: 'address1', label: 'Address Line 1', required: true },
  { kind: 'text', name: 'address2', label: 'Address Line 2' },
  { kind: 'text', name: 'city', label: 'City' },
  { kind: 'text', name: 'state', label: 'State / Province' },
  { kind: 'text', name: 'postal', label: 'ZIP / Postal Code' },
  { kind: 'text', name: 'country', label: 'Country' },

  { kind: 'divider', label: 'Shareholding details' },
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
  },
]

// Retainer field appended at the end of each form.
export const retainerField: FormField = {
  kind: 'radio',
  name: 'retainer',
  label:
    'By completing this form, you will be a registered group member in these proceedings. Do you wish to be issued with a retainer from Banton Group?',
  required: true,
  options: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ],
}

export const cases: CaseDetail[] = [
  // ─── ARRIUM ─────────────────────────────────────────────────────────
  {
    slug: 'arrium',
    title: 'Arrium Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2020',
    court: 'Supreme Court of Victoria',
    fileNumber: 'S ECI 2020 03281',
    funder: 'Equite Capital No 1 Pte Ltd (GCO)',
    email: 'arrium@bantongroup.com',
    hasInternalForm: true,
    summary:
      'Class action against former directors of Arrium Limited (ASX:ARI) and auditor KPMG for misleading investors through inflated share prices.',
    content: [
      { kind: 'h2', text: 'Background' },
      {
        kind: 'p',
        text:
          'Banton Group represents the Plaintiffs in a class action for shareholders against certain former directors of Arrium Limited (ASX:ARI) (the Director Defendants) and Arrium\u2019s former auditors KPMG. The action alleges that the Director Defendants misled investors by overstating Arrium\u2019s financial position through failure to properly impair assets in the FY14 Financial Report, 1H15 Review and FY15 Financial Report (disclosed in ASX Announcements). KPMG is accused of failing to conduct audits and reviews to Australian Auditing Standards.',
      },
      {
        kind: 'p',
        text:
          'The class action contends that investors suffered loss by purchasing shares at inflated value or in circumstances where they would not have done so if they had been aware of Arrium\u2019s true financial position. The Defendants deny the allegations and are defending the proceedings.',
      },

      { kind: 'h2', text: "Court's Orders" },
      {
        kind: 'p',
        text:
          'The Supreme Court of Victoria has ordered a registration and opt out process for group members in the Arrium Class Action. Court documentation, notices and forms will remain on this page throughout the action.',
      },

      {
        kind: 'documents',
        heading: 'Key documents',
        items: [
          { label: "Court's Orders, Notice and Registration Form", href: 'https://bantongroup.com/wp-content/uploads/2025/09/3281-20-ECI-7-Aug-2025-Bogan-v-Smedley-Orders.pdf' },
          { label: 'Writ and Statement of Claim (14.08.2020)', href: 'https://bantongroup.com/wp-content/uploads/2025/09/1.-Writ-Statement-of-Claim-14.08.2020-3441-6780-8784-v1.pdf' },
          { label: 'Amended Defence of the Director Defendants', href: 'https://bantongroup.com/wp-content/uploads/2025/09/First-to-Fourth-Defendants-Amended-Defence.pdf' },
          { label: 'Defence of KPMG', href: 'https://bantongroup.com/wp-content/uploads/2025/09/Fifth-Defendant-Defence.pdf' },
          { label: 'Further Amended Group Proceeding Summary Statement (23.06.2025)', href: 'https://bantongroup.com/wp-content/uploads/2025/09/Further-Amended-Group-Proceeding-Summary-Statement-23.06.2025-1.pdf' },
          { label: 'Further Amended Funding Information Summary Statement (23 June 2025)', href: 'https://bantongroup.com/wp-content/uploads/2025/09/Further-Amended-Funding-Information-Summary-Statement-23-June-2025-1.pdf' },
        ],
      },

      { kind: 'h2', text: 'Funding' },
      {
        kind: 'p',
        text:
          'The Plaintiffs and group members originally entered into litigation funding agreements with Equite Capital No 1 Pte Ltd. The Court subsequently made a Group Costs Order under section 33ZDA(1) of the Supreme Court Act 1986 (VIC), and those funding agreements were terminated.',
      },
      {
        kind: 'p',
        text:
          'Under the Group Costs Order, Banton Group finances the legal costs and disburses payments: 40% of any damages or settlement to Banton Group and 60% to group members. If the class action is unsuccessful, group members pay no costs.',
      },

      {
        kind: 'timeline',
        heading: 'Current status',
        items: [
          { label: "Defendants' evidence due", date: '19 December 2025' },
          { label: 'Registration / opt-out deadline (4pm AEDT)', date: '15 December 2025' },
          { label: 'Expert reply evidence due', date: '24 February 2026' },
          { label: 'Court-ordered mediation', date: '31 March 2026' },
          { label: 'Settlement participation window', date: 'Up to 20 July 2026' },
          { label: 'Trial commencement (6-week estimate)', date: '3 August 2026' },
        ],
      },

      { kind: 'h2', text: 'Registration in the Arrium Class Action' },
      {
        kind: 'p',
        text:
          'This case is being run as an open class action, but is currently the subject of a class closure order. The effect of that order is that group members must register their claim by 4pm AEDT on 15 December 2025 in order to benefit from any settlement of the class action that may be reached at any time up to 20 July 2026.',
      },
      {
        kind: 'p',
        text:
          'Registrations are now being accepted from persons who acquired an interest in Arrium ordinary shares traded during the period 19 August 2014 to 4 April 2016 (inclusive) (Relevant Period).',
      },
      {
        kind: 'p',
        text: 'You are eligible to register if you purchased Arrium ordinary shares in the Relevant Period and you are not:',
      },
      {
        kind: 'ul',
        items: [
          'a related party, related body corporate, associated entity or officer or close associate of Arrium (as defined by the Corporations Act 2001 (Cth)); or',
          'a judge or the Chief Justice of the Supreme Court of Victoria.',
        ],
      },

      { kind: 'h3', text: 'You may register by' },
      {
        kind: 'ul',
        items: [
          'Completing the online registration form; or',
          'Printing or downloading the Registration Form, completing it with your supporting documents and emailing it to arrium@bantongroup.com; or',
          'Posting it to Banton Group, Level 12, 60 Martin Place, Sydney NSW 2000.',
        ],
      },
      {
        kind: 'p',
        text:
          'If you are an agent or trustee of a claimant, you may complete the registration (online or in hard copy) on the claimant\u2019s behalf.',
      },

      { kind: 'h3', text: 'Information required for online registration' },
      {
        kind: 'ul',
        items: [
          'An email address which you check regularly;',
          "The claimant's Holder Identification Number (HIN) or relevant Security Holder Reference Number (SRN);",
          "If the claimant's shares are held on his, her or its behalf by another person or entity (such as a broker or custodian), details of both of those persons or entities and the capacities in which they held those shares;",
          'If the claimant holds the shares jointly with another person, that other person\u2019s name; and',
          'If the claimant has multiple holdings of shares, separate transaction details for each holding.',
        ],
      },
      {
        kind: 'p',
        text:
          "You will also be asked to provide details about the claimant's shareholding(s) including:",
      },
      {
        kind: 'ul',
        items: [
          'The number of Arrium ordinary shares held at close of trade on 18 August 2014;',
          "The date, quantity and price of the claimant's Arrium share purchases from 19 August 2014 to 4 April 2016;",
          "The date, quantity and price of the claimant's Arrium shares sold from the commencement of trading on 19 August 2014 to 4 April 2016;",
          'The number of Arrium ordinary shares held at close of trade on 4 April 2016.',
        ],
      },
      {
        kind: 'p',
        text:
          'You will also be asked to attach your supporting documents of the above share holding purchases and sales and holdings.',
      },

      { kind: 'h3', text: 'Institutional Investors' },
      {
        kind: 'p',
        text:
          'Please contact Banton Group at arrium@bantongroup.com to provide your contact details and to obtain an investment information template to complete and return to us.',
      },

      { kind: 'h3', text: 'Privacy and confidentiality' },
      {
        kind: 'p',
        text:
          'The privacy and confidentiality of our clients and group members is very important to Banton Group. For the current version of our Privacy Policy please see our Privacy Policy page.',
      },
    ],

    caseSpecificFields: [
      { kind: 'divider', label: 'Arrium shareholding' },
      {
        kind: 'number',
        name: 'sharesHeld_18Aug2014',
        label: 'Number of Arrium shares held at close of trade 18 August 2014',
        helper: 'This is the opening balance on the shareholder register',
      },
      {
        kind: 'number',
        name: 'sharesHeld_04Apr2016',
        label: 'Number of Arrium shares held at close of trade 4 April 2016',
        helper: 'This is the closing balance on the shareholder register',
      },
      {
        kind: 'textarea',
        name: 'purchaseDetails',
        label: 'Share purchase details (19 August 2014 - 4 April 2016)',
        rows: 3,
        helper: 'For each purchase: date, quantity and price',
      },
      {
        kind: 'textarea',
        name: 'saleDetails',
        label: 'Share sale details (19 August 2014 - 4 April 2016)',
        rows: 3,
        helper: 'For each sale: date, quantity and price',
      },
    ],
  },

  // ─── CUDECO ─────────────────────────────────────────────────────────
  {
    slug: 'cudeco',
    title: 'CuDeco Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2022',
    court: 'Federal Court of Australia',
    fileNumber: 'VID 176 of 2022',
    funder: 'Equite Capital No 4 Pte Ltd',
    email: 'CuDeco@bantongroup.com',
    hasInternalForm: true,
    summary:
      'Shareholders of ASX-listed CuDeco Limited (In Liquidation) allege misleading statements about the Rocklands copper mine. KPMG settled September 2025; directors trial listed for 29 June 2026.',
    content: [
      { kind: 'h2', text: 'How did we get here?' },
      {
        kind: 'p',
        text:
          "The CuDeco Class Action was commenced in April 2022. It arose from allegations that CuDeco Limited made misleading statements about its Rocklands copper mine in north-west Queensland, including representations about ore reserves, feasibility and the mine\u2019s net present value which caused the price of CuDeco shares to be artificially inflated.",
      },
      {
        kind: 'p',
        text:
          'KPMG audited CuDeco\u2019s financial reports for the years ending 30 June 2016 and 30 June 2017. The claim against KPMG alleged that its audit opinions were misleading or deceptive, in circumstances where CuDeco\u2019s financial reports did not give a true and fair view of the company\u2019s financial position.',
      },
      {
        kind: 'p',
        text:
          'After a number of mediations, a settlement with KPMG was reached in September 2025 and approved by the Federal Court in December 2025. The claims against the directors who are alleged to have been responsible for the misleading statements about the mine remain on foot and are proceeding to trial.',
      },

      {
        kind: 'callout',
        title: 'KPMG settlement \u2014 status',
        tone: 'success',
        text:
          'Settlement reached with KPMG in September 2025. KPMG paid the settlement sum on 16 January 2026. Justice Bennett approved the distribution methodology on 10 March 2026. Claims against the directors continue \u2014 trial listed to commence 29 June 2026.',
      },

      {
        kind: 'documents',
        heading: 'Recent court orders',
        items: [
          { label: "Court's orders dated 19 March 2026", href: 'https://bantongroup.com/wp-content/uploads/2026/04/2026-03-19_Federal-Court-Order-Justice-Moshinsky.pdf' },
          { label: "Court's orders dated 16 March 2026", href: 'https://bantongroup.com/wp-content/uploads/2026/04/2026-03-16_Federal-Court-Order-Justice-Bennett_E5535951_v1-1.pdf' },
          { label: "Court's orders dated 16 March 2026 (Suppressed)", href: 'https://bantongroup.com/wp-content/uploads/2026/04/2026-03-16_Federal-Court-Order-Justice-Bennett-Suppressed.pdf' },
        ],
      },

      {
        kind: 'documents',
        heading: 'Key documents',
        items: [
          { label: 'Further Amended Statement of Claim (8 August 2025)', href: 'https://bantongroup.com/wp-content/uploads/2025/10/2025-08-08-Further-Amended-Statement-of-Claim-dated-8-August-2025-sealed-1.pdf' },
          { label: "Third Respondent's Defence", href: 'https://bantongroup.com/wp-content/uploads/2025/10/2023-03-28-Defence-of-Third-Respondent-Sealed.pdf' },
          { label: "KPMG's Defence (Fourth Respondent)", href: 'https://bantongroup.com/wp-content/uploads/2025/10/2023-04-11-Defence-of-Fourth-Respondent-Sealed.pdf' },
          { label: 'Notice of Proposed Settlement', href: 'https://bantongroup.com/wp-content/uploads/2025/10/Cudeco-Notice-of-Settlement.pdf' },
          { label: "Court's Orders (9 October 2025)", href: 'https://bantongroup.com/wp-content/uploads/2025/10/2025-10-09_Federal-Court-Order-Justice-Bennett_E4791847_v1.pdf' },
          { label: 'KPMG Settlement Confirmation', href: 'https://bantongroup.com/wp-content/uploads/2026/04/KPMG-Settlement-Confirmation-CuDeco-Class-Action-VID176-of-2022.pdf' },
        ],
      },

      { kind: 'h2', text: 'Are you a group member?' },
      {
        kind: 'p',
        text:
          'You are a group member if you acquired an interest in fully paid ordinary shares in CuDeco Limited during the period between 11 April 2016 and 13 March 2018. While that is the case, you will only be entitled to make a claim in the settlement against KPMG if you purchased CuDeco Shares on or after 17 November 2016. That is because that is the date on which the Applicant\u2019s claim against KPMG commences.',
      },
      { kind: 'h3', text: 'Exclusions from group membership' },
      {
        kind: 'p',
        text: 'You will only be excluded from being a group member if you are:',
      },
      {
        kind: 'ul',
        items: [
          'a related party of CuDeco (i.e. Directors, relatives, controlling entities);',
          'a related body corporate of CuDeco (i.e. holding company, subsidiary company, subsidiary of holding company);',
          'an associated entity of CuDeco (i.e. an entity is associated with another entity if they are members of the same corporate group, or if one entity has a certain degree of control over the other);',
          'an officer or a close associate of CuDeco (e.g. director, secretary, receiver, administrator, liquidator, trustee);',
          'a Justice, Registrar, District Registrar or Deputy District Registrar of the Federal Court of Australia or the High Court of Australia;',
          'Sinosteel Equipment & Engineering Ltd (Sinosteel);',
          'China Oceanwide International Investment Co. Limited, Oceanwide International Resources Investment Co., Limited, China Oceanwide Holdings Group Co., Ltd, Oceanwide Group Co., Ltd, Oceanwide Holdings Co., Ltd, or Zhiqlang Lu;',
          'Rich Lead Investments Pte Ltd; or',
          'New Apex Asia Investment Limited.',
        ],
      },
      {
        kind: 'p',
        text:
          'If you are unsure whether or not you are a Group Member, you should contact Banton Group at CuDeco@bantongroup.com or alternatively seek your own legal advice.',
      },

      { kind: 'h2', text: 'Are Group Members liable for legal costs?' },
      {
        kind: 'p',
        text:
          'The Applicant and some Group Members have retained Banton Group to act as their solicitors but it is not necessary for you or other Group Members to retain Banton Group to participate as a Group Member.',
      },
      {
        kind: 'p',
        text:
          'The costs of the CuDeco Class Action are funded by Equite Capital No 4 Pte Ltd (Equite, or the Funder) pursuant to funding agreements entered into between the Funder and the Applicant and some Group Members. During the course of the CuDeco Class Action, the Funder has paid the legal costs, and indemnified the Applicant against potential adverse costs orders and provided security against the possibility of any such adverse costs orders.',
      },
      {
        kind: 'p',
        text:
          "If the proposed settlement of the claim against KPMG is approved by the Court, it is likely that the Court will order that the legal and funding costs of conducting the CuDeco Class Action be deducted from the aggregate Settlement Sum, before calculating each Group Member's entitlement \u2014 i.e. the legal and funding costs of conducting the CuDeco Class Action will be spread equitably among all Group Members participating in the Settlement. Therefore, if you are eligible to participate as a Group Member in the distribution of the Settlement Sum, your share of the settlement (if any) will be calculated and paid to you after deduction of legal and funding costs \u2014 under no circumstances will you, by registering to participate in the proposed Settlement, be liable for \u201Cout of pocket\u201D costs, whether to Banton Group, or the Funder, or otherwise.",
      },

      { kind: 'h2', text: 'Frequently asked questions' },

      { kind: 'h3', text: 'How is the KPMG settlement sum being applied?' },
      { kind: 'p', text: 'The Court approved the KPMG settlement sum to be applied in the following order:' },
      {
        kind: 'ol',
        items: [
          '$2,125 to the Applicant (Leo Toner) for his time and expenses incurred in representing Group Members;',
          'Payment to the litigation funder, Equite Capital No. 4 Pte Ltd (EquiteCap4), for the costs of the independent costs referee (Ms Rosati) who assessed the legal costs in the proceeding;',
          'Reimbursement to EquiteCap4 of all legal costs it funded throughout the proceedings \u2014 covering both the KPMG claim and the directors claim \u2014 as assessed and approved by the Court;',
          '30% of the balance remaining after the above deductions, paid to EquiteCap4 as a partial remuneration for the risks it took in funding the proceedings on behalf of Group Members.',
        ],
      },
      {
        kind: 'p',
        text:
          'The remaining balance of the KPMG settlement sum will be held in an interest-bearing account by Banton Group, pending the outcome of the ongoing claims against the directors and further order of the Court.',
      },

      { kind: 'h3', text: 'Will I receive a payment from the KPMG settlement now?' },
      {
        kind: 'p',
        text:
          'No \u2014 not at this stage. The Court carefully considered whether to distribute the remaining balance to Group Members now, but concluded that doing so would not be in Group Members\u2019 best interests. The main reasons were:',
      },
      {
        kind: 'ul',
        items: [
          'The cost of running a distribution process at this stage would be substantial and would significantly reduce the amount available to Group Members;',
          'The claims against the directors are ongoing, and a single final distribution combining any recovery from the directors with the retained KPMG settlement balance will be far more efficient and cost-effective for Group Members; and',
          'Any interim distribution now could potentially be subject to clawback at the end of the overall proceedings, creating unnecessary uncertainty.',
        ],
      },
      {
        kind: 'p',
        text:
          'The retained balance will continue to earn interest while held in the controlled monies account.',
      },

      { kind: 'h3', text: 'Does the KPMG settlement affect my claim against the directors?' },
      {
        kind: 'p',
        text:
          'No. Although the KPMG settlement sum has been applied predominantly to reimburse legal costs incurred to date, with little or no direct payment flowing to Group Members at this stage, your claim remains fully intact.',
      },
      {
        kind: 'p',
        text:
          'The claims against the directors continue for the full relevant period (11 April 2016 to 13 March 2018), which is longer than the KPMG claim period meaning some Group Members may have additional losses that can only be recovered against the directors.',
      },
      {
        kind: 'p',
        text:
          'Importantly, because all legal costs incurred to date have already been recovered from the KPMG settlement sum and approved by the Court, those costs will not be deducted again from any future recovery against the directors.',
      },

      { kind: 'h3', text: 'Do I need to re-register for the directors claim?' },
      {
        kind: 'p',
        text:
          'Possibly. The directors claim covers a longer period, and you may be contacted and asked to register, particularly if you only registered for the KPMG claim period. We will contact you directly if this is required. Please ensure your contact details are up to date by emailing us at CuDeco@bantongroup.com.',
      },

      { kind: 'h2', text: "What's next?" },
      {
        kind: 'p',
        text:
          'We will keep you updated as the proceedings against the directors progress toward the hearing commencing 29 June 2026. We will also contact you separately if you are required to take any steps in relation to that claim, including any re-registration process.',
      },
    ],

    caseSpecificFields: [
      { kind: 'divider', label: 'CuDeco shareholding' },
      {
        kind: 'number',
        name: 'sharesHeld_10Apr2016',
        label: 'Number of CuDeco shares held at close of trade 10 April 2016',
      },
      {
        kind: 'number',
        name: 'sharesHeld_13Mar2018',
        label: 'Number of CuDeco shares held at close of trade 13 March 2018',
      },
      {
        kind: 'textarea',
        name: 'purchaseDetails',
        label: 'Share purchase details (11 April 2016 - 13 March 2018)',
        rows: 3,
        helper: 'For each purchase: date, quantity and price',
      },
      {
        kind: 'textarea',
        name: 'saleDetails',
        label: 'Share sale details (11 April 2016 - 31 March 2018)',
        rows: 3,
        helper: 'For each sale: date, quantity and price',
      },
    ],
  },

  // ─── FITCH SCDO ─────────────────────────────────────────────────────
  {
    slug: 'fitch-scdo',
    title: 'Fitch Ratings Class Action',
    status: 'Active',
    category: 'Financial Products',
    year: '2022',
    court: 'Federal Court of Australia',
    funder: 'Equite Capital No 2 Pte Ltd',
    email: 'fitchcdos@bantongroup.com',
    hasInternalForm: true,
    summary:
      "Investors in synthetic CDOs rated 'AAA'-'AA-' by Fitch between 2005-2007 seeking damages for deceitful or reckless ratings.",
    content: [
      {
        kind: 'callout',
        title: 'Update: Opt-out and registration extended',
        tone: 'info',
        text:
          'On 9 March 2026, the Federal Court of Australia made orders to extend the deadline for group members to either register or opt-out. This deadline is now set for 4.00pm on 4 April 2026. While we will take your information after this date, please note that late registrations are at the Court\u2019s discretion.',
      },

      { kind: 'h2', text: 'Background' },
      {
        kind: 'p',
        text:
          "Banton Group acts on behalf of investors in a class action against Fitch Ratings, Inc (a company incorporated in Delaware, USA) and Fitch Ratings, Ltd (a company incorporated in the United Kingdom) (together, Fitch). The class action concerns synthetic collateralised debt obligations (SCDOs) assigned a credit rating of 'AAA', 'AA+', 'AA' or 'AA-' by Fitch in and around the period 2005 to 2007.",
      },
      { kind: 'p', text: 'At a high level, the applicants allege that:' },
      {
        kind: 'ul',
        items: [
          "Fitch's ratings of certain SCDOs were not reliable or were not based on reasonable grounds; and",
          'Fitch knew this, or was recklessly indifferent to this, and therefore deceitfully induced investors to purchase their interest in those SCDOs.',
        ],
      },
      { kind: 'p', text: 'Fitch denies the allegations and is defending the class action.' },

      {
        kind: 'documents',
        heading: 'Key documents',
        items: [
          { label: 'Product List \u2014 Updated Global list of SCDOs', href: 'https://bantongroup.com/wp-content/uploads/2025/11/20250904-Updated-Global-list-of-SCDOs.pdf' },
          { label: 'Amended Originating Application', href: 'https://bantongroup.com/wp-content/uploads/2025/11/Amended-Originating-Application.pdf' },
          { label: 'Amended Statement of Claim', href: 'https://bantongroup.com/wp-content/uploads/2025/11/Amended-Statement-of-Claim.pdf' },
          { label: "Fitch's Defence to the Amended Statement of Claim", href: 'https://bantongroup.com/wp-content/uploads/2025/11/2025-06-10-Respondents-Defence-to-the-Amended-Statement-of-Claim-10-June-2025-v1.pdf' },
          { label: 'Notice to Opt Out, Register or Do Nothing', href: 'https://bantongroup.com/wp-content/uploads/2026/03/Fitch-Further-Opt-out-Notice.pdf' },
        ],
      },

      { kind: 'h2', text: 'Group Member definition' },
      { kind: 'p', text: 'You are a group member if you:' },
      {
        kind: 'ol',
        items: [
          'Acquired interests in one or more SCDO assigned credit ratings AAA, AA+, AA or AA- by Fitch using VECTOR 2.2, VECTOR 3.0 and/or VECTOR 3.1 (together, the Claim SCDOs); or',
          'Facilitated the acquisition of interests by other persons in the Claim SCDOs, or provided services, advice or promotion, or acquired/sold/dealt on behalf of others; and',
          'Acquired your interest (or contributed to another\u2019s acquisition) by reason of the publication or dissemination of the ratings in Australia or receipt of the ratings in Australia; and',
          'Have suffered loss or damage by reason of the acquisition \u2014 excluding those persons whose claims were extinguished by final orders in Mid-Coast Council & Anor v Fitch Ratings, Inc & Ors (Federal Court Proceeding NSD 995 of 2014, 25 July 2019).',
        ],
      },
      {
        kind: 'p',
        text:
          'How you acquired an interest in a Claim SCDO \u2014 initial issue, re-sale on a secondary market, or any other acquisition \u2014 does not necessarily prevent you from being a group member.',
      },

      { kind: 'h2', text: 'Are Group Members liable for legal costs?' },
      {
        kind: 'p',
        text:
          'The costs of the Fitch Ratings Class Action are funded by Equite Capital No 2 Pte Ltd (Equite, or the Funder) pursuant to funding agreements entered into between the Funder and the lead applicants. During the course of the Fitch Ratings Class Action, the Funder has paid the legal costs and indemnified the applicants against potential adverse costs orders and provided security against the possibility of any such adverse costs orders.',
      },
      {
        kind: 'p',
        text:
          'Therefore, if you are eligible to participate as a Group Member in the distribution of any proceeds of the proceedings, your share of the proceeds (if any) will be calculated and paid to you after deduction of legal and funding costs \u2014 under no circumstances will you, by registering as a Group Member, be liable for \u201Cout of pocket\u201D costs, whether to Banton Group, or the Funder, or otherwise.',
      },

      {
        kind: 'timeline',
        heading: 'Current status',
        items: [
          { label: 'Applicants and Fitch have given discovery', date: '\u2014' },
          { label: "Applicants' lay evidence filed and served", date: '\u2014' },
          { label: 'Opt out / registration deadline (4pm)', date: '4 April 2026' },
          { label: "Applicants' expert evidence filing", date: '6 March 2026' },
          { label: 'Fitch lay evidence filing', date: '22 May 2026' },
          { label: 'Fitch expert evidence filing', date: '3 July 2026' },
          { label: "Applicants' reply evidence filing", date: '14 August 2026' },
          { label: 'Joint expert reports due', date: '11 September 2026' },
          { label: 'Mediation (no later than)', date: '9 October 2026' },
          { label: 'Trial commencement (6 weeks estimated)', date: '3 May 2027' },
        ],
      },

      { kind: 'h2', text: 'Contact us' },
      {
        kind: 'p',
        text:
          'If you are uncertain whether you are a Group Member, or you would like further information, you can contact Banton Group by email at fitchcdos@bantongroup.com.',
      },
    ],

    caseSpecificFields: [
      { kind: 'divider', label: 'SCDO investment details' },
      {
        kind: 'textarea',
        name: 'scdoList',
        label: 'Claim SCDOs acquired',
        rows: 3,
        helper: 'List the SCDO name/ISIN for each Claim SCDO you acquired an interest in',
      },
      {
        kind: 'select',
        name: 'vectorVersion',
        label: 'Fitch VECTOR version used to rate the SCDO',
        options: [
          { value: '', label: 'Select version' },
          { value: 'vector-2.2', label: 'VECTOR 2.2' },
          { value: 'vector-3.0', label: 'VECTOR 3.0' },
          { value: 'vector-3.1', label: 'VECTOR 3.1' },
          { value: 'unsure', label: "I'm not sure" },
        ],
      },
      {
        kind: 'textarea',
        name: 'acquisitionDetails',
        label: 'Acquisition details (date, quantity, price)',
        rows: 3,
      },
      {
        kind: 'textarea',
        name: 'lossDetails',
        label: 'Brief description of loss or damage suffered',
        rows: 3,
      },
    ],
  },

  // ─── MURRAY DARLING BASIN ───────────────────────────────────────────
  {
    slug: 'murray-darling',
    title: 'Murray Darling Basin Class Action',
    status: 'Active',
    category: 'Environmental',
    year: '2019',
    court: 'NSW Supreme Court',
    fileNumber: '2019/00150651',
    leadPlaintiff: "Doyle's Farm Produce Pty Ltd",
    funder: 'International Litigation Partners No. 8 Pte Ltd (ILP)',
    email: 'mdbaclassaction@bantongroup.com',
    hasInternalForm: true,
    summary:
      'NSW and Victorian water entitlement holders allege the Murray Darling Basin Authority breached its duty of care during 2017-2020 \u2014 the matter was heard by Faulkner J over 40 days and judgment is reserved.',
    content: [
      { kind: 'h2', text: 'Background' },
      {
        kind: 'p',
        text:
          "Banton Group represents Doyle's Farm Produce Pty Ltd and other lead plaintiffs in representative proceedings in the NSW Supreme Court (Proceedings No. 2019/00150651) against the Murray Darling Basin Authority (MDBA) and the Commonwealth of Australia.",
      },
      {
        kind: 'p',
        text:
          'The Plaintiffs claim that the Defendants breached their alleged duty of care owed to the Plaintiffs and group members. The dispute centres on alleged mismanagement involving overbank transfers through the Barmah-Millewa Forest during two periods: 3 October 2017 to 20 January 2018, and 31 August 2018 to 7 January 2019.',
      },
      {
        kind: 'p',
        text:
          "The Plaintiffs claim that the Defendants' conduct resulted in NSW Murray Regulated River general security water entitlement holders, Victorian Murray high reliability water share holders within the Murray declared water system and related parties receiving less water than they would otherwise have received \u2014 suffering damage including a reduction in the market value of their water, increased costs of water on the temporary market and business losses.",
      },

      {
        kind: 'callout',
        title: 'Current status \u2014 judgment reserved',
        tone: 'success',
        text:
          'The matter was heard by Faulkner J over 40 days with closing submissions on 14 November 2025. Judgment is reserved.',
      },

      { kind: 'h2', text: 'Opt Out Notice' },
      {
        kind: 'p',
        text:
          "The MDBA Class Action is run on an 'opt out' basis. This means that all eligible group members are automatically included in the class action unless they formally opt out. Group Members who opt out will not be bound by the outcome of the MDBA Class Action and will not receive any money from the MDBA Class Action if it wins or settles.",
      },
      {
        kind: 'p',
        text:
          'To opt out of this class action, complete the Opt Out Notice (link below) and return it to the Registrar of the Supreme Court of New South Wales at the address on the form.',
      },
      {
        kind: 'documents',
        items: [
          { label: 'Opt Out Notice', href: 'https://bantongroup.com/wp-content/uploads/2024/04/Notice-to-Group-Members-April-2024-Court-approved-v1.pdf' },
        ],
      },

      { kind: 'h2', text: 'Am I a group member?' },
      { kind: 'p', text: 'You are a group member if, between 1 July 2017 and 30 June 2020, you were:' },
      {
        kind: 'ul',
        items: [
          '(a) A holder of NSW Murray Regulated River general security water entitlements (under the Water Management Act 2000 (NSW)) or a holder of high reliability water shares under the Water Act 1989 (Vic) for the Murray declared water system;',
          '(b) A holder of water supply entitlements through contractual arrangement with NSW Murray Regulated River bulk water access licence holders, or a holder of entitlements under contractual arrangement with Goulburn-Murray Water as bulk entitlement holder of WSE000139 (together with (a), Water Entitlement Holders);',
          '(c) A person who conducted irrigated agriculture operations in the NSW Central Murray or Goulburn-Murray irrigation region using entitlements held by Water Entitlement Holders (Related Parties);',
          "(d) Water Entitlement Holders and Related Parties who received/used lower allocations in the 2017/18, 2018/19 or 2019/20 water years than they would have absent the Defendants' conduct;",
          "(e) Persons who suffered loss or damage from the Defendants' alleged conduct.",
        ],
      },

      { kind: 'h2', text: 'Legal and other costs' },
      {
        kind: 'p',
        text:
          'Group members in a representative proceeding are not individually responsible for the legal costs associated with bringing the representative proceedings or for the costs of the Defendants if the claim is unsuccessful.',
      },
      {
        kind: 'p',
        text:
          'The Plaintiffs in the MDBA Class Action are being funded by International Litigation Partners No. 8 Pte Ltd (ILP). ILP will pay any costs orders made against the Plaintiffs if the class action is unsuccessful.',
      },
      {
        kind: 'p',
        text:
          'If compensation is awarded, the Court may order that a portion of it be used to pay the Plaintiffs\u2019 legal and litigation costs \u2014 including funding payments to ILP. The Court will provide notice and opportunity for group members to object before approving any deduction. The total of any amounts deducted will never exceed the amount a group member receives \u2014 group members will never be out of pocket by participating in the MDBA Class Action.',
      },
      {
        kind: 'p',
        text:
          'Representative proceedings are often settled out of Court. If this occurs in the MDBA Class Action, you may be able to claim from the settlement amount without retaining a lawyer.',
      },

      { kind: 'h2', text: 'Key documents' },
      { kind: 'p', text: 'All pleadings are available through the Supreme Court of NSW website:' },
      {
        kind: 'ul',
        items: [
          'Statement of Claim filed 14 May 2019',
          'Amended Statement of Claim filed 9 April 2020',
          'Defence to Amended Statement of Claim filed 17 July 2020',
          'Further Amended Statement of Claim filed 1 December 2020',
          'Defence to Further Amended Statement of Claim filed 11 December 2020',
          'Interlocutory Judgment dated 13 April 2021',
          'Second Further Amended Statement of Claim filed 11 April 2022',
          'Points of Claim filed 12 April 2022',
          'Defence to Second Further Amended Statement of Claim filed 29 April 2022',
          'Points of Defence filed 29 April 2022',
        ],
      },
      {
        kind: 'externalLink',
        label: 'Full pleadings on the Supreme Court of NSW website',
        href: 'https://supremecourt.nsw.gov.au/cases/class-actions/current-class-actions/murray-darling-basin-authority.html',
      },
    ],

    caseSpecificFields: [
      { kind: 'divider', label: 'Water entitlement details' },
      {
        kind: 'select',
        name: 'entitlementType',
        label: 'Type of water entitlement',
        required: true,
        options: [
          { value: '', label: 'Select entitlement type' },
          { value: 'nsw-general-security', label: 'NSW Murray Regulated River general security' },
          { value: 'vic-high-reliability', label: 'Victorian Murray high reliability water share' },
          { value: 'supply-entitlement', label: 'Water supply entitlement (contractual)' },
          { value: 'related-party', label: 'Related party \u2014 irrigated agriculture operator' },
        ],
      },
      {
        kind: 'text',
        name: 'waterAllocation_2017_18',
        label: 'Water allocation received 2017/18',
      },
      {
        kind: 'text',
        name: 'waterAllocation_2018_19',
        label: 'Water allocation received 2018/19',
      },
      {
        kind: 'text',
        name: 'waterAllocation_2019_20',
        label: 'Water allocation received 2019/20',
      },
      {
        kind: 'textarea',
        name: 'lossDetails',
        label: 'Brief description of the loss or damage you suffered',
        rows: 4,
      },
    ],
  },

  // ─── BLUE SKY ───────────────────────────────────────────────────────
  {
    slug: 'blue-sky',
    title: 'Blue Sky Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2021',
    court: 'Federal Court of Australia',
    email: 'info@bantongroup.com',
    hasInternalForm: true,
    summary:
      'Consolidated class action (Banton Group with Shine Lawyers) on behalf of Blue Sky shareholders against Blue Sky, its former directors and auditor Ernst & Young.',
    content: [
      { kind: 'h2', text: 'Background' },
      {
        kind: 'p',
        text:
          'Banton Group acts together with Shine Lawyers for the Lead Applicants in a consolidated class action brought on behalf of shareholders of Blue Sky against Blue Sky, its former directors and auditor Ernst & Young.',
      },
      {
        kind: 'p',
        text:
          "The shareholder class action alleges that Blue Sky lodged with the ASX and published in FY2016, FY2017 and FY2018 audited financial reports (and interim reports) which were not compliant with the Australian Accounting Standards and misrepresented, among other matters, Blue Sky's financial performance and position.",
      },
      {
        kind: 'p',
        text:
          "The claim arises from representations made in the financial reports, which the applicants allege materially overstated Blue Sky's financial performance and overstated Blue Sky's assets. It is alleged the overstatement resulted in the market being misinformed and Blue Sky's share price being inflated. Had the financial reports been prepared in accordance with the Australian Accounting Standards and the Corporations Act 2001 (Cth), Blue Sky's financial position would have been materially worse.",
      },

      { kind: 'h2', text: 'Alleged contraventions' },
      {
        kind: 'p',
        text:
          "The case is premised on the failure to report accurately, and the failure by Blue Sky's auditors to detect the misstatements, that caused investors to suffer loss and damage. The contraventions alleged include:",
      },
      {
        kind: 'ul',
        items: [
          'Blue Sky and the director respondents \u2014 contraventions of ss 674, 1041H and 1041E of the Corporations Act 2001 (Cth); alternatively s 12DA(1) of the Australian Securities and Investments Commission Act 2001 (Cth) (ASIC Act); alternatively s 18 of the Australian Consumer Law set out in Schedule 2 of the Competition and Consumer Act 2010 (Cth);',
          'Ernst & Young \u2014 contraventions of ss 1041H and/or 1041E of the Corporations Act and/or s 12DA(1) of the ASIC Act and/or s 18 of the ACL.',
        ],
      },

      {
        kind: 'callout',
        title: 'Next court date',
        tone: 'info',
        text:
          'Next key date to be confirmed. Contact us below to register your interest and stay informed as the matter progresses.',
      },
    ],

    caseSpecificFields: [
      { kind: 'divider', label: 'Blue Sky shareholding' },
      {
        kind: 'number',
        name: 'sharesHeld_FY2016',
        label: 'Number of Blue Sky shares held during FY2016',
      },
      {
        kind: 'number',
        name: 'sharesHeld_FY2017',
        label: 'Number of Blue Sky shares held during FY2017',
      },
      {
        kind: 'number',
        name: 'sharesHeld_FY2018',
        label: 'Number of Blue Sky shares held during FY2018',
      },
      {
        kind: 'textarea',
        name: 'transactionDetails',
        label: 'Purchase / sale details during FY2016 - FY2018',
        rows: 3,
        helper: 'For each transaction: date, quantity and price',
      },
    ],
  },

  // ─── PHOSLOCK ───────────────────────────────────────────────────────
  {
    slug: 'phoslock',
    title: 'Phoslock Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2022',
    court: 'Federal Court of Australia',
    email: 'phoslockclassaction@bantongroup.com',
    hasInternalForm: true,
    summary:
      'Action against Phoslock Environmental Technologies Ltd (ASX:PET), former directors and auditor KPMG, following the disclosure of fraudulent activity in China operations.',
    content: [
      { kind: 'h2', text: 'Overview' },
      {
        kind: 'p',
        text:
          "Banton Group acts on behalf of shareholders in class action proceedings against Phoslock Environmental Technologies Ltd (ASX:PET), former Chairman Mr Laurence Freedman, former Managing Director Mr Robert Schuitema and Phoslock's former auditor, KPMG (together the Respondents). The proceeding is in the Federal Court of Australia.",
      },
      {
        kind: 'p',
        text:
          "The allegations centre on fraudulent activity in Phoslock's China operations disclosed in late 2021. On 8 October 2020, the company announced the discovery of fraudulent activity relating to areas including false accounting, falsification of invoices and services contracts, improper tax reporting, potential misappropriation of funds, and undisclosed related party transactions.",
      },

      { kind: 'h2', text: 'Case status' },
      {
        kind: 'p',
        text:
          'Parties are currently in the discovery phase, reviewing documents exchanged during formal legal proceedings. The applicant is preparing lay and expert evidence.',
      },
      {
        kind: 'callout',
        title: 'Mediation scheduled',
        tone: 'info',
        text:
          'Discussions with the Respondents are in place regarding any potential court ordered registration, opt out process and class closure before the mediation ordered to occur on or before 20 May 2026.',
      },

      {
        kind: 'documents',
        heading: 'Latest filings',
        items: [
          { label: "Applicant's Further Amended Statement of Claim", href: 'https://bantongroup.com/wp-content/uploads/2026/03/2025-09-08-Further-Amended-Statement-of-Claim.pdf' },
          { label: 'Latest orders made in the proceeding (20 February 2026)', href: 'https://bantongroup.com/wp-content/uploads/2026/03/Phoslock-Class-Action-Orders-made-on-20-February-2026.pdf' },
        ],
      },

      { kind: 'h2', text: 'Group Member eligibility' },
      { kind: 'p', text: 'You are a group member if you:' },
      {
        kind: 'ol',
        items: [
          'Acquired an interest in fully paid ordinary shares (Phoslock Shares) in Phoslock Environmental Technologies Ltd during the period between 11 October 2018 and 17 September 2020 (inclusive) (Relevant Period); or prior to the Relevant Period, and retained them throughout the Relevant Period; or',
          'Acquired long exposure to Phoslock Shares by entering equity swap confirmations in respect of Phoslock Shares during the Relevant Period; and',
          "Have suffered loss or damage by reason of the conduct of the Respondents pleaded in the Statement of Claim.",
        ],
      },
      {
        kind: 'p',
        text: 'You are excluded if you are or were, during or since the Relevant Period, any of the following:',
      },
      {
        kind: 'ul',
        items: [
          'a related party (s 228 Corporations Act) of Phoslock;',
          'a related body corporate (s 50 Corporations Act) of Phoslock;',
          'an associated entity (s 50AAA Corporations Act) of Phoslock;',
          'an officer or a close associate (s 9 Corporations Act) of Phoslock;',
          'a Justice, Registrar, District Registrar or Deputy District Registrar of the Federal Court of Australia or the High Court of Australia.',
        ],
      },

      { kind: 'h2', text: 'Frequently asked questions' },
      { kind: 'h3', text: 'Will it cost me anything to be a Group Member?' },
      {
        kind: 'p',
        text:
          'No. Group Members are not liable to pay the upfront legal costs of the class action because it is funded. If the class action is successful you may be required to contribute towards the legal costs and the litigation funder\u2019s commission from your share of any net proceeds you receive.',
      },
      { kind: 'h3', text: 'How long will the class action take?' },
      {
        kind: 'p',
        text:
          'Class actions can take time to resolve. The duration of a case can vary due to factors such as mediation, settlement negotiations, and potential appeals. If successful, payments to Group Members will only be made after the Court approves a distribution scheme and claims are verified.',
      },
      { kind: 'h3', text: 'How much can I expect?' },
      {
        kind: 'p',
        text:
          'At this stage, it is not possible to estimate exactly how much each Group Member will receive if the class action is successful. If the case is successful, detailed information about compensation calculations will be provided before payments are made.',
      },

      {
        kind: 'timeline',
        heading: 'Key dates',
        items: [
          { label: 'Relevant Period (share acquisition)', date: '11 Oct 2018 - 17 Sep 2020' },
          { label: 'Fraudulent activity announcement', date: '8 October 2020' },
          { label: 'Latest court orders issued', date: '20 February 2026' },
          { label: 'Mediation (no later than)', date: '20 May 2026' },
          { label: 'Next case management hearing', date: '7 August 2026' },
        ],
      },
    ],

    caseSpecificFields: [
      { kind: 'divider', label: 'Phoslock shareholding' },
      {
        kind: 'number',
        name: 'sharesHeld_10Oct2018',
        label: 'Number of Phoslock shares held at close of trade 10 October 2018',
      },
      {
        kind: 'number',
        name: 'sharesHeld_17Sep2020',
        label: 'Number of Phoslock shares held at close of trade 17 September 2020',
      },
      {
        kind: 'textarea',
        name: 'purchaseDetails',
        label: 'Share purchase details (11 October 2018 - 17 September 2020)',
        rows: 3,
        helper: 'For each purchase: date, quantity and price',
      },
      {
        kind: 'textarea',
        name: 'saleDetails',
        label: 'Share sale details (11 October 2018 - 17 September 2020)',
        rows: 3,
        helper: 'For each sale: date, quantity and price',
      },
    ],
  },
  // ─── HYUNDAI ABS ────────────────────────────────────────────────────
  {
    slug: 'hyundai-abs',
    title: 'Hyundai ABS Class Action',
    status: 'Active',
    category: 'Consumer',
    year: '2024',
    court: 'Supreme Court of Victoria',
    leadPlaintiff: 'Samantha Jane Edwards & Josephine Dolores Hoppner',
    email: 'HyundaiABS@bantongroup.com',
    hasInternalForm: true,
    summary:
      'Class action against Hyundai Motor Company Australia for a defective ABS module that creates a risk of engine compartment fire, even when the vehicle is turned off.',
    content: [
      { kind: 'h2', text: 'Background' },
      {
        kind: 'p',
        text:
          'Banton Group acts on behalf of Samantha Jane Edwards and Josephine Dolores Hoppner, who are the lead Plaintiffs in a class action against Hyundai Motor Company Australia Pty Ltd and Hyundai Motor Company (together, Hyundai) in relation to multiple safety recall notices which identify a defect in the Anti-Lock Braking System (ABS) in several Hyundai vehicle models.',
      },
      {
        kind: 'p',
        text:
          'Due to a manufacturing error, an electronic control circuit board in the ABS module will short circuit when the components are exposed to moisture. This moisture creates the risk of an engine compartment fire, even when the vehicle is turned off, as the circuit is constantly powered. This could increase the risk of an accident, serious injury or death to vehicle occupants, other road users and bystanders, and/or damage to property.',
      },
      {
        kind: 'p',
        text:
          'While the short circuit does not affect the functioning of the brake system, Hyundai have advised vehicle owners to park their vehicles in an open space and away from flammable materials and structures, i.e. not in a garage. However, parking vehicles outside presents a further set of risks and costs, including theft, higher insurance premiums and/or parking fees.',
      },
      {
        kind: 'p',
        text:
          'The Hyundai ABS Class Action seeks compensation for vehicle owners who have suffered loss due to alleged breaches of the Australian Consumer Law by Hyundai. The proceeding is in the Supreme Court of Victoria.',
      },
      {
        kind: 'callout',
        title: 'Carriage hearing',
        tone: 'info',
        text:
          'A competing class action has been filed by another law firm. A hearing is scheduled on 30 June 2025 to determine which law firm will be given carriage of the class action against Hyundai.',
      },

      { kind: 'h2', text: 'Am I eligible to register?' },
      {
        kind: 'p',
        text:
          'You may be eligible to register to participate in the Hyundai ABS Class Action if you acquired one or more of the following affected vehicles:',
      },
      {
        kind: 'table',
        heading: 'Affected Hyundai vehicles',
        columns: ['Model', 'Series', 'Model Years', 'Acquired prior to', 'Recall Notice'],
        rows: [
          ['Sonata', 'NF', '2004–2013', '28 February 2018', { link: '#recall-hy-1', label: 'View Recall' }],
          ['Grandeur', 'TG', '2004–2013', '28 February 2018', { link: '#recall-hy-2', label: 'View Recall' }],
          ['Santa Fe', '—', '2006–2009', '8 May 2020', { link: '#recall-hy-3', label: 'View Recall' }],
          ['i30', '—', '2005–2010', '8 May 2020', { link: '#recall-hy-4', label: 'View Recall' }],
          ['Elantra', '—', '2005–2010', '8 May 2020', { link: '#recall-hy-5', label: 'View Recall' }],
          ['Tucson', '—', '2014–2020', '4 February 2021', { link: '#recall-hy-6', label: 'View Recall' }],
          ['Genesis', '—', '2014–2017', '30 May 2021', { link: '#recall-hy-7', label: 'View Recall' }],
          ['Genesis', 'G80', '2018', '30 May 2021', { link: '#recall-hy-8', label: 'View Recall' }],
          ['Santa Fe', 'DM', '2014–2017', '26 September 2022', { link: '#recall-hy-9', label: 'View Recall' }],
          ['ix35', '—', '2014–2017', '26 September 2022', { link: '#recall-hy-10', label: 'View Recall' }],
          ['ix35 (EL)', 'EL', '2014–2015', '7 December 2022', { link: '#recall-hy-11', label: 'View Recall' }],
          ['Veloster', 'FS', '2007–2014', '1 August 2024', { link: '#recall-hy-12', label: 'View Recall' }],
          ['ix35', 'LM', '2007–2014', '1 August 2024', { link: '#recall-hy-13', label: 'View Recall' }],
          ['Accent', 'RM', '2007–2014', '1 August 2024', { link: '#recall-hy-14', label: 'View Recall' }],
          ['i40', 'VF', '2007–2014', '1 August 2024', { link: '#recall-hy-15', label: 'View Recall' }],
          ['Santa Fe', 'DM', '2007–2014', '1 August 2024', { link: '#recall-hy-16', label: 'View Recall' }],
          ['iMax', '—', '2007–2014', '1 August 2024', { link: '#recall-hy-17', label: 'View Recall' }],
          ['iLoad', '—', '—', '—', '—'],
        ],
      },
      {
        kind: 'p',
        text:
          'If you are unsure whether you are eligible, click the relevant Recall Notice link and check whether your Vehicle Identification Number (VIN) appears on the list. A VIN is a unique identification number found on your vehicle\u2019s registration certificate or owner\u2019s manual.',
      },
      {
        kind: 'p',
        text:
          'You are still able to participate in the Hyundai ABS Class Action even if you have sold your vehicle, your vehicle was written off, or rectification work relating to the recall notice has been completed.',
      },

      { kind: 'h2', text: 'Key documents' },
      {
        kind: 'documents',
        items: [
          { label: 'Hyundai ABS Class Action \u2014 Group Proceeding Summary Statement', href: '#hy-group-statement' },
          { label: 'Hyundai ABS Class Action \u2014 Funding Information Summary', href: '#hy-funding-statement' },
        ],
      },

      { kind: 'h2', text: 'Update \u2014 28 March 2025' },
      {
        kind: 'callout',
        title: 'Scope expansion',
        tone: 'warning',
        text:
          'On 28 March 2025, the lead Plaintiffs signalled their intention to seek leave of the Court to amend the scope of the claim against Hyundai to include group members with vehicle models recalled on 1 August 2024. Should the Court grant leave to amend, the documents below will reflect the new scope of the Hyundai ABS Class Action.',
      },
      {
        kind: 'documents',
        heading: 'Proposed amended documents',
        items: [
          { label: 'Proposed Amended Group Proceeding Summary Statement', href: '#hy-amended-group' },
          { label: 'Proposed Amended Funding Information Summary', href: '#hy-amended-funding' },
        ],
      },
    ],

    caseSpecificFields: [
      { kind: 'divider', label: 'Vehicle details' },
      {
        kind: 'text',
        name: 'vehicleModel',
        label: 'Vehicle model',
        required: true,
        placeholder: 'e.g. Hyundai Tucson',
      },
      {
        kind: 'text',
        name: 'vehicleYear',
        label: 'Vehicle year',
        required: true,
        placeholder: 'e.g. 2017',
      },
      {
        kind: 'text',
        name: 'vin',
        label: 'Vehicle Identification Number (VIN)',
        helper: 'Found on your registration certificate or owner\u2019s manual',
      },
      {
        kind: 'text',
        name: 'acquisitionDate',
        label: 'Date vehicle was acquired',
        required: true,
        placeholder: 'DD/MM/YYYY',
      },
      {
        kind: 'radio',
        name: 'vehicleSold',
        label: 'Have you sold or no longer own this vehicle?',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        kind: 'radio',
        name: 'recallRepairDone',
        label: 'Has recall rectification work been carried out on your vehicle?',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'Unsure' },
        ],
      },
      {
        kind: 'textarea',
        name: 'lossDetails',
        label: 'Brief description of any loss or damage suffered',
        rows: 3,
        helper: 'e.g. higher insurance costs, parking fees, vehicle damage',
      },
    ],
  },

  // ─── KIA ABS ─────────────────────────────────────────────────────────
  {
    slug: 'kia-abs',
    title: 'Kia ABS Defect Class Action',
    status: 'Active',
    category: 'Consumer',
    year: '2024',
    court: 'Supreme Court of Victoria',
    leadPlaintiff: 'David John Sims',
    email: 'KiaABS@bantongroup.com',
    hasInternalForm: true,
    summary:
      'Class action against Kia Australia for the same ABS manufacturing defect — a risk of engine compartment fire even when the vehicle is parked and turned off.',
    content: [
      { kind: 'h2', text: 'Background' },
      {
        kind: 'p',
        text:
          'Banton Group acts on behalf of David John Sims, who is the lead Plaintiff in a class action against Kia Australia Pty Ltd and Kia Corporation (together, Kia) in relation to multiple safety recall notices which identify a defect in the Anti-Lock Braking System (ABS) in several Kia vehicle models.',
      },
      {
        kind: 'p',
        text:
          'Due to a manufacturing error, an electronic control circuit board in the ABS module will short circuit when the components are exposed to moisture. This moisture creates the risk of an engine compartment fire, even when the vehicle is turned off, as the circuit is constantly powered. This could increase the risk of an accident, serious injury or death to vehicle occupants, other road users and bystanders, and/or damage to property.',
      },
      {
        kind: 'p',
        text:
          'While the short circuit does not affect the functioning of the brake system, Kia have advised vehicle owners to park their vehicles in an open space and away from flammable materials and structures, i.e. not in a garage. However, parking vehicles outside presents a further set of risks and costs, including higher insurance premiums and/or parking fees.',
      },
      {
        kind: 'p',
        text:
          'The Kia ABS Class Action seeks compensation for vehicle owners who have suffered loss due to alleged breaches of the Australian Consumer Law by Kia. The proceeding is in the Supreme Court of Victoria.',
      },
      {
        kind: 'callout',
        title: 'Carriage hearing',
        tone: 'info',
        text:
          'A competing class action has been filed by another law firm. A hearing is scheduled on 30 June 2025 to determine which law firm will be given carriage of the class action against Kia.',
      },

      { kind: 'h2', text: 'Am I eligible to register?' },
      {
        kind: 'p',
        text:
          'You may be eligible to register to participate in the Kia ABS Class Action if you acquired one or more of the following affected vehicles:',
      },
      {
        kind: 'table',
        heading: 'Affected Kia vehicles',
        columns: ['Model', 'Series', 'Model Years', 'Acquired prior to', 'Recall Notice'],
        rows: [
          ['Sportage', '—', '2007–2009', '5 January 2017', { link: '#recall-kia-1', label: 'View Recall' }],
          ['Sorento', '—', '2005–2010', '17 March 2020', { link: '#recall-kia-2', label: 'View Recall' }],
          ['Carnival', '—', '2005–2010', '17 March 2020', { link: '#recall-kia-3', label: 'View Recall' }],
          ['Sportage', '—', '2016–2019', '16 May 2021', { link: '#recall-kia-4', label: 'View Recall' }],
          ['Stinger', '—', '2016–2019', '16 May 2021', { link: '#recall-kia-5', label: 'View Recall' }],
          ['Sportage', 'SLe', '2014–2015', '19 January 2023', { link: '#recall-kia-6', label: 'View Recall' }],
          ['Sportage', 'KM', '2007–2009', '19 January 2023', { link: '#recall-kia-7', label: 'View Recall' }],
          ['Soul', 'AM', '2010–2013', '9 October 2024', { link: '#recall-kia-8', label: 'View Recall' }],
          ['Sorento', 'XM', '2010–2014', '9 October 2024', { link: '#recall-kia-9', label: 'View Recall' }],
          ['Cerato', 'TD', '2009–2013', '9 October 2024', { link: '#recall-kia-10', label: 'View Recall' }],
          ['Sportage', 'SL', '2009–2013', '9 October 2024', { link: '#recall-kia-11', label: 'View Recall' }],
          ['Optima', 'TF', '2010–2015', '9 October 2024', { link: '#recall-kia-12', label: 'View Recall' }],
          ['Rio', 'UB', '2011–2016', '9 October 2024', { link: '#recall-kia-13', label: 'View Recall' }],
          ['Sportage', 'SLe', '2013–2014', '9 October 2024', { link: '#recall-kia-14', label: 'View Recall' }],
          ['Rondo', 'UN', '2009–2012', '9 October 2024', { link: '#recall-kia-15', label: 'View Recall' }],
          ['Rondo', 'RP', '2012–2018', '9 October 2024', { link: '#recall-kia-16', label: 'View Recall' }],
        ],
      },
      {
        kind: 'p',
        text:
          'If you are unsure whether you are eligible, click the relevant Recall Notice link and check whether your Vehicle Identification Number (VIN) appears on the list. A VIN is a unique identification number found on your vehicle\u2019s registration certificate or owner\u2019s manual.',
      },
      {
        kind: 'p',
        text:
          'You are still able to participate in the Kia ABS Class Action even if you have sold your vehicle, your vehicle was written off, or rectification work relating to the recall notice has been completed.',
      },

      { kind: 'h2', text: 'Key documents' },
      {
        kind: 'documents',
        items: [
          { label: 'Kia ABS Class Action \u2014 Group Proceeding Summary Statement', href: '#kia-group-statement' },
          { label: 'Kia ABS Class Action \u2014 Funding Information Summary', href: '#kia-funding-statement' },
        ],
      },

      { kind: 'h2', text: 'Update \u2014 28 March 2025' },
      {
        kind: 'callout',
        title: 'Scope expansion',
        tone: 'warning',
        text:
          'On 28 March 2025, the lead Plaintiff signalled his intention to seek leave of the Court to amend the scope of the claim against Kia to include group members with vehicle models recalled on 9 October 2024. Should the Court grant leave to amend, the documents below will reflect the new scope.',
      },
      {
        kind: 'documents',
        heading: 'Proposed amended documents',
        items: [
          { label: 'Proposed Amended Group Proceeding Summary Statement', href: '#kia-amended-group' },
          { label: 'Proposed Amended Funding Information Summary', href: '#kia-amended-funding' },
        ],
      },
    ],

    caseSpecificFields: [
      { kind: 'divider', label: 'Vehicle details' },
      {
        kind: 'text',
        name: 'vehicleModel',
        label: 'Vehicle model',
        required: true,
        placeholder: 'e.g. Kia Sportage',
      },
      {
        kind: 'text',
        name: 'vehicleYear',
        label: 'Vehicle year',
        required: true,
        placeholder: 'e.g. 2014',
      },
      {
        kind: 'text',
        name: 'vin',
        label: 'Vehicle Identification Number (VIN)',
        helper: 'Found on your registration certificate or owner\u2019s manual',
      },
      {
        kind: 'text',
        name: 'acquisitionDate',
        label: 'Date vehicle was acquired',
        required: true,
        placeholder: 'DD/MM/YYYY',
      },
      {
        kind: 'radio',
        name: 'vehicleSold',
        label: 'Have you sold or no longer own this vehicle?',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        kind: 'radio',
        name: 'recallRepairDone',
        label: 'Has recall rectification work been carried out on your vehicle?',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'Unsure' },
        ],
      },
      {
        kind: 'textarea',
        name: 'lossDetails',
        label: 'Brief description of any loss or damage suffered',
        rows: 3,
        helper: 'e.g. higher insurance costs, parking fees, vehicle damage',
      },
    ],
  },
]

export function getCaseBySlug(slug: string): CaseDetail | undefined {
  return cases.find((c) => c.slug === slug)
}
