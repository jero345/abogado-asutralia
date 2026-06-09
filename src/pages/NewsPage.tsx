import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowUpRight, Calendar, ExternalLink } from 'lucide-react'
import { fetchArticles, type NewsArticle } from '@/lib/news'

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[] | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchArticles().then((a) => {
      if (!cancelled) setArticles(a)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <PageHero
        title="Insight and commentary."
        italicTitle="From the front line of litigation."
        subtitle="Firm updates, case notes and perspectives on developments shaping Australian litigation — written by the lawyers running the matters."
        breadcrumbs={[{ label: 'Blog' }]}
        backgroundImage="/img/hero/blog.jpeg"
      />

      <section className="relative py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {articles === null ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#1C3A64]/20 border-t-[#1C3A64] rounded-full animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#555555] text-[15px]">No articles yet. Check back soon.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {articles.map((a, i) => {
                const isExternal = Boolean(a.source?.url)
                const href = isExternal ? a.source!.url : `/blog/${a.slug}`
                const linkProps = isExternal
                  ? { href, target: '_blank' as const, rel: 'noopener noreferrer' }
                  : null
                const card = (
                  <article className="group relative h-full flex flex-col rounded-2xl border border-[#1C3A64]/12 hover:border-[#1C3A64]/30 hover:shadow-lg transition-all duration-300 bg-white overflow-hidden">
                    {a.coverImage && (
                      <div className="aspect-[16/9] w-full overflow-hidden bg-[#F4F6FB]">
                        <img
                          src={a.coverImage}
                          alt=""
                          aria-hidden="true"
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col p-7 md:p-8">
                      {a.category && (
                        <span className="inline-block text-[10px] tracking-[0.18em] uppercase font-medium text-[#6D8FB5] mb-4">
                          {a.category}
                        </span>
                      )}
                      <h2 className="text-[#1C3A64] text-[20px] md:text-[22px] font-medium leading-[1.3] tracking-tight mb-4">
                        {a.title}
                      </h2>
                      <p className="text-[#555555] text-[14px] leading-[1.7] mb-6 line-clamp-3">
                        {a.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between text-[12px] text-[#888888]">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {formatDate(a.date)}
                        </span>
                        <motion.span
                          whileHover={{ x: 2 }}
                          className="inline-flex items-center gap-1 text-[#1C3A64] font-medium"
                        >
                          {isExternal ? (
                            <>
                              Read source
                              <ExternalLink size={12} />
                            </>
                          ) : (
                            <>
                              Read
                              <ArrowUpRight
                                size={13}
                                className="group-hover:rotate-12 transition-transform"
                              />
                            </>
                          )}
                        </motion.span>
                      </div>
                    </div>
                  </article>
                )
                return (
                  <ScrollReveal key={a.slug} delay={i * 0.05}>
                    <li className="h-full">
                      {linkProps ? (
                        <a {...linkProps} className="block h-full">
                          {card}
                        </a>
                      ) : (
                        <Link to={href} className="block h-full">
                          {card}
                        </Link>
                      )}
                    </li>
                  </ScrollReveal>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
