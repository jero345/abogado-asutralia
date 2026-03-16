import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowRight, ChevronDown, Calendar, CheckCircle } from 'lucide-react'

const cases = [
  {
    id: 1,
    status: 'Settled',
    category: 'Financial Services',
    title: 'Major Bank Responsible Lending Class Action',
    summary: 'Class action against a Big Four bank for systematic failures in responsible lending obligations across tens of thousands of consumer loans.',
    amount: '$135M',
    members: '42,000+',
    year: '2023',
    court: 'Federal Court of Australia',
    details:
      'Banton Group led this landmark class action alleging the respondent bank systematically failed to comply with its responsible lending obligations under the National Consumer Credit Protection Act. The action covered unsecured personal loans and credit cards issued between 2012-2019, with class members receiving compensation for losses flowing from loans they could not afford to repay.',
    outcomes: [
      'Record settlement of $135 million',
      '42,000+ class members compensated',
      'Precedent-setting responsible lending obligations',
      'Compelled systemic industry-wide reforms',
    ],
    tag: 'Banking',
  },
  {
    id: 2,
    status: 'Active',
    category: 'Securities',
    title: 'ASX-Listed Energy Corporation Securities Class Action',
    summary: 'Shareholders allege a major ASX-listed energy company made misleading and deceptive statements regarding project reserves, causing significant share price decline.',
    amount: '$280M+',
    members: '28,000+',
    year: '2024',
    court: 'Federal Court of Australia (VIC)',
    details:
      'This ongoing securities class action targets alleged contraventions of continuous disclosure obligations and misleading conduct under the Corporations Act and ASIC Act. Banton Group acts as lead firm, representing institutional and retail shareholders who acquired shares during the relevant period and suffered losses following the share price collapse.',
    outcomes: [
      'Class of 28,000+ shareholders',
      'Estimated losses exceeding $280 million',
      'Challenging continuous disclosure failures',
      'Litigation funding secured',
    ],
    tag: 'Securities',
  },
  {
    id: 3,
    status: 'Settled',
    category: 'Consumer',
    title: 'Telecommunications Data Breach Class Action',
    summary: 'A class action on behalf of millions of Australians whose personal data was exposed in a major telecommunications data breach, resulting in identity theft and financial harm.',
    amount: '$58M',
    members: '1.2M+',
    year: '2022',
    court: 'Supreme Court of NSW',
    details:
      'Following a massive data breach affecting over 1.2 million Australians, Banton Group filed this class action alleging the respondent failed to take reasonable steps to protect customer data in contravention of the Privacy Act. The matter settled for $58 million and required the respondent to implement comprehensive cybersecurity improvements.',
    outcomes: [
      '$58 million settlement',
      '1.2 million class members',
      'Mandatory cybersecurity uplift orders',
      'Privacy law reform contribution',
    ],
    tag: 'Privacy',
  },
  {
    id: 4,
    status: 'Active',
    category: 'Superannuation',
    title: 'Superannuation Fee Gouging Class Action',
    summary: 'Class action targeting a major superannuation fund for charging excessive fees and failing to act in the best financial interests of members over a decade.',
    amount: '$400M+',
    members: '95,000+',
    year: '2024',
    court: 'Federal Court of Australia',
    details:
      'Banton Group is prosecuting this high-value superannuation class action alleging the trustee failed in its fiduciary duties and statutory obligations to members. The action covers a decade of excessive fee deductions and underperformance attributed to related-party arrangements that were not in members\' best financial interests.',
    outcomes: [
      'Potential recovery of $400M+',
      '95,000+ fund members represented',
      'Targeting systemic fee extraction',
      'Industry-wide implications',
    ],
    tag: 'Superannuation',
  },
]

const statusColors: Record<string, string> = {
  Settled: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  Active: 'text-[#1e3a5f] bg-[#1e3a5f]/10 border-[#1e3a5f]/20',
  Pending: 'text-blue-700 bg-blue-50 border-blue-200',
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
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3a5f] leading-tight">
              Landmark
              <br />
              <span className="text-gradient-gold italic">Class Actions</span>
            </h2>
            <p className="text-[#1e3a5f]/40 text-base leading-relaxed lg:max-w-xs">
              A selection of our most significant cases — representing real people against powerful institutions.
            </p>
          </div>
        </ScrollReveal>

        {/* Case list */}
        <div className="space-y-3">
          {cases.map((c, i) => (
            <ScrollReveal key={c.id} delay={i * 0.08}>
              <motion.div
                layout
                className={`relative border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  expanded === c.id
                    ? 'border-[#1e3a5f]/25 bg-[#1e3a5f]/[0.04]'
                    : 'border-[#1e3a5f]/[0.06] bg-[#1e3a5f]/[0.02] hover:border-[#1e3a5f]/10 hover:bg-[#1e3a5f]/[0.03]'
                }`}
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              >
                {/* Header row */}
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Left */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[c.status]}`}>
                          {c.status}
                        </span>
                        <span className="text-[#1e3a5f]/40 text-xs font-medium px-2.5 py-1 bg-[#1e3a5f]/[0.04] border border-[#1e3a5f]/[0.06] rounded-full">
                          {c.tag}
                        </span>
                        <span className="text-[#1e3a5f]/40 text-xs hidden sm:flex items-center gap-1">
                          <Calendar size={11} />
                          {c.year}
                        </span>
                      </div>
                      <h3 className="text-[#1e3a5f] font-semibold text-lg leading-snug pr-4">{c.title}</h3>
                      <p className="text-[#1e3a5f]/40 text-sm mt-2 leading-relaxed line-clamp-2">{c.summary}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 lg:gap-8 flex-shrink-0">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-[#1e3a5f] font-bold text-xl">
                          {c.amount}
                        </div>
                        <div className="text-[#1e3a5f]/30 text-xs mt-0.5">Claim Value</div>
                      </div>
                      <div className="hidden sm:block text-center">
                        <div className="flex items-center gap-1 text-[#1e3a5f] font-bold text-xl">
                          {c.members}
                        </div>
                        <div className="text-[#1e3a5f]/30 text-xs mt-0.5">Members</div>
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

                {/* Expanded details */}
                <AnimatePresence>
                  {expanded === c.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 lg:px-8 pb-8 border-t border-[#1e3a5f]/[0.05]">
                        <div className="pt-6 grid lg:grid-cols-3 gap-8">
                          {/* Details */}
                          <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-2 mt-1">
                              <div className="w-4 h-px bg-[#1e3a5f]/60" />
                              <span className="text-[#1e3a5f] text-xs font-semibold tracking-wider uppercase">Case Overview</span>
                            </div>
                            <p className="text-[#1e3a5f]/60 text-sm leading-relaxed">{c.details}</p>

                            <div className="mt-4 flex items-start gap-2 text-[#1e3a5f]/30 text-xs">
                              <span className="font-medium text-[#1e3a5f]/40">Court:</span>
                              {c.court}
                            </div>
                          </div>

                          {/* Outcomes */}
                          <div>
                            <div className="flex items-center gap-2 mb-4 mt-1">
                              <div className="w-4 h-px bg-[#1e3a5f]/60" />
                              <span className="text-[#1e3a5f] text-xs font-semibold tracking-wider uppercase">Key Outcomes</span>
                            </div>
                            <ul className="space-y-3">
                              {c.outcomes.map((outcome) => (
                                <li key={outcome} className="flex items-start gap-2.5">
                                  <CheckCircle size={13} className="text-[#1e3a5f] mt-0.5 flex-shrink-0" />
                                  <span className="text-[#1e3a5f]/60 text-sm">{outcome}</span>
                                </li>
                              ))}
                            </ul>
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
