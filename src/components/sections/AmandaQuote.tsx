import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Quote } from 'lucide-react'

/**
 * Rotating testimonials — Legal 500 Asia Pacific Guide 2026.
 * Auto-advances every 6s with fade/slide transition; pauses on hover.
 */

type Testimonial = {
  quote: string
  source: string
}

const SOURCE = 'Legal 500 Asia Pacific Guide 2026'

const testimonials: Testimonial[] = [
  {
    quote:
      'I rate Banton Group highly due to their success rate and \u201Ccut through\u201D in litigation.',
    source: SOURCE,
  },
  {
    quote:
      'I highly recommend the firm for its exceptional legal expertise, strategic acumen, and professional integrity.',
    source: SOURCE,
  },
  {
    quote:
      'Best of breed as a boutique law firm in plaintiff class actions and complex litigation which requires extraordinary strategic analysis.',
    source: SOURCE,
  },
  {
    quote:
      'Amanda is an outstanding legal practitioner whose deep knowledge and strategic thinking consistently delivers strong results. She is a rock star in Australian class actions.',
    source: SOURCE,
  },
  {
    quote:
      'Their collaborative approach and commitment to excellence have made them invaluable parties in challenging legal matters.',
    source: SOURCE,
  },
]

const AUTO_ADVANCE_MS = 6000

export function AmandaQuote() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(t)
  }, [paused])

  const current = testimonials[index]

  return (
    <section className="relative py-20 md:py-28 bg-[#EFF4F4] overflow-hidden">
      {/* Subtle radial accent behind the quote */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none opacity-50"
        style={{ background: 'radial-gradient(ellipse at center, rgba(28,58,100,0.08) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div
            className="text-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-10 bg-[#1C3A64]/60" />
              <span className="text-[#1C3A64] text-[11px] font-medium tracking-[0.2em] uppercase">
                Recognised by those who matter
              </span>
              <div className="h-px w-10 bg-[#1C3A64]/60" />
            </div>

            <Quote size={32} className="text-[#6D8FB5] mx-auto mb-6" strokeWidth={1.2} />

            {/* Rotating quote — fixed min-height so the layout doesn't jump between slides */}
            <div className="relative min-h-[200px] md:min-h-[220px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="max-w-3xl mx-auto"
                >
                  <blockquote className="font-medium text-[#1C3A64] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[36px] leading-[1.3] tracking-tight mb-6 italic-display">
                    <span className="text-[#6D8FB5]">&lsquo;</span>
                    {current.quote}
                    <span className="text-[#6D8FB5]">&rsquo;</span>
                  </blockquote>
                  <figcaption className="text-[#555555] text-[12px] md:text-[13px] tracking-[0.15em] uppercase">
                    — {current.source}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Controls — dots */}
            <div className="flex items-center justify-center gap-3 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className="group relative p-2"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? 'w-8 bg-[#1C3A64]'
                        : 'w-1.5 bg-[#1C3A64]/25 group-hover:bg-[#1C3A64]/50'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
