import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Linkedin, ArrowUpRight } from 'lucide-react'

const team = [
  {
    name: 'Amanda Banton',
    role: 'Founding & Managing Partner',
    specialties: ['Class Actions', 'Securities Litigation'],
    bio: 'Amanda is one of Australia\'s leading class action lawyers with over 25 years of experience. She has led landmark cases recovering hundreds of millions for Australian consumers and investors.',
    education: 'LLB (Hons) University of Melbourne',
    admitted: '1998 — Victoria, NSW, Federal',
    initials: 'AB',
    color: '#1e3a5f',
  },
  {
    name: 'Sarah Whitmore',
    role: 'Senior Partner',
    specialties: ['Commercial Litigation', 'Corporate Disputes'],
    bio: 'Sarah brings two decades of commercial litigation expertise, representing leading ASX-listed companies, private equity firms, and high-net-worth individuals in complex disputes.',
    education: 'LLB (Hons) University of Sydney',
    admitted: '2001 — NSW, Victoria',
    initials: 'SW',
    color: '#2a6496',
  },
  {
    name: 'James Rafferty',
    role: 'Partner',
    specialties: ['Insolvency & Restructuring', 'Financial Disputes'],
    bio: 'James is recognised as a leading insolvency and restructuring practitioner. His experience spans voluntary administrations, liquidations, and complex creditor negotiations.',
    education: 'LLB/BCom University of Queensland',
    admitted: '2003 — Queensland, NSW, Victoria',
    initials: 'JR',
    color: '#6b4f9e',
  },
  {
    name: 'Lisa Chen',
    role: 'Partner',
    specialties: ['Securities Litigation', 'ASIC Proceedings'],
    bio: 'Lisa specialises in securities class actions and ASIC-related proceedings. She has appeared in over 40 significant securities cases and led the team in multiple landmark settlements.',
    education: 'LLB (Hons) Monash University',
    admitted: '2005 — Victoria, Federal',
    initials: 'LC',
    color: '#1a6e4a',
  },
  {
    name: 'Thomas Nguyen',
    role: 'Special Counsel',
    specialties: ['Consumer Law', 'Privacy & Data'],
    bio: 'Thomas is a consumer law specialist with deep expertise in privacy law, data breach litigation, and consumer protection class actions. He is the lead partner on Banton Group\'s privacy practice.',
    education: 'LLB/BA University of Melbourne',
    admitted: '2008 — Victoria, NSW',
    initials: 'TN',
    color: '#8c2a3e',
  },
  {
    name: 'Rebecca Moore',
    role: 'Senior Associate',
    specialties: ['Class Actions', 'Litigation Funding'],
    bio: 'Rebecca\'s expertise in litigation funding structures and class action case management makes her an invaluable asset on complex multi-party matters. She works closely with major litigation funders.',
    education: 'LLB (Hons) University of NSW',
    admitted: '2012 — NSW, Victoria',
    initials: 'RM',
    color: '#7a4a1e',
  },
]

export function Team() {
  return (
    <section id="team" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#f8f9fa] to-[#ffffff]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <ScrollReveal>
            <span className="section-label mb-4 block">
              <span className="w-5 h-px bg-[#1e3a5f]" />
              Our Team
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3a5f] leading-tight">
              The Lawyers
              <br />
              <span className="text-gradient-gold italic">Behind the Wins</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="lg:max-w-xs">
            <p className="text-[#1e3a5f]/40 text-base leading-relaxed">
              A team of Australia's most accomplished litigators, united by a passion for justice and a record of extraordinary outcomes.
            </p>
          </ScrollReveal>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group relative bg-[#1e3a5f]/[0.025] border border-[#1e3a5f]/[0.06] rounded-2xl p-6 overflow-hidden cursor-default"
              >
                {/* Hover background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 30% 0%, ${member.color}08 0%, transparent 60%)` }}
                />

                <div className="relative z-10">
                  {/* Avatar */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold"
                      style={{
                        background: `${member.color}15`,
                        border: `1px solid ${member.color}30`,
                        color: member.color,
                      }}
                    >
                      {member.initials}
                    </div>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 border border-[#1e3a5f]/10 rounded-full flex items-center justify-center text-[#1e3a5f]/30 hover:text-[#1e3a5f]/60 hover:border-[#1e3a5f]/25 transition-colors duration-200"
                    >
                      <Linkedin size={13} />
                    </motion.a>
                  </div>

                  {/* Name & role */}
                  <h3 className="text-[#1e3a5f] font-semibold text-lg leading-tight mb-1">{member.name}</h3>
                  <div className="text-sm mb-1" style={{ color: member.color }}>{member.role}</div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={{ color: `${member.color}cc`, borderColor: `${member.color}20`, background: `${member.color}08` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-[#1e3a5f]/50 text-xs leading-relaxed mb-4">{member.bio}</p>

                  {/* Divider */}
                  <div className="border-t border-[#1e3a5f]/[0.05] pt-4">
                    <div className="text-[#1e3a5f]/40 text-xs">{member.admitted}</div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3} className="mt-12 text-center">
          <p className="text-[#1e3a5f]/30 text-sm mb-4">Interested in joining Australia's premier litigation practice?</p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-[#1e3a5f] text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            Explore Opportunities <ArrowUpRight size={15} />
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  )
}
