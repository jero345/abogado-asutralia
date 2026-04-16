import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

/**
 * "Law Meets Innovation" — short form paragraph approved by Amanda.
 */
export function Innovation() {
  return (
    <section className="relative py-20 md:py-24 bg-[#EFF4F4]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#1C3A64]" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#1C3A64]">
              Strategy & Technology
            </span>
            <div className="h-px w-8 bg-[#1C3A64]" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-[#1C3A64]/15 mb-6 shadow-sm"
          >
            <Cpu size={22} className="text-[#1C3A64]" strokeWidth={1.5} />
          </motion.div>

          <h2 className="text-[26px] sm:text-3xl md:text-[36px] lg:text-[40px] font-medium text-[#1C3A64] leading-[1.15] tracking-tight mb-6">
            Law meets <span className="italic-display text-[#6D8FB5]">innovation.</span>
          </h2>

          <p className="text-[#555555] text-[15px] md:text-[17px] leading-[1.75] max-w-2xl mx-auto">
            We are able to leverage AI resources and the latest technology approaches to ensure efficiency and cost savings where appropriate.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
