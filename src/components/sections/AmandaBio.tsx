import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react'

const recognitions = [
  'Chambers Asia-Pacific · Dispute Resolution — Leading Individual 2022, 2023, 2025 & 2026',
  'Asia Pacific Legal 500 · Recommended Lawyer — Dispute Resolution: Class Actions 2022, 2023',
  'Asia Pacific Legal 500 · Leading Individual — Class Action Dispute Resolution 2023',
  'Asia Pacific Legal 500 · Dispute Resolution: Class Actions — Band 2, 2026',
  'Asia Pacific Legal 500 · Restructuring and Insolvency — Band 4, 2026',
  'Australasian Law Awards · Excellence Award — Law Firm Leader of the Year 2022',
  'Australasian Lawyers · Elite Women Awards 2022',
  "Doyle's Guide · Recommended Lawyer — Commercial Litigation & Dispute Resolution 2022",
  'APAC Insider · Complex Litigator of the Year (Australia) 2022',
  'Leaders in Law · Commercial Litigation Expert of the Year (Australia) 2022',
  'Global 100 · Complex Litigator of the Year (Australia) 2023',
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
                Twenty years at the
                <br />
                <span className="italic-display text-[#6D8FB5]">top end of town.</span>
              </h2>
              <div className="space-y-5 text-[#555555] leading-[1.75] text-[15px] md:text-[16px]">
                <p>
                  Amanda Banton is the Principal and Managing Partner of Banton Group, established in February 2020. She brings close to 20 years of experience in the legal profession, formerly at Squire Patton Boggs and Piper Alderman — where she ran substantial litigation practices — and draws on consulting experience from KPMG and federal government expertise.
                </p>
                <p>
                  Under Amanda's leadership, Banton Group has grown into one of Australia's largest private litigation and insolvency practices, acting in some of Australia's biggest insolvencies and class actions alongside corporate and commercial litigation and advisory work. Her practice encompasses complex insolvency, regulatory, corporate and commercial disputes — including securities litigation, competition and consumer law, and breaches of trust and fiduciary duties.
                </p>
                <p>
                  Amanda is known for her capacity to establish cases from the ground up, her surgical strategic thinking, and her ability to execute groundbreaking matters in which new law has been created. She is highly regarded by clients, litigation funders, insolvency practitioners, and the Court alike — managing all stakeholders including clients, funders, defendants' solicitors and the judiciary with equal care and precision.
                </p>
                <p>
                  Banton Group has been at the forefront of the evolving class action funding landscape, establishing a significant capital base to bankroll its own litigation and maintaining strong relationships with Australia's leading litigation funders. The firm acts on a contingency fee basis where appropriate in the Supreme Court of Victoria.
                </p>
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
                  Principal & Managing Partner
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
                    href="tel:+61424156859"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Phone size={14} className="text-[#8AAECE]" />
                    +61 424 156 859
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-[#F4F6FB] border border-[#1C3A64]/10 rounded-2xl p-6">
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#1C3A64] mb-4">
                  Recognitions
                </div>
                <ul className="space-y-3">
                  {recognitions.map((r) => (
                    <li key={r} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                      <span className="text-[#1C3A64] text-[13px] leading-[1.6]">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
