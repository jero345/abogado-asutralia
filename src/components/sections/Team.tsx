import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Linkedin } from 'lucide-react'

type Member = {
  name: string
  role: string
  specialties: string[]
  bio: string
  photo?: string
  initials: string
  color: string
  awards?: string[]
}

const team: Member[] = [
  {
    name: 'Amanda Banton',
    role: 'Founding & Managing Partner',
    specialties: ['Class Actions', 'Securities', 'Insolvency'],
    bio:
      'Amanda is the Managing Partner of Banton Group, established in February 2020. She brings close to 20 years of experience in the legal profession, formerly at Squire Patton Boggs and Piper Alderman — where she ran substantial litigation practices — with consulting experience from KPMG and federal government expertise.',
    photo: '/img/team/amanda-banton.jpg',
    initials: 'AB',
    color: '#1e3a5f',
    awards: ['Chambers Asia-Pacific 2022/23/25/26', 'Legal 500 Recommended', 'Law Firm Leader of the Year 2022'],
  },
  {
    name: 'Melissa Morgan',
    role: 'Partner',
    specialties: ['Dispute Resolution', 'Class Actions'],
    bio:
      'Melissa is a Partner specialising in dispute resolution and class actions. Full biography available on request.',
    photo: '/img/team/melissa-morgan.jpg',
    initials: 'MM',
    color: '#6b4f9e',
  },
  {
    name: 'Paul Smith',
    role: 'Partner',
    specialties: ['Dispute Resolution', 'Class Actions'],
    bio:
      'Paul is a Partner specialising in dispute resolution and class actions. Full biography available on request.',
    photo: '/img/team/paul-smith.jpg',
    initials: 'PS',
    color: '#1a6e4a',
  },
  {
    name: 'Jack Johnstone',
    role: 'Senior Associate',
    specialties: ['Class Actions', 'Commercial Litigation'],
    bio:
      'Jack is a Senior Associate working across class actions and commercial litigation matters. Full biography available on request.',
    photo: '/img/team/jack-johnstone.jpg',
    initials: 'JJ',
    color: '#8c2a3e',
  },
  {
    name: 'Matt',
    role: 'Team Member',
    specialties: ['Dispute Resolution'],
    bio: 'Full name, role, and biography pending client confirmation.',
    photo: '/img/team/matt.jpg',
    initials: 'M',
    color: '#7a4a1e',
  },
  {
    name: 'Craig',
    role: 'Team Member',
    specialties: ['Litigation'],
    bio: 'Full name, role, and biography pending client confirmation.',
    photo: '/img/team/craig.jpg',
    initials: 'C',
    color: '#1f5f7a',
  },
  {
    name: 'Brody',
    role: 'Team Member',
    specialties: ['Litigation'],
    bio: 'Full name, role, and biography pending client confirmation.',
    photo: '/img/team/brody.jpg',
    initials: 'B',
    color: '#3c5a8a',
  },
  {
    name: 'Lisa',
    role: 'Team Member',
    specialties: ['Dispute Resolution'],
    bio: 'Full name, role, and biography pending client confirmation.',
    photo: '/img/team/lisa.jpg',
    initials: 'L',
    color: '#5a4e8c',
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
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3a5f] leading-tight">
              The Lawyers
              <br />
              <span className="text-gradient-gold italic">Behind the Wins</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="lg:max-w-sm">
            <p className="text-[#1e3a5f]/60 text-base leading-relaxed">
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
                className="group relative bg-white border border-[#1e3a5f]/[0.1] rounded-2xl overflow-hidden cursor-default h-full flex flex-col"
              >
                {/* Photo or avatar header */}
                <div className="relative aspect-[4/5] bg-[#E8F0FA] overflow-hidden">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
                        style={{
                          background: `${member.color}15`,
                          border: `1px solid ${member.color}30`,
                          color: member.color,
                        }}
                      >
                        {member.initials}
                      </div>
                    </div>
                  )}
                  {/* Bottom fade */}
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white via-white/60 to-transparent" />
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-[#1e3a5f] font-semibold text-lg leading-tight">{member.name}</h3>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 border border-[#1e3a5f]/10 rounded-full flex items-center justify-center text-[#1e3a5f]/30 hover:text-[#1e3a5f]/80 hover:border-[#1e3a5f]/25 transition-colors duration-200 flex-shrink-0 ml-2"
                    >
                      <Linkedin size={13} />
                    </motion.a>
                  </div>
                  <div className="text-sm mb-3" style={{ color: member.color }}>{member.role}</div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded-full border tracking-wide"
                        style={{ color: `${member.color}cc`, borderColor: `${member.color}25`, background: `${member.color}10` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-[#1e3a5f]/70 text-xs leading-relaxed mb-4 flex-1">{member.bio}</p>

                  {/* Awards */}
                  {member.awards && (
                    <div className="border-t border-[#1e3a5f]/[0.08] pt-3 mt-auto space-y-1">
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
