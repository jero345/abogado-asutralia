import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { TrendingUp, Users, Globe, Award } from 'lucide-react'

const stats = [
  {
    icon: TrendingUp,
    value: 500,
    prefix: '$',
    suffix: 'M+',
    label: 'Recovered for Clients',
    description: 'Total value of settlements and judgments secured across all class actions and litigation matters.',
  },
  {
    icon: Users,
    value: 200000,
    prefix: '',
    suffix: '+',
    label: 'Class Members Represented',
    description: 'Individuals and institutions whose rights we have fought for and protected.',
  },
  {
    icon: Award,
    value: 50,
    prefix: '',
    suffix: '+',
    label: 'Major Class Actions',
    description: 'High-profile class actions commenced or managed across all Australian jurisdictions.',
  },
  {
    icon: Globe,
    value: 25,
    prefix: '',
    suffix: '+',
    label: 'Years of Excellence',
    description: 'Decades of strategic litigation expertise across Australia\'s most complex disputes.',
  },
]

export function Stats() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#07070e] to-[#050507]" />
      <div className="absolute inset-0 opacity-[0.015] bg-[length:60px_60px]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
          `,
        }}
      />

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <span className="section-label">
            <span className="w-5 h-px bg-[#c9a84c]" />
            Track Record
            <span className="w-5 h-px bg-[#c9a84c]" />
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
            Numbers That
            <br />
            <span className="text-gradient-gold italic">Tell the Story</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Two decades of relentless advocacy have produced results that speak for themselves.
          </p>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.25)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 group cursor-default"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
                  />

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center mb-6 group-hover:bg-[#c9a84c]/15 transition-colors duration-300">
                    <Icon size={20} className="text-[#c9a84c]" />
                  </div>

                  {/* Counter */}
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2000 + i * 200}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-[#c9a84c] text-sm font-semibold mb-3">{stat.label}</div>

                  {/* Description */}
                  <p className="text-white/35 text-sm leading-relaxed">{stat.description}</p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Bottom quote */}
        <ScrollReveal delay={0.3} className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/[0.02] border border-[#c9a84c]/15 rounded-full">
            <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full animate-pulse" />
            <span className="text-white/50 text-sm font-medium">
              Australia's most successful class action litigation firm by settlements recovered
            </span>
            <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full animate-pulse" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
