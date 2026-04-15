// Banton Group News & Articles
// Amanda / the admin team add articles here as they get published.
// Markdown-ish content is supported as an array of Block entries
// so images, pull quotes, and external links can be mixed in.

export type ArticleBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'quote'; text: string; attribution?: string }
  | { kind: 'link'; label: string; href: string }
  | { kind: 'image'; src: string; caption?: string }

export interface NewsArticle {
  /** URL slug — used as the article's route (/news/:slug) */
  slug: string
  title: string
  /** ISO 8601 date. Example: "2025-03-14" */
  date: string
  /** Short sentence shown on the list and at the top of the article. */
  excerpt: string
  /** Optional short tag. Example: "Class Actions", "Press Release", "Media". */
  category?: string
  /** Optional author byline. Example: "Amanda Banton". */
  author?: string
  /** Source + external link for press pieces. */
  source?: { name: string; url: string }
  /** Cover image shown on the list card and at the top of the article. */
  coverImage?: string
  /** Article body — leave empty if this entry only links out to an external source. */
  content?: ArticleBlock[]
}

// ─────────────────────────────────────────────────────────────
// Sample articles — placeholders so the layout renders fully.
// Replace or remove these as real pieces come in from Amanda / admin.
// ─────────────────────────────────────────────────────────────
export const articles: NewsArticle[] = [
  {
    slug: 'chambers-asia-pacific-2026-ranking',
    title: 'Banton Group ranked in Chambers Asia-Pacific 2026',
    date: '2026-01-22',
    category: 'Press Release',
    author: 'Banton Group',
    excerpt:
      'Chambers and Partners has recognised Banton Group in its 2026 Asia-Pacific guide for Dispute Resolution: Class Actions, with Amanda Banton ranked a Leading Individual for the fourth year.',
    coverImage: '/img/hero-bg/about.jpg',
    content: [
      {
        kind: 'p',
        text:
          'Banton Group is pleased to have been recognised in the 2026 Chambers Asia-Pacific guide, reinforcing the firm\u2019s position as one of Australia\u2019s leading plaintiff-side disputes boutiques.',
      },
      {
        kind: 'p',
        text:
          'Founder and Principal Partner Amanda Banton has been ranked as a Leading Individual in Dispute Resolution: Class Actions for the fourth year in a row \u2014 2022, 2023, 2025 and 2026. The firm itself is also ranked in the same category for 2026.',
      },
      {
        kind: 'quote',
        text:
          "I have found Banton Group to be reliable, forward thinking and thoroughly professional. I consider them to be the best boutique law firm in plaintiff class actions.",
        attribution: 'Client quote \u2014 Chambers Asia-Pacific 2026',
      },
      { kind: 'h2', text: 'A consistent ranking' },
      {
        kind: 'p',
        text:
          'Since its founding in February 2020, Banton Group has been ranked by both Chambers and Partners and The Legal 500 every year it has been eligible for inclusion, acting in some of the country\u2019s most significant class actions and insolvencies.',
      },
      {
        kind: 'ul',
        items: [
          'Chambers Asia-Pacific 2022, 2023, 2025, 2026 \u2014 Amanda Banton, Leading Individual',
          'Legal 500 Asia-Pacific 2022, 2023, 2026 \u2014 Recommended Firm',
          'Australasian Law Awards 2022 \u2014 Law Firm Leader of the Year',
        ],
      },
    ],
  },
  {
    slug: 'hyundai-kia-abs-carriage-hearing',
    title: 'Hyundai and Kia ABS class actions: carriage hearing set for 30 June 2025',
    date: '2025-05-09',
    category: 'Class Actions',
    author: 'Banton Group',
    excerpt:
      'The Supreme Court of Victoria will decide which firm takes carriage of the competing Hyundai and Kia ABS class actions on 30 June 2025. Banton Group acts for the lead Plaintiffs in both proceedings.',
    content: [
      {
        kind: 'p',
        text:
          'The Supreme Court of Victoria has listed the carriage hearing in the Hyundai and Kia ABS class actions for 30 June 2025. Banton Group acts for Samantha Jane Edwards and Josephine Dolores Hoppner in the Hyundai proceeding, and for David John Sims in the Kia proceeding.',
      },
      {
        kind: 'p',
        text:
          'Both class actions seek compensation under the Australian Consumer Law in relation to a defect in the Anti-Lock Braking System that can cause an engine compartment fire when components are exposed to moisture \u2014 even when the vehicle is turned off.',
      },
      { kind: 'h2', text: 'What happens at a carriage hearing' },
      {
        kind: 'p',
        text:
          'Where two or more representative proceedings are commenced against the same defendant over the same subject matter, the Court decides which proceeding should continue \u2014 a decision known as a "carriage contest". The Court considers the scope of the claim, funding arrangements, and the interests of group members.',
      },
      { kind: 'h3', text: 'Proposed expansion of the claims' },
      {
        kind: 'p',
        text:
          'On 28 March 2025 the lead Plaintiffs in both proceedings signalled their intention to seek leave of the Court to expand the scope of the claims to include further Hyundai models recalled on 1 August 2024 and further Kia models recalled on 9 October 2024.',
      },
      {
        kind: 'p',
        text:
          'If you own or previously owned a vehicle listed in the recall notices, you may be eligible to participate. Enquiries are welcome at Hyundaikia@bantongroup.com.',
      },
    ],
  },
  {
    slug: 'mdba-class-action-mediation',
    title: 'MDBA Class Action: mediation scheduled for July 2024',
    date: '2024-05-30',
    category: 'Class Actions',
    author: 'Banton Group',
    excerpt:
      'Following the close of the opt-out period on 31 May 2024, the Murray Darling Basin Authority class action will proceed to mediation on 19 July 2024.',
    content: [
      {
        kind: 'p',
        text:
          'The opt-out window in the MDBA Class Action closes at 4:00pm (AEST) on 31 May 2024. From that date, all group members captured by the class definition will be bound by the outcome of the proceeding unless they have validly opted out.',
      },
      {
        kind: 'p',
        text:
          'The proceeding is brought on behalf of water entitlement holders who were allocated low or no water allocations in 2017/18, 2018/19 and 2019/20 \u2014 alongside irrigated agriculture operators across the NSW Central Murray and Goulburn-Murray irrigation regions.',
      },
      {
        kind: 'quote',
        text:
          'Class members who register provide the plaintiffs with stronger information about claims, and a stronger position at mediation. Registration is not required to be a group member, but it matters.',
        attribution: 'Banton Group',
      },
      { kind: 'h2', text: 'Mediation on 19 July 2024' },
      {
        kind: 'p',
        text:
          'Mediation is currently scheduled for 19 July 2024. Group members who wish to assist the mediation process are encouraged to register their interest. All enquiries can be directed to mdbaclassaction@bantongroup.com.',
      },
    ],
  },
  {
    slug: 'summer-clerkship-2025-intake-open',
    title: 'Applications open: Summer Clerkship 2025/2026',
    date: '2025-08-04',
    category: 'Careers',
    author: 'Banton Group',
    excerpt:
      'Applications are now open for the December and February intakes of the Banton Group Summer Clerkship Program \u2014 four weeks working alongside the firm\u2019s partners on Australia\u2019s largest complex litigations.',
    content: [
      {
        kind: 'p',
        text:
          'Banton Group\u2019s Summer Clerkship Program offers law students real, direct exposure to senior lawyers and to some of Australia\u2019s largest and most complex litigations.',
      },
      {
        kind: 'p',
        text:
          'Because the firm works as one practice \u2014 rather than in rotational silos \u2014 clerks receive work from all partners over the four-week clerkship. Each clerk is paired with a lawyer buddy and a senior lawyer mentor.',
      },
      { kind: 'h3', text: 'Intakes and duration' },
      {
        kind: 'ul',
        items: [
          'December 2025 intake \u2014 four weeks',
          'February 2026 intake \u2014 four weeks',
        ],
      },
      { kind: 'h3', text: 'How to apply' },
      {
        kind: 'p',
        text:
          'Send your cover letter, CV and academic transcript to careers@bantongroup.com. Applications are considered on a rolling basis until filled.',
      },
      {
        kind: 'quote',
        text:
          'The supportive culture and challenging assignments made it an excellent learning environment. I gained valuable insights into cutting edge class actions and performed vital tasks.',
        attribution: 'Lyndon Arundell, Associate \u2014 Summer Clerk 2022 / 2023',
      },
    ],
  },
  {
    slug: 'phoslock-discovery-update',
    title: 'Phoslock Class Action: Discovery underway ahead of 2026 case management',
    date: '2025-11-18',
    category: 'Class Actions',
    author: 'Banton Group',
    excerpt:
      'The parties in the Phoslock class action are currently reviewing documents exchanged during Discovery, ahead of the next case management conference listed for 7 August 2026.',
    content: [
      {
        kind: 'p',
        text:
          'The Phoslock class action, brought on behalf of shareholders in Phoslock Environmental Technologies Ltd (ASX:PET), continues to progress through the Federal Court of Australia. The parties are currently reviewing documents exchanged during Discovery.',
      },
      { kind: 'h3', text: 'What Discovery means' },
      {
        kind: 'p',
        text:
          'Discovery is a formal process in which each party must disclose relevant documents to the other side \u2014 including material that supports a party\u2019s case and material that may be unfavourable. The Applicant is also preparing his lay and expert evidence.',
      },
      { kind: 'h3', text: 'Next listing' },
      {
        kind: 'p',
        text:
          'The matter is listed for its next case management conference on 7 August 2026. Group members are reminded that registering is not required to be a group member, but it helps the Applicant understand the size and composition of the claim.',
      },
      {
        kind: 'p',
        text:
          'For enquiries, contact phoslockclassaction@bantongroup.com.',
      },
    ],
  },
]

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getSortedArticles(): NewsArticle[] {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1))
}
