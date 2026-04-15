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
    description: 'Total value of settlements and judgments secured across class actions and litigation matters.',
  },
  {
    icon: Users,
    value: 20,
    prefix: '',
    suffix: '+',
    label: 'Years of Combined Leadership',
    description: 'Our founding partners bring over two decades of combined experience from top-tier Australian and global firms.',
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
    value: 6,
    prefix: '',
    suffix: '',
    label: 'National Jurisdictions',
    description: 'We appear across Australia — Federal Court, Supreme Courts of every state and territory, the Full Federal Court, and the High Court of Australia.',
  },
]

export function Stats() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#f8f9fa] to-[#ffffff]" />
      <div className="absolute inset-0 opacity-[0.015] bg-[length:60px_60px]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30,58,95,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,58,95,1) 1px, transparent 1px)
          `,
        }}
      />

      {/* Navy accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e3a5f]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <span className="section-label">
            <span className="w-5 h-px bg-[#1e3a5f]" />
            Track Record
            <span className="w-5 h-px bg-[#1e3a5f]" />
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] mt-4 mb-6 leading-[1.1] tracking-tight">
            Numbers that
            <br />
            <span className="italic-display text-[#6D8FB5]">tell the story.</span>
          </h2>
          <p className="text-[#1e3a5f]/40 text-lg max-w-xl mx-auto leading-relaxed">
            A record of relentless advocacy — producing results that speak for themselves.
          </p>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(30,58,95,0.25)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative bg-[#1e3a5f]/[0.03] border border-[#1e3a5f]/[0.06] rounded-2xl p-8 group cursor-default"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(30,58,95,0.05) 0%, transparent 70%)' }}
                  />

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-[#1e3a5f]/10 border border-[#1e3a5f]/20 flex items-center justify-center mb-6 group-hover:bg-[#1e3a5f]/15 transition-colors duration-300">
                    <Icon size={20} className="text-[#1e3a5f]" />
                  </div>

                  {/* Counter */}
                  <div className="text-[32px] md:text-[40px] lg:text-[44px] font-semibold text-[#1C3A64] mb-2 leading-none">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2000 + i * 200}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-[#1C3A64] text-[13px] md:text-sm font-medium mb-3">{stat.label}</div>

                  {/* Description */}
                  <p className="text-[#555555] text-[13px] md:text-sm leading-[1.6]">{stat.description}</p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Bottom quote */}
        <ScrollReveal delay={0.3} className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-[#1e3a5f]/[0.02] border border-[#1e3a5f]/15 rounded-full">
            <div className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full animate-pulse" />
            <span className="text-[#1e3a5f]/50 text-sm font-medium">
              Australia's most successful class action litigation firm by settlements recovered
            </span>
            <div className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full animate-pulse" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
