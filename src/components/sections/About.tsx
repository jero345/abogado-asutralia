import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Shield, Target, Zap, BookOpen } from 'lucide-react'

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We act with absolute integrity in everything we do — to our clients, to the courts, and to the rule of law.',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Complex litigation demands surgical precision. Every argument is crafted, every detail examined, every strategy deliberate.',
  },
  {
    icon: Zap,
    title: 'Tenacity',
    description: 'We never stop fighting. Against well-funded opponents, our determination is our greatest competitive advantage.',
  },
  {
    icon: BookOpen,
    title: 'Innovation',
    description: 'We combine traditional legal excellence with modern technology — data analytics, litigation funding, and strategic AI — to stay ahead.',
  },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section id="about" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#EFF4F4]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: Text */}
          <div>
            <ScrollReveal>
              <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight mb-8">
                Founded with
                <br />
                <span className="italic-display text-[#6D8FB5]">a singular purpose.</span>
              </h2>
              <div className="space-y-5 text-[#555555] text-[16px] leading-[1.75]">
                <p>
                  Banton Group was established in February 2020 by Amanda Banton with a singular purpose: to give individuals and institutions the firepower to take on powerful adversaries and win. Today, Banton Group is one of Australia's most formidable private litigation and insolvency practices.
                </p>
                <p>
                  We occupy a unique position in the legal landscape — a specialist litigation boutique with the capability and resources of a major firm, but the agility, focus, and commitment of a dedicated team that truly cares about outcomes.
                </p>
                <p>
                  Our lawyers are recognised as leaders in class action litigation, commercial disputes, and insolvency law. We have significant experience in the Federal Court & Supreme Courts of all states, the Full Federal Court of NSW, The Court of Appeal in NSW and the High Court of Australia. Our specialist team includes lawyers with experience in Australia, the United States, United Kingdom, New Zealand, South East Asia and Cayman Islands.
                </p>
                <p>
                  Banton Group maintains strong relationships with Australia's leading litigation funders and may act on a contingency basis in the Supreme Court of Victoria.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Amanda portrait */}
          <ScrollReveal direction="left">
            <div className="relative pb-24 md:pb-0">
              <motion.div
                style={{ y: imageY }}
                className="relative"
              >
                <div className="relative bg-[#1e3a5f]/[0.03] border border-[#1e3a5f]/[0.1] rounded-2xl overflow-hidden aspect-[4/5] max-w-[460px] mx-auto">
                  <img
                    src="/img/about/about-us-amanda.jpg"
                    alt="Amanda Banton, Principal Partner of Banton Group"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '50% 25%' }}
                  />
                </div>
              </motion.div>

              {/* Quote card below photo — fully readable */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative md:absolute md:-bottom-6 md:right-0 md:max-w-[320px] mt-6 md:mt-0 bg-[#1C3A64] rounded-2xl p-6 shadow-xl border-l-4 border-l-[#6D8FB5]"
              >
                <div className="font-serif text-lg md:text-xl font-semibold text-white leading-snug mb-3">
                  "Complexity doesn't deter us.<br />It defines us."
                </div>
                <div className="text-[#8AAECE] text-xs tracking-wide">— Amanda Banton, Managing Partner</div>
              </motion.div>

            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Values grid — separate section with contrasting background */}
      <div className="relative z-10 bg-white border-t border-[#1C3A64]/[0.08] mt-20 lg:mt-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
          <ScrollReveal className="mb-10">
            <span className="section-label mb-4 block">
              <span className="w-5 h-px bg-[#1C3A64]" />
              Our Values
            </span>
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-medium text-[#1C3A64] leading-[1.15] tracking-tight max-w-2xl">
              Four principles that guide{' '}
              <span className="italic-display text-[#6D8FB5]">every matter we take.</span>
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <ScrollReveal key={value.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ borderColor: 'rgba(30,58,95,0.2)', backgroundColor: 'rgba(239,244,244,0.6)' }}
                    className="h-full p-5 border border-[#1e3a5f]/[0.1] rounded-xl bg-white transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center mb-3">
                      <Icon size={16} className="text-[#1e3a5f]" />
                    </div>
                    <h4 className="text-[#1C3A64] font-medium text-[15px] mb-2">{value.title}</h4>
                    <p className="text-[#555555] text-[13px] leading-[1.65]">{value.description}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
