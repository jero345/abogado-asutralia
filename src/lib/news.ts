import { sanityClient, urlFor, hasSanity } from './sanityClient'
import {
  articles as fallbackArticles,
  type NewsArticle,
  type ArticleBlock,
} from '@/data/news'

/**
 * Unified news fetcher.
 * - If Sanity is configured (env var VITE_SANITY_PROJECT_ID is set), fetch
 *   articles from the CMS.
 * - Otherwise fall back to the static sample articles in src/data/news.ts
 *   so local dev and uninitialised deploys still render something.
 */

// ─── GROQ queries ───────────────────────────────────────────────────
const LIST_QUERY = /* groq */ `
*[_type == "article"] | order(date desc) {
  "slug": slug.current,
  title,
  date,
  excerpt,
  category,
  author,
  source,
  "coverImage": coverImage,
}`

const SINGLE_QUERY = /* groq */ `
*[_type == "article" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  date,
  excerpt,
  category,
  author,
  source,
  "coverImage": coverImage,
  body,
}`

// ─── Types coming back from Sanity ──────────────────────────────────
type SanityImage = {
  _type: 'image'
  asset?: { _ref?: string }
  hotspot?: unknown
  caption?: string
}

interface SanityArticle {
  slug: string
  title: string
  date: string
  excerpt: string
  category?: string
  author?: string
  source?: { name: string; url: string }
  coverImage?: SanityImage
  body?: unknown[]
}

// ─── Helpers: map Portable Text → the ArticleBlock[] shape NewsArticlePage expects ──
function imageUrl(img?: SanityImage): string | undefined {
  if (!img?.asset?._ref) return undefined
  const builder = urlFor(img)
  return builder ? builder.width(1200).fit('max').auto('format').url() : undefined
}

function portableTextToBlocks(body: unknown[] | undefined): ArticleBlock[] {
  if (!body || !Array.isArray(body)) return []
  const out: ArticleBlock[] = []

  for (const block of body as Record<string, unknown>[]) {
    const t = block._type
    if (t === 'block') {
      const style = (block.style as string) || 'normal'
      const children = (block.children as { text?: string }[]) || []
      const text = children.map((c) => c.text || '').join('')
      if (!text.trim()) continue
      if (style === 'h2') out.push({ kind: 'h2', text })
      else if (style === 'h3') out.push({ kind: 'h3', text })
      else if (style === 'blockquote') out.push({ kind: 'quote', text })
      else out.push({ kind: 'p', text })
    } else if (t === 'image') {
      const src = imageUrl(block as SanityImage)
      if (src) out.push({ kind: 'image', src, caption: (block.caption as string) || undefined })
    }
  }
  return out
}

function toNewsArticle(a: SanityArticle): NewsArticle {
  return {
    slug: a.slug,
    title: a.title,
    date: a.date,
    excerpt: a.excerpt,
    category: a.category,
    author: a.author,
    source: a.source,
    coverImage: imageUrl(a.coverImage),
    content: portableTextToBlocks(a.body),
  }
}

// ─── Public API ─────────────────────────────────────────────────────
export async function fetchArticles(): Promise<NewsArticle[]> {
  if (!hasSanity || !sanityClient) {
    return [...fallbackArticles].sort((a, b) => (a.date < b.date ? 1 : -1))
  }
  try {
    const data = await sanityClient.fetch<SanityArticle[]>(LIST_QUERY)
    if (!data?.length) return []
    return data.map(toNewsArticle)
  } catch (err) {
    console.error('[Sanity] fetchArticles failed, using fallback:', err)
    return [...fallbackArticles].sort((a, b) => (a.date < b.date ? 1 : -1))
  }
}

export async function fetchArticle(slug: string): Promise<NewsArticle | null> {
  if (!hasSanity || !sanityClient) {
    return fallbackArticles.find((a) => a.slug === slug) ?? null
  }
  try {
    const data = await sanityClient.fetch<SanityArticle | null>(SINGLE_QUERY, { slug })
    if (!data) return null
    return toNewsArticle(data)
  } catch (err) {
    console.error('[Sanity] fetchArticle failed, using fallback:', err)
    return fallbackArticles.find((a) => a.slug === slug) ?? null
  }
}

export type { NewsArticle }
