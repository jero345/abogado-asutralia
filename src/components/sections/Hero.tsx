import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

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

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Team photo background */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/img/hero/team-group.jpg"
          alt="Banton Group team"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ objectPosition: '50% 35%' }}
        />
        {/* Navy overlay — per brand guidelines rgba(28,58,100,0.70) */}
        <div className="absolute inset-0 bg-[#1C3A64]/[0.82]" />
        {/* Vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C3A64]/40 via-transparent to-[#1C3A64]/60" />

        {/* Floating label chips */}
        {floatingWords.map((word, i) => (
          <motion.div
            key={word}
            className="absolute text-xs text-white/15 font-medium tracking-widest uppercase pointer-events-none hidden lg:block"
            style={{
              top: `${10 + (i * 11) % 80}%`,
              left: `${5 + (i * 13) % 88}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.08, 0.2, 0.08],
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
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center mt-24 md:mt-32"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-[#8AAECE]/80" />
          <span className="text-[#8AAECE] text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.25em] uppercase">
            Australia's Premier Litigation Firm
          </span>
          <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-[#8AAECE]/80" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-[42px] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-light leading-[1.05] tracking-tight mb-5 md:mb-6"
        >
          <span className="text-white">Strategic</span>
          <br />
          <span className="italic-display text-[#6D8FB5]">litigation.</span>
          <br />
          <span className="text-white">Extraordinary</span>
          <br />
          <span className="italic-display text-[#6D8FB5]">outcomes.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-white/80 text-sm md:text-lg lg:text-xl font-light max-w-xl md:max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12 px-2"
        >
          We pursue justice for individuals and institutions in Australia's most complex and high-stakes legal disputes — from landmark class actions to corporate restructuring.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-14 md:mb-20"
        >
          <Link to="/class-actions">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-[#1C3A64] text-[12px] md:text-[13px] font-medium rounded-full hover:bg-[#EFF4F4] transition-colors duration-200 tracking-[0.02em]"
            >
              View Class Actions
              <ArrowRight size={14} />
            </motion.span>
          </Link>

          <Link to="/contact">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border border-white/40 text-white text-[12px] md:text-[13px] font-medium rounded-full hover:border-white hover:bg-white/10 transition-all duration-200 tracking-[0.02em]"
            >
              Contact Us
            </motion.span>
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/15 max-w-3xl mx-auto"
        >
          {[
            { value: '$500M+', label: 'Recovered for Clients' },
            { value: '20+', label: 'Years Combined Leadership' },
            { value: '50+', label: 'Class Actions' },
            { value: '6', label: 'Courts We Appear In' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1C3A64]/60 backdrop-blur-sm px-3 py-4 md:px-6 md:py-5 text-center">
              <div className="text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-white mb-1 leading-none">{stat.value}</div>
              <div className="text-[#8AAECE] text-[10px] md:text-[11px] tracking-[0.1em] md:tracking-[0.12em] uppercase leading-tight mt-2">{stat.label}</div>
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
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
