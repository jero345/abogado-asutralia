import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Award, Quote } from 'lucide-react'

const awards = [
  { source: 'Chambers Asia-Pacific', years: '2022, 2023, 2025, 2026', label: 'Amanda Banton — Leading Individual' },
  { source: 'Chambers Asia-Pacific', years: '2026', label: 'Dispute Resolution: Class Action (Firm)' },
  { source: 'Asia Pacific Legal 500', years: '2026', label: 'Recommended Firm — Dispute Resolution & Restructuring' },
  { source: 'Australasian Law Awards', years: '2022', label: 'Law Firm Leader of the Year' },
  { source: 'Australasian Lawyers', years: '2022 & 2023', label: 'Complex Litigator of the Year' },
  { source: 'Australasian Lawyers', years: '2022', label: 'Elite Women Awards' },
]

const testimonials = [
  {
    quote:
      "I deal with most plaintiff side law firms at the top end and have extensive experience with Banton Group, whom I rate highly due to their success rate and 'cut through' in litigation.",
    source: 'Legal 500 — Asia Pacific Guide 2026',
  },
  {
    quote:
      'In all my dealings with Banton Group, I have found the firm to be reliable, forward-thinking and thoroughly professional. I consider them to be best of breed as a boutique law firm in plaintiff class actions.',
    source: 'Legal 500 — Asia Pacific Guide 2026',
  },
  {
    quote:
      'Amanda Banton is an outstanding legal practitioner whose deep knowledge and strategic thinking consistently delivers strong results. She is a rock star in Australian class actions for plaintiffs.',
    source: 'Legal 500 — Asia Pacific Guide 2026',
  },
  {
    quote:
      'Banton Group are very easy to deal with and listen to advice. Their communication and instructions are clear.',
    source: 'Chambers & Partners — Asia-Pacific Guide 2026',
  },
]

export function Awards() {
  return (
    <section id="awards" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="section-label justify-center mb-4 block">
            <span className="w-5 h-px bg-[#1e3a5f]" />
            Awards & Recognition
            <span className="w-5 h-px bg-[#1e3a5f]" />
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3a5f] leading-tight mb-6">
            Ranked & Recognised
            <br />
            <span className="text-gradient-gold italic">by Those Who Know</span>
          </h2>
          <p className="text-[#1e3a5f]/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Consistently recognised by the world's leading legal directories for our work in class actions and complex commercial litigation.
          </p>
        </ScrollReveal>

        {/* Awards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {awards.map((a, i) => (
            <ScrollReveal key={`${a.source}-${a.label}`} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -3, borderColor: 'rgba(201,168,76,0.5)' }}
                className="relative border border-[#C9A84C]/30 bg-[#C9A84C]/[0.05] rounded-xl p-5 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/40 flex items-center justify-center flex-shrink-0">
                    <Award size={15} className="text-[#8A6D1E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#8A6D1E] text-[11px] font-semibold tracking-[0.1em] uppercase mb-1">
                      {a.source} · {a.years}
                    </div>
                    <div className="text-[#1e3a5f] text-sm font-semibold leading-snug">{a.label}</div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Testimonials */}
        <ScrollReveal className="mb-10">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="h-px w-10 bg-[#1e3a5f]/40" />
            <span className="text-[#1e3a5f] text-[11px] font-semibold tracking-[0.2em] uppercase">What Clients Say</span>
            <div className="h-px w-10 bg-[#1e3a5f]/40" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.quote.slice(0, 20)} delay={i * 0.08}>
              <motion.div
                whileHover={{ borderColor: 'rgba(28,58,100,0.4)' }}
                className="relative bg-[#F4F6FB] border-l-[3px] border-l-[#1C3A64] border-y border-r border-[#1e3a5f]/[0.08] rounded-r-2xl p-6 h-full"
              >
                <Quote size={18} className="text-[#1C3A64] mb-3" />
                <p className="text-[#1e3a5f]/85 text-[15px] italic leading-relaxed mb-4">
                  "{t.quote}"
                </p>
                <div className="text-[#1C3A64] text-xs font-semibold tracking-wide">{t.source}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
