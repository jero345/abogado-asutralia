import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Handshake, Scale, Landmark, TramFront } from 'lucide-react'

// Organisations we have represented (plaintiffs / appointees).
// Order fills the 2-column list row-by-row, matching the reference layout.
const actedFor = [
  'FTI Consulting',
  'KordaMentha',
  'Deloitte',
  'McGrath Nicol',
  'KPMG',
  'Hall Chadwick',
  'Grant Thornton',
  'Kupang',
  'Trilogy',
]

// Organisations we have litigated against.
const actedAgainst = [
  'Lehman Brothers',
  'Standard & Poors',
  'Fitch Ratings',
  'ABN Amro',
  'Commonwealth Bank',
  'ANZ Bank',
]

// Government bodies shown with icons (matching the reference layout).
const actedAgainstGov = [
  { name: 'Australian Taxation Office', Icon: Landmark },
  { name: 'Transport for NSW', Icon: TramFront },
]

export function TrackRecord() {
  return (
    <section className="relative py-20 md:py-28 bg-white border-t border-[#1C3A64]/[0.08]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <h2 className="text-[30px] sm:text-4xl md:text-[48px] font-medium text-[#1C3A64] leading-[1.08] tracking-tight">
            Track <span className="italic-display text-[#6D8FB5]">Record.</span>
          </h2>
          <p className="text-[#555555] text-[15px] md:text-base leading-[1.7] mt-5">
            Major disputes against renowned organisations, with globally significant outcomes.
          </p>
        </ScrollReveal>

        {/* Single light panel split into two halves */}
        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-[#1C3A64]/[0.08] bg-[#EDF2FB] shadow-[0_1px_3px_rgba(28,58,100,0.05)] overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* We have acted for */}
              <div className="p-7 md:p-8 border-b md:border-b-0 md:border-r border-[#1C3A64]/[0.08]">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#1C3A64] flex items-center justify-center flex-shrink-0">
                    {/* Handshake glyph is wider/shorter than Scale, so it's sized
                        a touch larger (17 vs 15) to read as the same visual size. */}
                    <Handshake size={17} className="text-white" />
                  </div>
                  <h3 className="text-[#1C3A64] text-[11px] md:text-[12px] font-semibold tracking-[0.14em] uppercase">
                    We have acted for
                  </h3>
                </div>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {actedFor.map((name) => (
                    <li
                      key={name}
                      className="flex items-start gap-2.5 text-[#3A4A5F] text-[13px] md:text-[14px] leading-snug"
                    >
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-[#1C3A64]/45 flex-shrink-0" />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* We have acted against */}
              <div className="p-7 md:p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#1C3A64] flex items-center justify-center flex-shrink-0">
                    <Scale size={15} className="text-white" />
                  </div>
                  <h3 className="text-[#1C3A64] text-[11px] md:text-[12px] font-semibold tracking-[0.14em] uppercase">
                    We have acted against
                  </h3>
                </div>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {actedAgainst.map((name) => (
                    <li
                      key={name}
                      className="flex items-start gap-2.5 text-[#3A4A5F] text-[13px] md:text-[14px] leading-snug"
                    >
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-[#1C3A64]/45 flex-shrink-0" />
                      {name}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-5 pt-5 border-t border-[#1C3A64]/[0.08]">
                  {actedAgainstGov.map(({ name, Icon }) => (
                    <span
                      key={name}
                      className="flex items-center gap-2 text-[#3A4A5F] text-[13px] md:text-[14px] leading-snug"
                    >
                      <Icon size={16} className="text-[#1C3A64] flex-shrink-0" />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.18}>
          <p className="text-[#555555] text-[13px] md:text-[14px] leading-[1.7] mt-8 text-center max-w-2xl mx-auto">
            As well as a range of Trustees and Responsible Entities of Managed Investment Schemes,
            and a number of Australia&apos;s largest insolvencies.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
