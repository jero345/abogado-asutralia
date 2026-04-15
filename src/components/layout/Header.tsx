import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Team', to: '/team' },
  { label: 'Litigation', to: '/litigation' },
  { label: 'Class Actions', to: '/class-actions' },
  { label: 'Work With Us', to: '/work-with-us' },
  { label: 'Contact', to: '/contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { pathname } = useLocation()

  // On sub-pages (not home), the header sits over navy PageHero — treat as "dark bg"
  const isHomePage = pathname === '/'
  const darkBackground = isHomePage ? !scrolled : !scrolled

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.96)']
  )
  const headerBorderOpacity = useTransform(scrollY, [0, 100], [0, 0.08])

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 50))
    return unsub
  }, [scrollY])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <motion.div
          style={{ borderBottomColor: `rgba(30,58,95,${headerBorderOpacity})` }}
          className={`border-b transition-all duration-300 ${scrolled ? 'border-[#1e3a5f]/[0.06]' : 'border-transparent'}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-3"
              >
                <motion.img
                  src="/img/logobg.png"
                  alt="Banton Group"
                  className={`h-10 md:h-11 w-auto object-contain transition-all duration-300 ${darkBackground ? 'brightness-0 invert' : ''}`}
                  whileHover={{ scale: 1.03 }}
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-7">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `text-[13px] font-medium tracking-[0.01em] transition-colors duration-200 relative group ${
                        darkBackground
                          ? isActive
                            ? 'text-white'
                            : 'text-white/75 hover:text-white'
                          : isActive
                            ? 'text-[#1C3A64]'
                            : 'text-[#555555] hover:text-[#1C3A64]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                          darkBackground ? 'bg-white' : 'bg-[#1C3A64]'
                        } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* CTA */}
              <div className="hidden lg:flex items-center gap-4">
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`inline-block px-5 py-2.5 text-[13px] font-medium rounded-full transition-colors duration-200 tracking-[0.02em] ${
                      darkBackground
                        ? 'bg-white text-[#1C3A64] hover:bg-[#EFF4F4]'
                        : 'bg-[#1C3A64] text-white hover:bg-[#2A4E72]'
                    }`}
                  >
                    Schedule Consultation
                  </motion.span>
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden transition-colors ${darkBackground ? 'text-white/80 hover:text-white' : 'text-[#1e3a5f]/70 hover:text-[#1e3a5f]'}`}
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
        className={`fixed top-20 left-0 right-0 z-40 bg-[#1C3A64] border-b border-white/10 shadow-xl ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-7 flex flex-col gap-5">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -20 }}
              animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.05 }}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors block ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`
                }
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}
          <Link
            to="/contact"
            className="mt-3 w-full py-3 bg-white text-[#1C3A64] text-sm font-medium rounded-full text-center tracking-[0.02em] hover:bg-[#EFF4F4] transition-colors"
          >
            Schedule Consultation
          </Link>
        </div>
      </motion.div>
    </>
  )
}
