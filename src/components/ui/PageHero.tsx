import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

type Crumb = { label: string; to?: string }

interface PageHeroProps {
  title: string
  italicTitle?: string
  subtitle?: string
  /** Optional extra line shown in red above the subtitle (for emphasis). */
  redCallout?: string
  breadcrumbs?: Crumb[]
  /** Optional blurred background image — path under /public */
  backgroundImage?: string
}

export function PageHero({
  title,
  italicTitle,
  subtitle,
  redCallout,
  breadcrumbs,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-12 md:pt-40 md:pb-20 overflow-hidden bg-[#1C3A64]">
      {/* Sharp photo background (optional) — text sits over a gradient, not a blur */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            // Bias slightly toward the upper portion of the photo so any
            // building name / signage in the top half stays visible above the
            // headline (e.g. "SIXTY MARTIN PLACE" on the Work With Us hero).
            className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
          />
          {/* Left-to-right dark-to-light gradient so the heading side stays legible
              while the right side of the photo shows through clearly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2540]/80 via-[#1C3A64]/45 to-[#1C3A64]/10" />
          {/* Subtle bottom fade to ease the transition into the next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C3A64]/40" />
        </div>
      )}

      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(109,143,181,0.35) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[11px] text-[#8AAECE] tracking-wider uppercase mb-6"
          >
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Home size={11} /> Home
            </Link>
            {breadcrumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <ChevronRight size={11} className="text-white/30" />
                {c.to ? (
                  <Link to={c.to} className="hover:text-white transition-colors">{c.label}</Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[28px] sm:text-4xl md:text-5xl lg:text-[56px] font-medium text-white leading-[1.1] md:leading-[1.05] tracking-tight max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
        >
          {title}
          {italicTitle && (
            <>
              <br />
              <span className="italic-display text-[#6D8FB5]">{italicTitle}</span>
            </>
          )}
        </motion.h1>

        {/* Red callout — emphasised secondary headline */}
        {redCallout && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#FF6B6B] text-base md:text-xl font-medium leading-snug mt-5 md:mt-6 max-w-3xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]"
          >
            {redCallout}
          </motion.p>
        )}

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/80 text-sm md:text-lg leading-relaxed mt-5 md:mt-6 max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
