import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Brain, Database, LineChart, Lock, Network, Cpu } from 'lucide-react'

const techFeatures = [
  {
    icon: Brain,
    title: 'AI-Powered Case Analysis',
    description: 'We leverage advanced AI tools to analyse millions of documents, identify patterns, and build the strongest possible case strategy for every matter.',
  },
  {
    icon: Database,
    title: 'Big Data Discovery',
    description: 'Our forensic data capabilities allow us to process and analyse billions of records — essential for complex class actions involving financial institutions.',
  },
  {
    icon: LineChart,
    title: 'Quantitative Damages Modelling',
    description: 'Proprietary damages modelling software calculates and substantiates class member losses with precision, maximising recovery outcomes.',
  },
  {
    icon: Lock,
    title: 'Secure Client Portal',
    description: 'Bank-grade encrypted portal for class members and clients to register, track case progress, and receive settlement distributions securely.',
  },
  {
    icon: Network,
    title: 'Litigation Funding Network',
    description: 'Strategic relationships with Australia\'s leading litigation funders ensure class actions are resourced to the highest level, at no upfront cost to class members.',
  },
  {
    icon: Cpu,
    title: 'Predictive Analytics',
    description: 'Data-driven litigation strategy informed by predictive analytics on court outcomes, settlement patterns, and judicial preferences.',
  },
]

const timeline = [
  { year: '1999', event: 'Firm Founded', detail: 'Established as a specialist litigation boutique in Melbourne' },
  { year: '2004', event: 'First Class Action', detail: 'Led our first landmark class action — a $28M telecommunications case' },
  { year: '2010', event: 'Federal Court Success', detail: 'Landmark Full Federal Court victory setting precedent in securities law' },
  { year: '2016', event: 'National Expansion', detail: 'Opened Sydney and Brisbane offices to serve clients nationally' },
  { year: '2020', event: 'Tech Initiative', detail: 'Launched our proprietary litigation technology platform' },
  { year: '2024', event: 'Record Year', detail: '$280M+ in active class action claims, largest ever case portfolio' },
]

export function Technology() {
  return (
    <section id="technology" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#ffffff]" />

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
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3a5f] leading-tight mb-6">
            Law Meets
            <br />
            <span className="text-gradient-gold italic">Innovation</span>
          </h2>
          <p className="text-[#1e3a5f]/40 text-lg max-w-2xl mx-auto leading-relaxed">
            We combine deep legal expertise with cutting-edge technology to deliver superior outcomes in an increasingly complex legal landscape.
          </p>
        </ScrollReveal>

        {/* Tech features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {techFeatures.map((feature, i) => {
            const Icon = feature.icon
            return (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(30,58,95,0.2)' }}
                  className="bg-[#1e3a5f]/[0.025] border border-[#1e3a5f]/[0.06] rounded-2xl p-7 group cursor-default transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#1e3a5f]/10 border border-[#1e3a5f]/20 flex items-center justify-center mb-5 group-hover:bg-[#1e3a5f]/15 transition-colors duration-300">
                    <Icon size={20} className="text-[#1e3a5f]" />
                  </div>
                  <h3 className="text-[#1e3a5f] font-semibold text-base mb-3">{feature.title}</h3>
                  <p className="text-[#1e3a5f]/40 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Timeline */}
        <ScrollReveal className="mb-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1e3a5f]/60" />
            <span className="text-[#1e3a5f] text-xs font-semibold tracking-[0.2em] uppercase">Our Journey</span>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e3a5f]/20 to-transparent hidden lg:block" />

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.08}>
                <div className="relative text-center lg:text-left">
                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
                    className="w-10 h-10 rounded-full bg-[#1e3a5f]/10 border border-[#1e3a5f]/30 flex items-center justify-center mb-4 mx-auto lg:mx-0"
                  >
                    <div className="w-2 h-2 bg-[#1e3a5f] rounded-full" />
                  </motion.div>

                  <div className="text-[#1e3a5f] font-bold text-lg mb-1">{item.year}</div>
                  <div className="text-[#1e3a5f] font-semibold text-sm mb-2">{item.event}</div>
                  <p className="text-[#1e3a5f]/50 text-xs leading-relaxed">{item.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
