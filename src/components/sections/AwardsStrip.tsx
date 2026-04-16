import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

/**
 * Rotating carousel of official award badges.
 * Each entry lives in /public/img/marcas-web/ — drop a new PNG in and add it
 * to the `badges` array below; the loop re-balances automatically.
 */
const badges = [
  {
    src: '/img/marcas-web/2025-chambers-leading-individual-apac-akb.png',
    alt: 'Chambers Asia-Pacific 2025 — Leading Individual, Amanda Banton',
  },
  {
    src: '/img/marcas-web/2025-chambers-apac-leading-firm.png',
    alt: 'Chambers Asia-Pacific 2025 — Leading Firm',
  },
  {
    src: '/img/marcas-web/2024-legal-500-leading-firm.png',
    alt: 'Legal 500 Asia-Pacific 2024 — Leading Firm',
  },
  {
    src: '/img/marcas-web/2024-legal-500-apac-leading-individual-akb.png',
    alt: 'Legal 500 Asia-Pacific 2024 — Leading Individual, Amanda Banton',
  },
  {
    src: '/img/marcas-web/2024-lawyers-weekly-poty-finalists-eds-mm.png',
    alt: 'Lawyers Weekly 2024 — Partner of the Year Finalists',
  },
  {
    src: '/img/marcas-web/2025-lawyers-weekly-poty-finalists-eds-mm.png',
    alt: 'Lawyers Weekly 2025 — Partner of the Year Finalists',
  },
  {
    src: '/img/marcas-web/2023-legal-500-leading-individual-akb.png',
    alt: 'Legal 500 2023 — Leading Individual, Amanda Banton',
  },
  {
    src: '/img/marcas-web/2023-legal-500-leading-firm.png',
    alt: 'Legal 500 Asia-Pacific 2023 — Leading Firm',
  },
  {
    src: '/img/marcas-web/2023-legal-500-recommended-lawyers.png',
    alt: 'Legal 500 2023 — Recommended Lawyers',
  },
  {
    src: '/img/marcas-web/2022-legal-500-leading-firm.png',
    alt: 'Legal 500 Asia-Pacific 2022 — Leading Firm',
  },
  {
    src: '/img/marcas-web/2022-chambers-leading-indivdual-apac-akb.png',
    alt: 'Chambers Asia-Pacific 2022 — Leading Individual, Amanda Banton',
  },
  {
    src: '/img/marcas-web/2022-doyles-guide-recommended-firm-litigation.png',
    alt: "Doyle's Guide 2022 — Recommended Firm, Litigation",
  },
]

export function AwardsStrip() {
  // Duplicate the list so the horizontal loop never shows a gap
  const track = [...badges, ...badges]

  return (
    <section className="relative py-16 md:py-24 bg-[#EFF4F4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-14">
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
      </div>

      {/* Carousel — full-bleed, auto-scrolling, infinite loop */}
      <div className="relative w-full">
        {/* Left/right fade so the loop edges dissolve */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-[#EFF4F4] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-[#EFF4F4] to-transparent" />

        <motion.div
          className="flex items-center gap-8 md:gap-14"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ width: 'max-content' }}
        >
          {track.map((b, i) => (
            <div
              key={`${b.src}-${i}`}
              className="flex-shrink-0 h-[110px] md:h-[140px] w-auto flex items-center justify-center bg-white rounded-xl border border-[#1C3A64]/10 px-6 md:px-8 py-4 shadow-[0_2px_12px_rgba(28,58,100,0.06)] hover:shadow-[0_4px_20px_rgba(28,58,100,0.12)] transition-shadow"
            >
              <img src={b.src} alt={b.alt} className="h-full w-auto object-contain max-w-[180px]" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-[#888888] text-[11px] md:text-[12px] mt-8 max-w-2xl mx-auto">
          Legal 500 Asia-Pacific · Chambers and Partners · Doyle's Guide · Lawyers Weekly — 2022 to 2026
        </p>
      </div>
    </section>
  )
}
