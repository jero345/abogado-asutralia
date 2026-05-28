import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react'
import { fetchArticle, type NewsArticle } from '@/lib/news'
import { type ArticleBlock } from '@/data/news'
import { embedPdfLinks } from '@/lib/embedPdfs'

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function BlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case 'p':
      return <p className="text-[#555555] text-[16px] leading-[1.8] mb-5">{block.text}</p>
    case 'h2':
      return (
        <h2 className="text-[#1C3A64] text-[22px] md:text-[26px] font-medium leading-[1.25] mt-10 mb-4 tracking-tight">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="text-[#1C3A64] text-[17px] md:text-[19px] font-medium leading-[1.3] mt-7 mb-3">
          {block.text}
        </h3>
      )
    case 'ul':
      return (
        <ul className="list-disc pl-6 space-y-2 text-[#555555] text-[16px] leading-[1.7] mb-6">
          {block.items.map((i, k) => (
            <li key={k}>{i}</li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote className="border-l-[3px] border-l-[#1C3A64] bg-[#F4F6FB] rounded-r-xl px-6 py-5 my-8">
          <p className="text-[#1C3A64] text-[17px] md:text-[19px] italic leading-[1.55] mb-2">
            "{block.text}"
          </p>
          {block.attribution && (
            <footer className="text-[#888888] text-[13px] font-medium tracking-wide">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      )
    case 'link':
      return (
        <a
          href={block.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#1C3A64] text-[14px] font-medium underline hover:opacity-70 mb-4"
        >
          {block.label}
          <ExternalLink size={13} />
        </a>
      )
    case 'image':
      return (
        <figure className="my-8">
          <img src={block.src} alt={block.caption ?? ''} className="w-full h-auto rounded-xl" />
          {block.caption && (
            <figcaption className="text-[#888888] text-[12px] mt-2 text-center">{block.caption}</figcaption>
          )}
        </figure>
      )
    default:
      return null
  }
}

function setOrUpdateMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function applySeo(article: NewsArticle) {
  const title = article.seo?.title || article.title
  const description = article.seo?.description || article.excerpt
  const ogImage = article.seo?.ogImage || article.coverImage
  document.title = `${title} — Banton Group`
  if (description) {
    setOrUpdateMeta('name', 'description', description)
    setOrUpdateMeta('property', 'og:description', description)
  }
  setOrUpdateMeta('property', 'og:title', title)
  setOrUpdateMeta('property', 'og:type', 'article')
  if (ogImage) setOrUpdateMeta('property', 'og:image', ogImage)
}

export function NewsArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<NewsArticle | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    if (!slug) return
    fetchArticle(slug).then((a) => {
      if (!cancelled) setArticle(a)
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  useEffect(() => {
    if (article) applySeo(article)
  }, [article])

  if (article === undefined) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-[#1C3A64]/20 border-t-[#1C3A64] rounded-full animate-spin" />
      </section>
    )
  }

  if (article === null) return <Navigate to="/blog" replace />

  return (
    <>
      <PageHero
        title={article.title}
        subtitle={article.excerpt}
        breadcrumbs={[{ label: 'Blog', to: '/blog' }, { label: article.title }]}
      />

      <article className="relative py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-[#888888] text-[13px] mb-6 pb-6 border-b border-[#1C3A64]/10">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {formatDate(article.date)}
              </span>
              {article.author && <span>· {article.author}</span>}
              {article.source && (
                <a
                  href={article.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#1C3A64] hover:underline"
                >
                  · {article.source.name}
                  <ExternalLink size={11} />
                </a>
              )}
            </div>

            {/* Cover */}
            {article.coverImage && (
              <figure className="mb-8">
                <img
                  src={article.coverImage}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-auto rounded-2xl"
                />
              </figure>
            )}

            {/* Body — TipTap HTML takes precedence, fall back to legacy block array */}
            {article.bodyHtml ? (
              <div
                className={[
                  'prose prose-slate max-w-none',
                  'prose-headings:text-[#1C3A64] prose-headings:font-medium prose-headings:tracking-tight',
                  'prose-p:text-[#555555] prose-p:leading-[1.8]',
                  'prose-a:text-[#1C3A64]',
                  // Blockquote: blue text, left blue border, italic, light blue bg
                  'prose-blockquote:border-l-[4px] prose-blockquote:border-l-[#1C3A64]',
                  'prose-blockquote:bg-[#F4F6FB] prose-blockquote:rounded-r-xl',
                  'prose-blockquote:not-italic',
                  '[&_blockquote_p]:text-[#1C3A64] [&_blockquote_p]:italic [&_blockquote_p]:font-medium',
                  'prose-img:rounded-xl',
                  // PDF embed: full-width inline viewer
                  '[&_.pdf-embed]:my-8 [&_.pdf-embed]:rounded-xl [&_.pdf-embed]:overflow-hidden',
                  '[&_.pdf-embed]:border [&_.pdf-embed]:border-[#1C3A64]/15',
                  '[&_.pdf-embed]:shadow-sm',
                  '[&_.pdf-embed_iframe]:block [&_.pdf-embed_iframe]:w-full',
                  '[&_.pdf-embed_iframe]:h-[80vh] [&_.pdf-embed_iframe]:min-h-[520px]',
                  '[&_.pdf-embed_iframe]:bg-[#F4F6FB] [&_.pdf-embed_iframe]:border-0',
                  '[&_.pdf-embed-fallback]:block [&_.pdf-embed-fallback]:text-center',
                  '[&_.pdf-embed-fallback]:text-[12px] [&_.pdf-embed-fallback]:text-[#1C3A64]',
                  '[&_.pdf-embed-fallback]:underline [&_.pdf-embed-fallback]:py-2',
                  '[&_.pdf-embed-fallback]:bg-[#F4F6FB] [&_.pdf-embed-fallback]:no-underline',
                  '[&_.pdf-embed-fallback]:hover:underline',
                ].join(' ')}
                dangerouslySetInnerHTML={{ __html: embedPdfLinks(article.bodyHtml) }}
              />
            ) : (
              article.content?.map((block, i) => <BlockRenderer key={i} block={block} />)
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-10 pt-6 border-t border-[#1C3A64]/10">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] bg-[#1C3A64]/[0.06] text-[#1C3A64] px-2 py-0.5 rounded"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Back */}
            <div className="pt-10 mt-10 border-t border-[#1C3A64]/10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium hover:underline"
              >
                <ArrowLeft size={14} />
                All blog articles
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  )
}
