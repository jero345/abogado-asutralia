import { Hero } from '@/components/sections/Hero'
import { AwardsStrip } from '@/components/sections/AwardsStrip'
import { AmandaQuote } from '@/components/sections/AmandaQuote'
import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'



export function Home() {
  return (
    <>
      <Hero />
      <AwardsStrip />

      {/* Amanda feature — green-skirt portrait with name */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-10">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden border border-[#1C3A64]/10 shadow-lg w-[260px] md:w-[280px] flex-shrink-0">
                <img
                  src="/img/home/amanda-feature.jpg"
                  alt="Amanda Banton"
                  className="w-full h-auto block"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15} className="flex-1 flex flex-col justify-center text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="h-px w-8 bg-[#1C3A64]" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#1C3A64]">
                  Managing Partner
                </span>
              </div>
              <h2 className="text-[28px] sm:text-3xl md:text-[34px] lg:text-[38px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight mb-5">
                Amanda <span className="italic-display text-[#6D8FB5]">Banton.</span>
              </h2>
              <p className="text-[#555555] text-[15px] md:text-[16px] leading-[1.75] mb-5">
                Amanda is the Managing Partner of Banton Group, which she established in February 2020. With over 20 years of legal experience — formerly at Squire Patton Boggs and Piper Alderman, where she ran substantial litigation practices — and drawing on consulting experience at KPMG and within the Federal Government, she has built Banton Group into one of Australia's most formidable litigation and insolvency practices.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#1C3A64] text-[14px] font-medium hover:underline self-center md:self-start"
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
            src="/img/hero-bg/work-with-us.jpg"
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
