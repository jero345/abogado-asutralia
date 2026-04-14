import { motion } from 'framer-motion'
import { Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const practiceAreas = [
  'Class Actions',
  'Commercial Litigation',
  'Insolvency & Restructuring',
  'Complex Financial Disputes',
]

const quickLinks = [
  { label: 'About the Firm', href: '#about' },
  { label: 'Our Team', href: '#team' },
  { label: 'Class Actions', href: '#class-actions' },
  { label: 'Awards', href: '#awards' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#f0f4f8] border-t border-[#1e3a5f]/[0.06]">
      {/* Navy line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1e3a5f]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <ScrollReveal className="lg:col-span-1">
            <div className="mb-6">
              <img src="/img/logo.jpg" alt="Banton Group" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-[#1e3a5f]/50 text-sm leading-relaxed mb-6">
              Australia's premier litigation firm — delivering extraordinary outcomes in class actions, commercial disputes, and insolvency since 2020.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(30,58,95,0.15)' }}
                className="w-9 h-9 border border-[#1e3a5f]/10 rounded-full flex items-center justify-center text-[#1e3a5f]/50 hover:text-[#1e3a5f] transition-colors duration-200"
              >
                <Linkedin size={15} />
              </motion.a>
              <motion.a
                href="mailto:info@bantongroup.com"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(30,58,95,0.15)' }}
                className="w-9 h-9 border border-[#1e3a5f]/10 rounded-full flex items-center justify-center text-[#1e3a5f]/50 hover:text-[#1e3a5f] transition-colors duration-200"
              >
                <Mail size={15} />
              </motion.a>
            </div>
          </ScrollReveal>

          {/* Practice Areas */}
          <ScrollReveal delay={0.1}>
            <h3 className="text-[#1e3a5f] text-sm font-semibold tracking-[0.1em] uppercase mb-6">Practice Areas</h3>
            <ul className="space-y-3">
              {practiceAreas.map((area) => (
                <li key={area}>
                  <a
                    href="#practice-areas"
                    onClick={(e) => { e.preventDefault(); scrollTo('#practice-areas') }}
                    className="text-[#1e3a5f]/40 text-sm hover:text-[#1e3a5f] transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-3 h-px bg-[#1e3a5f]/0 group-hover:bg-[#1e3a5f]/60 transition-all duration-200" />
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={0.15}>
            <h3 className="text-[#1e3a5f] text-sm font-semibold tracking-[0.1em] uppercase mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                    className="text-[#1e3a5f]/40 text-sm hover:text-[#1e3a5f] transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-3 h-px bg-[#1e3a5f]/0 group-hover:bg-[#1e3a5f]/60 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={0.2}>
            <h3 className="text-[#1e3a5f] text-sm font-semibold tracking-[0.1em] uppercase mb-6">Contact</h3>
            <div className="space-y-4">
              <a href="tel:+61280768090" className="flex items-start gap-3 text-[#1e3a5f]/40 text-sm hover:text-[#1e3a5f]/70 transition-colors group">
                <Phone size={14} className="mt-0.5 flex-shrink-0 text-[#1e3a5f]" />
                <span>+61 2 8076 8090</span>
              </a>
              <a href="mailto:info@bantongroup.com" className="flex items-start gap-3 text-[#1e3a5f]/40 text-sm hover:text-[#1e3a5f]/70 transition-colors group">
                <Mail size={14} className="mt-0.5 flex-shrink-0 text-[#1e3a5f]" />
                <span>info@bantongroup.com</span>
              </a>
              <div className="flex items-start gap-3 text-[#1e3a5f]/40 text-sm">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#1e3a5f]" />
                <span>Level 12, 60 Martin Place<br />Sydney NSW 2000 (HQ)</span>
              </div>
            </div>

            <motion.button
              onClick={() => scrollTo('#contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 border border-[#1e3a5f]/30 text-[#1e3a5f] text-sm font-medium rounded-full hover:bg-[#1e3a5f]/10 transition-all duration-200"
            >
              Get in Touch <ArrowUpRight size={14} />
            </motion.button>
          </ScrollReveal>
        </div>

        {/* Legal notice */}
        <div className="pt-8 border-t border-[#1e3a5f]/[0.06] space-y-4">
          <p className="text-[#1e3a5f]/50 text-[11px] leading-relaxed max-w-4xl">
            Banton Group is an incorporated legal practice, and not a partnership. References to 'partners' are references to title only.
            Liability limited by a scheme approved under Professional Standards Legislation.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-4 border-t border-[#1e3a5f]/[0.04]">
            <p className="text-[#1e3a5f]/40 text-xs">
              © {new Date().getFullYear()} Banton Group Pty Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map((item) => (
                <a key={item} href="#" className="text-[#1e3a5f]/40 text-xs hover:text-[#1e3a5f]/60 transition-colors duration-200">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
