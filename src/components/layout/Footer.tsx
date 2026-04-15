import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const practiceAreas = [
  'Class Actions',
  'Commercial Litigation',
  'Insolvency & Restructuring',
  'Complex Financial Disputes',
]

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Team', to: '/team' },
  { label: 'Litigation', to: '/litigation' },
  { label: 'Class Actions', to: '/class-actions' },
  { label: 'Work With Us', to: '/work-with-us' },
  { label: 'Awards', to: '/awards' },
  { label: 'Contact', to: '/contact' },
]

export function Footer() {
  return (
    <footer className="relative bg-[#1C3A64] text-white">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#6D8FB5]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <ScrollReveal className="lg:col-span-1">
            <div className="mb-6">
              <img src="/img/logobg.png" alt="Banton Group" className="h-12 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-[#B8C8E0] text-[13px] leading-relaxed mb-6">
              Australia's premier litigation firm — delivering extraordinary outcomes in class actions, commercial disputes, and insolvency since 2020.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
                className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={15} />
              </motion.a>
              <motion.a
                href="mailto:info@bantongroup.com"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
                className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200"
              >
                <Mail size={15} />
              </motion.a>
            </div>
          </ScrollReveal>

          {/* Practice Areas */}
          <ScrollReveal delay={0.1}>
            <h3 className="text-white text-[11px] font-medium tracking-[0.12em] uppercase mb-6">Practice Areas</h3>
            <ul className="space-y-3">
              {practiceAreas.map((area) => (
                <li key={area}>
                  <Link
                    to="/litigation"
                    className="text-[#B8C8E0] text-[13px] hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-3 h-px bg-transparent group-hover:bg-white/60 transition-all duration-200" />
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={0.15}>
            <h3 className="text-white text-[11px] font-medium tracking-[0.12em] uppercase mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[#B8C8E0] text-[13px] hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-3 h-px bg-transparent group-hover:bg-white/60 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={0.2}>
            <h3 className="text-white text-[11px] font-medium tracking-[0.12em] uppercase mb-6">Contact</h3>
            <div className="space-y-4">
              <a href="tel:+61280768090" className="flex items-start gap-3 text-[#B8C8E0] text-[13px] hover:text-white transition-colors group">
                <Phone size={14} className="mt-0.5 flex-shrink-0 text-[#6D8FB5]" />
                <span>+61 2 8076 8090</span>
              </a>
              <a href="mailto:info@bantongroup.com" className="flex items-start gap-3 text-[#B8C8E0] text-[13px] hover:text-white transition-colors group">
                <Mail size={14} className="mt-0.5 flex-shrink-0 text-[#6D8FB5]" />
                <span>info@bantongroup.com</span>
              </a>
              <div className="flex items-start gap-3 text-[#B8C8E0] text-[13px]">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#6D8FB5]" />
                <span>Level 12, 60 Martin Place<br />Sydney NSW 2000 (HQ)</span>
              </div>
            </div>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 border border-white/40 text-white text-[13px] font-medium rounded-full hover:bg-white/10 transition-all duration-200 tracking-[0.02em]"
            >
              Get in Touch <ArrowUpRight size={14} />
            </Link>
          </ScrollReveal>
        </div>

        {/* Legal notice */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          <p className="text-[#6D8FB5] text-[11px] leading-relaxed max-w-4xl">
            Banton Group is an incorporated legal practice, and not a partnership. References to 'partners' are references to title only.
            Liability limited by a scheme approved under Professional Standards Legislation.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-4 border-t border-white/[0.05]">
            <p className="text-[#8AAECE] text-[11px]">
              © {new Date().getFullYear()} Banton Group Pty Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <Link to="/terms-of-use" className="text-[#8AAECE] text-[11px] hover:text-white transition-colors duration-200">
                Terms of Use
              </Link>
              <a href="mailto:info@bantongroup.com" className="text-[#8AAECE] text-[11px] hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
