import { ScrollReveal } from '@/components/ui/ScrollReveal'

/**
 * Large, horizontal strip of official award badges.
 * Image source: marcas.jpg (Chambers + Legal 500 + Doyles + Australasian Awards).
 */
export function AwardsStrip() {
  return (
    <section className="relative py-16 md:py-24 bg-[#EFF4F4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8 md:mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#1C3A64]" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#1C3A64]">
                Ranked & Recognised
              </span>
              <div className="h-px w-8 bg-[#1C3A64]" />
            </div>
            <h2 className="text-[22px] sm:text-2xl md:text-[28px] font-medium text-[#1C3A64] leading-[1.2] tracking-tight max-w-2xl mx-auto">
              Consistently ranked by the world's{' '}
              <span className="italic-display text-[#6D8FB5]">leading legal directories.</span>
            </h2>
            <p className="text-[#555555] text-[14px] md:text-[15px] leading-[1.75] max-w-2xl mx-auto mt-5">
              Banton Group — founded in February 2020 by Amanda Banton — is recognised as a{' '}
              <span className="text-[#1C3A64] font-medium">Leading Individual</span> by{' '}
              <span className="text-[#1C3A64] font-medium">Chambers Asia-Pacific 2022, 2023, 2025 and 2026</span>.
              Today, Banton Group is one of Australia's largest private litigation practices, acting in some of the country's most significant class actions and insolvencies.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-6 md:p-10 shadow-sm">
            <img
              src="/img/marcas.jpg"
              alt="Banton Group awards — Legal 500 2022-2026, Chambers Asia-Pacific 2022-2026, Doyle's Guide 2022 and Australasian Law Awards"
              className="w-full h-auto object-contain"
            />
          </div>
          <p className="text-center text-[#888888] text-[11px] md:text-[12px] mt-4 max-w-2xl mx-auto">
            Legal 500 Asia-Pacific · Chambers and Partners · Doyle's Guide · Australasian Law Awards — 2022 to 2026
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
