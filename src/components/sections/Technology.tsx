import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Brain, Database, LineChart, Network } from 'lucide-react'

const techFeatures = [
  {
    icon: Brain,
    title: 'AI-Powered Case Analysis',
    description:
      'We leverage advanced AI tools to analyse millions of documents, identify patterns, and build the strongest possible case strategy for every matter.',
  },
  {
    icon: Database,
    title: 'Big Data Discovery',
    description:
      'Our forensic data capabilities allow us to process and analyse billions of records — essential for complex class actions involving financial institutions.',
  },
  {
    icon: LineChart,
    title: 'Quantitative Damages Modelling',
    description:
      'Proprietary damages modelling calculates and substantiates class member losses with precision, maximising recovery outcomes.',
  },
  {
    icon: Network,
    title: 'Litigation Funding Network',
    description:
      "Strategic relationships with Australia's leading litigation funders ensure class actions are resourced to the highest level, at no upfront cost to class members.",
  },
]

export function Technology() {
  return (
    <section id="technology" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#EFF4F4]" />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30,58,95,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,58,95,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="section-label justify-center mb-4 block">
            <span className="w-5 h-px bg-[#1e3a5f]" />
            Strategy & Technology
            <span className="w-5 h-px bg-[#1e3a5f]" />
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-[#1C3A64] leading-[1.1] tracking-tight mb-6">
            Law meets
            <br />
            <span className="italic-display text-[#6D8FB5]">innovation.</span>
          </h2>
          <p className="text-[#1e3a5f]/60 text-lg max-w-2xl mx-auto leading-relaxed">
            We combine deep legal expertise with modern technology — data analytics, litigation funding, and strategic AI — to deliver superior outcomes.
          </p>
        </ScrollReveal>

        {/* Tech features (4 cards — 2x2 grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {techFeatures.map((feature, i) => {
            const Icon = feature.icon
            return (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(30,58,95,0.2)' }}
                  className="bg-white border border-[#1e3a5f]/[0.1] rounded-2xl p-7 group cursor-default transition-all duration-300 h-full"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#1e3a5f]/10 border border-[#1e3a5f]/20 flex items-center justify-center mb-5 group-hover:bg-[#1e3a5f]/15 transition-colors duration-300">
                    <Icon size={20} className="text-[#1e3a5f]" />
                  </div>
                  <h3 className="text-[#1e3a5f] font-semibold text-base mb-3">{feature.title}</h3>
                  <p className="text-[#1e3a5f]/60 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
