// Class Action case detail pages.
// All copy is lifted verbatim from bantongroup.com/{case}-class-action/
// (as at April 2026). PDF links point to the existing WordPress uploads
// folder and will continue to work until the WP instance is retired —
// at that point move the files into /public/docs/ and update the paths.

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
  /** Existing WordPress registration flow URL. Wire to internal form later. */
  registrationUrl?: string
  /** One-line summary used on the list card header. */
  summary: string
  /** Main body content as structured blocks. */
  content: CaseBlock[]
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
    funder: 'Equite Capital No 1 Pte Ltd',
    registrationUrl: 'https://bantongroup.com/registration-process-for-arrium-class-action/',
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
          'The Supreme Court of Victoria has ordered a registration and opt out process for group members in the Arrium Class Action.',
      },

      {
        kind: 'documents',
        heading: 'Key documents',
        items: [
          { label: "Court's Orders, Notice and Registration Form", href: 'https://bantongroup.com/wp-content/uploads/2025/09/3281-20-ECI-7-Aug-2025-Bogan-v-Smedley-Orders.pdf' },
          { label: 'Writ and Statement of Claim', href: 'https://bantongroup.com/wp-content/uploads/2025/09/1.-Writ-Statement-of-Claim-14.08.2020-3441-6780-8784-v1.pdf' },
          { label: 'Amended Defence of the Director Defendants', href: 'https://bantongroup.com/wp-content/uploads/2025/09/First-to-Fourth-Defendants-Amended-Defence.pdf' },
          { label: 'Defence of KPMG', href: 'https://bantongroup.com/wp-content/uploads/2025/09/Fifth-Defendant-Defence.pdf' },
          { label: 'Further Amended Group Proceeding Summary Statement', href: 'https://bantongroup.com/wp-content/uploads/2025/09/Further-Amended-Group-Proceeding-Summary-Statement-23.06.2025-1.pdf' },
          { label: 'Further Amended Funding Information Summary Statement', href: 'https://bantongroup.com/wp-content/uploads/2025/09/Further-Amended-Funding-Information-Summary-Statement-23-June-2025-1.pdf' },
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
          { label: 'Expert reply evidence due', date: '24 February 2026' },
          { label: 'Court-ordered mediation', date: '31 March 2026' },
          { label: 'Registration deadline (4pm AEDT)', date: '15 December 2025' },
          { label: 'Trial commencement (6-week estimate)', date: '3 August 2026' },
          { label: 'Settlement participation window', date: 'Up to 20 July 2026' },
        ],
      },

      { kind: 'h2', text: 'Registration in the Arrium Class Action' },
      {
        kind: 'p',
        text:
          'This is an open class action with a closure order. Registration is required by 4pm AEDT on 15 December 2025 to benefit from any settlement reached up to 20 July 2026.',
      },
      {
        kind: 'callout',
        title: 'Am I eligible?',
        tone: 'info',
        text:
          'Persons who acquired Arrium ordinary shares during the period 19 August 2014 to 4 April 2016 (inclusive), excluding related parties, related body corporates, associated entities, officers, close associates of Arrium, judges, and the Chief Justice of the Supreme Court of Victoria.',
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
    registrationUrl: 'https://bantongroup.com/registration-process-for-cudeco-class-action/',
    summary:
      'Shareholders of ASX-listed CuDeco Limited (In Liquidation) allege misleading statements about the Rocklands copper mine. KPMG settled September 2025; directors trial listed for 29 June 2026.',
    content: [
      { kind: 'h2', text: 'Background' },
      {
        kind: 'p',
        text:
          'The CuDeco Class Action commenced in April 2022, arising from allegations that CuDeco Limited made misleading statements regarding its Rocklands copper mine in north-west Queensland. The statements concerned ore reserves, feasibility assessments, and net present value representations that allegedly caused artificially inflated share prices.',
      },
      {
        kind: 'p',
        text:
          'KPMG audited CuDeco\u2019s financial reports for the years ending 30 June 2016 and 30 June 2017. Claims alleged KPMG\u2019s audit opinions were misleading or deceptive, as the financial reports did not accurately reflect the company\u2019s financial position.',
      },

      {
        kind: 'callout',
        title: 'KPMG settlement — status',
        tone: 'success',
        text:
          'Settlement reached with KPMG in September 2025. The settlement sum was paid by KPMG on 16 January 2026, and Justice Bennett approved the distribution methodology on 10 March 2026. Claims against the directors continue — trial is listed to commence 29 June 2026.',
      },

      {
        kind: 'documents',
        heading: 'Recent court orders',
        items: [
          { label: 'Court orders dated 19 March 2026', href: 'https://bantongroup.com/wp-content/uploads/2026/04/2026-03-19_Federal-Court-Order-Justice-Moshinsky.pdf' },
          { label: 'Court orders dated 16 March 2026', href: 'https://bantongroup.com/wp-content/uploads/2026/04/2026-03-16_Federal-Court-Order-Justice-Bennett_E5535951_v1-1.pdf' },
          { label: 'Court orders dated 16 March 2026 (Suppressed)', href: 'https://bantongroup.com/wp-content/uploads/2026/04/2026-03-16_Federal-Court-Order-Justice-Bennett-Suppressed.pdf' },
        ],
      },

      {
        kind: 'documents',
        heading: 'Key documents',
        items: [
          { label: 'Further Amended Statement of Claim (8 August 2025)', href: 'https://bantongroup.com/wp-content/uploads/2025/10/2025-08-08-Further-Amended-Statement-of-Claim-dated-8-August-2025-sealed-1.pdf' },
          { label: 'Third Respondent\u2019s Defence', href: 'https://bantongroup.com/wp-content/uploads/2025/10/2023-03-28-Defence-of-Third-Respondent-Sealed.pdf' },
          { label: 'KPMG\u2019s Defence (Fourth Respondent)', href: 'https://bantongroup.com/wp-content/uploads/2025/10/2023-04-11-Defence-of-Fourth-Respondent-Sealed.pdf' },
          { label: 'Notice of Proposed Settlement', href: 'https://bantongroup.com/wp-content/uploads/2025/10/Cudeco-Notice-of-Settlement.pdf' },
          { label: "Court's Orders (9 October 2025)", href: 'https://bantongroup.com/wp-content/uploads/2025/10/2025-10-09_Federal-Court-Order-Justice-Bennett_E4791847_v1.pdf' },
          { label: 'KPMG Settlement Confirmation', href: 'https://bantongroup.com/wp-content/uploads/2026/04/KPMG-Settlement-Confirmation-CuDeco-Class-Action-VID176-of-2022.pdf' },
        ],
      },

      { kind: 'h2', text: 'Group Member definition' },
      {
        kind: 'p',
        text:
          'You qualify as a group member if you acquired fully paid ordinary shares in CuDeco Limited between 11 April 2016 and 13 March 2018. Claims against KPMG only apply to purchases from 17 November 2016 onward.',
      },
      { kind: 'h3', text: 'Exclusions from group membership' },
      {
        kind: 'ul',
        items: [
          'Related parties (directors, relatives, controlling entities)',
          'Related body corporates',
          'Associated entities',
          'Officers or close associates',
          'Federal Court or High Court justices/registrars',
          'Sinosteel Equipment & Engineering Ltd',
          'China Oceanwide entities and affiliated parties',
          'Rich Lead Investments Pte Ltd',
          'New Apex Asia Investment Limited',
        ],
      },

      { kind: 'h2', text: 'KPMG settlement details' },
      { kind: 'h3', text: 'Timeline' },
      {
        kind: 'ul',
        items: [
          'September 2025 — settlement reached with KPMG',
          '16 January 2026 — settlement sum paid by KPMG',
          '10 March 2026 — Justice Bennett approved distribution methodology',
          '16 March 2026 — Court orders issued',
        ],
      },
      { kind: 'h3', text: 'Application of the settlement sum (in order)' },
      {
        kind: 'ol',
        items: [
          '$2,125 to the Applicant (Leo Toner) for his time and expenses',
          'Costs referee payment (Ms Rosati)',
          'Reimbursement to EquiteCap4 of all assessed legal costs',
          '30% of remaining balance to EquiteCap4 as partial funding remuneration',
        ],
      },
      {
        kind: 'p',
        text:
          'The remaining balance is held in an interest-bearing account pending the outcomes of the claims against the directors.',
      },

      { kind: 'h2', text: 'Ongoing claims against directors' },
      {
        kind: 'p',
        text:
          'Claims against the directors continue regarding the full period (11 April 2016 to 13 March 2018). Trial is listed to commence 29 June 2026. Previously incurred costs have been recovered from the KPMG settlement and will not be deducted again from director recoveries.',
      },

      { kind: 'h2', text: 'Litigation funding' },
      {
        kind: 'p',
        text:
          'Equite Capital No 4 Pte Ltd (EquiteCap4) provides litigation funding. The funder covers legal costs and indemnifies the applicant against adverse costs orders. Legal and funding costs are deducted from settlement sums before group member distributions. Group members incur no out-of-pocket costs.',
      },
    ],
  },

  // ─── FITCH SCDO ─────────────────────────────────────────────────────
  {
    slug: 'fitch-scdo',
    title: 'Fitch SCDO Class Action',
    status: 'Active',
    category: 'Financial Products',
    year: '2022',
    court: 'Federal Court of Australia',
    funder: 'Equite Capital No 2 Pte Ltd',
    email: 'fitchcdos@bantongroup.com',
    registrationUrl: 'https://bantongroup.com/registration-process-for-fitch-ratings-class-action/',
    summary:
      "Investors in synthetic CDOs rated 'AAA'-'AA-' by Fitch between 2005-2007 seeking damages for deceitful or reckless ratings.",
    content: [
      { kind: 'h2', text: 'Background' },
      {
        kind: 'p',
        text:
          'Banton Group acts on behalf of investors in a class action against Fitch Ratings, Inc (a company incorporated in Delaware, USA) and Fitch Ratings, Ltd (a company incorporated in the United Kingdom) (together, Fitch). The litigation concerns synthetic collateralised debt obligations (SCDOs) that Fitch assigned credit ratings of AAA, AA+, AA or AA- during 2005-2007.',
      },
      { kind: 'h3', text: "Applicants' core allegations" },
      {
        kind: 'ul',
        items: [
          "Fitch's SCDO ratings lacked reliability or reasonable grounds",
          'Fitch knew this or was recklessly indifferent, thereby deceitfully inducing investor purchases',
        ],
      },
      { kind: 'p', text: 'Fitch denies all allegations and is actively defending the proceedings.' },

      {
        kind: 'documents',
        heading: 'Key documents',
        items: [
          { label: 'Product List — Updated Global list of SCDOs', href: 'https://bantongroup.com/wp-content/uploads/2025/11/20250904-Updated-Global-list-of-SCDOs.pdf' },
          { label: 'Amended Originating Application', href: 'https://bantongroup.com/wp-content/uploads/2025/11/Amended-Originating-Application.pdf' },
          { label: 'Amended Statement of Claim', href: 'https://bantongroup.com/wp-content/uploads/2025/11/Amended-Statement-of-Claim.pdf' },
          { label: "Fitch's Defence to the Amended Statement of Claim", href: 'https://bantongroup.com/wp-content/uploads/2025/11/2025-06-10-Respondents-Defence-to-the-Amended-Statement-of-Claim-10-June-2025-v1.pdf' },
          { label: 'Notice to Opt Out, Register or Do Nothing', href: 'https://bantongroup.com/wp-content/uploads/2026/03/Fitch-Further-Opt-out-Notice.pdf' },
        ],
      },

      { kind: 'h2', text: 'Group Member definition' },
      { kind: 'p', text: 'You qualify as a group member if you:' },
      {
        kind: 'ol',
        items: [
          'Acquired interests in one or more Claim SCDOs (AAA, AA+, AA, AA- rated using VECTOR 2.2, 3.0, or 3.1); OR',
          'Facilitated acquisition by others through services, advice, promotion, resale, or dealing; AND',
          'Connected to Australia — acquisition or facilitation occurred by reason of ratings publication/dissemination in Australia or receipt in Australia; AND',
          'Suffered loss from the acquisition, excluding those with claims extinguished by Mid-Coast Council v Fitch Ratings final orders (25 July 2019, NSD 995 of 2014).',
        ],
      },
      {
        kind: 'p',
        text:
          'Acquisition method does not disqualify membership — this includes initial issue or secondary market purchases.',
      },

      {
        kind: 'timeline',
        heading: 'Critical dates',
        items: [
          { label: 'Registration / Opt-out deadline (extended)', date: '4pm, 4 April 2026' },
          { label: "Applicants' expert evidence filing", date: '6 March 2026' },
          { label: 'Fitch lay evidence filing', date: '22 May 2026' },
          { label: 'Fitch expert evidence filing', date: '3 July 2026' },
          { label: "Applicants' reply evidence filing", date: '14 August 2026' },
          { label: 'Joint expert reports due', date: '11 September 2026' },
          { label: 'Mediation (no later than)', date: '9 October 2026' },
          { label: 'Trial commencement (6 weeks estimated)', date: '3 May 2027' },
        ],
      },
      {
        kind: 'callout',
        title: 'Deadline extended',
        tone: 'info',
        text:
          'The Federal Court of Australia extended the registration and opt-out deadlines on 9 March 2026.',
      },

      { kind: 'h2', text: 'Litigation funding' },
      {
        kind: 'p',
        text:
          'The litigation is funded by Equite Capital No 2 Pte Ltd. Group Members will not incur out-of-pocket costs — legal and funding expenses are deducted from recovery proceeds only.',
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
    funder: 'International Litigation Partners No. 8 Pte Ltd',
    email: 'mdbaclassaction@bantongroup.com',
    registrationUrl: 'https://bantongroup.com/class-action-form/',
    summary:
      "NSW and Victorian water entitlement holders allege the Murray Darling Basin Authority breached its duty of care during 2017-2020 — the matter was heard by Faulkner J over 40 days and judgment is reserved.",
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
          "The Plaintiffs claim that the Defendants' conduct resulted in NSW Murray Regulated River general security water entitlement holders, Victorian Murray high reliability water share holders within the Murray declared water system and related parties receiving less water than they would otherwise have received — suffering damage including a reduction in the market value of their water, increased costs of water on the temporary market and business losses.",
      },

      {
        kind: 'callout',
        title: 'Current status — judgment reserved',
        tone: 'success',
        text:
          'The matter was heard by Faulkner J over 40 days with closing submissions on 14 November 2025. Judgment is reserved.',
      },

      { kind: 'h2', text: 'Opt Out Notice' },
      {
        kind: 'p',
        text:
          "The MDBA Class Action is run on an 'opt out' basis. This means that all eligible group members are automatically included in the class action unless they formally opt out. Group Members who opt out will not be bound by the outcome of the MDBA Class Action and will not receive any money.",
      },
      {
        kind: 'documents',
        items: [
          { label: 'Opt Out Notice', href: 'https://bantongroup.com/wp-content/uploads/2024/04/Notice-to-Group-Members-April-2024-Court-approved-v1.pdf' },
        ],
      },

      { kind: 'h2', text: 'Am I a group member?' },
      {
        kind: 'p',
        text:
          'The eligibility period runs from 1 July 2017 to 30 June 2020. You may qualify if you:',
      },
      {
        kind: 'ul',
        items: [
          'Held NSW Murray Regulated River general security water entitlements or Victorian high-reliability water shares for the Murray declared water system;',
          'Held water supply entitlements under contract with NSW bulk water access licence holders or Goulburn-Murray Water;',
          'Conducted irrigated agriculture operations using water entitlements owned by others in the above categories;',
          'Received lower water allocations in 2017/18, 2018/19 or 2019/20 than would have occurred absent the alleged conduct; and',
          "Suffered loss or damage from the Defendants' alleged conduct.",
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
          'The Plaintiffs in the MDBA Class Action are being funded by International Litigation Partners No. 8 Pte Ltd (ILP). Group members will never be out of pocket by participating in the MDBA Class Action.',
      },
      {
        kind: 'p',
        text:
          'Representative proceedings are often settled out of Court. If this occurs in the MDBA Class Action, you may be able to claim from the settlement amount without retaining a lawyer.',
      },

      {
        kind: 'externalLink',
        label: 'All pleadings on the Supreme Court of NSW website',
        href: 'https://supremecourt.nsw.gov.au/cases/class-actions/current-class-actions/murray-darling-basin-authority.html',
        description:
          'Includes the Statement of Claim, Amended Statement of Claim, Defence, Interlocutory Judgment and all later pleadings.',
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
          'Blue Sky and the director respondents — contraventions of ss 674, 1041H and 1041E of the Corporations Act 2001 (Cth); alternatively s 12DA(1) of the Australian Securities and Investments Commission Act 2001 (Cth) (ASIC Act); alternatively s 18 of the Australian Consumer Law set out in Schedule 2 of the Competition and Consumer Act 2010 (Cth);',
          'Ernst & Young — contraventions of ss 1041H and/or 1041E of the Corporations Act and/or s 12DA(1) of the ASIC Act and/or s 18 of the ACL.',
        ],
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
    registrationUrl: 'https://bantongroup.com/registration-in-the-phoslock-class-action/',
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
        kind: 'documents',
        heading: 'Latest filings',
        items: [
          { label: "Applicant's Further Amended Statement of Claim", href: 'https://bantongroup.com/wp-content/uploads/2026/03/2025-09-08-Further-Amended-Statement-of-Claim.pdf' },
          { label: 'Latest orders made in the proceeding (20 February 2026)', href: 'https://bantongroup.com/wp-content/uploads/2026/03/Phoslock-Class-Action-Orders-made-on-20-February-2026.pdf' },
        ],
      },

      { kind: 'h2', text: 'Group Member eligibility' },
      {
        kind: 'p',
        text:
          'Eligible parties must have: (1) entered contracts to acquire fully paid ordinary Phoslock shares during the Relevant Period (11 October 2018 - 17 September 2020), or retained them throughout; OR (2) obtained long equity swap exposure during the Relevant Period; (3) suffered loss from respondent conduct; and (4) not be related parties, officers, associates, or judicial officers of Phoslock.',
      },

      {
        kind: 'timeline',
        heading: 'Key dates',
        items: [
          { label: 'Relevant Period (share acquisition)', date: '11 Oct 2018 - 17 Sep 2020' },
          { label: 'Fraudulent activity announcement', date: '8 October 2020' },
          { label: 'Latest court orders issued', date: '20 February 2026' },
          { label: 'Next case management hearing', date: '7 August 2026' },
        ],
      },

      { kind: 'h2', text: 'Costs and funding' },
      {
        kind: 'ul',
        items: [
          'No upfront costs to group members — the proceeding is third-party funded',
          'Timeline is uncertain due to mediation, settlement and appeal variables',
          'Compensation amounts cannot be estimated at current stage',
        ],
      },
    ],
  },
]

export function getCaseBySlug(slug: string): CaseDetail | undefined {
  return cases.find((c) => c.slug === slug)
}
