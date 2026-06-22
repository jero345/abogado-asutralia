import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Phone, Mail, MapPin } from 'lucide-react'

const FORMSTACK_CONTACT_URL = 'https://bantongroup.formstack.com/forms/contact'

const offices = [
  {
    city: 'Sydney',
    address: 'Level 12/60 Martin Place',
    suburb: 'Sydney NSW 2000',
    phone: '+61 2 8076 8090',
    email: 'info@bantongroup.com',
    primary: true,
  },
  {
    city: 'Melbourne',
    address: 'Level 4/40 William Street',
    suburb: 'Melbourne VIC 3000',
    phone: '+61 2 8076 8090',
    email: 'info@bantongroup.com',
    primary: false,
  },
]

export function Contact() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] to-[#f0f4f8]" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(30,58,95,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Formstack contact form */}
          <ScrollReveal className="lg:col-span-3">
            <div className="bg-white border border-[#1e3a5f]/[0.08] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(30,58,95,0.05)]">
              <iframe
                src={FORMSTACK_CONTACT_URL}
                title="Contact form"
                loading="lazy"
                className="block w-full min-h-[900px] border-0 bg-white"
              />
            </div>
          </ScrollReveal>

          {/* Offices */}
          <ScrollReveal delay={0.15} className="lg:col-span-2 space-y-4">
            {offices.map((office) => (
              <motion.div
                key={office.city}
                whileHover={{ borderColor: 'rgba(30,58,95,0.2)' }}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  office.primary
                    ? 'bg-[#1e3a5f]/5 border-[#1e3a5f]/20'
                    : 'bg-[#1e3a5f]/[0.02] border-[#1e3a5f]/[0.06]'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  {office.primary && (
                    <span className="text-xs text-[#1e3a5f] font-semibold bg-[#1e3a5f]/10 px-2 py-0.5 rounded-full border border-[#1e3a5f]/20">
                      Head Office
                    </span>
                  )}
                  <h3 className={`font-semibold ${office.primary ? 'text-[#1e3a5f]' : 'text-[#1e3a5f]'}`}>
                    {office.city}
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-[#1e3a5f]/40 text-sm">
                    <MapPin size={13} className="mt-0.5 flex-shrink-0 text-[#1e3a5f]/60" />
                    <span>{office.address}<br />{office.suburb}</span>
                  </div>
                  <a href={`tel:${office.phone}`} className="flex items-center gap-2.5 text-[#1e3a5f]/40 text-sm hover:text-[#1e3a5f]/70 transition-colors">
                    <Phone size={13} className="flex-shrink-0 text-[#1e3a5f]/60" />
                    {office.phone}
                  </a>
                  <a href={`mailto:${office.email}`} className="flex items-center gap-2.5 text-[#1e3a5f]/40 text-sm hover:text-[#1e3a5f]/70 transition-colors">
                    <Mail size={13} className="flex-shrink-0 text-[#1e3a5f]/60" />
                    {office.email}
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Hours */}
            <div className="p-6 bg-[#1e3a5f]/[0.02] border border-[#1e3a5f]/[0.06] rounded-2xl">
              <h3 className="text-[#1e3a5f] font-semibold text-sm mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Monday – Friday', hours: '8:30am – 5:30pm' },
                  { day: 'Saturday - Sunday', hours: 'Closed' },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between">
                    <span className="text-[#1e3a5f]/50">{h.day}</span>
                    <span className="text-[#1e3a5f]/60 font-medium">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
