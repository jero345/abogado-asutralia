import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Scale, Building2, RefreshCw, Users, Award, FileText, Phone } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const sections = [
  { to: '/practice-areas', icon: Scale, title: 'Practice Areas', desc: 'Four specialised areas: class actions, commercial, insolvency, complex financial.' },
  { to: '/class-actions', icon: Building2, title: 'Class Actions', desc: '10 landmark matters currently active across Federal, Supreme and High Courts.' },
  { to: '/about', icon: RefreshCw, title: 'About the Firm', desc: 'Founded February 2020 by Amanda Banton — one of Australia\'s largest private litigation practices.' },
  { to: '/team', icon: Users, title: 'Our Team', desc: 'Accomplished litigators recognised by Chambers Asia-Pacific and Legal 500.' },
  { to: '/awards', icon: Award, title: 'Awards & Recognition', desc: 'Ranked in Chambers 2022–2026 and Legal 500 — Recommended Firm.' },
  { to: '/contact', icon: Phone, title: 'Contact', desc: 'Sydney HQ at 60 Martin Place and Melbourne office at 140 William Street.' },
]

export function Home() {
  return (
    <>
      <Hero />
      <Stats />

      {/* Section index — direct entry to each sub-page */}
      <section className="relative py-24 lg:py-28 bg-[#EFF4F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#1C3A64]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1C3A64]">Explore</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-[#1C3A64] leading-tight">
              Everything you need to <span className="italic-display text-[#6D8FB5]">work with us</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((s, i) => {
              const Icon = s.icon
              return (
                <ScrollReveal key={s.to} delay={i * 0.06}>
                  <Link to={s.to} className="group block h-full">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="h-full bg-white border border-[#1C3A64]/10 rounded-2xl p-6 hover:border-[#1C3A64]/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-11 h-11 rounded-xl bg-[#1C3A64]/10 flex items-center justify-center group-hover:bg-[#1C3A64]/15 transition-colors">
                          <Icon size={18} className="text-[#1C3A64]" />
                        </div>
                        <ArrowUpRight size={16} className="text-[#1C3A64]/30 group-hover:text-[#1C3A64] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h3 className="text-[#1C3A64] font-medium text-lg mb-2 leading-snug">{s.title}</h3>
                      <p className="text-[#555555] text-sm leading-relaxed">{s.desc}</p>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Closing call */}
      <section className="relative py-16 md:py-20 bg-[#1C3A64]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-px w-6 bg-[#8AAECE]" />
              <FileText size={18} className="text-[#8AAECE]" />
              <div className="h-px w-6 bg-[#8AAECE]" />
            </div>
            <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] font-medium text-white leading-[1.15] mb-5 tracking-tight">
              Have a matter that demands <span className="italic-display text-[#6D8FB5]">extraordinary advocacy?</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base lg:text-lg leading-[1.7] mb-8 max-w-xl mx-auto">
              Initial consultations are confidential and obligation-free. Tell us about your matter and we'll assess whether we can help.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-white text-[#1C3A64] text-[13px] font-medium rounded-full hover:bg-[#EFF4F4] transition-colors tracking-[0.02em]"
            >
              Schedule a Consultation
              <ArrowUpRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
