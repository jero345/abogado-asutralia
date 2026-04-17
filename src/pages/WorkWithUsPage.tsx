import { motion } from 'framer-motion'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowUpRight, Calendar, GraduationCap, Users, Mail } from 'lucide-react'

const clerkshipDetails = [
  { icon: Calendar, label: 'Two intakes yearly', value: 'December & February' },
  { icon: Calendar, label: 'Duration', value: 'Four weeks each intake' },
  { icon: Users, label: 'Exposure', value: "One of Sydney's leading disputes teams" },
  { icon: GraduationCap, label: 'Pathway', value: 'Many clerks go on to join us as graduates' },
]

export function WorkWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Working with us."
        italicTitle="Progress on merit."
        subtitle="Work on some of Australia's most significant and complex disputes, alongside lawyers recognised for their strategic insight and technical excellence."
        breadcrumbs={[{ label: 'Work With Us' }]}
        backgroundImage="/img/building-exterior.jpg"
      />

      {/* Intro block */}
      <section className="relative py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <span className="section-label mb-5 block">
              <span className="w-5 h-px bg-[#1C3A64]" />
              Our Approach
            </span>
            <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight mb-8">
              Meaningful responsibility
              <br />
              <span className="italic-display text-[#6D8FB5]">from the outset.</span>
            </h2>
            <div className="space-y-5 text-[#555555] leading-[1.75] text-[15px] md:text-[16px]">
              <p>
                At Banton Group, you will work on some of Australia's most significant and complex disputes, alongside lawyers recognised for their strategic insight and technical excellence.
              </p>
              <p>
                From the outset, you will be entrusted with meaningful responsibility and exposed to the full lifecycle of high-stakes litigation and insolvency matters — from strategy and pleadings through to evidence, advocacy and resolution.
              </p>
              <p>
                Our structure is deliberately flat. You will work closely with Partners and senior lawyers, gaining direct insight into strategy, advocacy and client decision-making without the filters of a conventional hierarchy.
              </p>
              <p>
                We are deeply committed to excellence — both in the work we deliver and in the way we develop our people. Banton Group is a place for lawyers who are ambitious, commercially astute and motivated to operate at the highest level.
              </p>
              <p>
                Progression is merit-based and reflective of contribution. Those who demonstrate capability and commitment will find opportunity without artificial constraint.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Summer Clerkship */}
      <section className="relative py-20 md:py-28 bg-[#EFF4F4]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="mb-14">
            <span className="section-label mb-4 block">
              <span className="w-5 h-px bg-[#1C3A64]" />
              Summer Clerkship Program
            </span>
            <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight mb-6 max-w-3xl">
              Real work, senior exposure,
              <br />
              <span className="italic-display text-[#6D8FB5]">from day one.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="mb-10">
            <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-7 md:p-9">
              <div className="space-y-5 text-[#555555] text-[15px] md:text-[16px] leading-[1.75] max-w-3xl">
                <p>
                  Our Summer Clerkship Program lets ambitious law students experience working in one of Sydney's leading disputes teams on some of Australia's largest and most complex litigations.
                </p>
                <p>
                  Banton Group offers two intakes per year — December and February — each running for four weeks.
                </p>
                <p>
                  Clerks are genuinely integrated into teams. You will sit in on strategy meetings, draft submissions, attend Court and work side-by-side with the lawyers running the matter, rather than from the sidelines.
                </p>
                <p>
                  Many of our Summer Clerks go on to join us as graduates.
                </p>
                <p>
                  To apply, send your cover letter, CV and academic transcript to{' '}
                  <a href="mailto:careers@bantongroup.com" className="text-[#1C3A64] underline hover:opacity-75">
                    careers@bantongroup.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <div className="text-[#1C3A64] text-[14px] md:text-[15px] font-medium leading-[1.4]">
                      {d.value}
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Graduate Opportunities */}
      <section className="relative py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <span className="section-label mb-5 block">
              <span className="w-5 h-px bg-[#1C3A64]" />
              Graduate Opportunities
            </span>
            <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight mb-8">
              High-profile work,
              <br />
              <span className="italic-display text-[#6D8FB5]">from the first day of your career.</span>
            </h2>
            <div className="space-y-5 text-[#555555] leading-[1.75] text-[15px] md:text-[16px]">
              <p>
                We offer graduate lawyers the opportunity to work on high-profile and complex litigation and insolvency matters from the outset of their careers.
              </p>
              <p>
                Our flat, non-hierarchical structure means direct exposure to Partners and senior lawyers early on, with meaningful responsibility from day one.
              </p>
              <p>
                We invest in our graduates — pairing technical training with genuine integration into the matters driving the firm. You will quickly find yourself on the record, in Court and in client meetings on work that matters.
              </p>
              <p>
                Progression is determined on merit alone. Those who demonstrate capability will advance without artificial limits.
              </p>
              <p>
                Many of our Summer Clerks go on to join us as graduates.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="relative py-20 md:py-24 bg-[#1C3A64]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-px w-6 bg-[#8AAECE]" />
              <Mail size={18} className="text-[#8AAECE]" />
              <div className="h-px w-6 bg-[#8AAECE]" />
            </div>
            <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] font-medium text-white leading-[1.15] mb-5 tracking-tight">
              Are you ready to <span className="italic-display text-white font-semibold">join our team?</span>
            </h2>
            <p className="text-white/90 text-sm md:text-base lg:text-lg leading-[1.7] mb-8 max-w-2xl mx-auto">
              Send your resume, cover letter and academic transcript directly to our careers inbox.
            </p>
            <a
              href="mailto:careers@bantongroup.com"
              className="inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-white text-[#1C3A64] text-[13px] font-medium rounded-full hover:bg-[#EFF4F4] transition-colors tracking-[0.02em] shadow-lg"
            >
              careers@bantongroup.com
              <ArrowUpRight size={14} />
            </a>
            <div className="mt-12 pt-8 border-t border-white/10 max-w-2xl mx-auto">
              <p className="text-white/60 text-[13px] leading-[1.7]">
                Sydney (HQ) · Level 12/60 Martin Place · +61 2 8076 8090<br />
                Melbourne · Level 4/40 William Street · +61 2 8076 8090
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
