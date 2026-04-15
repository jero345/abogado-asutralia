import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

type Crumb = { label: string; to?: string }

interface PageHeroProps {
  eyebrow: string
  title: string
  italicTitle?: string
  subtitle?: string
  breadcrumbs?: Crumb[]
  /** Optional blurred background image — path under /public */
  backgroundImage?: string
}

export function PageHero({
  eyebrow,
  title,
  italicTitle,
  subtitle,
  breadcrumbs,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-12 md:pt-40 md:pb-20 overflow-hidden bg-[#1C3A64]">
      {/* Blurred photo background (optional) */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110"
            style={{ filter: 'blur(10px)' }}
          />
          {/* Navy overlay for text legibility — rgba(28,58,100,0.70) */}
          <div className="absolute inset-0 bg-[#1C3A64]/70" />
          {/* Extra depth — darker near the top */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F2540]/60 via-transparent to-[#1C3A64]/30" />
        </div>
      )}

      {/* Decorative grid (only when no photo — otherwise too busy) */}
      {!backgroundImage && (
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
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

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="h-px w-8 bg-[#8AAECE]" />
          <span className="text-[#8AAECE] text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase">
            {eyebrow}
          </span>
        </motion.div>

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
