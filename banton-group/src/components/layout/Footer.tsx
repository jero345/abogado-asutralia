import { motion } from 'framer-motion'
import { Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const practiceAreas = [
  'Class Actions',
  'Commercial Litigation',
  'Insolvency & Restructuring',
  'Corporate Disputes',
  'Financial Disputes',
  'Securities Litigation',
]

const quickLinks = [
  { label: 'About the Firm', href: '#about' },
  { label: 'Our Team', href: '#team' },
  { label: 'Case Studies', href: '#class-actions' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#030305] border-t border-white/[0.06]">
      {/* Gold line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <ScrollReveal className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-[#c9a84c]/60 rotate-45 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 bg-[#c9a84c]" />
              </div>
              <div>
                <span className="text-white font-semibold text-lg">BANTON</span>
                <span className="text-[#c9a84c] font-light text-lg ml-1.5">GROUP</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Elite litigation specialists delivering extraordinary outcomes for Australia's most complex legal challenges.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(201,168,76,0.15)' }}
                className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-[#c9a84c] transition-colors duration-200"
              >
                <Linkedin size={15} />
              </motion.a>
              <motion.a
                href="mailto:info@bantongroup.com.au"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(201,168,76,0.15)' }}
                className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-[#c9a84c] transition-colors duration-200"
              >
                <Mail size={15} />
              </motion.a>
            </div>
          </ScrollReveal>

          {/* Practice Areas */}
          <ScrollReveal delay={0.1}>
            <h3 className="text-white text-sm font-semibold tracking-[0.1em] uppercase mb-6">Practice Areas</h3>
            <ul className="space-y-3">
              {practiceAreas.map((area) => (
                <li key={area}>
                  <a
                    href="#practice-areas"
                    onClick={(e) => { e.preventDefault(); scrollTo('#practice-areas') }}
                    className="text-white/40 text-sm hover:text-[#c9a84c] transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-3 h-px bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/60 transition-all duration-200" />
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={0.15}>
            <h3 className="text-white text-sm font-semibold tracking-[0.1em] uppercase mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                    className="text-white/40 text-sm hover:text-[#c9a84c] transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-3 h-px bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/60 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={0.2}>
            <h3 className="text-white text-sm font-semibold tracking-[0.1em] uppercase mb-6">Contact</h3>
            <div className="space-y-4">
              <a href="tel:+61299999999" className="flex items-start gap-3 text-white/40 text-sm hover:text-white/70 transition-colors group">
                <Phone size={14} className="mt-0.5 flex-shrink-0 text-[#c9a84c]" />
                <span>+61 2 9999 9999</span>
              </a>
              <a href="mailto:info@bantongroup.com.au" className="flex items-start gap-3 text-white/40 text-sm hover:text-white/70 transition-colors group">
                <Mail size={14} className="mt-0.5 flex-shrink-0 text-[#c9a84c]" />
                <span>info@bantongroup.com.au</span>
              </a>
              <div className="flex items-start gap-3 text-white/40 text-sm">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#c9a84c]" />
                <span>Level 32, 101 Collins Street<br />Melbourne VIC 3000</span>
              </div>
            </div>

            <motion.button
              onClick={() => scrollTo('#contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 border border-[#c9a84c]/30 text-[#c9a84c] text-sm font-medium rounded-full hover:bg-[#c9a84c]/10 transition-all duration-200"
            >
              Get in Touch <ArrowUpRight size={14} />
            </motion.button>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Banton Group Pty Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map((item) => (
              <a key={item} href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
