import { motion } from 'framer-motion'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowUpRight, Calendar, Users, UserCheck, Quote, Mail, CheckCircle2 } from 'lucide-react'

const clerkshipDetails = [
  { icon: Calendar, label: 'Two intakes yearly', value: 'December & February' },
  { icon: Calendar, label: 'Duration', value: 'Four weeks' },
  { icon: Users, label: 'Work allocation', value: 'No rotations — matters from all partners' },
  { icon: UserCheck, label: 'Support', value: 'Lawyer buddy + senior mentor' },
]

const testimonials = [
  {
    quote:
      'First-hand exposure to complex commercial litigation — trial attendance and genuine socialising opportunities.',
    name: 'Kevin Cloke',
    cohort: '2024 / 2025',
  },
  {
    quote:
      'A fantastic opportunity providing real-world experience and strategic legal practice insights.',
    name: 'Henry Kinsey',
    cohort: '2022 / 23',
  },
  {
    quote:
      'Supportive culture and challenging assignments — an excellent learning environment.',
    name: 'Lyndon Arundell',
    cohort: '2022 / 23',
  },
]

const cultureBullets = [
  'Fluid, flexible, merit-based — not a traditional hierarchy',
  'Outstanding lawyers progress rapidly',
  "Direct exposure to Sydney's leading disputes team from day one",
  'Multidisciplinary matters — class actions, insolvency, complex financial litigation',
]

export function WorkWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Work with us."
        italicTitle="Progress on merit."
        subtitle="Dynamic legal practice focused on Australia's largest complex litigation and insolvency matters. Guided by technical experts and committed legal professionals."
        breadcrumbs={[{ label: 'Work With Us' }]}
      />

      {/* Culture section */}
      <section className="relative py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ScrollReveal>
              <span className="section-label mb-4 block">
                <span className="w-5 h-px bg-[#1C3A64]" />
                Our Culture
              </span>
              <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight mb-6">
                Not a pyramid.
                <br />
                <span className="italic-display text-[#6D8FB5]">A trajectory.</span>
              </h2>
              <div className="space-y-5 text-[#555555] leading-[1.7]">
                <p>
                  We run a fluid, flexible, merit-based programme rather than the rigid hierarchy of a traditional firm. Outstanding lawyers progress rapidly — and motivated, ambitious professionals get the space to develop real skills on matters that matter.
                </p>
                <p>
                  Our team works on Australia's largest complex litigations from Sydney's leading disputes practice. You will be guided by technical experts and committed legal professionals from your first day.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-[#EFF4F4] border border-[#1C3A64]/10 rounded-2xl p-7 md:p-9">
                <h3 className="text-[#1C3A64] font-medium text-[18px] mb-5">What to expect</h3>
                <ul className="space-y-4">
                  {cultureBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#1C3A64] mt-0.5 flex-shrink-0" />
                      <span className="text-[#555555] text-[14px] leading-[1.6]">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Summer Clerkship Program */}
      <section className="relative py-20 md:py-28 bg-[#EFF4F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <span className="section-label justify-center mb-4 block">
              <span className="w-5 h-px bg-[#1C3A64]" />
              Summer Clerkship Program
              <span className="w-5 h-px bg-[#1C3A64]" />
            </span>
            <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight mb-6 max-w-3xl mx-auto">
              Real work, senior exposure,
              <br />
              <span className="italic-display text-[#6D8FB5]">from day one.</span>
            </h2>
            <p className="text-[#555555] text-base md:text-lg leading-[1.7] max-w-2xl mx-auto">
              Law students gain direct exposure to Australia's largest complex litigations. Our flat structure means real responsibility — and many clerks progress into Graduate and Associate roles.
            </p>
          </ScrollReveal>

          {/* Program details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {clerkshipDetails.map((d, i) => {
              const Icon = d.icon
              return (
                <ScrollReveal key={d.label} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="h-full bg-white border border-[#1C3A64]/10 rounded-xl p-5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#1C3A64]/10 flex items-center justify-center mb-4">
                      <Icon size={16} className="text-[#1C3A64]" />
                    </div>
                    <div className="text-[#8AAECE] text-[10px] font-medium tracking-[0.12em] uppercase mb-2">
                      {d.label}
                    </div>
                    <div className="text-[#1C3A64] text-[15px] font-medium leading-[1.35]">
                      {d.value}
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Testimonials */}
          <ScrollReveal className="mb-8">
            <div className="flex items-center gap-3 justify-center">
              <div className="h-px w-8 bg-[#1C3A64]/40" />
              <span className="text-[#1C3A64] text-[11px] font-medium tracking-[0.2em] uppercase">
                From Our Clerks
              </span>
              <div className="h-px w-8 bg-[#1C3A64]/40" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ borderColor: 'rgba(28,58,100,0.4)' }}
                  className="h-full bg-white border-l-[3px] border-l-[#1C3A64] border-y border-r border-[#1C3A64]/10 rounded-r-xl p-6"
                >
                  <Quote size={16} className="text-[#1C3A64] mb-3" />
                  <p className="text-[#555555] text-[14px] italic leading-[1.65] mb-4">
                    "{t.quote}"
                  </p>
                  <div className="text-[#1C3A64] text-[13px] font-medium">{t.name}</div>
                  <div className="text-[#888888] text-[11px]">Clerk · {t.cohort}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="relative py-20 md:py-28 bg-[#1C3A64]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-px w-6 bg-[#8AAECE]" />
              <Mail size={18} className="text-[#8AAECE]" />
              <div className="h-px w-6 bg-[#8AAECE]" />
            </div>
            <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] font-medium text-white leading-[1.15] mb-5 tracking-tight">
              How to apply.
            </h2>
            <p className="text-white/80 text-sm md:text-base lg:text-lg leading-[1.7] mb-3 max-w-2xl mx-auto">
              Send your <span className="text-white font-medium">resume, cover letter</span> and <span className="text-white font-medium">academic transcript</span> directly to:
            </p>
            <a
              href="mailto:careers@bantongroup.com"
              className="inline-flex items-center gap-2 text-[#6D8FB5] hover:text-white text-lg md:text-xl font-medium transition-colors mb-10 tracking-wide"
            >
              careers@bantongroup.com
              <ArrowUpRight size={18} />
            </a>
            <div className="pt-8 border-t border-white/10 max-w-2xl mx-auto">
              <p className="text-white/60 text-[13px] leading-[1.7]">
                Sydney (HQ) · Level 12, 60 Martin Place · +61 2 8076 8090<br />
                Melbourne · Level 40, 140 William Street · +61 03 9229 3948
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
