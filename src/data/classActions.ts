// Banton Group — verified class-action copy
// Source: bantongroup.com (verbatim). Every "pdf" link or "Recall Notice" link
// is a placeholder (#) until the client supplies the real URLs.

export type Paragraph = { kind: 'p'; text: string }
export type BulletList = { kind: 'ul'; items: string[] }
export type OrderedList = { kind: 'ol'; items: string[] }
export type LabeledLink = { kind: 'link'; label: string; href: string; description?: string }
export type Email = { kind: 'email'; label: string; address: string }
export type Subheading = { kind: 'h'; text: string }
export type RecallTable = {
  kind: 'recalls'
  columns: string[]
  rows: (string | { link: string; label: string })[][]
}

export type Block = Paragraph | BulletList | OrderedList | LabeledLink | Email | Subheading | RecallTable

export type CaseStatus = 'Active' | 'Settled' | 'On Appeal' | 'Investigating'

export interface ClassAction {
  id: string
  title: string
  status: CaseStatus
  category: string
  year: string
  court?: string
  summary: string
  content: Block[]
  /** Short status line shown on the card — e.g. "Active — Federal Court NSD 924/2024" */
  keyDate?: string
  /** Canonical WordPress page for this matter on bantongroup.com */
  wordpressLink?: string
}

export const classActions: ClassAction[] = [
  // ─────────────────────────────────────────────────────────────
  {
    id: 'arrium',
    title: 'Arrium Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2020',
    court: 'Victorian Supreme Court',
    summary:
      'Class action against former directors of Arrium Limited (ASX:ARI) and auditors KPMG for share price inflation.',
    content: [
      {
        kind: 'p',
        text:
          'Banton Group is conducting a class action against certain former directors of Arrium Limited (Arrium) (ASX:ARI) (Director Defendants) and Arrium\u2019s former auditors, KPMG (collectively, the Defendants), in the Victorian Supreme Court No. S ECI 2020 03281 (Class Action).',
      },
      {
        kind: 'p',
        text:
          'The Class Action claims that investors suffered loss and damage either by purchasing Arrium shares at an inflated value or by purchasing them in circumstances where they would not have, had they been aware of Arrium\u2019s true financial position.',
      },
      { kind: 'link', label: 'More about the Arrium Class Action', href: '#arrium-info' },
    ],
    keyDate: 'Active — Victorian Supreme Court S ECI 2020 03281',
    wordpressLink: 'https://bantongroup.com/arrium-class-action/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'cudeco',
    title: 'CuDeco Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2021',
    court: 'Federal Court',
    summary:
      'Shareholders of ASX-listed CuDeco Limited (In Liquidation) allege continuous disclosure contraventions by directors and auditor KPMG.',
    content: [
      {
        kind: 'p',
        text:
          'Banton Group acts on behalf of shareholders in a class action against the former directors, officers and auditor (KPMG) of a previously ASX listed company CuDeco Limited (In Liquidation) (ASX:CDU).',
      },
      {
        kind: 'p',
        text:
          'The class action alleges the contravention of various provisions of the Corporations Act 2001 including, inter alia, their continuous disclosure obligations.',
      },
      { kind: 'link', label: 'More about the CuDeco Class Action', href: '#cudeco-info' },
    ],
    keyDate: 'KPMG settled 2025 · Directors trial pending',
    wordpressLink: 'https://bantongroup.com/cudeco-class-action/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'fitch-scdo',
    title: 'Fitch SCDO Class Action',
    status: 'Active',
    category: 'Financial Products',
    year: '2022',
    court: 'Federal Court',
    summary:
      'Investors in synthetic CDOs rated \u2018AAA\u2019\u2013\u2018AA-\u2019 by Fitch between 2005\u20132007 seeking damages for negligent ratings.',
    content: [
      {
        kind: 'p',
        text:
          'Banton Group acts on behalf of investors in a class action against Fitch Ratings, Inc (a company incorporated in Delaware, USA) and Fitch Ratings, Ltd (a company incorporated in the United Kingdom) (Fitch) concerning synthetic collateralised debt obligations (SCDOs) assigned a credit rating of \u2018AAA\u2019, \u2018AA+\u2019, \u2018AA\u2019 or \u2018AA-\u2019 by Fitch in and around the period 2005 to 2007.',
      },
      { kind: 'link', label: 'More about the Fitch SCDO Class Action', href: '#fitch-info' },
    ],
    keyDate: 'Active — Federal Court NSD 924/2024',
    wordpressLink: 'https://bantongroup.com/fitch-ratings-class-action/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'mdba',
    title: 'Murray Darling Basin Class Action',
    status: 'Active',
    category: 'Environmental',
    year: '2019',
    court: 'NSW Supreme Court',
    summary:
      'NSW and Victorian water entitlement holders seeking compensation for low water allocations in 2017\u20132020.',
    content: [
      {
        kind: 'p',
        text:
          'Banton Group acts on behalf of Doyle\u2019s Farm Produce Pty Ltd and the other lead Plaintiffs (together, Plaintiffs) in New South Wales Supreme Court Proceedings No. 2019/00150651 (Proceedings) in representative proceedings (i.e., a class action) against the Murray Darling Basin Authority (MDBA) and the Commonwealth of Australia (together, Defendants).',
      },
      { kind: 'p', text: 'The Plaintiffs bring the MDBA Class Action on behalf of:' },
      {
        kind: 'ul',
        items: [
          '(a) NSW Murray Regulated River general security water entitlement holders who were allocated low water allocations in the water year 2017/2018 and no water allocation or low water allocations in 2018/2019, and Victorian Murray high-reliability water share holders within the Murray declared water system who were allocated low water allocations in the 2019/20 water year;',
          '(b) water supply entitlements holders under contractual arrangement with the holder of a NSW Murray Regulated River general security bulk water access licence under the Water Management Act 2000 (NSW) or water supply entitlements holders under contractual arrangement with Goulburn-Murray Water as the bulk entitlement holder of WSE000139 (for the time periods outlined in (a) above); and',
          '(c) persons who conducted irrigated agriculture operations in the NSW Central Murray or the Goulburn-Murray irrigation region using water entitlements owned by the persons set out at (a) and (b) above (for the time periods outlined in (a) above), (together, Group Members).',
        ],
      },
      { kind: 'p', text: 'If you fall within the above description, you may be entitled to claim in the class action.' },
      { kind: 'h', text: 'Opt Out Notice' },
      {
        kind: 'p',
        text:
          'Group Members have until 4:00pm (AEST) on 31 May 2024 to opt out of the class action. Group Members who opt out will not be bound by the outcome of the MDBA Class Action and will not receive any money from the MDBA Class Action if it wins or settles. To opt out of this class action, you will need to complete the Opt Out Notice (link below) and then return it to the Registrar of the Supreme Court of New South Wales at the address on the form. The completed Opt Out Notice must reach the Registrar by no later than 4.00pm (AEST) on 31 May 2024, otherwise it will not be effective. Group Members should seek legal advice before opting out.',
      },
      { kind: 'link', label: 'Access the Opt Out Notice', href: '#mdba-opt-out' },
      { kind: 'h', text: 'Registering as a Group Member' },
      { kind: 'link', label: 'Register as a Group Member', href: '#mdba-register' },
      {
        kind: 'p',
        text:
          'While registering is not required to be a Group Member, by registering, you may help the Plaintiffs negotiate a better settlement for Group Members because the more information they have about Group Members\u2019 claims the better a position they will be at the mediation of the MDBA Class Action, which is currently scheduled on 19 July 2024.',
      },
      { kind: 'email', label: 'Enquiries', address: 'mdbaclassaction@bantongroup.com' },
    ],
    keyDate: 'Opt-out closed · Mediation July 2024',
    wordpressLink: 'https://bantongroup.com/mdba-class-action/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'blue-sky',
    title: 'Blue Sky Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2021',
    court: 'Federal Court',
    summary:
      'Shareholders allege materially misstated financial reports by Blue Sky and auditor Ernst & Young in FY2016\u2013FY2018.',
    content: [
      {
        kind: 'p',
        text:
          'Banton Group acts together with Shine Lawyers for the Lead Applicants in a consolidated class action brought on behalf of shareholders of Blue Sky against Blue Sky, its former directors and auditor, Ernst & Young.',
      },
      {
        kind: 'p',
        text:
          'The shareholder class action alleges that Blue Sky lodged with the ASX and published in FY2016, FY2017 and FY2018 audited financial reports (and interim reports) which were not compliant with the Australian Accounting Standards and misrepresented, among other matters, Blue Sky\u2019s financial performance and position.',
      },
      {
        kind: 'p',
        text:
          'The claim arises from representations made in the financial reports, which the applicants allege materially overstated Blue Sky\u2019s financial performance and overstated Blue Sky\u2019s assets. It is alleged the overstatement of Blue Sky\u2019s performance resulted in the market being misinformed and Blue Sky\u2019s share price being inflated. Had the financial reports been prepared in accordance with the Australian Accounting Standards and the Corporations Act 2001 (Cth) (Corporations Act), Blue Sky\u2019s financial position would have been materially worse.',
      },
      {
        kind: 'p',
        text:
          'The case is premised that it is the failure to report accurately, and the failure by Blue Sky\u2019s auditors to detect the misstatements, that caused investors to suffer loss and damage. The contraventions alleged include contraventions by Blue Sky and the director respondents of ss 674, 1041H and 1041E of the Corporations Act, alternatively 12DA(1) of the Australian Securities and Investments Commissions Act 2001 (Cth) (ASIC Act), alternatively s 18 of the Australian Consumer Law set out in Schedule 2 of the Competition and Consumer Act 2010 (Cth) (ACL) and contraventions by Ernst & Young of ss 1041H and/or 1041E of the Corporations Act and/or s 12DA(1) of the ASIC Act and/or s 18 of the ACL.',
      },
    ],
    keyDate: 'Active — Federal Court',
    wordpressLink: 'https://bantongroup.com/class-actions/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'sp-cdo',
    title: 'S&P CDO & CPDO Ratings Class Action',
    status: 'Active',
    category: 'Financial Products',
    year: '2022',
    court: 'Federal Court of Australia',
    summary:
      'Action against S&P Global for misleading credit ratings on CDOs and CPDOs issued between 2005\u20132007.',
    content: [
      { kind: 'h', text: 'Background' },
      {
        kind: 'p',
        text:
          'Banton Group acts on behalf of investors in a class action against S&P Global, Inc and Standard & Poor\u2019s International, LLC (S&P). The class action concerns collateralised debt obligations (CDOs) and constant proportion debt obligations (CPDOs) assigned a credit rating of \u2018AAA\u2019, \u2018AA+\u2019, \u2018AA\u2019 or \u2018AA-\u2019 by S&P in and around the period 2005 to 2007.',
      },
      { kind: 'h', text: 'Group Member Definition' },
      { kind: 'p', text: 'You are a group member if you:' },
      {
        kind: 'ol',
        items: [
          'acquired interests in one or more CDOs or CPDOs assigned credit ratings AAA, AA+, AA or AA- by S&P using: (a) CDO Evaluator 2.4.3 on or after 19 December 2005; and/or (b) CDO Evaluator 3.0, 3.1 or 3.2; and/or (c) CPDO Evaluator (together, the Claim CDOs);',
          'acquired interests in the Claim CDOs by reason of the publication or dissemination of the ratings for those products in Australia; and',
          'have suffered loss or damage by reason of your acquisition of interests in the Claim CDOs.',
        ],
      },
      {
        kind: 'p',
        text:
          'You may be a group member if you acquired an interest in a Claim CDO, even if you acquired it after 2007. How you acquired the interest does not necessarily prevent you from being a group member: this includes buying interests in the Claim CDO in the initial issue or in a re-sale on a secondary market, or any other acquisition.',
      },
      { kind: 'email', label: 'Uncertain whether you qualify?', address: 'sandpcdos@bantongroup.com' },
      { kind: 'h', text: 'The Proceeding' },
      {
        kind: 'p',
        text:
          'The proceedings are a class action in the Federal Court of Australia concerning a claim against S&P for deceit, unconscionable conduct and contraventions of ss 1041F and G of the Corporations Act.',
      },
      {
        kind: 'p',
        text:
          'The claims are premised on representations made by S&P in assigning the Claim CDOs ratings of AA- or higher, when S&P knew or ought to have known that these ratings were wrong (and S&P\u2019s decision to use those ratings was influenced by business considerations).',
      },
      { kind: 'h', text: 'Next Steps' },
      { kind: 'link', label: 'Register your claim / request further information', href: '#sp-register' },
    ],
    keyDate: 'Active — Federal Court of Australia',
    wordpressLink: 'https://bantongroup.com/class-actions/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'hyundai-abs',
    title: 'Hyundai ABS Class Action',
    status: 'Active',
    category: 'Consumer',
    year: '2024',
    court: 'Supreme Court of Victoria',
    summary:
      'Class action against Hyundai Motor Company Australia for a defective ABS module creating risk of engine compartment fire.',
    content: [
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
          'The Hyundai ABS Class Action seeks compensation for vehicle owners who have suffered loss due to alleged breaches of the Australian Consumer Law by Hyundai.',
      },
      { kind: 'p', text: 'The Hyundai ABS Class Action is in the Supreme Court of Victoria.' },
      {
        kind: 'p',
        text:
          'A competing class action has been filed by another law firm and a hearing is scheduled on 30 June 2025 to determine which law firm will be given carriage of the class action against Hyundai.',
      },
      { kind: 'h', text: 'Register' },
      {
        kind: 'p',
        text:
          'You may be eligible to register to participate in the Hyundai ABS Class Action if you acquired one or more of the following affected vehicles listed in the table below:',
      },
      {
        kind: 'recalls',
        columns: ['Model', 'Series', 'Model Years', 'Acquired prior to', 'Recall Notice'],
        rows: [
          ['Sonata', 'NF', '2004–2013', '28 February 2018', { link: '#recall-hy-1', label: 'Recall Notice' }],
          ['Grandeur', 'TG', '2004–2013', '28 February 2018', { link: '#recall-hy-2', label: 'Recall Notice' }],
          ['Santa Fe', '—', '2006–2009', '8 May 2020', { link: '#recall-hy-3', label: 'Recall Notice' }],
          ['i30', '—', '2005–2010', '8 May 2020', { link: '#recall-hy-4', label: 'Recall Notice' }],
          ['Elantra', '—', '2005–2010', '8 May 2020', { link: '#recall-hy-5', label: 'Recall Notice' }],
          ['Tuscon', '—', '2014–2020', '4 February 2021', { link: '#recall-hy-6', label: 'Recall Notice' }],
          ['Genesis', '—', '2014–2017', '30 May 2021', { link: '#recall-hy-7', label: 'Recall Notice' }],
          ['Genesis', 'G80', '2018', '30 May 2021', { link: '#recall-hy-8', label: 'Recall Notice' }],
          ['Santa Fe', 'DM', '2014–2017', '26 September 2022', { link: '#recall-hy-9', label: 'Recall Notice' }],
          ['ix35', '—', '2014–2017', '26 September 2022', { link: '#recall-hy-10', label: 'Recall Notice' }],
          ['ix35 (EL)', 'EL', '2014–2015', '7 December 2022', { link: '#recall-hy-11', label: 'Recall Notice' }],
          ['Veloster', 'FS', '2007–2014', '1 August 2024', { link: '#recall-hy-12', label: 'Recall Notice' }],
          ['ix35', 'LM', '2007–2014', '1 August 2024', { link: '#recall-hy-13', label: 'Recall Notice' }],
          ['Accent', 'RM', '2007–2014', '1 August 2024', { link: '#recall-hy-14', label: 'Recall Notice' }],
          ['i40', 'VF', '2007–2014', '1 August 2024', { link: '#recall-hy-15', label: 'Recall Notice' }],
          ['Santa Fe', 'DM', '2007–2014', '1 August 2024', { link: '#recall-hy-16', label: 'Recall Notice' }],
          ['iMax', '—', '2007–2014', '1 August 2024', { link: '#recall-hy-17', label: 'Recall Notice' }],
          ['iLoad', '—', '—', '—', '—'],
        ],
      },
      {
        kind: 'p',
        text:
          'If you are unsure if you are eligible to participate in the Hyundai ABS Class Action, click the link of the recall notice and check whether your Vehicle Identification Number (VIN) is included on the list published. A VIN is a unique identification number which can be found on your vehicle\u2019s registration certificate or owner\u2019s manual.',
      },
      {
        kind: 'p',
        text:
          'You are still able to participate in the Hyundai ABS Class Action even if you have sold your vehicle, written off your vehicle or work to fix the issues relating to the recall notice has been done.',
      },
      { kind: 'link', label: 'Hyundai ABS Class Action — Group Proceeding Summary Statement', href: '#hy-group-statement' },
      { kind: 'link', label: 'Hyundai ABS Class Action — Funding Information Summary', href: '#hy-funding-statement' },
      { kind: 'h', text: 'Update' },
      {
        kind: 'p',
        text:
          'On 28 March 2025, the lead Plaintiffs signalled their intention to seek leave of the Court to amend the scope of the claim against Hyundai to include group members with vehicle models recalled on 1 August 2024. Should the Court grant leave to amend the scope of the claim, the below documents will reflect the new scope of the Hyundai ABS Class Action:',
      },
      { kind: 'link', label: 'Proposed Amended Group Proceeding Summary Statement', href: '#hy-amended-group' },
      { kind: 'link', label: 'Proposed Amended Funding Information Summary', href: '#hy-amended-funding' },
      { kind: 'email', label: 'All Hyundai ABS Class Action enquiries', address: 'Hyundaikia@bantongroup.com' },
    ],
    keyDate: 'Active — Carriage hearing 30 June 2025',
    wordpressLink: 'https://bantongroup.com/class-actions/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'kia-abs',
    title: 'Kia ABS Defect Class Action',
    status: 'Active',
    category: 'Consumer',
    year: '2024',
    court: 'Supreme Court of Victoria',
    summary:
      'Class action against Kia Australia for the same ABS manufacturing defect \u2014 risk of fire even when parked.',
    content: [
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
          'The Kia ABS Class Action seeks compensation for vehicle owners who have suffered loss due to alleged breaches of the Australian Consumer Law by Kia.',
      },
      { kind: 'p', text: 'The Kia ABS Class Action is in the Supreme Court of Victoria.' },
      {
        kind: 'p',
        text:
          'A competing class action has been filed by another law firm and a hearing is scheduled on 30 June 2025 to determine which law firm will be given carriage of the class action against Kia.',
      },
      { kind: 'h', text: 'Register' },
      {
        kind: 'p',
        text:
          'You may be eligible to register to participate in the Kia ABS Class Action if you acquired one or more of the following affected vehicles listed in the table below:',
      },
      {
        kind: 'recalls',
        columns: ['Model', 'Series', 'Model Years', 'Acquired prior to', 'Recall Notice'],
        rows: [
          ['Sportage', '—', '2007–2009', '5 January 2017', { link: '#recall-kia-1', label: 'Recall Notice' }],
          ['Sorrento', '—', '2005–2010', '17 March 2020', { link: '#recall-kia-2', label: 'Recall Notice' }],
          ['Carnival', '—', '2005–2010', '17 March 2020', { link: '#recall-kia-3', label: 'Recall Notice' }],
          ['Sportage', '—', '2016–2019', '16 May 2021', { link: '#recall-kia-4', label: 'Recall Notice' }],
          ['Stinger', '—', '2016–2019', '16 May 2021', { link: '#recall-kia-5', label: 'Recall Notice' }],
          ['Sportage', 'SLe', '2014–2015', '19 January 2023', { link: '#recall-kia-6', label: 'Recall Notice' }],
          ['Sportage', 'KM', '2007–2009', '19 January 2023', { link: '#recall-kia-7', label: 'Recall Notice' }],
          ['Soul', 'AM', '2010–2013', '9 October 2024', { link: '#recall-kia-8', label: 'Recall Notice' }],
          ['Sorrento', 'XM', '2010–2014', '9 October 2024', { link: '#recall-kia-9', label: 'Recall Notice' }],
          ['Cerato', 'TD', '2009–2013', '9 October 2024', { link: '#recall-kia-10', label: 'Recall Notice' }],
          ['Sportage', 'SL', '2009–2013', '9 October 2024', { link: '#recall-kia-11', label: 'Recall Notice' }],
          ['Optima', 'TF', '2010–2015', '9 October 2024', { link: '#recall-kia-12', label: 'Recall Notice' }],
          ['Rio', 'UB', '2011–2016', '9 October 2024', { link: '#recall-kia-13', label: 'Recall Notice' }],
          ['Sportage', 'SLe', '2013–2014', '9 October 2024', { link: '#recall-kia-14', label: 'Recall Notice' }],
          ['Rondo', 'UN', '2009–2012', '9 October 2024', { link: '#recall-kia-15', label: 'Recall Notice' }],
          ['Rondo', 'RP', '2012–2018', '9 October 2024', { link: '#recall-kia-16', label: 'Recall Notice' }],
        ],
      },
      {
        kind: 'p',
        text:
          'If you are unsure if you are eligible to participate in the Kia ABS Class Action, click the link of the recall notice and check whether your Vehicle Identification Number (VIN) is included on the list published.',
      },
      {
        kind: 'p',
        text:
          'You are still able to participate in the Kia ABS Class Action even if you have sold your vehicle, written off your vehicle or work to fix the issues relating to the recall notice has been done.',
      },
      { kind: 'link', label: 'Kia ABS Class Action — Group Proceeding Summary Statement', href: '#kia-group-statement' },
      { kind: 'link', label: 'Kia ABS Class Action — Funding Information Summary', href: '#kia-funding-statement' },
      { kind: 'h', text: 'Update' },
      {
        kind: 'p',
        text:
          'On 28 March 2025, the lead Plaintiff signalled his intention to seek leave of the Court to amend the scope of the claim against Kia to include group members with vehicle models recalled on 9 October 2024.',
      },
      { kind: 'link', label: 'Proposed Amended Group Proceeding Summary Statement', href: '#kia-amended-group' },
      { kind: 'link', label: 'Proposed Amended Funding Information Summary', href: '#kia-amended-funding' },
      { kind: 'email', label: 'All Kia ABS Class Action enquiries', address: 'Hyundaikia@bantongroup.com' },
    ],
    keyDate: 'Active — Carriage hearing 30 June 2025',
    wordpressLink: 'https://bantongroup.com/class-actions/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'salt-lake',
    title: 'Salt Lake Class Action',
    status: 'Investigating',
    category: 'Securities',
    year: '2024',
    summary:
      'Investigation into class action against Salt Lake Potash (ASX:SO4; AIM:SO4), its directors and officers, and auditor Ernst & Young.',
    content: [
      {
        kind: 'p',
        text:
          'Banton Group is well advanced in its investigation of class action proceedings against Salt Lake Potash Limited (in admin) (receivers and managers appt) (SO4), its former directors and officers, and its auditors (Ernst & Young) (EY) (the Proceeding).',
      },
      {
        kind: 'p',
        text:
          'SO4 is a formerly dual listed ASX and AIM mining and exploration company (ASX:SO4; AIM:SO4) that was developing salt lakes in Western Australia to produce sulphate of potash or potassium sulphate.',
      },
      { kind: 'h', text: 'The Proceeding' },
      {
        kind: 'p',
        text:
          'The Proceeding will allege that SO4 and its former directors and officers contravened various provisions of the ASX Listing Rules, the Corporations Act 2001 (Cth) (Corporations Act), the Australian Securities and Investments Commission Act 2001 (Cth) (ASIC Act) and the Australian Consumer Law.',
      },
      {
        kind: 'p',
        text:
          'In addition, the Proceeding will allege that EY contravened various provisions of the Corporations Act, the ASIC Act and the Australian Consumer Law to the extent that they contributed to or caused any damages by their representations in SO4\u2019s audited annual and half-year financial reports.',
      },
      { kind: 'h', text: 'Funding' },
      {
        kind: 'p',
        text:
          'The Proceeding will either be funded subject to a Group Costs Order or other appropriate contingency fee order sought. In either scenario, group members who join the class action will have no financial obligations or financial risk in connection with the Proceeding.',
      },
      { kind: 'link', label: 'Register as a group member / enquire', href: '#salt-lake-register' },
    ],
    keyDate: 'Investigation advanced',
    wordpressLink: 'https://bantongroup.com/class-actions/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'zip-co',
    title: 'Zip Co Class Action',
    status: 'Investigating',
    category: 'Securities',
    year: '2024',
    summary:
      'Investigation into potential claims against Zip Co, its directors and officers, and auditor Deloitte.',
    content: [
      { kind: 'h', text: 'Background' },
      {
        kind: 'p',
        text:
          'Banton Group is well advanced in its investigation of potential claims against Zip Co; its directors and officers; and Deloitte Touche Tohmatsu (Deloitte), Zip Co\u2019s auditor.',
      },
      {
        kind: 'p',
        text:
          'Zip Co is a large global financial technology company specializing in Buy Now Pay Later credit and payment services (BNPL).',
      },
      { kind: 'h', text: 'The Proceeding' },
      {
        kind: 'p',
        text:
          'The anticipated class action will allege that Zip Co and its former directors and officers contravened various provisions of ASX Listing Rules, the Corporations Act 2001 (Cth) (Corporations Act), the Australian Securities and Investments Commission Act 2001 (Cth) (ASIC Act) and the Australian Consumer Law.',
      },
      {
        kind: 'p',
        text:
          'In addition, we are considering potential claims against Zip Co\u2019s auditors, Deloitte, to the extent that they caused or contributed to any damage, by their deficient auditing of Zip Co\u2019s annual and half-yearly financial reports.',
      },
      { kind: 'h', text: 'Funding' },
      {
        kind: 'p',
        text:
          'The proposed proceeding will either be funded or a Group Costs Order or appropriate contingency fee order will be sought. In either anticipated scenario, group members who join the class action will have no financial obligations or financial risk in connection with the proceeding.',
      },
      { kind: 'link', label: 'Register as a group member / enquire', href: '#zip-register' },
    ],
    keyDate: 'Investigation advanced',
    wordpressLink: 'https://bantongroup.com/class-actions/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'qoin',
    title: 'Qoin Class Action',
    status: 'Settled',
    category: 'Consumer',
    year: '2025',
    summary: 'Settlement approval orders dated 28 May 2025.',
    content: [{ kind: 'link', label: 'Settlement approval orders (28 May 2025)', href: '#qoin-settlement' }],
    keyDate: 'Settlement approved 28 May 2025',
    wordpressLink: 'https://bantongroup.com/class-actions/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'light-rail',
    title: 'Light Rail Class Action',
    status: 'On Appeal',
    category: 'Nuisance',
    year: '2020',
    court: 'High Court of Australia',
    summary:
      'Businesses, landlords and residents affected by the CBD & South-East Light Rail project \u2014 now before the High Court.',
    content: [
      {
        kind: 'p',
        text:
          'Banton Group acts on behalf of businesses, landlords and residents in class proceedings against Transport for New South Wales (TfNSW) in relation to its conduct in planning and procuring the CBD & South-East Light Rail project (Project).',
      },
      {
        kind: 'p',
        text:
          'On 19 July 2023, following a six-week trial, Cavanagh J handed down his judgment in relation to these proceedings, which found in favour of the corporate lead plaintiffs, Hunt Leather Pty Ltd and Ancio Investments Pty Ltd. TfNSW subsequently appealed that decision to the NSW Court of Appeal and on 18 September 2024, Bell CJ, Leeming JA and Mitchelmore JA handed down their judgment in favour of TfNSW.',
      },
      {
        kind: 'p',
        text:
          'The lead plaintiffs have successfully sought special leave to appeal the decision of the NSW Court of Appeal to the High Court and the hearing of that appeal is listed for 15-16 May 2025.',
      },
      { kind: 'link', label: 'Read the 19 July 2023 judgment', href: '#light-rail-judgment' },
      { kind: 'h', text: 'Group Member Definition' },
      { kind: 'p', text: 'You are a group member if you:' },
      {
        kind: 'ul',
        items: [
          '(a) hold, or have held, an interest in land in the vicinity of the Project and have suffered loss or damage by reason of the Defendant\u2019s alleged interference with your enjoyment of your interest in land; or',
          '(b) have suffered loss or damage by reason of the Defendant\u2019s alleged interference with public land through the carrying out of the Project (other than merely loss or damage in your capacity as a member of the general public).',
        ],
      },
      {
        kind: 'p',
        text:
          'In simple terms, you are likely to be a group member if you own land in the vicinity of the Project, own or operate a business in the vicinity of the Project, or live in the vicinity of the Project, and you have been adversely affected by the consequences of the construction of the Project.',
      },
      {
        kind: 'p',
        text:
          'You are excluded from being a group member if you are an officer or employee of the Defendant, a judge or registrar of the Supreme Court of NSW or the High Court of Australia, or an officer or employee of, or other legal practitioner engaged in connection with these proceedings by Mitry Lawyers or Banton Group.',
      },
      { kind: 'h', text: 'Registration' },
      { kind: 'email', label: 'Enquiries and registrations', address: 'lightrailclassaction@bantongroup.com' },
    ],
    keyDate: 'High Court hearing 15-16 May 2025',
    wordpressLink: 'https://bantongroup.com/class-actions/',
  },
  // ─────────────────────────────────────────────────────────────
  {
    id: 'phoslock',
    title: 'Phoslock Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2022',
    court: 'Federal Court of Australia',
    summary:
      'Action against Phoslock (ASX:PET) directors and KPMG following disclosure of fraudulent activity in China operations.',
    content: [
      { kind: 'h', text: 'Overview' },
      {
        kind: 'p',
        text:
          'Banton Group acts on behalf of shareholders in class action proceedings against Phoslock Environmental Technologies Ltd (ASX:PET), former Chairman Mr Laurence Freedman, former Managing Director Mr Robert Schuitema and Phoslock\u2019s former auditor, KPMG (together the Respondents). The proceeding is in the Federal Court of Australia.',
      },
      {
        kind: 'p',
        text:
          'The claims arise out of allegations concerning Phoslock\u2019s China operations, which were first disclosed to the market in late 2021. On 8 October 2020, Phoslock announced to the market that it had identified fraudulent activity relating to areas including false accounting, falsification of invoices and services contracts, improper tax reporting, potential misappropriation of funds, and undisclosed related party transactions.',
      },
      { kind: 'h', text: 'Case Status' },
      { kind: 'link', label: 'Applicant\u2019s Further Amended Statement of Claim', href: '#phoslock-soc' },
      { kind: 'link', label: 'Latest orders made in the proceeding', href: '#phoslock-orders' },
      {
        kind: 'p',
        text:
          'The parties are currently reviewing documents exchanged during Discovery. Discovery is a formal process in legal proceedings where each party is required to disclose to the other side documents that are relevant to the issues in dispute.',
      },
      { kind: 'h', text: 'Eligibility' },
      {
        kind: 'p',
        text:
          'Group Members are all persons who or which entered a contract (whether by themselves or by an agent or trustee) to acquire an interest in fully paid ordinary shares (Phoslock Shares) in Phoslock Environmental Technologies Ltd during the period between 11 October 2018 and 17 September 2020 (inclusive) (Relevant Period); or prior to the Relevant Period, which they retained throughout the Relevant Period; or acquired long exposure to Phoslock Shares by entering equity swap confirmations in respect of Phoslock Shares during the Relevant Period; and have suffered loss or damage by reason of the conduct of the Respondents.',
      },
      { kind: 'h', text: 'Next Court date' },
      { kind: 'p', text: 'The matter is listed for case management on 7 August 2026.' },
      { kind: 'h', text: 'Costs and Fees' },
      {
        kind: 'p',
        text:
          'Group Members are not liable to pay the upfront legal costs of the class action. However, as the proceedings are funded by a third party litigation funder, if the class action is successful you may be required to contribute towards the legal costs and the litigation funder\u2019s commission from your share of any net proceeds you receive.',
      },
      { kind: 'email', label: 'Phoslock Class Action enquiries', address: 'phoslockclassaction@bantongroup.com' },
    ],
    keyDate: 'Discovery in progress · CMC 7 August 2026',
    wordpressLink: 'https://bantongroup.com/class-actions/',
  },
]

export const investigations = [
  {
    id: 'highlow',
    title: 'HighLow Markets Pty Ltd Investigation',
    summary:
      'Potential class action on behalf of people who have purchased binary options from HighLow Markets Pty Ltd.',
    body:
      'HighLow is a company registered in Australia whose primary line of business is the issuing and trading of binary options to retail investors. If you purchased HighLow options since 1 February 2015 and would like to register your interest in participating in any prospective class action or would like further information, contact us.',
    link: { label: 'Register interest', href: '#highlow-register' },
  },
  {
    id: 'tyro',
    title: 'Tyro Payments Ltd Investigation',
    summary:
      'Possible class action on behalf of customers of Tyro Payments Ltd (ASX:TYR) affected by the January 2021 terminal outage.',
    body:
      'Tyro says the outage was caused by a connectivity issue, and affected many of Tyro\u2019s electronic payment terminals used in businesses across Australia over a 19 day period. If your business was affected, register your interest.',
    link: { label: 'Register interest', href: '#tyro-register' },
  },
]

export const pastActions = [
  'Arasor Class Action',
  'Octaviar Notes Class Action',
  'Financial Products Class Actions — Standard & Poor\u2019s',
  'Financial Products Class Actions — Fitch Ratings',
  'Financial Products Class Actions — Commonwealth Bank',
  'Financial Products Class Actions — ANZ',
  'Financial Products Class Actions — ABN Amro',
  'Financial Products Class Actions — Lehman Brothers',
]
