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
        {/* Light gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#f8f9fa] to-[#ffffff]" />

        {/* Navy radial glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(30,58,95,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30,58,95,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30,58,95,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Diagonal accent lines */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#1e3a5f]/20 to-transparent" style={{ right: '20%' }} />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#1e3a5f]/5 to-transparent" style={{ left: '20%' }} />

        {/* Floating orbit rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#1e3a5f]/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-[#1e3a5f]/[0.03] rounded-full"
        />

        {/* Floating label chips */}
        {floatingWords.map((word, i) => (
          <motion.div
            key={word}
            className="absolute text-xs text-[#1e3a5f]/10 font-medium tracking-widest uppercase pointer-events-none hidden lg:block"
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
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1e3a5f]/60" />
          <span className="text-[#1e3a5f] text-xs font-semibold tracking-[0.25em] uppercase">
            Australia's Premier Litigation Firm
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1e3a5f]/60" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-[#1e3a5f]">Strategic</span>
          <br />
          <span className="text-gradient-gold italic">Litigation.</span>
          <br />
          <span className="text-[#1e3a5f]">Extraordinary</span>
          <br />
          <span className="text-[#1e3a5f]/70 font-light">Outcomes.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-[#1e3a5f]/60 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12"
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
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#1e3a5f] text-white text-sm font-semibold rounded-full hover:bg-[#2a4f82] transition-colors duration-200"
          >
            View Class Actions
            <ArrowRight size={16} />
          </motion.button>

          <motion.button
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 border border-[#1e3a5f]/15 text-[#1e3a5f] text-sm font-medium rounded-full hover:border-[#1e3a5f]/30 hover:bg-[#1e3a5f]/5 transition-all duration-200"
          >
            Contact Us
          </motion.button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#1e3a5f]/[0.04] rounded-2xl overflow-hidden border border-[#1e3a5f]/[0.06] max-w-3xl mx-auto"
        >
          {[
            { value: '$500M+', label: 'Recovered' },
            { value: '50+', label: 'Class Actions' },
            { value: '25+', label: 'Years Experience' },
            { value: '100%', label: 'Committed' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-5 text-center">
              <div className="text-2xl font-bold text-[#1e3a5f] mb-1">{stat.value}</div>
              <div className="text-[#1e3a5f]/50 text-xs tracking-wider uppercase">{stat.label}</div>
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
        <span className="text-[#1e3a5f]/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-[#1e3a5f]/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
