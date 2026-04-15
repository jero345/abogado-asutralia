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
// Articles — empty for now. Amanda will add the first entries.
// ─────────────────────────────────────────────────────────────
export const articles: NewsArticle[] = []

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getSortedArticles(): NewsArticle[] {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1))
}
