import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Scale } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { profiles } from '@/data/profiles'
import { NotFoundPage } from '@/pages/NotFoundPage'

/** A row of label/value with a bottom divider — used for admissions, quals, practice areas. */
function DividerRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-3.5 border-b border-[#1C3A64]/10 text-[#555555] text-[14px] md:text-[15px] leading-[1.55]">
      {children}
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[#1C3A64] text-[20px] md:text-[24px] font-medium tracking-tight mb-6">
      {children}
    </h2>
  )
}

export function ProfilePage({ slug }: { slug: string }) {
  const profile = profiles[slug]

  // Hidden page: keep it out of search indexes and set a per-person <title>.
  useEffect(() => {
    if (!profile) return
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = `${profile.name} — Banton Group`
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [profile])

  if (!profile) return <NotFoundPage />

  return (
    <div className="bg-white">
      {/* ── Hero: full-bleed portrait with name overlaid ─────────────────── */}
      <section className="relative h-[86vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={profile.heroPhoto}
          alt={profile.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Dark gradients: bottom for the name, top for the white header nav */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-end pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center rounded-full border border-white/40 text-white/90 text-[11px] tracking-[0.2em] uppercase px-4 py-1.5 mb-5">
              {profile.role}
            </span>
            <h1 className="text-white text-[44px] sm:text-6xl lg:text-[80px] font-medium leading-[0.95] tracking-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
              {profile.name}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Overview / Contact / Recent cases ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-[260px_minmax(0,1fr)_300px] gap-10 lg:gap-14 items-start">
          {/* Left — contact */}
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading>Contact</SectionHeading>
              <div className="space-y-0">
                {profile.contact.phone && (
                  <a
                    href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 py-3.5 border-b border-[#1C3A64]/10 text-[#555555] text-[14px] hover:text-[#1C3A64] transition-colors"
                  >
                    <Phone size={14} className="text-[#6D8FB5] flex-shrink-0" />
                    <span>
                      {profile.contact.phone}
                      {profile.contact.phoneLabel && (
                        <span className="text-[#8AAECE] text-[11px] ml-1.5">· {profile.contact.phoneLabel}</span>
                      )}
                    </span>
                  </a>
                )}
                {profile.contact.email && (
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="flex items-center gap-3 py-3.5 border-b border-[#1C3A64]/10 text-[#555555] text-[14px] hover:text-[#1C3A64] transition-colors break-all"
                  >
                    <Mail size={14} className="text-[#6D8FB5] flex-shrink-0" />
                    {profile.contact.email}
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Middle — overview */}
          <ScrollReveal delay={0.05}>
            <div>
              <SectionHeading>Overview</SectionHeading>
              <div className="space-y-5 text-[#555555] leading-[1.8] text-[15px] md:text-[16px]">
                {profile.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — recent cases */}
          {profile.recentCases.length > 0 && (
            <ScrollReveal delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <SectionHeading>Recent Cases</SectionHeading>
                <ul className="space-y-5">
                  {profile.recentCases.map((c, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-9 h-9 rounded-lg bg-[#EFF4F4] border border-[#1C3A64]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Scale size={15} className="text-[#1C3A64]/50" />
                      </span>
                      <span>
                        <span className="block text-[#1C3A64] text-[13.5px] font-medium leading-[1.4] italic">
                          {c.title}
                        </span>
                        {c.citation && (
                          <span className="block text-[#888888] text-[12px] leading-[1.4] mt-0.5">{c.citation}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ── Recognition badge strip ──────────────────────────────────────── */}
      {profile.awardBadges && profile.awardBadges.length > 0 && (
        <section className="bg-[#EFF4F4] border-y border-[#1C3A64]/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-12">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {profile.awardBadges.map((src) => (
                <img key={src} src={src} alt="" className="h-20 md:h-28 w-auto object-contain" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Perspective / Admissions & Qualifications / Practice areas ────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 items-start">
          {/* Perspective */}
          {profile.perspective && (
            <ScrollReveal>
              <div>
                <SectionHeading>Perspective</SectionHeading>
                <p className="italic-display text-[#A9803F] text-[22px] md:text-[26px] leading-[1.35]">
                  ‘{profile.perspective.quote}’
                </p>
                {profile.perspective.attribution && (
                  <p className="text-[#888888] text-[13px] font-medium mt-4">— {profile.perspective.attribution}</p>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* Admissions & Qualifications */}
          <ScrollReveal delay={0.05}>
            <div className="space-y-12">
              {profile.admissions && profile.admissions.length > 0 && (
                <div>
                  <SectionHeading>Admissions &amp; Appointments</SectionHeading>
                  <div>
                    {profile.admissions.map((a, i) => (
                      <DividerRow key={i}>{a}</DividerRow>
                    ))}
                  </div>
                </div>
              )}
              {profile.qualifications && profile.qualifications.length > 0 && (
                <div>
                  <SectionHeading>Qualifications</SectionHeading>
                  <div>
                    {profile.qualifications.map((q, i) => (
                      <DividerRow key={i}>{q}</DividerRow>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Practice areas */}
          {profile.practiceAreas && profile.practiceAreas.length > 0 && (
            <ScrollReveal delay={0.1}>
              <div>
                <SectionHeading>Practice Areas</SectionHeading>
                <div>
                  {profile.practiceAreas.map((p, i) => (
                    <DividerRow key={i}>{p}</DividerRow>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  )
}
