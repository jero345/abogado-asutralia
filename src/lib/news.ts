import {
  articles as staticArticles,
  type NewsArticle,
  type ArticleBlock,
} from '@/data/news'
import { supabase, hasSupabase } from './supabase'

/**
 * News fetcher.
 * - If Supabase is configured, read published articles from the `articles` table.
 * - Otherwise fall back to the static content in src/data/news.ts so the blog
 *   always renders something even without a CMS.
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
  published: boolean
}

function rowToArticle(row: DbArticleRow): NewsArticle {
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    excerpt: row.excerpt,
    category: row.category ?? undefined,
    author: row.author ?? undefined,
    source:
      row.source_name && row.source_url
        ? { name: row.source_name, url: row.source_url }
        : undefined,
    coverImage: row.cover_image ?? undefined,
    content: row.content ?? undefined,
  }
}

export async function fetchArticles(): Promise<NewsArticle[]> {
  if (!hasSupabase || !supabase) {
    return [...staticArticles].sort((a, b) => (a.date < b.date ? 1 : -1))
  }
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })
  if (error) {
    console.error('[Supabase] fetchArticles failed, using fallback:', error)
    return [...staticArticles].sort((a, b) => (a.date < b.date ? 1 : -1))
  }
  if (!data?.length) {
    return [...staticArticles].sort((a, b) => (a.date < b.date ? 1 : -1))
  }
  return data.map(rowToArticle)
}

export async function fetchArticle(slug: string): Promise<NewsArticle | null> {
  if (!hasSupabase || !supabase) {
    return staticArticles.find((a) => a.slug === slug) ?? null
  }
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()
  if (error) {
    console.error('[Supabase] fetchArticle failed, using fallback:', error)
    return staticArticles.find((a) => a.slug === slug) ?? null
  }
  if (!data) {
    return staticArticles.find((a) => a.slug === slug) ?? null
  }
  return rowToArticle(data)
}

export type { NewsArticle }
