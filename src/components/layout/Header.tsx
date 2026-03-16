import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Practice Areas', href: '#practice-areas' },
  { label: 'Class Actions', href: '#class-actions' },
  { label: 'About', href: '#about' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(5,5,7,0)', 'rgba(5,5,7,0.92)']
  )
  const headerBorderOpacity = useTransform(scrollY, [0, 100], [0, 0.08])

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 50))
    return unsub
  }, [scrollY])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <motion.div
          style={{ borderBottomColor: `rgba(255,255,255,${headerBorderOpacity})` }}
          className={`border-b transition-all duration-300 ${scrolled ? 'border-white/[0.06]' : 'border-transparent'}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <motion.a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="w-8 h-8 border border-[#c9a84c]/60 rotate-45 flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#c9a84c] rotate-0" />
                </div>
                <div>
                  <span className="text-white font-semibold text-lg tracking-tight">BANTON</span>
                  <span className="text-[#c9a84c] font-light text-lg tracking-tight ml-1.5">GROUP</span>
                </div>
              </motion.a>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                    className="text-white/60 text-sm font-medium hover:text-white transition-colors duration-200 relative group"
                    whileHover={{ y: -1 }}
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c9a84c] transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                ))}
              </nav>

              {/* CTA */}
              <div className="hidden lg:flex items-center gap-4">
                <motion.button
                  onClick={() => scrollTo('#contact')}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 bg-[#c9a84c] text-[#050507] text-sm font-semibold rounded-full transition-colors duration-200 hover:bg-[#e8c547]"
                >
                  Schedule Consultation
                </motion.button>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white/70 hover:text-white transition-colors"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className={`fixed top-20 left-0 right-0 z-40 bg-[#050507]/98 backdrop-blur-xl border-b border-white/[0.06] ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
              initial={{ opacity: 0, x: -20 }}
              animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.05 }}
              className="text-white/70 text-base font-medium hover:text-white transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.button
            onClick={() => scrollTo('#contact')}
            whileTap={{ scale: 0.97 }}
            className="mt-2 w-full py-3 bg-[#c9a84c] text-[#050507] text-sm font-semibold rounded-full"
          >
            Schedule Consultation
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}
