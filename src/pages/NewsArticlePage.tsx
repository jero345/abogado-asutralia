import { useParams, Link, Navigate } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react'
import { getArticleBySlug, type ArticleBlock } from '@/data/news'

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

export function NewsArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) return <Navigate to="/news" replace />

  return (
    <>
      <PageHero
        eyebrow={article.category ?? 'News'}
        title={article.title}
        subtitle={article.excerpt}
        breadcrumbs={[{ label: 'News', to: '/news' }, { label: article.title }]}
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

            {/* Body */}
            {article.content?.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}

            {/* Back */}
            <div className="pt-10 mt-10 border-t border-[#1C3A64]/10">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium hover:underline"
              >
                <ArrowLeft size={14} />
                All news & articles
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  )
}
