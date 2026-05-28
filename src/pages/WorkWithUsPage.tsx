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
        title="Working with us."
        italicTitle="Progress on merit."
        subtitle="Work on some of Australia's most significant and complex disputes, alongside lawyers recognised for their strategic insight and technical excellence."
        breadcrumbs={[{ label: 'Work With Us' }]}
        backgroundImage="/img/hero-bg/work-with-us.jpg"
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
                  Our Summer Clerkship Program lets ambitious law students experience working in one of Sydney's leading disputes teams on some of Australia's largest and most complex litigations. The flat structure of our Firm means that you will get direct, real, exposure to senior lawyers from the first day of your clerkship.
                </p>

                <h3 className="text-[#1C3A64] text-[18px] md:text-[20px] font-medium pt-3">
                  The Clerkship
                </h3>
                <p>
                  Banton Group offers two intakes of clerks each year, one in December and one in February. Each clerkship intake runs for four weeks.
                </p>
                <p>
                  Because our team works together as one large practice, there are no rotations. Instead, you will generally receive work from all Partners (and their teams) in the Firm over the course of the clerkship. You will have a lawyer buddy, and a senior lawyer mentor, to guide you through your clerkship and ensure that you are fully supported.
                </p>
                <p>
                  Our clerkship offers a genuine insight into what it's like to work at Banton Group as a Graduate and Associate, and many of our clerks have gone on to successfully obtain those roles in the Firm. The focus is on real learning on real work for our varied and complex matters, but there are also chances for socialising with the team outside of the office context at Firm events.
                </p>

                <h3 className="text-[#1C3A64] text-[18px] md:text-[20px] font-medium pt-3">
                  Process for applying
                </h3>
                <p>
                  To apply for our Summer Clerkship Program, please send your cover letter, CV and academic transcript to{' '}
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
                We offer graduate lawyers the opportunity to be involved in a dynamic legal practice working on high-profile and complex litigation and insolvency matters from the outset of their careers. Working with us, you will be guided by technical experts and committed legal professionals, gaining hands-on experience across a broad range of matters.
              </p>
              <p>
                Our flat structure means you will have direct exposure to senior lawyers early on, with meaningful responsibility and involvement in real work from day one. We have removed the hierarchical and traditional constraints that can restrict development in larger firms and instead foster a fluid, flexible, and merit-based environment.
              </p>
              <p>
                Outstanding lawyers are recognised and progress quickly based on performance and initiative. Rather than a fixed-term “program”, our approach is to integrate graduates into the Firm as valued members of the team. You will work across all Partners and practice areas, supported by a lawyer buddy and senior mentor to help guide your development and ensure you are fully supported.
              </p>
              <p>
                This is an exciting opportunity for motivated, ambitious and responsible graduates to develop their professional knowledge and skills while contributing to a market-leading firm offering a multidisciplinary approach to complex legal problems.
              </p>
              <p>
                Many of our Summer Clerks go on to join us as graduates, reflecting our focus on long-term development and investment in our people.
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
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
