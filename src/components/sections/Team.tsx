import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Linkedin, User } from 'lucide-react'

type Member = {
  name: string
  role: string
  specialties: string[]
  bio: string
  photo?: string
  awards?: string[]
}

const team: Member[] = [
  {
    name: 'Amanda Banton',
    role: 'Founding & Managing Partner',
    specialties: ['Class Actions', 'Securities Litigation', 'Insolvency & Commercial Litigation'],
    bio:
      'Amanda is the Managing Partner of Banton Group, established in February 2020. She brings close to 20 years of experience in the legal profession, formerly at Squire Patton Boggs and Piper Alderman — where she ran substantial litigation practices — with consulting experience from KPMG and federal government expertise.',
    photo: '/img/team/amanda-banton.jpg',
    awards: [
      'Chambers Asia-Pacific Leading Individual 2022/23/25/26',
      'Legal 500 Recommended Lawyer',
      'Law Firm Leader of the Year 2022',
    ],
  },
  {
    name: 'Elliott Smith',
    role: 'Deputy Managing Partner',
    specialties: ['Class Actions', 'Commercial Litigation', 'Insolvency & Restructuring'],
    bio:
      'Elliott joined Banton Group as a founding partner in February 2020, having previously worked at top-tier and global law firms in Australia and abroad. For more than 17 years, he has gained significant experience running complex class actions and large-scale commercial, restructuring, and insolvency disputes across Australia, the Asia Pacific, the Middle East, and Europe.',
    photo: '/img/team/elliott-smith.jpg',
    awards: [
      'Chambers & Partners Recommended 2022',
      'Legal 500 Recommended',
      'Class Actions Partner of the Year 2023 & 2024 (Finalist)',
    ],
  },
  {
    name: 'Melissa Morgan',
    role: 'Partner',
    specialties: ['Commercial Litigation', 'Insolvency', 'Class Actions'],
    bio:
      "Melissa brings extensive experience in complex commercial, corporate and insolvency litigation, representing both plaintiffs and defendants across Australia. Her practice encompasses class action proceedings, liquidator claims against former directors and auditors, breaches of the Corporations Act, and trust and fiduciary disputes.",
    photo: '/img/team/melissa-morgan.jpg',
  },
  {
    name: 'Paul Smith',
    role: 'Partner',
    specialties: ['Class Actions', 'Commercial Litigation', 'International Arbitration', 'Insolvency'],
    bio:
      'Paul brings more than 15 years of experience acting on complex, high-value commercial and financial disputes in Australia and internationally. His practice spans class actions, major commercial disputes, fraud and asset tracing, distressed funds, insolvencies, and regulatory matters. Admitted in Australia, New Zealand and the Cayman Islands.',
    photo: '/img/team/paul-smith.jpg',
    awards: ['Legal 500 Recommended — Dispute Resolution'],
  },
  {
    name: 'Jack Johnstone',
    role: 'Senior Associate',
    specialties: ['Class Actions', 'Commercial Litigation', 'International Arbitration'],
    bio:
      'Jack has extensive experience in large-scale class actions and commercial litigation, including disputes in various superior and appellate courts across Australia. His practice focuses principally on plaintiff litigation, representing group members, liquidators and commercial entities in disputes with major financial institutions, ASX-listed companies and government bodies.',
    photo: '/img/team/jack-johnstone.jpg',
  },
  {
    name: 'Robin',
    role: 'Senior Associate',
    specialties: ['Class Actions', 'Litigation'],
    bio: 'Biography and photograph pending from the firm.',
  },
]

export function Team() {
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
              The lawyers
              <br />
              <span className="italic-display text-[#6D8FB5]">behind the wins.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="lg:max-w-sm">
            <p className="text-[#555555] text-base leading-[1.6]">
              A team of accomplished litigators, united by a passion for justice and a record of extraordinary outcomes.
            </p>
          </ScrollReveal>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group relative bg-white border border-[#1C3A64]/10 rounded-2xl overflow-hidden cursor-default h-full flex flex-col"
              >
                {/* Photo or placeholder */}
                <div className="relative aspect-[4/5] bg-[#EFF4F4] overflow-hidden">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  {/* Bottom fade */}
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white via-white/60 to-transparent" />
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

                  {/* Bio */}
                  <p className="text-[#555555] text-[13px] leading-[1.6] mb-4 flex-1">{member.bio}</p>

                  {/* Awards */}
                  {member.awards && (
                    <div className="border-t border-[#1C3A64]/[0.08] pt-3 mt-auto space-y-1">
                      {member.awards.map((a) => (
                        <div key={a} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#C9A84C] mt-1.5 flex-shrink-0" />
                          <span className="text-[#8A6D1E] text-[11px] leading-snug">{a}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
