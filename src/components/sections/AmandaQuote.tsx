import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Quote } from 'lucide-react'

/**
 * Feature quote from Amanda Banton — displayed between the About hero
 * and the main body copy.
 */
export function AmandaQuote() {
  return (
    <section className="relative py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Quote size={32} className="text-[#6D8FB5] mx-auto mb-6" strokeWidth={1.2} />
            <blockquote className="font-medium text-[#1C3A64] text-[28px] sm:text-[32px] md:text-[40px] lg:text-[44px] leading-[1.2] tracking-tight mb-6">
              <span>Complexity doesn't deter us.</span>
              <br />
              <span className="italic-display text-[#6D8FB5]">It defines us.</span>
            </blockquote>
            <figcaption className="text-[#555555] text-[13px] tracking-[0.1em] uppercase">
              — Amanda Banton, Managing Partner
            </figcaption>
          </motion.figure>
        </ScrollReveal>
      </div>
    </section>
  )
}
