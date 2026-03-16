import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

const floatingWords = [
  'Class Actions', 'Commercial Litigation', 'Insolvency', 'Restructuring',
  'Corporate Disputes', 'Financial Claims', 'Securities', 'Arbitration',
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const scrollTo = (href: string) => {
    const el = document.getElementById(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        {/* Deep gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#080810] to-[#050507]" />

        {/* Gold radial glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Diagonal accent lines */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#c9a84c]/20 to-transparent" style={{ right: '20%' }} />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" style={{ left: '20%' }} />

        {/* Floating orbit rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#c9a84c]/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/[0.03] rounded-full"
        />

        {/* Floating label chips */}
        {floatingWords.map((word, i) => (
          <motion.div
            key={word}
            className="absolute text-xs text-white/10 font-medium tracking-widest uppercase pointer-events-none hidden lg:block"
            style={{
              top: `${10 + (i * 11) % 80}%`,
              left: `${5 + (i * 13) % 88}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.06, 0.14, 0.06],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          >
            {word}
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a84c]/60" />
          <span className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase">
            Australia's Premier Litigation Firm
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a84c]/60" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-white">Strategic</span>
          <br />
          <span className="text-gradient-gold italic">Litigation.</span>
          <br />
          <span className="text-white">Extraordinary</span>
          <br />
          <span className="text-white/70 font-light">Outcomes.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-white/45 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12"
        >
          We pursue justice for individuals and institutions in Australia's most complex and high-stakes legal disputes — from landmark class actions to corporate restructuring.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.button
            onClick={() => scrollTo('class-actions')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#c9a84c] text-[#050507] text-sm font-semibold rounded-full hover:bg-[#e8c547] transition-colors duration-200"
          >
            View Class Actions
            <ArrowRight size={16} />
          </motion.button>

          <motion.button
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/15 text-white text-sm font-medium rounded-full hover:border-white/30 hover:bg-white/5 transition-all duration-200"
          >
            Contact Us
          </motion.button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06] max-w-3xl mx-auto"
        >
          {[
            { value: '$500M+', label: 'Recovered' },
            { value: '50+', label: 'Class Actions' },
            { value: '25+', label: 'Years Experience' },
            { value: '100%', label: 'Committed' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#080810] px-6 py-5 text-center">
              <div className="text-2xl font-bold text-[#c9a84c] mb-1">{stat.value}</div>
              <div className="text-white/35 text-xs tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-[#c9a84c]/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
