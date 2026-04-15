import { motion } from 'framer-motion'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowUpRight, Calendar, Users, UserCheck, Quote, Mail, CheckCircle2 } from 'lucide-react'

const clerkshipDetails = [
  { icon: Calendar, label: 'Two intakes yearly', value: 'December & February' },
  { icon: Calendar, label: 'Duration', value: 'Four weeks each intake' },
  { icon: Users, label: 'Work allocation', value: 'No rotations — matters from all partners' },
  { icon: UserCheck, label: 'Support', value: 'Lawyer buddy + senior lawyer mentor' },
]

const testimonials = [
  {
    quote:
      'Clerking at Banton Group was an incredibly rewarding experience that offered firsthand exposure to complex commercial litigation. I attended the trial in the Kupang proceedings, observed a case management hearing in the Blue-Sky class action, and attended a meeting with counsel at Banco Chambers. Beyond the legal work, the clerkship also featured enjoyable social events that made it easy to connect with the team and feel part of the firm\u2019s culture. The firm\u2019s collaborative environment and the opportunity to engage in meaningful work has provided a valuable and memorable insight into litigation.',
    name: 'Kevin Cloke',
    role: 'Graduate',
    cohort: 'Summer Clerk 2024 / 2025',
  },
  {
    quote:
      'My clerkship at Banton Group offered a unique experience, working on high-profile matters amongst a skilled and professional team of lawyers. This was a fantastic opportunity which provided me with real-world experience, enhanced my understanding of civil litigation and offered strategic insights into legal practice.',
    name: 'Henry Kinsey',
    role: 'Associate',
    cohort: 'Summer Clerk 2022 / 23',
  },
  {
    quote:
      'As a clerk at Banton Group, I had an enriching professional experience and worked closely with Sydney\u2019s leading senior litigation lawyers. I gained valuable insights into cutting edge class actions and performed vital tasks. The supportive culture and challenging assignments made it an excellent learning environment.',
    name: 'Lyndon Arundell',
    role: 'Associate',
    cohort: 'Summer Clerk 2022 / 23',
  },
]

const cultureBullets = [
  'Dynamic legal practice — high-profile, complex litigation and insolvency matters',
  'Guided by technical experts and committed legal professionals',
  'Fluid, flexible, merit-based — not a traditional hierarchy',
  'Outstanding lawyers progress rapidly',
  'Multidisciplinary approach to legal problems',
]

export function WorkWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Working with us."
        italicTitle="Progress on merit."
        subtitle="Dynamic legal practice focused on Australia's largest complex litigation and insolvency matters. Guided by technical experts and committed legal professionals."
        breadcrumbs={[{ label: 'Work With Us' }]}
        backgroundImage="/img/hero-bg/work-with-us.jpg"
      />

      {/* Intro / culture */}
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
              <div className="space-y-5 text-[#555555] leading-[1.7] text-[15px]">
                <p>
                  We offer the opportunity to be involved in a dynamic legal practice working on high-profile and complex litigation and insolvency matters. Working with us you will be guided by technical experts and committed legal professionals.
                </p>
                <p>
                  We have removed the hierarchical and more traditional constraints that restrict development and growth in larger firms and replaced them with a fluid and flexible merit-based program. Outstanding lawyers will progress rapidly.
                </p>
                <p>
                  This is an exciting opportunity for motivated, ambitious and responsible lawyers to develop their professional knowledge and skills whilst working at a market-leading firm offering a multidisciplinary approach to legal problems.
                </p>
                <p className="text-[#1C3A64] font-medium">Are you ready to join our dynamic team?</p>
                <p>
                  We prefer to hear from you directly. Please submit your resume and transcript via email to{' '}
                  <a href="mailto:careers@bantongroup.com" className="text-[#1C3A64] underline hover:opacity-75 transition-opacity">
                    careers@bantongroup.com
                  </a>
                  .
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

      {/* Summer Clerkship */}
      <section className="relative py-20 md:py-28 bg-[#EFF4F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="mb-14">
            <span className="section-label mb-4 block">
              <span className="w-5 h-px bg-[#1C3A64]" />
              Summer Clerkship Program
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight max-w-3xl">
                Real work, senior exposure,
                <br />
                <span className="italic-display text-[#6D8FB5]">from day one.</span>
              </h2>
              <p className="text-[#555555] text-[15px] leading-[1.7] lg:max-w-md">
                Our Summer Clerkship Program lets ambitious law students experience working in one of Sydney's leading disputes teams on some of Australia's largest and most complex litigations.
              </p>
            </div>
          </ScrollReveal>

          {/* The Clerkship */}
          <ScrollReveal delay={0.1} className="mb-10">
            <div className="bg-white border border-[#1C3A64]/10 rounded-2xl p-7 md:p-9">
              <h3 className="text-[#1C3A64] font-medium text-[20px] mb-4">The Clerkship</h3>
              <div className="space-y-4 text-[#555555] text-[14px] md:text-[15px] leading-[1.7] max-w-3xl">
                <p>
                  Banton Group offers two intakes of clerks each year, one in December and one in February. Each clerkship intake runs for four weeks.
                </p>
                <p>
                  Because our team works together as one large practice, there are no rotations. Instead, you will generally receive work from all Partners (and their teams) in the Firm over the course of the clerkship. You will have a lawyer buddy, and a senior lawyer mentor, to guide you through your clerkship and ensure that you are fully supported.
                </p>
                <p>
                  Our clerkship offers a genuine insight into what it's like to work at Banton Group as a Graduate and Associate, and many of our clerks have gone on to successfully obtain those roles in the Firm. The focus is on real learning on real work for our varied and complex matters, but there are also chances for socialising with the team outside of the office context at Firm events.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Program details — quick facts */}
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
                    <div className="text-[#1C3A64] text-[14px] md:text-[15px] font-medium leading-[1.4]">
                      {d.value}
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Process */}
          <ScrollReveal delay={0.15} className="mb-14">
            <div className="bg-[#1C3A64] rounded-2xl p-7 md:p-8 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h3 className="text-white font-medium text-[18px] mb-2">Process for applying</h3>
                <p className="text-white/75 text-[14px] leading-[1.65]">
                  Send your cover letter, CV and academic transcript to our careers inbox.
                </p>
              </div>
              <a
                href="mailto:careers@bantongroup.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1C3A64] text-[13px] font-medium rounded-full hover:bg-[#EFF4F4] transition-colors tracking-[0.02em] flex-shrink-0"
              >
                careers@bantongroup.com
                <ArrowUpRight size={14} />
              </a>
            </div>
          </ScrollReveal>

          {/* Testimonials */}
          <ScrollReveal className="mb-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#1C3A64]/40" />
              <span className="text-[#1C3A64] text-[11px] font-medium tracking-[0.2em] uppercase">
                Testimonials
              </span>
              <div className="h-px w-8 bg-[#1C3A64]/40" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ borderColor: 'rgba(28,58,100,0.4)' }}
                  className="h-full bg-white border-l-[3px] border-l-[#1C3A64] border-y border-r border-[#1C3A64]/10 rounded-r-xl p-6 flex flex-col"
                >
                  <Quote size={16} className="text-[#1C3A64] mb-3" />
                  <p className="text-[#555555] text-[13px] md:text-[14px] italic leading-[1.65] mb-5 flex-1">
                    "{t.quote}"
                  </p>
                  <div className="border-t border-[#1C3A64]/10 pt-3">
                    <div className="text-[#1C3A64] text-[13px] font-medium">{t.name}</div>
                    <div className="text-[#888888] text-[11px]">{t.role} · {t.cohort}</div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative py-20 md:py-24 bg-[#1C3A64]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-px w-6 bg-[#8AAECE]" />
              <Mail size={18} className="text-[#8AAECE]" />
              <div className="h-px w-6 bg-[#8AAECE]" />
            </div>
            <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] font-medium text-white leading-[1.15] mb-5 tracking-tight">
              Are you ready to <span className="italic-display text-[#6D8FB5]">join our team?</span>
            </h2>
            <p className="text-white/80 text-sm md:text-base lg:text-lg leading-[1.7] mb-8 max-w-2xl mx-auto">
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
