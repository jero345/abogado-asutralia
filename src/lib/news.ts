import {
  articles as staticArticles,
  type NewsArticle,
  type ArticleBlock,
} from '@/data/news'
import { supabase, hasSupabase } from './supabase'

/**
 * News fetcher.
 * - If Supabase is configured, read articles from the `articles` table.
 *   "Visible" = published AND (publish_at IS NULL OR publish_at <= now()).
 *   Scheduled-in-the-future articles are hidden until their time arrives.
 * - Always merged on top of the 9 static articles in src/data/news.ts so
 *   the blog keeps a baseline even when the CMS is empty or unreachable.
 */

interface DbArticleRow {
  id?: string
  slug: string
  title: string
  date: string
  excerpt: string
  category: string | null
  author: string | null
  source_name: string | null
  source_url: string | null
  cover_image: string | null
  content: ArticleBlock[] | null
  body_html: string | null
  tags: string[] | null
  seo_title: string | null
  seo_description: string | null
  seo_og_image: string | null
  published: boolean
  publish_at: string | null
}

function rowToArticle(row: DbArticleRow): NewsArticle {
  const seo =
    row.seo_title || row.seo_description || row.seo_og_image
      ? {
          title: row.seo_title ?? undefined,
          description: row.seo_description ?? undefined,
          ogImage: row.seo_og_image ?? undefined,
        }
      : undefined

  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    excerpt: row.excerpt,
    category: row.category ?? undefined,
    author: row.author ?? undefined,
    tags: row.tags?.length ? row.tags : undefined,
    source:
      row.source_name && row.source_url
        ? { name: row.source_name, url: row.source_url }
        : undefined,
    coverImage: row.cover_image ?? undefined,
    content: row.content ?? undefined,
    bodyHtml: row.body_html ?? undefined,
    seo,
  }
}

function sortByDateDesc(list: NewsArticle[]): NewsArticle[] {
  return [...list].sort((a, b) => (a.date < b.date ? 1 : -1))
}

function mergeArticles(dbArticles: NewsArticle[]): NewsArticle[] {
  const bySlug = new Map<string, NewsArticle>()
  for (const a of staticArticles) bySlug.set(a.slug, a)
  for (const a of dbArticles) bySlug.set(a.slug, a)
  return sortByDateDesc(Array.from(bySlug.values()))
}

export async function fetchArticles(): Promise<NewsArticle[]> {
  if (!hasSupabase || !supabase) {
    return sortByDateDesc(staticArticles)
  }
  const nowIso = new Date().toISOString()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .or(`publish_at.is.null,publish_at.lte.${nowIso}`)
    .order('date', { ascending: false })
  if (error) {
    console.error('[Supabase] fetchArticles failed, using fallback:', error)
    return sortByDateDesc(staticArticles)
  }
  return mergeArticles((data ?? []).map(rowToArticle))
}

export async function fetchArticle(slug: string): Promise<NewsArticle | null> {
  if (!hasSupabase || !supabase) {
    return staticArticles.find((a) => a.slug === slug) ?? null
  }
  const nowIso = new Date().toISOString()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .or(`publish_at.is.null,publish_at.lte.${nowIso}`)
    .maybeSingle()
  if (error) {
    console.error('[Supabase] fetchArticle failed, using fallback:', error)
    return staticArticles.find((a) => a.slug === slug) ?? null
  }
  if (data) return rowToArticle(data)
  return staticArticles.find((a) => a.slug === slug) ?? null
}

export type { NewsArticle }
