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
// Content approved by the firm — April 2026.
// Once Sanity is wired, Amanda adds / edits entries from the
// /studio admin and these entries become the fallback used only
// when the CMS is unreachable.
// ─────────────────────────────────────────────────────────────
export const articles: NewsArticle[] = [
  {
    slug: 'chambers-asia-pacific-2026-ranking',
    title: 'Banton Group ranked in Chambers Asia-Pacific 2026',
    date: '2026-01-01',
    category: 'Press Release',
    author: 'Banton Group',
    excerpt:
      'Chambers and Partners has recognised Banton Group in its 2026 Asia-Pacific guide for Dispute Resolution: Class Actions, with Amanda Banton ranked a Leading Individual for the fourth consecutive year.',
    source: {
      name: 'chambers.com',
      url: 'https://chambers.com/law-firm/banton-group-asia-pacific-8:23231690',
    },
  },
  {
    slug: 'lawyers-weekly-partner-of-year-2025',
    title: 'Banton Group \u2014 Partner of the Year Awards 2025 finalists',
    date: '2025-01-01',
    category: 'Award',
    author: 'Banton Group',
    excerpt:
      'Elliott Smith and Melissa Morgan of Banton Group were named finalists in the Lawyers Weekly Partner of the Year Awards 2025 in the Class Actions category.',
    source: {
      name: 'Lawyers Weekly',
      url: 'https://www.lawyersweekly.com.au/partner-of-the-year-awards/winners/2025-winners-and-finalists',
    },
  },
  {
    slug: 'lawyers-weekly-partner-of-year-2023',
    title: 'Amanda Banton \u2014 Class Actions Partner of the Year finalist',
    date: '2023-01-01',
    category: 'Award',
    author: 'Banton Group',
    excerpt:
      'Amanda Banton of Banton Group was named a finalist in the Lawyers Weekly Partner of the Year Awards 2023 in the Class Actions category.',
    source: {
      name: 'Lawyers Weekly',
      url: 'https://www.lawyersweekly.com.au/partner-of-the-year-awards/winners/2023-winners-and-finalists',
    },
  },
  {
    slug: 'lawyerly-boutique-launch-2020',
    title: 'Top Squire Patton Boggs litigator launches boutique firm',
    date: '2020-02-07',
    category: 'Press Release',
    author: 'Banton Group',
    excerpt:
      'Amanda Banton, one of Australia\u2019s leading class action litigators, left Squire Patton Boggs to establish Banton Group \u2014 a specialist litigation boutique with plans to bring class actions on a contingency fee basis.',
    source: {
      name: 'Lawyerly',
      url: 'https://www.lawyerly.com.au/top-squire-patton-boggs-litigator-defects-to-launch-boutique-firm/',
    },
  },
  {
    slug: 'amanda-banton-wikipedia',
    title: 'Amanda Banton \u2014 first lawyer to win judgment against a global ratings agency',
    date: '2020-01-01',
    category: 'Profile',
    author: 'Wikipedia',
    excerpt:
      'Amanda Banton is the first and only lawyer in the world to successfully obtain a judgment against a global credit ratings agency. Standard & Poor\u2019s settled for $215 million \u2014 one of the largest pre-trial settlements in Australian legal history.',
    source: {
      name: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Amanda_Banton',
    },
  },
]

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getSortedArticles(): NewsArticle[] {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1))
}
