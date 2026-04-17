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
// Initial content approved by the firm — April 2026.
// These are the 5 launch articles. Once Sanity is wired, Amanda
// adds / edits entries from the /studio admin and these samples
// become the fallback used only when the CMS is unreachable.
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
    source: {
      name: 'chambers.com',
      url: 'https://chambers.com/law-firm/banton-group-asia-pacific-8:23231690',
    },
  },
  {
    slug: 'cudeco-kpmg-settlement',
    title: 'CuDeco Class Action \u2014 KPMG Settlement reached',
    date: '2025-09-15',
    category: 'Case Update',
    author: 'Banton Group',
    excerpt:
      'Banton Group announces that KPMG has reached a settlement agreement in the CuDeco Class Action. The settlement was approved by the Federal Court of Australia in December 2025. Directors trial is continuing.',
    source: {
      name: 'Full case details',
      url: '/class-actions/cudeco',
    },
  },
  {
    slug: 'qoin-settlement-approved',
    title: 'Qoin Class Action \u2014 Settlement approved',
    date: '2025-05-28',
    category: 'Case Update',
    author: 'Banton Group',
    excerpt:
      'The Federal Court of Australia has approved the settlement of the Qoin Class Action. Settlement approval orders were made on 28 May 2025.',
    source: {
      name: 'Class Actions',
      url: '/class-actions',
    },
  },
  {
    slug: 'hyundai-kia-scope-expanded',
    title: 'Hyundai & Kia ABS Class Actions \u2014 Scope expanded',
    date: '2025-03-28',
    category: 'Case Update',
    author: 'Banton Group',
    excerpt:
      'On 28 March 2025, the lead plaintiffs signalled their intention to seek leave of the Court to amend the scope of the claims against Hyundai and Kia to include additional vehicle models recalled in August and October 2024.',
    source: {
      name: 'Class Actions',
      url: '/class-actions',
    },
  },
  {
    slug: 'arrium-registration-open',
    title: 'Arrium Class Action \u2014 Registration open',
    date: '2025-08-07',
    category: 'Case Update',
    author: 'Banton Group',
    excerpt:
      'Investors who acquired Arrium Limited (ASX:ARI) ordinary shares between 14 August 2014 and 4 April 2016 may be eligible to participate in the Arrium Class Action. Register your claim with Banton Group.',
    source: {
      name: 'Register for Arrium',
      url: '/class-actions/arrium',
    },
  },
]

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getSortedArticles(): NewsArticle[] {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1))
}
