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
      <div className="absolute inset-0 bg-[#050507]" />

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[20vw] font-bold text-white/[0.015] uppercase select-none whitespace-nowrap">
          BANTON
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: Text */}
          <div>
            <ScrollReveal>
              <span className="section-label mb-4 block">
                <span className="w-5 h-px bg-[#c9a84c]" />
                About the Firm
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
                Two Decades of
                <br />
                <span className="text-gradient-gold italic">Fighting for Justice</span>
              </h2>
              <div className="space-y-5 text-white/50 leading-relaxed">
                <p>
                  Banton Group was founded with a singular purpose: to give individuals and institutions the firepower to take on powerful adversaries and win. Since our inception, we have grown into one of Australia's most formidable litigation practices.
                </p>
                <p>
                  We occupy a unique position in the legal landscape — a specialist litigation boutique with the capability and resources of a major firm, but the agility, focus, and commitment of a dedicated team that truly cares about outcomes.
                </p>
                <p>
                  Our lawyers are recognised as leaders in class action litigation, commercial disputes, and insolvency law. We have appeared in the Federal Court, Supreme Courts of all states, the Full Federal Court, and the High Court of Australia.
                </p>
              </div>
            </ScrollReveal>

            {/* Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
              {values.map((value, i) => {
                const Icon = value.icon
                return (
                  <ScrollReveal key={value.title} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ borderColor: 'rgba(201,168,76,0.2)', backgroundColor: 'rgba(201,168,76,0.02)' }}
                      className="p-5 border border-white/[0.06] rounded-xl transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center mb-3">
                        <Icon size={15} className="text-[#c9a84c]" />
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1.5">{value.title}</h4>
                      <p className="text-white/35 text-xs leading-relaxed">{value.description}</p>
                    </motion.div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>

          {/* Right: Visual */}
          <ScrollReveal direction="left">
            <div className="relative">
              {/* Main card */}
              <motion.div
                style={{ y: imageY }}
                className="relative"
              >
                <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden aspect-[4/5]">
                  {/* Abstract visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Concentric circles */}
                    {[300, 220, 140, 60].map((size, i) => (
                      <motion.div
                        key={size}
                        className="absolute border border-[#c9a84c]/10 rounded-full"
                        style={{ width: size, height: size }}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                        transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
                      />
                    ))}

                    {/* Center emblem */}
                    <div className="w-24 h-24 border-2 border-[#c9a84c]/40 rotate-45 flex items-center justify-center bg-[#c9a84c]/5">
                      <div className="w-10 h-10 bg-[#c9a84c]/20 rotate-0 flex items-center justify-center">
                        <Scale size={20} className="text-[#c9a84c]" style={{ transform: 'rotate(-45deg)' }} />
                      </div>
                    </div>

                    {/* Floating labels */}
                    {[
                      { label: 'Federal Court', top: '15%', left: '10%' },
                      { label: 'High Court', top: '25%', right: '8%' },
                      { label: 'Supreme Court', bottom: '30%', left: '5%' },
                      { label: 'Full Court', bottom: '20%', right: '10%' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        className="absolute text-xs text-white/25 font-medium border border-white/[0.06] px-2.5 py-1 rounded-full bg-white/[0.02]"
                        style={{ top: item.top, bottom: item.bottom, left: item.left, right: item.right }}
                        animate={{ y: [0, -6, 0], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.8 }}
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent p-8 pt-20">
                    <div className="font-serif text-2xl font-bold text-white mb-2">
                      "We don't just argue cases.<br />We change outcomes."
                    </div>
                    <div className="text-[#c9a84c] text-sm">— Founding Partner, Banton Group</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 -left-8 bg-[#0a0a0f] border border-[#c9a84c]/20 rounded-2xl p-5 shadow-2xl"
              >
                <div className="text-3xl font-bold text-[#c9a84c] mb-1">98%</div>
                <div className="text-white/50 text-xs">Client Satisfaction Rate</div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function Scale({ size, className, style }: { size: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}>
      <path d="M12 3v18" />
      <path d="M3 7h18" />
      <path d="M6 7l-3 7c0 1.7 1.3 3 3 3s3-1.3 3-3L6 7z" />
      <path d="M18 7l-3 7c0 1.7 1.3 3 3 3s3-1.3 3-3L18 7z" />
      <path d="M12 3 8 7m4-4 4 4" />
    </svg>
  )
}
