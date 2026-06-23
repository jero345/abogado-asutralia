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
    <section className="relative pt-1 md:pt-2 pb-20 md:pb-28 overflow-hidden bg-[#EFF4F4]">
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
                  As Managing Partner of Banton Group, established in February 2020, Amanda Banton brings more than 20 years of experience in the legal profession. Prior to founding the firm, she led substantial litigation practices at Squire Patton Boggs and Piper Alderman, and also gained consulting experience at KPMG alongside expertise developed within the federal government.
                </p>
                <p>
                  Under her leadership, Banton Group has developed into one of Australia's leading litigation and insolvency practices, acting in some of the nation's most significant disputes and regulatory matters. Her experience spans complex class actions, competition and consumer law proceedings, breaches of trust and fiduciary duty claims and equity disputes, various negligence and nuisance claims as well as various matters arising under the Corporations Act 2001 (Cth), Australian Securities and Investments Commission Act 2001 (Cth), Civil Liability Act 2002 (NSW) and the Competition and Consumer Act 2010 (Cth), including the Australian Consumer Law.
                </p>
                <p>
                  Recognised for her ability to build cases from the ground up, Amanda is known for her strategic thinking and capacity to execute ground-breaking matters in which new law has been created and global precedents triggered. She is highly regarded by clients, litigation funders, insolvency practitioners, and the Court alike.
                </p>
                <p>
                  She has also been at the forefront of the evolving class action funding landscape, establishing a significant capital base to bankroll litigation internally while maintaining strong relationships with Australia's leading litigation funders. The firm acts on a contingency fee basis where appropriate in the Supreme Court of Victoria.
                </p>
              </div>

              {/* Representative Matters */}
              <div className="mt-10 pt-8 border-t border-[#1C3A64]/[0.08]">
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#1C3A64] mb-5 flex items-center gap-3">
                  <span className="w-5 h-px bg-[#1C3A64]" />
                  Representative Matters
                </div>
                <ul className="space-y-4 text-[#555555] leading-[1.7] text-[14px] md:text-[15px]">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium italic">Bogan v The Estate of Peter John Smedley (Deceased) &amp; Ors</span> [2025] HCA 7 – High Court of Australia
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium italic">Bogan v Estate of Peter John Smedley (Deceased) &amp; Ors</span>, Supreme Court of Victoria, S ECI 2020 03281
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium italic">ACN 117 641 004 Pty Ltd (in liquidation) &amp; Anor v S&amp;P Global Inc &amp; Anor</span>, Federal Court of Australia, NSD 881/2020
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium italic">Belmont Park Investments Pty Ltd &amp; Anor v Fitch Ratings, Inc &amp; Anor</span>, Federal Court of Australia, NSD 924/2024
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium italic">Hunt Leather Pty Ltd v Transport for NSW</span> [2025] HCA 53 – High Court of Australia
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium italic">Kupang Resources Pty Ltd v The Commonwealth of Australia</span>, NSWSC, 2020/106859
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium italic">Doyle&rsquo;s Farm Produce Pty Ltd &amp; Ors v Murray Darling Basin Authority &amp; Anor</span>, NSWSC, 2019/00150651
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium italic">Toner v CuDeco Limited (Receivers and Managers Appointed) (In Liquidation) &amp; Ors</span>, Federal Court of Australia, VID 176/2022
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3A64] mt-2 flex-shrink-0" />
                    <span>
                      <span className="text-[#1C3A64] font-medium italic">MDC v NSW Ports Operations Hold Co Pty Ltd &amp; Ors</span> – Federal Court Proceeding No. NSD 862/2019; <span className="text-[#1C3A64] font-medium italic">Mayfield Development Corporation Pty Ltd ACN 154 495 048 v NSW Ports Operations Hold Co Pty Ltd ACN 163 262 351 &amp; Ors</span> Full Federal Court Proceeding No. NSD 840/2024
                    </span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Side column — contact + recognitions */}
          <div className="space-y-6 lg:sticky lg:top-28">
            <ScrollReveal delay={0.1}>
              <div className="bg-[#1C3A64] text-white rounded-2xl shadow-sm overflow-hidden">
                <img
                  src="/img/about/about-us-amanda.jpg"
                  alt="Amanda Banton, Managing Partner"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                <div className="p-6">
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
                    +61 424 156 859 <span className="text-[#8AAECE] text-[11px] ml-1">· Mobile</span>
                  </a>
                </div>
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
