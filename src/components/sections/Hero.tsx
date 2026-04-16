import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax + subtle zoom for the background — "movement in the hero"
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-[190px] md:pb-[170px] pt-24 md:pt-32"
    >
      {/* Background — building photo with parallax zoom */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 z-0">
        <img
          src="/img/hero/building.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '50% 40%' }}
        />
        {/* Navy overlay — per brand spec rgba(28,58,100,0.70) */}
        <div className="absolute inset-0 bg-[#1C3A64]/70" />
        {/* Deeper gradient at bottom so stats strip reads clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2540]/40 via-transparent to-[#1C3A64]/70" />
      </motion.div>

      {/* Ambient moving chips — subtle motion layer */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none hidden md:block">
        {['Class Actions', 'Commercial Litigation', 'Insolvency', 'Complex Financial'].map((word, i) => (
          <motion.div
            key={word}
            className="absolute text-[10px] text-white/15 font-medium tracking-[0.25em] uppercase"
            style={{
              top: `${18 + (i * 19) % 65}%`,
              left: `${8 + (i * 23) % 80}%`,
            }}
            animate={{ y: [0, -14, 0], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 5 + i * 0.8, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
          >
            {word}
          </motion.div>
        ))}
      </div>

      {/* Content — cleaner, more air */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex items-center justify-center gap-3 mb-10 md:mb-14"
        >
          <div className="h-px w-10 md:w-14 bg-gradient-to-r from-transparent to-[#8AAECE]/90" />
          <span className="text-[#8AAECE] text-[10px] md:text-[11px] font-medium tracking-[0.25em] uppercase">
            Australia's Premier Litigation Firm
          </span>
          <div className="h-px w-10 md:w-14 bg-gradient-to-l from-transparent to-[#8AAECE]/90" />
        </motion.div>

        {/* Main headline — capped at 64px desktop / 42px mobile per brief */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-[38px] sm:text-[44px] md:text-[52px] lg:text-[60px] xl:text-[64px] font-light leading-[1.05] tracking-tight mb-10 md:mb-14 max-w-5xl mx-auto"
        >
          <span className="text-white">Strategic litigation.</span>
          <br />
          <span className="italic-display text-[#6D8FB5]">Extraordinary outcomes.</span>
        </motion.h1>

        {/* Short, single-line subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-white/80 text-[15px] md:text-[17px] font-light leading-[1.7] max-w-xl mx-auto mb-12 md:mb-14"
        >
          Specialist litigation for Australia's most complex legal disputes.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
        >
          <Link to="/class-actions">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 md:px-8 py-3 md:py-4 bg-white text-[#1C3A64] text-[13px] font-medium rounded-full hover:bg-[#EFF4F4] transition-colors duration-200 tracking-[0.02em]"
            >
              View Class Actions
              <ArrowRight size={14} />
            </motion.span>
          </Link>

          <Link to="/contact">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 md:px-8 py-3 md:py-4 bg-white text-[#1C3A64] text-[13px] font-medium rounded-full hover:bg-[#EFF4F4] transition-all duration-200 tracking-[0.02em]"
            >
              Contact Us
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats strip — pinned to bottom, always visible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        className="absolute bottom-6 md:bottom-10 inset-x-0 z-20 flex justify-center px-4 md:px-8"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-[#0F2540]/40 backdrop-blur-md w-full max-w-3xl">
          {[
            { value: '$500M+', label: 'Recovered for Clients' },
            { value: '20+', label: 'Years Combined Leadership' },
            { value: '50+', label: 'Class Actions' },
            { value: '6', label: 'National Jurisdictions' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1C3A64]/75 backdrop-blur-sm px-3 py-4 md:px-6 md:py-5 text-center">
              <div className="text-[26px] md:text-[34px] lg:text-[40px] font-semibold text-white mb-1 leading-none">{stat.value}</div>
              <div className="text-[#8AAECE] text-[10px] md:text-[11px] tracking-[0.12em] uppercase leading-tight mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
