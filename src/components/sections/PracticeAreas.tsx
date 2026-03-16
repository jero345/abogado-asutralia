import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Scale, Building2, RefreshCw, DollarSign, ArrowUpRight } from 'lucide-react'

const practices = [
  {
    icon: Scale,
    number: '01',
    title: 'Class Actions',
    tagline: 'Justice at Scale',
    description:
      'We represent thousands of Australians in landmark class actions against corporations, financial institutions, and government entities. Our track record includes some of the largest settlements in Australian legal history.',
    highlights: ['Securities class actions', 'Consumer product claims', 'Financial misconduct', 'Environmental litigation'],
    color: 'from-[#1e3a5f]/20 to-[#1e3a5f]/5',
    accent: '#1e3a5f',
  },
  {
    icon: Building2,
    number: '02',
    title: 'Commercial Litigation',
    tagline: 'High-Stakes Disputes',
    description:
      'Complex commercial disputes demand sophisticated strategy. We provide sophisticated advocacy in contract disputes, shareholder conflicts, trade practices, and commercial fraud matters across all Australian courts.',
    highlights: ['Contract disputes', 'Shareholder actions', 'Trade practices', 'Fraud & misrepresentation'],
    color: 'from-blue-500/15 to-blue-500/5',
    accent: '#2a6496',
  },
  {
    icon: RefreshCw,
    number: '03',
    title: 'Insolvency & Restructuring',
    tagline: 'Navigating Complexity',
    description:
      'When businesses face financial distress, decisive legal action is critical. We advise on voluntary administration, receivership, deed of company arrangement, and complex creditor negotiations.',
    highlights: ['Voluntary administration', 'Liquidations', 'Creditor rights', 'Corporate rescue'],
    color: 'from-purple-500/15 to-purple-500/5',
    accent: '#6b4f9e',
  },
  {
    icon: DollarSign,
    number: '04',
    title: 'Complex Financial Disputes',
    tagline: 'Precision Advocacy',
    description:
      'Financial disputes require deep technical expertise and aggressive advocacy. We handle securities litigation, banking disputes, investment fraud, ASIC proceedings, and derivative claims.',
    highlights: ['Securities litigation', 'Banking disputes', 'Investment fraud', 'ASIC proceedings'],
    color: 'from-emerald-500/15 to-emerald-500/5',
    accent: '#1a6e4a',
  },
]

export function PracticeAreas() {
  return (
    <section id="practice-areas" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[#ffffff]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <ScrollReveal>
            <span className="section-label mb-4 block">
              <span className="w-5 h-px bg-[#1e3a5f]" />
              What We Do
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3a5f] leading-tight">
              Practice
              <br />
              <span className="text-gradient-gold italic">Areas</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="lg:max-w-xs">
            <p className="text-[#1e3a5f]/40 text-base leading-relaxed">
              Four specialised practice areas. One relentless commitment to winning. We operate at the intersection of law, strategy, and technology.
            </p>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {practices.map((practice, i) => {
            const Icon = practice.icon
            return (
              <ScrollReveal key={practice.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative bg-[#1e3a5f]/[0.025] border border-[#1e3a5f]/[0.06] rounded-2xl p-8 group cursor-default overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${practice.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                  />

                  <div className="relative z-10">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${practice.accent}15`, border: `1px solid ${practice.accent}25` }}
                      >
                        <Icon size={22} style={{ color: practice.accent }} />
                      </div>
                      <span className="text-[#1e3a5f]/10 text-4xl font-bold font-mono">{practice.number}</span>
                    </div>

                    {/* Title */}
                    <div className="mb-1">
                      <span
                        className="text-xs font-semibold tracking-[0.15em] uppercase mb-2 block"
                        style={{ color: practice.accent }}
                      >
                        {practice.tagline}
                      </span>
                      <h3 className="text-2xl font-semibold text-[#1e3a5f]">{practice.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-[#1e3a5f]/40 text-sm leading-relaxed mb-6 mt-3">{practice.description}</p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {practice.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2">
                          <div
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: practice.accent }}
                          />
                          <span className="text-[#1e3a5f]/40 text-xs">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                      className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: practice.accent }}
                    >
                      Learn more
                      <ArrowUpRight size={14} />
                    </motion.div>
                  </div>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
