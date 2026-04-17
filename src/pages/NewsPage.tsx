import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowUpRight, BookOpen, Sparkles } from 'lucide-react'

/**
 * Blog — Coming Soon.
 *
 * The blog is under construction. Once Amanda and the team start publishing
 * commentary, articles and firm updates, this page will list them. Until then
 * it shows a polished "coming soon" placeholder.
 */
export function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insight and commentary."
        italicTitle="From the front line of litigation."
        subtitle="Firm updates, case notes and perspectives on developments shaping Australian litigation — written by the lawyers running the matters."
        breadcrumbs={[{ label: 'Blog' }]}
        backgroundImage="/img/hero-bg/about.jpg"
      />

      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        {/* Subtle decorative background */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(28,58,100,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(28,58,100,1) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] opacity-[0.25] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(109,143,181,0.35) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            {/* Icon medallion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative inline-flex items-center justify-center mb-10"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-[#1C3A64]/25"
                style={{ width: 128, height: 128 }}
              />
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1C3A64] flex items-center justify-center shadow-xl shadow-[#1C3A64]/20">
                <BookOpen size={30} className="text-white" strokeWidth={1.4} />
              </div>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center shadow-md"
              >
                <Sparkles size={14} className="text-white" />
              </motion.span>
            </motion.div>

            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#1C3A64]/40" />
              <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#1C3A64]">
                Coming Soon
              </span>
              <div className="h-px w-8 bg-[#1C3A64]/40" />
            </div>

            {/* Title */}
            <h1 className="text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] font-medium text-[#1C3A64] leading-[1.05] tracking-tight mb-6">
              The blog is on
              <br />
              <span className="italic-display text-[#6D8FB5]">its way.</span>
            </h1>

            {/* Description */}
            <p className="text-[#555555] text-[15px] md:text-[17px] leading-[1.75] max-w-xl mx-auto mb-10">
              We are preparing a space for thoughtful writing on class actions, commercial litigation and insolvency. Check back shortly — or get in touch with the team in the meantime.
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C3A64] text-white text-[13px] font-medium rounded-full hover:bg-[#2A4E72] transition-colors tracking-[0.02em] shadow-sm"
              >
                Contact the firm
                <ArrowUpRight size={14} />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#1C3A64]/20 text-[#1C3A64] text-[13px] font-medium rounded-full hover:bg-[#1C3A64]/[0.04] transition-colors tracking-[0.02em]"
              >
                Back to home
              </Link>
            </motion.div>

            {/* Small print */}
            <div className="mt-16 pt-8 border-t border-[#1C3A64]/[0.08] max-w-md mx-auto">
              <p className="text-[#888888] text-[12px] leading-[1.7]">
                For press enquiries or media commentary, email{' '}
                <a
                  href="mailto:info@bantongroup.com"
                  className="text-[#1C3A64] font-medium hover:underline"
                >
                  info@bantongroup.com
                </a>
                .
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
