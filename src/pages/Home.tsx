import { Hero } from '@/components/sections/Hero'
import { AwardsStrip } from '@/components/sections/AwardsStrip'
import { AmandaQuote } from '@/components/sections/AmandaQuote'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'



export function Home() {
  return (
    <>
      <Hero />
      <AwardsStrip />

      {/* Amanda feature — green-skirt portrait with name */}
      <section className="relative py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-[340px_1fr] gap-8 md:gap-10 lg:gap-12 items-center">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden border border-[#1C3A64]/10 shadow-lg max-w-[340px] mx-auto md:mx-0">
                <img
                  src="/img/home/amanda-feature.jpg"
                  alt="Amanda Banton"
                  className="w-full h-auto"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#1C3A64]" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#1C3A64]">
                  Managing Partner
                </span>
              </div>
              <h2 className="text-[28px] sm:text-3xl md:text-[36px] lg:text-[40px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight mb-5">
                Amanda <span className="italic-display text-[#6D8FB5]">Banton.</span>
              </h2>
              <p className="text-[#555555] text-[15px] md:text-[16px] leading-[1.75] mb-5 max-w-xl">
                Under Amanda's leadership, Banton Group has grown into one of Australia's most formidable private litigation and insolvency practices, acting in some of Australia's biggest class action litigation, commercial disputes and insolvency since 2020.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#1C3A64] text-[14px] font-medium hover:underline"
              >
                Read more about the firm
                <ArrowUpRight size={14} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Amanda quote — feature moment between Amanda bio and the section index */}
      <AmandaQuote />



      {/* Closing call — lobby photo as visible background */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Lobby background (no blur, minimal overlay so it stays visible) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/img/building-exterior.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Navy overlay — wide gradient so the building skyline reads clearly
              while the left-side text stays legible */}
          <div className="absolute inset-0 bg-[#1C3A64]/70 md:bg-gradient-to-r md:from-[#0F2540]/85 md:via-[#1C3A64]/55 md:to-[#1C3A64]/35" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-left md:text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-px w-6 bg-[#8AAECE]" />
              <FileText size={18} className="text-[#8AAECE]" />
              <div className="h-px w-6 bg-[#8AAECE]" />
            </div>
            <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] font-medium text-white leading-[1.15] mb-5 tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              Have a matter that demands <span className="italic-display text-white font-semibold">extraordinary advocacy?</span>
            </h2>
            <p className="text-white/90 text-sm md:text-base lg:text-lg leading-[1.7] mb-8 max-w-2xl md:mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
              All consultations are private and confidential. Tell us about your matter and we will assess whether we can help. Initial conversations are at no charge unless we are retained by you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-white text-[#1C3A64] text-[13px] font-medium rounded-full hover:bg-[#EFF4F4] transition-colors tracking-[0.02em] shadow-lg"
            >
              Schedule a Consultation
              <ArrowUpRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
