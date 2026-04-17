import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react'

const recognitions: { category: string; items: string[] }[] = [
  {
    category: 'Chambers Asia-Pacific',
    items: ['Dispute Resolution — Leading Individual 2022, 2023, 2025 & 2026'],
  },
  {
    category: 'Asia Pacific Legal 500',
    items: [
      'Recommended Lawyer — Dispute Resolution: Class Actions 2022, 2023',
      'Leading Individual — Class Action Dispute Resolution 2023',
      'Dispute Resolution: Class Actions — Band 2, 2026',
      'Restructuring and Insolvency — Band 4, 2026',
    ],
  },
  {
    category: "Doyle's Guide",
    items: ['Recommended Lawyer — Commercial Litigation & Dispute Resolution 2022'],
  },
  {
    category: 'Australasian Law Awards',
    items: ['Excellence Award — Law Firm Leader of the Year 2022'],
  },
  {
    category: 'Australasian Lawyers',
    items: ['Elite Women Awards 2022'],
  },
  {
    category: 'APAC Insider',
    items: ['Complex Litigator of the Year (Australia) 2022'],
  },
  {
    category: 'Leaders in Law',
    items: ['Commercial Litigation Expert of the Year (Australia) 2022'],
  },
  {
    category: 'Global 100',
    items: ['Complex Litigator of the Year (Australia) 2023'],
  },
]

export function AmandaBio() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-16 items-start">
          {/* Main column */}
          <div>
            <ScrollReveal>
              <span className="section-label mb-4 block">
                <span className="w-5 h-px bg-[#1C3A64]" />
                About Amanda
              </span>
              <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight mb-8">
                Twenty years + at the
                <br />
                <span className="italic-display text-[#6D8FB5]">top end of the game.</span>
              </h2>
              <div className="space-y-5 text-[#555555] leading-[1.75] text-[15px] md:text-[16px]">
                <p>
                  Amanda Banton is the Managing Partner of Banton Group, which she established in February 2020. She brings over 20 years of experience in the legal profession, formerly at Squire Patton Boggs and Piper Alderman — where she ran substantial litigation practices — and draws on consulting experience from KPMG and federal government expertise.
                </p>
                <p>
                  Under Amanda's leadership, Banton Group has grown into one of Australia's most formidable litigation and insolvency practices, acting in some of Australia's biggest commercial litigation, class actions, securities litigation, competition and consumer law, and breaches of trust and fiduciary duties and insolvencies.
                </p>
                <p>
                  Amanda is known for her capacity to establish cases from the ground up, her surgical strategic thinking, and her ability to execute ground-breaking matters in which new law has been created and global precedent triggered. She is highly regarded by clients, litigation funders, insolvency practitioners, and the Court alike.
                </p>
                <p>
                  Banton Group has been at the forefront of the evolving class action funding landscape, establishing a significant capital base to bankroll its own litigation and maintaining strong relationships with Australia's leading litigation funders. The firm acts on a contingency fee basis where appropriate in the Supreme Court of Victoria.
                </p>
              </div>

              {/* Publishable Matters */}
              <div className="mt-10 pt-8 border-t border-[#1C3A64]/[0.08]">
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#1C3A64] mb-5 flex items-center gap-3">
                  <span className="w-5 h-px bg-[#1C3A64]" />
                  Publishable Matters
                </div>
                <ul className="space-y-4 text-[#555555] leading-[1.7] text-[14px] md:text-[15px]">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium">Bogan v Smedley [2025] HCA 7</span> — landmark High Court authority on group cost orders.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium">Bolitho v Banksia Securities Ltd [2022] VSC 201</span> — Supreme Court of Victoria approved a 40% group cost order.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium">Hunt Leather Pty Ltd v Transport for NSW [2025] HCA 53</span> — High Court ruling on the Sydney Light Rail class action.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium">In the matter of Kupang Resources Limited [2025] NSWSC 1477</span> — $46 million recovery for shareholders and creditors.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium">CuDeco Limited (in liquidation)</span> — acting for KPMG as liquidators (December 2025).
                    </span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Side column — contact + recognitions */}
          <div className="space-y-6 lg:sticky lg:top-28">
            <ScrollReveal delay={0.1}>
              <div className="bg-[#1C3A64] text-white rounded-2xl p-6 shadow-sm">
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#8AAECE] mb-3">
                  Amanda Banton
                </div>
                <div className="text-white font-medium text-[15px] mb-5">
                  Managing Partner
                </div>
                <div className="space-y-3 text-[13px]">
                  <motion.a
                    href="https://linkedin.com/in/amandabanton"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Linkedin size={14} className="text-[#8AAECE]" />
                    linkedin.com/in/amandabanton
                    <ArrowUpRight size={11} className="ml-auto" />
                  </motion.a>
                  <a
                    href="mailto:amanda.banton@bantongroup.com"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Mail size={14} className="text-[#8AAECE]" />
                    amanda.banton@bantongroup.com
                  </a>
                  <a
                    href="tel:+61280768090"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Phone size={14} className="text-[#8AAECE]" />
                    +61 2 8076 8090 <span className="text-[#8AAECE] text-[11px] ml-1">· Sydney HQ</span>
                  </a>
                  <a
                    href="tel:+61424156859"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Phone size={14} className="text-[#8AAECE]" />
                    +61 424 156 859 <span className="text-[#8AAECE] text-[11px] ml-1">· mobile</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-[#F4F6FB] border border-[#1C3A64]/10 rounded-2xl p-6">
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#1C3A64] mb-5">
                  Recognitions
                </div>
                <div className="space-y-5">
                  {recognitions.map((group) => (
                    <div key={group.category}>
                      <div className="text-[#1C3A64] text-[12px] font-semibold tracking-wide mb-2">
                        {group.category}
                      </div>
                      <ul className="space-y-1.5">
                        {group.items.map((r) => (
                          <li key={r} className="flex items-start gap-2.5">
                            <span className="w-1 h-1 rounded-full bg-[#C9A84C] mt-2 flex-shrink-0" />
                            <span className="text-[#555555] text-[12.5px] leading-[1.55]">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
