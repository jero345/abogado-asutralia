import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowRight, ChevronDown, Calendar, Scale } from 'lucide-react'

const cases = [
  {
    id: 1,
    status: 'Active',
    category: 'Securities',
    year: '2020',
    title: 'Arrium Class Action',
    summary: 'Action against former directors of Arrium Limited (ASX:ARI) and auditors KPMG for share price inflation.',
    court: 'Victorian Supreme Court',
    defendant: 'ASX:ARI Directors & KPMG',
  },
  {
    id: 2,
    status: 'Active',
    category: 'Financial Products',
    year: '2022',
    title: 'Fitch SCDO Class Action',
    summary: "Investors in synthetic CDOs rated 'AAA'–'AA-' by Fitch between 2005–2007 seeking damages for negligent ratings.",
    court: 'Federal Court',
    defendant: 'International Ratings Agency',
  },
  {
    id: 3,
    status: 'Active',
    category: 'Financial Products',
    year: '2022',
    title: 'S&P CDO & CPDO Class Action',
    summary: 'Action against S&P Global for misleading credit ratings on CDOs and CPDOs issued between 2005–2007.',
    court: 'Federal Court',
    defendant: 'Global Institution',
  },
  {
    id: 4,
    status: 'Active',
    category: 'Environmental',
    year: '2019',
    title: 'Murray Darling Basin Class Action',
    summary: 'NSW and Victorian water entitlement holders seeking compensation for low water allocations in 2017–2020.',
    court: 'NSW Supreme Court',
    defendant: 'Regional Farmers',
  },
  {
    id: 5,
    status: 'Active',
    category: 'Securities',
    year: '2021',
    title: 'Blue Sky Class Action',
    summary: 'Shareholders allege materially misstated financial reports by Blue Sky and auditor Ernst & Young in FY2016–FY2018.',
    court: 'Federal Court',
    defendant: 'ASX Investors',
  },
  {
    id: 6,
    status: 'Active',
    category: 'Securities',
    year: '2022',
    title: 'Phoslock Class Action',
    summary: 'Action against Phoslock (ASX:PET) directors and KPMG following disclosure of fraudulent activity in China operations.',
    court: 'Federal Court',
    defendant: 'ASX Shareholders',
  },
  {
    id: 7,
    status: 'Active',
    category: 'Consumer',
    year: '2024',
    title: 'Hyundai ABS Defect Class Action',
    summary: 'Owners of affected Hyundai vehicles with a defective ABS module creating risk of engine fire.',
    court: 'Victorian Supreme Court',
    defendant: 'Vehicle Owners',
  },
  {
    id: 8,
    status: 'Active',
    category: 'Consumer',
    year: '2024',
    title: 'Kia ABS Defect Class Action',
    summary: 'Owners of affected Kia vehicles with the same ABS manufacturing defect — risk of fire even when parked.',
    court: 'Victorian Supreme Court',
    defendant: 'Vehicle Owners',
  },
  {
    id: 9,
    status: 'Active',
    category: 'Securities',
    year: '2021',
    title: 'CuDeco Class Action',
    summary: 'Shareholders of ASX-listed CuDeco Limited (In Liq) allege continuous disclosure contraventions by directors and auditor KPMG.',
    court: 'Federal Court',
    defendant: 'ASX Shareholders',
  },
  {
    id: 10,
    status: 'On Appeal',
    category: 'Nuisance',
    year: '2020',
    title: 'Light Rail Class Action',
    summary: 'Businesses, landlords and residents affected by the CBD & South-East Light Rail project — now before the High Court.',
    court: 'High Court of Australia',
    defendant: 'Sydney CBD',
  },
]

const pastMatters = [
  'Arasor Class Action',
  'Octaviar Notes Class Action',
  "Financial Products Class Actions vs. Standard & Poor's",
  'Fitch Ratings',
  'Commonwealth Bank',
  'ANZ',
  'ABN Amro',
  'Lehman Brothers',
]

const statusColors: Record<string, string> = {
  Active: 'text-[#1e3a5f] bg-[#E8F0FA] border-[#1e3a5f]/20',
  Settled: 'text-[#1A6B41] bg-[#E6F4EE] border-[#1A6B41]/20',
  'On Appeal': 'text-[#8A6D1E] bg-[#C9A84C]/10 border-[#C9A84C]/30',
  Investigating: 'text-blue-700 bg-blue-50 border-blue-200',
}

export function ClassActions() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="class-actions" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#f8f9fa] to-[#ffffff]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-16">
          <span className="section-label mb-4 block">
            <span className="w-5 h-px bg-[#1e3a5f]" />
            Case Studies
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight">
              Landmark
              <br />
              <span className="italic-display text-[#6D8FB5]">class actions.</span>
            </h2>
            <p className="text-[#1e3a5f]/40 text-base leading-relaxed lg:max-w-sm">
              Representing real people against powerful institutions — a selection of our most significant current matters.
            </p>
          </div>
        </ScrollReveal>

        {/* Case list */}
        <div className="space-y-3">
          {cases.map((c, i) => (
            <ScrollReveal key={c.id} delay={i * 0.04}>
              <motion.div
                layout
                className={`relative border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  expanded === c.id
                    ? 'border-[#1e3a5f]/25 bg-[#1e3a5f]/[0.04]'
                    : 'border-[#1e3a5f]/[0.06] bg-[#1e3a5f]/[0.02] hover:border-[#1e3a5f]/10 hover:bg-[#1e3a5f]/[0.03]'
                }`}
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              >
                <div className="p-5 lg:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Left */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border tracking-wide ${statusColors[c.status]}`}>
                          {c.status}
                        </span>
                        <span className="text-[#1e3a5f]/60 text-[11px] font-medium px-2.5 py-1 bg-[#1e3a5f]/[0.05] border border-[#1e3a5f]/[0.1] rounded-full tracking-wide">
                          {c.category}
                        </span>
                        <span className="text-[#1e3a5f]/40 text-xs hidden sm:flex items-center gap-1">
                          <Calendar size={11} />
                          {c.year}
                        </span>
                      </div>
                      <h3 className="text-[#1e3a5f] font-semibold text-base leading-snug pr-4">{c.title}</h3>
                      <p className="text-[#1e3a5f]/50 text-sm mt-1 leading-relaxed line-clamp-2">{c.summary}</p>
                    </div>

                    {/* Right: Court info */}
                    <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-[#1e3a5f] font-semibold text-sm">{c.court}</div>
                        <div className="text-[#1e3a5f]/40 text-xs mt-0.5">{c.defendant}</div>
                      </div>
                      <motion.div
                        animate={{ rotate: expanded === c.id ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-9 h-9 border border-[#1e3a5f]/10 rounded-full flex items-center justify-center text-[#1e3a5f]/40 flex-shrink-0"
                      >
                        <ChevronDown size={15} />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expanded */}
                <AnimatePresence>
                  {expanded === c.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 lg:px-6 pb-6 border-t border-[#1e3a5f]/[0.05]">
                        <div className="pt-5 grid sm:grid-cols-3 gap-6">
                          <div className="sm:col-span-2">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-4 h-px bg-[#1e3a5f]/60" />
                              <span className="text-[#1e3a5f] text-xs font-semibold tracking-wider uppercase">Case Overview</span>
                            </div>
                            <p className="text-[#1e3a5f]/60 text-sm leading-relaxed">{c.summary}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-4 h-px bg-[#1e3a5f]/60" />
                              <span className="text-[#1e3a5f] text-xs font-semibold tracking-wider uppercase">Jurisdiction</span>
                            </div>
                            <div className="flex items-start gap-2 text-[#1e3a5f]/70 text-sm">
                              <Scale size={13} className="mt-0.5 text-[#1e3a5f]" />
                              <span>{c.court}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Past matters */}
        <ScrollReveal delay={0.2} className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#1e3a5f]/40" />
            <span className="text-[#1e3a5f] text-[11px] font-semibold tracking-[0.2em] uppercase">Our Track Record Also Includes</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {pastMatters.map((m) => (
              <span
                key={m}
                className="text-[#1e3a5f]/60 text-xs font-medium px-3 py-1.5 bg-[#1e3a5f]/[0.04] border border-[#1e3a5f]/[0.08] rounded-full"
              >
                {m}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3} className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 border border-[#1e3a5f]/30 text-[#1e3a5f] text-sm font-semibold rounded-full hover:bg-[#1e3a5f]/10 transition-all duration-200"
          >
            Register for a Current Class Action
            <ArrowRight size={15} />
          </motion.button>
        </ScrollReveal>
      </div>
    </section>
  )
}
