import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Linkedin, User, ChevronDown } from 'lucide-react'

type AwardGroup = { category: string; items: string[] }

type Member = {
  name: string
  role: string
  specialties: string[]
  /** Short preview line — always visible. */
  bio: string
  /** Paragraphs shown when the card is expanded with "Show more". */
  extendedBio?: string[]
  photo?: string
  /** Optional CSS filter to harmonise the photo with the rest of the grid. */
  photoFilter?: string
  awards?: AwardGroup[]
}

const team: Member[] = [
  {
    name: 'Amanda Banton',
    role: 'Managing Partner',
    specialties: ['Class Actions', 'Securities Litigation', 'Insolvency & Commercial Litigation'],
    bio:
      'Amanda is the Managing Partner of Banton Group, which she established in February 2020.',
    extendedBio: [
      'With over 20 years of legal experience — formerly at Squire Patton Boggs and Piper Alderman, where she ran substantial litigation practices, and drawing on consulting experience at KPMG and within the Federal Government — she has built Banton Group into one of Australia\u2019s most formidable litigation and insolvency practices.',
      'Amanda is known for establishing cases from the ground up, her surgical strategic thinking, and her ability to execute ground-breaking matters in which new law is made and global precedent triggered. She is highly regarded by clients, litigation funders, insolvency practitioners and the Court alike.',
    ],
    photo: '/img/team/amanda-banton.jpg',
    awards: [
      {
        category: 'Chambers Asia-Pacific',
        items: ['Leading Individual \u2014 Dispute Resolution 2022, 2023, 2025 & 2026'],
      },
      {
        category: 'Asia Pacific Legal 500',
        items: [
          'Dispute Resolution: Class Actions \u2014 Band 2, 2026',
          'Restructuring & Insolvency \u2014 Band 4, 2026',
        ],
      },
    ],
  },
  {
    name: 'Elliott Smith',
    role: 'Deputy Managing Partner',
    specialties: ['Class Actions', 'Commercial Litigation', 'Insolvency & Restructuring'],
    bio:
      'Elliott joined Banton Group as a founding partner in February 2020, bringing 18 years of experience from top-tier and global firms in Australia and abroad.',
    extendedBio: [
      'Elliott has run complex class actions and large-scale commercial, restructuring and insolvency disputes across Australia, the Asia Pacific, the Middle East and Europe. Recent matters include advising a Big Four Australian bank on a significant class action and acting for KPMG as liquidators of CuDeco Limited.',
    ],
    photo: '/img/team/elliott-smith.jpg',
    awards: [
      {
        category: 'Lawyers Weekly',
        items: ['Partner of the Year \u2014 Class Actions, Finalist 2023, 2024, 2025'],
      },
      {
        category: 'Legal 500',
        items: ['Recommended Lawyer 2022', 'Rising Star 2017'],
      },
    ],
  },
  {
    name: 'Melissa Morgan',
    role: 'Partner',
    specialties: ['Commercial Litigation', 'Insolvency', 'Class Actions'],
    bio:
      'Melissa brings extensive experience in complex commercial, corporate and insolvency litigation, representing both plaintiffs and defendants across Australia.',
    extendedBio: [
      'Her practice encompasses class action proceedings, liquidator claims against former directors and auditors, breaches of the Corporations Act, and trust and fiduciary disputes. Recent matters include the Blue Sky Alternative Investments class action and the MDBA Developments litigation.',
    ],
    photo: '/img/team/melissa-morgan.jpg',
    awards: [
      {
        category: 'Legal 500 Asia-Pacific',
        items: ['Recommended Lawyer 2026', 'Recommended Lawyer 2022'],
      },
      {
        category: 'Lawyers Weekly',
        items: ['Partner of the Year \u2014 Class Actions, Finalist 2023, 2024, 2025, 2026'],
      },
      {
        category: 'Best Lawyers',
        items: ['Ones to Watch 2026, 2027'],
      },
    ],
  },
  {
    name: 'Paul Smith',
    role: 'Partner',
    specialties: ['Class Actions', 'Commercial Litigation', 'International Arbitration', 'Insolvency'],
    bio:
      'Paul brings more than 15 years of experience acting on complex, high-value commercial and financial disputes in Australia and internationally.',
    extendedBio: [
      'His practice spans class actions, major commercial disputes, fraud and asset tracing, distressed funds, insolvencies and regulatory matters \u2014 including landmark class actions concerning synthetic collateralised debt obligations. Admitted in Australia, New Zealand and the Cayman Islands, Paul regularly acts on multi-jurisdictional disputes involving novel points of law.',
    ],
    photo: '/img/team/paul-smith.jpg',
    awards: [
      {
        category: 'Legal 500',
        items: ['Recommended Lawyer \u2014 Dispute Resolution'],
      },
    ],
  },
  {
    name: 'Jack Johnstone',
    role: 'Senior Associate',
    specialties: ['Class Actions', 'Commercial Litigation', 'International Arbitration'],
    bio:
      'Jack has extensive experience in large-scale class actions and commercial litigation across superior and appellate courts in Australia.',
    extendedBio: [
      'Before joining Banton Group, Jack practised at Fried Frank in London and worked in-house at Macquarie Group, gaining cross-border experience across financial products, regulatory investigations and complex commercial disputes. His practice focuses principally on plaintiff litigation, acting for group members, liquidators and commercial entities in disputes with major financial institutions, ASX-listed companies and government bodies.',
    ],
    photo: '/img/team/jack-johnstone.jpg',
    awards: [
      {
        category: 'Chambers Asia-Pacific',
        items: ['Associate to Watch 2026'],
      },
    ],
  },
  {
    name: 'Sabin Thomas',
    role: 'Senior Associate',
    specialties: ['Commercial Disputes', 'International Arbitration', 'Insolvency'],
    bio:
      'Sabin is a commercial disputes lawyer with extensive experience in high-value litigation and international arbitration.',
    extendedBio: [
      'She has represented corporate and international clients in complex, multi-jurisdictional matters, including construction, insolvency and enforcement proceedings. Having practised at leading Malaysian firms, Sabin has worked on significant cross-border disputes involving novel legal issues and coordinated with counsel across multiple jurisdictions.',
    ],
    photo: '/img/team/sabin-thomas.jpg',
    photoFilter: 'contrast(1.2) brightness(0.80) saturate(0.85)',
  },
]

export function Team() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggle = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <section id="team" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <ScrollReveal>
            <span className="section-label mb-4 block">
              <span className="w-5 h-px bg-[#1e3a5f]" />
              Our Team
            </span>
            <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight">
              Expert Litigators,
              <br />
              <span className="italic-display text-[#6D8FB5]">relentless in pursuit of results.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="lg:max-w-sm">
            <p className="text-[#555555] text-base leading-[1.6]">
              Leading litigators, aligned in purpose — delivering results where it matters most.
            </p>
          </ScrollReveal>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {team.map((member, i) => {
            const isOpen = expanded.has(member.name)
            const hasMore = !!(member.extendedBio && member.extendedBio.length > 0)
            return (
              <ScrollReveal key={member.name} delay={i * 0.08}>
                <motion.div
                  layout
                  className="group relative bg-white border border-[#1C3A64]/10 rounded-2xl overflow-hidden cursor-default h-full flex flex-col"
                >
                  {/* Photo or placeholder */}
                  <div className="relative aspect-[2/3] bg-[#EFF4F4] overflow-hidden">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        style={member.photoFilter ? { filter: member.photoFilter } : undefined}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                        <div className="w-20 h-20 rounded-full bg-[#1C3A64]/5 border border-[#1C3A64]/15 flex items-center justify-center">
                          <User size={30} className="text-[#1C3A64]/30" strokeWidth={1.3} />
                        </div>
                        <span className="text-[#1C3A64]/40 text-[10px] tracking-[0.15em] uppercase">
                          Photograph pending
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-[#1C3A64] font-medium text-[18px] md:text-[20px] leading-[1.2]">
                        {member.name}
                      </h3>
                      <motion.a
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 border border-[#1C3A64]/10 rounded-full flex items-center justify-center text-[#1C3A64]/30 hover:text-[#1C3A64]/80 hover:border-[#1C3A64]/25 transition-colors duration-200 flex-shrink-0 ml-2"
                      >
                        <Linkedin size={13} />
                      </motion.a>
                    </div>
                    <div className="text-[#1C3A64] text-[13px] font-medium mb-3">{member.role}</div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.specialties.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] px-2 py-0.5 rounded-full border border-[#1C3A64]/20 text-[#1C3A64]/80 bg-[#1C3A64]/[0.04] tracking-wide"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Bio (short) */}
                    <p className="text-[#555555] text-[15px] leading-[1.7] mb-3">{member.bio}</p>

                    {/* Extended bio — collapsible */}
                    <AnimatePresence initial={false}>
                      {isOpen && member.extendedBio && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 mb-3">
                            {member.extendedBio.map((p, k) => (
                              <p key={k} className="text-[#555555] text-[14px] leading-[1.7]">
                                {p}
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Show more toggle */}
                    {hasMore && (
                      <button
                        onClick={() => toggle(member.name)}
                        className="self-start inline-flex items-center gap-1.5 text-[#1C3A64] text-[12.5px] font-medium mb-4 hover:underline"
                      >
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="inline-flex"
                        >
                          <ChevronDown size={14} />
                        </motion.span>
                        {isOpen ? 'Show less' : 'Show more'}
                      </button>
                    )}

                    {/* Awards */}
                    {member.awards && member.awards.length > 0 && (
                      <div className="border-t border-[#1C3A64]/[0.08] pt-4 mt-auto space-y-3">
                        {member.awards.map((group) => (
                          <div key={group.category}>
                            <div className="text-[#1C3A64] text-[11px] font-semibold tracking-wide mb-1.5">
                              {group.category}
                            </div>
                            <ul className="space-y-1">
                              {group.items.map((a) => (
                                <li key={a} className="flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-[#C9A84C] mt-1.5 flex-shrink-0" />
                                  <span className="text-[#8A6D1E] text-[11px] leading-snug">{a}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
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
