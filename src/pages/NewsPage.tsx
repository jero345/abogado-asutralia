import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowUpRight, Calendar, ExternalLink, Newspaper } from 'lucide-react'
import { getSortedArticles } from '@/data/news'

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function NewsPage() {
  const articles = getSortedArticles()
  const hasArticles = articles.length > 0

  return (
    <>
      <PageHero
        eyebrow="News & Articles"
        title="In the press."
        italicTitle="On the record."
        subtitle="Updates from the firm, media coverage and commentary from Banton Group's lawyers on developments in Australian litigation."
        breadcrumbs={[{ label: 'News' }]}
      />

      <section className="relative py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {hasArticles ? (
            <div className="space-y-8">
              {articles.map((a, i) => (
                <ScrollReveal key={a.slug} delay={i * 0.06}>
                  <motion.article
                    whileHover={{ y: -3 }}
                    className="group relative grid md:grid-cols-[240px_1fr] gap-6 md:gap-8 bg-white border border-[#1C3A64]/10 rounded-2xl overflow-hidden hover:border-[#1C3A64]/25 transition-colors"
                  >
                    {/* Cover */}
                    {a.coverImage ? (
                      <div className="aspect-[4/3] md:aspect-auto bg-[#EFF4F4] overflow-hidden">
                        <img
                          src={a.coverImage}
                          alt=""
                          aria-hidden="true"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-[#1C3A64] to-[#2A4E72] flex items-center justify-center">
                        <Newspaper size={42} className="text-white/20" strokeWidth={1.2} />
                      </div>
                    )}

                    {/* Body */}
                    <div className="p-6 md:p-8 md:pl-0 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {a.category && (
                          <span className="text-[#1C3A64] text-[10px] font-medium px-2.5 py-1 bg-[#1C3A64]/[0.06] border border-[#1C3A64]/15 rounded-full tracking-[0.12em] uppercase">
                            {a.category}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-[#888888] text-[12px]">
                          <Calendar size={11} />
                          {formatDate(a.date)}
                        </span>
                        {a.source && (
                          <span className="flex items-center gap-1 text-[#888888] text-[12px]">
                            · {a.source.name}
                          </span>
                        )}
                      </div>
                      <h2 className="text-[#1C3A64] font-medium text-[20px] md:text-[22px] leading-[1.25] mb-3">
                        {a.title}
                      </h2>
                      <p className="text-[#555555] text-[15px] leading-[1.65] mb-5">{a.excerpt}</p>
                      {a.source ? (
                        <a
                          href={a.source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium hover:underline w-fit"
                        >
                          Read on {a.source.name}
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <Link
                          to={`/news/${a.slug}`}
                          className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium hover:underline w-fit"
                        >
                          Read article
                          <ArrowUpRight size={13} />
                        </Link>
                      )}
                    </div>
                  </motion.article>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            /* Empty state — the firm hasn't published yet */
            <ScrollReveal>
              <div className="text-center max-w-xl mx-auto py-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#EFF4F4] border border-[#1C3A64]/15 flex items-center justify-center">
                  <Newspaper size={24} className="text-[#1C3A64]" strokeWidth={1.4} />
                </div>
                <h2 className="text-[#1C3A64] text-[24px] md:text-[28px] font-medium leading-[1.2] mb-4 tracking-tight">
                  Articles coming soon.
                </h2>
                <p className="text-[#555555] text-[15px] leading-[1.7] mb-8">
                  We publish updates on significant matters, press coverage and commentary from our lawyers. The first pieces will be added shortly.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#1C3A64]/30 text-[#1C3A64] text-[13px] font-medium rounded-full hover:bg-[#1C3A64] hover:text-white hover:border-[#1C3A64] transition-colors tracking-[0.02em]"
                >
                  Get in touch
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  )
}
