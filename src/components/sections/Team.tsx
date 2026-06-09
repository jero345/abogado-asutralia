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
    specialties: ['Class Actions', 'Securities Litigation', 'Insolvency', 'Commercial Litigation'],
    bio:
      'Amanda Banton is the Managing Partner of Banton Group, established in February 2020. She brings more than 20 years\u2019 experience in the legal profession, including senior roles at Squire Patton Boggs and Piper Alderman, where she led substantial litigation practices, as well as consulting experience with KPMG and within the Federal Government. Her practice spans complex insolvency, regulatory, corporate and commercial disputes, including securities class actions, with particular expertise in matters involving corporations law, ASIC regulation, competition and consumer law, and fiduciary obligations. Amanda is recognised for developing large scale litigation in the absence of complete documentation or witnesses. Under her leadership, Banton Group has secured a series of landmark outcomes, including multiple High Court victories and significant recoveries in complex proceedings. She is known for her strategic judgement, rigorous attention to detail, and her ability to manage the interests of all stakeholders while advancing high stakes litigation with precision and discipline.',
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
      'Elliott Smith is the Deputy Managing Partner of Banton Group. He brings more than 18 years’ experience in complex commercial litigation, class actions, restructuring and insolvency disputes, and international arbitration across Australia, Asia, the Middle East and Europe. His practice spans plaintiff and defendant litigation, with particular expertise in securities class actions, misleading and deceptive conduct claims, Corporations Act disputes, cross-border trade disputes and multi-jurisdictional arbitration.',
    extendedBio: [
      'Elliott has spent significant time in-house at both a Big Four bank and a Big Four accounting firm, giving him a strong understanding of the commercial pressures and strategic imperatives facing major institutional and private clients. He acts for clients including banks, insolvency practitioners, directors, auditors and private equity firms.',
      'Elliott currently leads a number of significant securities class actions and recovery proceedings arising from major Australian insolvencies. His recent work includes leading the CuDeco shareholder class action, including the court-approved settlement with KPMG, playing a central role in the Arrium High Court proceedings, and acting in substantial recovery litigation against the Commonwealth.',
      'He is recognised for his technical expertise, commercial judgement and ability to manage complex litigation efficiently and strategically. Elliott regularly speaks at conferences and industry seminars, and his recognitions include being listed as a Rising Star in Asia Pacific Legal 500. The Asia Pacific Legal 500 Guide notes that “Elliott Smith has a top-notch working knowledge of his areas of specialty, together with excellent organisational skills.”',
    ],
    photo: '/img/team/elliott-smith.jpg',
    awards: [
      {
        category: 'Lawyers Weekly',
        items: ['Class Actions Partner of the Year \u2013 Finalist 2023, 2024, 2025 and 2026'],
      },
      {
        category: 'Asia Pacific Legal 500',
        items: ['Recommended Lawyer 2022', 'Rising Star 2017'],
      },
    ],
  },
  {
    name: 'Melissa Morgan',
    role: 'Partner',
    specialties: ['Commercial Litigation', 'Insolvency', 'Class Actions'],
    bio:
      'Melissa has extensive experience in commercial, corporate and insolvency litigation matters. She is a highly strategic thinker and results-focused practitioner who regularly acts on large, complex class actions and other significant dispute and investigative matters.',
    extendedBio: [
      'Melissa\u2019s practice encompasses class actions (including shareholder class actions), prosecuting matters on behalf of large national corporates and high net worth individuals in a range of corporate litigation \u2013 including breaches of trust, fiduciary duties, directors\u2019 duties and the Corporations Act \u2013 as well as trust, equity, banking and finance, insolvency, property and consumer and competition related disputes. She has an in-depth knowledge of the legal system and her experience includes advising and litigating against the Commonwealth of Australia, major auditors and banking institutions.',
      'Melissa has been a finalist in the Lawyers Weekly Awards for Class Actions Partner of the Year every year since 2023, as well as being recognised in Asia Pacific Legal 500 and Best Lawyers \u2013 a distinction that reflects her consistent standing among leading class action practitioners in Australia.',
    ],
    photo: '/img/team/melissa-morgan.jpg',
    awards: [
      {
        category: 'Lawyers Weekly',
        items: ['Class Actions Partner of the Year \u2013 Finalist 2023, 2024, 2025 and 2026'],
      },
      {
        category: 'Asia Pacific Legal 500',
        items: ['Recommended Lawyer 2022'],
      },
      {
        category: 'Best Lawyers',
        items: ['Ones to Watch 2026 and 2027'],
      },
    ],
  },
  {
    name: 'Paul Smith',
    role: 'Partner',
    specialties: ['Class Actions', 'Commercial Litigation', 'International Arbitration', 'Insolvency'],
    bio:
      'Paul brings more than 15 years of experience acting on complex, high-value commercial and financial disputes in Australia and internationally. His practice spans class actions, major commercial disputes, fraud and asset tracing, distressed funds, insolvencies and regulatory matters \u2014 including landmark class actions concerning synthetic collateralised debt obligations. Admitted in Australia, New Zealand and the Cayman Islands, Paul regularly acts on multi-jurisdictional disputes involving novel points of law.',
    photo: '/img/team/paul-smith.jpg',
    awards: [
      {
        category: 'Legal 500',
        items: ['Recommended Lawyer \u2014 Dispute Resolution'],
      },
    ],
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
        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
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
                  <div className="relative aspect-[2/3] w-full max-w-[340px] mx-auto mt-6 rounded-xl bg-[#EFF4F4] overflow-hidden">
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
