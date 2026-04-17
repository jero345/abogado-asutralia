import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { motion } from 'framer-motion'

const cdoDefendants = [
  'Lehman Brothers',
  'Standard & Poors',
  'Fitch Ratings',
  'ABN Amro',
  'Commonwealth Bank',
  'ANZ Bank',
]

const insolvencies = [
  'Forge Group',
  'Heavy Plant Leasing',
  'LM First Mortgage Income Fund',
  'City Pacific First Mortgage Fund',
  'Equititrust',
  'Ceramic Fuel Cells Limited',
]

const clients = ['FTI', 'KordaMentha', 'Deloitte', 'McGrath Nicol', 'KPMG', 'Hall Chadwick', 'Grant Thornton', 'Kupang', 'Trilogy']

export function KeyLitigation() {
  return (
    <section className="relative py-20 md:py-28 bg-white border-t border-[#1C3A64]/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-20">
          {/* Left label */}
          <ScrollReveal>
            <span className="section-label mb-4 block">
              <span className="w-5 h-px bg-[#1C3A64]" />
              Track Record
            </span>
            <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight">
              Key
              <br />
              <span className="italic-display text-[#6D8FB5]">Litigation.</span>
            </h2>
            <p className="text-[#555555] text-[14px] leading-[1.7] mt-6 max-w-sm">
              A selection of the most significant class action and insolvency matters our team has led.
            </p>
          </ScrollReveal>

          {/* Right content */}
          <div className="space-y-10">
            <ScrollReveal>
              <p className="text-[#1C3A64] text-base md:text-lg leading-[1.7] mb-6">
                Key litigation and insolvencies involving our team include:
              </p>
            </ScrollReveal>

            {/* CDO block */}
            <ScrollReveal delay={0.1}>
              <div className="bg-[#F4F6FB] border border-[#1C3A64]/[0.08] rounded-xl p-6 md:p-7">
                <h3 className="text-[#1C3A64] text-[16px] md:text-[18px] font-medium mb-4 leading-[1.4]">
                  Successful claims in respect of complex financial products such as collateralised debt obligations, against:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {cdoDefendants.map((d) => (
                    <motion.li
                      key={d}
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-3 text-[#555555] text-[14px]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] flex-shrink-0" />
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Insolvencies block */}
            <ScrollReveal delay={0.15}>
              <div className="bg-[#F4F6FB] border border-[#1C3A64]/[0.08] rounded-xl p-6 md:p-7">
                <h3 className="text-[#1C3A64] text-[16px] md:text-[18px] font-medium mb-4 leading-[1.4]">
                  Large insolvencies including:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {insolvencies.map((d) => (
                    <motion.li
                      key={d}
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-3 text-[#555555] text-[14px]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] flex-shrink-0" />
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Key clients */}
            <ScrollReveal delay={0.2}>
              <div className="pt-4 border-t border-[#1C3A64]/[0.08]">
                <p className="text-[#555555] text-[14px] md:text-[15px] leading-[1.7] mb-4">
                  Our key clients in respect of insolvency and commercial litigation matters include{' '}
                  <span className="text-[#1C3A64] font-medium">
                    FTI, KordaMentha, Deloitte, McGrath Nicol, KPMG, Hall Chadwick, Grant Thornton, Kupang and Trilogy
                  </span>
                  , as well as a range of Trustees and Responsible Entities of Managed Investment Schemes.
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {clients.map((c) => (
                    <span
                      key={c}
                      className="text-[#1C3A64] text-[11px] font-medium px-3 py-1.5 bg-[#1C3A64]/[0.06] border border-[#1C3A64]/15 rounded-full tracking-wide"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
