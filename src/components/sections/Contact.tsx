import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Send, Phone, Mail, MapPin, CheckCircle, ChevronDown } from 'lucide-react'

const enquiryTypes = [
  'Class Action Registration',
  'Commercial Litigation',
  'Insolvency & Restructuring',
  'Financial Dispute',
  'General Enquiry',
]

const offices = [
  {
    city: 'Melbourne',
    address: 'Level 32, 101 Collins Street',
    suburb: 'Melbourne VIC 3000',
    phone: '+61 3 9999 9999',
    email: 'melbourne@bantongroup.com.au',
    primary: true,
  },
  {
    city: 'Sydney',
    address: 'Level 28, 1 Market Street',
    suburb: 'Sydney NSW 2000',
    phone: '+61 2 9999 9999',
    email: 'sydney@bantongroup.com.au',
    primary: false,
  },
  {
    city: 'Brisbane',
    address: 'Level 18, 240 Queen Street',
    suburb: 'Brisbane QLD 4000',
    phone: '+61 7 9999 9999',
    email: 'brisbane@bantongroup.com.au',
    primary: false,
  },
]

interface FormState {
  name: string
  email: string
  phone: string
  type: string
  message: string
}

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a84c]/40 focus:bg-white/[0.06] transition-all duration-200'

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507] to-[#03030a]" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="section-label justify-center mb-4 block">
            <span className="w-5 h-px bg-[#c9a84c]" />
            Get in Touch
            <span className="w-5 h-px bg-[#c9a84c]" />
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Your Case Starts
            <br />
            <span className="text-gradient-gold italic">With a Conversation</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Initial consultations are confidential and obligation-free. Tell us about your matter and we'll assess whether we can help.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <ScrollReveal className="lg:col-span-3">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-white/50 text-xs font-medium mb-2 tracking-wide">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Andrew Smith"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-xs font-medium mb-2 tracking-wide">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-white/50 text-xs font-medium mb-2 tracking-wide">Phone Number</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+61 4__ ___ ___"
                          className={inputClass}
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-white/50 text-xs font-medium mb-2 tracking-wide">Enquiry Type</label>
                        <button
                          type="button"
                          onClick={() => setTypeOpen(!typeOpen)}
                          className={`${inputClass} flex items-center justify-between text-left`}
                        >
                          <span className={form.type ? 'text-white' : 'text-white/25'}>
                            {form.type || 'Select type…'}
                          </span>
                          <motion.div animate={{ rotate: typeOpen ? 180 : 0 }}>
                            <ChevronDown size={15} className="text-white/30" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {typeOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              className="absolute top-full mt-2 left-0 right-0 bg-[#0d0d15] border border-white/[0.1] rounded-xl overflow-hidden z-50 shadow-2xl"
                            >
                              {enquiryTypes.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => { setForm({ ...form, type }); setTypeOpen(false) }}
                                  className="w-full text-left px-5 py-3 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors duration-150"
                                >
                                  {type}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-2 tracking-wide">Your Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Please briefly describe your legal matter and what outcome you are seeking…"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-white/20 rounded flex-shrink-0 mt-0.5" />
                      <p className="text-white/25 text-xs leading-relaxed">
                        By submitting this form, you agree to our Privacy Policy. All information is strictly confidential and subject to legal professional privilege.
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-[#c9a84c] text-[#050507] font-semibold text-sm rounded-xl flex items-center justify-center gap-2.5 hover:bg-[#e8c547] transition-colors duration-200 disabled:opacity-70"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-[#050507]/30 border-t-[#050507] rounded-full"
                        />
                      ) : (
                        <>
                          Send Enquiry
                          <Send size={15} />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={28} className="text-emerald-400" />
                    </motion.div>
                    <h3 className="text-white text-2xl font-semibold mb-3">Enquiry Received</h3>
                    <p className="text-white/45 text-sm leading-relaxed max-w-xs mx-auto">
                      Thank you for contacting Banton Group. A member of our team will be in touch within one business day.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Offices */}
          <ScrollReveal delay={0.15} className="lg:col-span-2 space-y-4">
            {offices.map((office) => (
              <motion.div
                key={office.city}
                whileHover={{ borderColor: 'rgba(201,168,76,0.2)' }}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  office.primary
                    ? 'bg-[#c9a84c]/5 border-[#c9a84c]/20'
                    : 'bg-white/[0.02] border-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  {office.primary && (
                    <span className="text-xs text-[#c9a84c] font-semibold bg-[#c9a84c]/10 px-2 py-0.5 rounded-full border border-[#c9a84c]/20">
                      Head Office
                    </span>
                  )}
                  <h3 className={`font-semibold ${office.primary ? 'text-[#c9a84c]' : 'text-white'}`}>
                    {office.city}
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-white/40 text-sm">
                    <MapPin size={13} className="mt-0.5 flex-shrink-0 text-[#c9a84c]/60" />
                    <span>{office.address}<br />{office.suburb}</span>
                  </div>
                  <a href={`tel:${office.phone}`} className="flex items-center gap-2.5 text-white/40 text-sm hover:text-white/70 transition-colors">
                    <Phone size={13} className="flex-shrink-0 text-[#c9a84c]/60" />
                    {office.phone}
                  </a>
                  <a href={`mailto:${office.email}`} className="flex items-center gap-2.5 text-white/40 text-sm hover:text-white/70 transition-colors">
                    <Mail size={13} className="flex-shrink-0 text-[#c9a84c]/60" />
                    {office.email}
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Hours */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
              <h3 className="text-white font-semibold text-sm mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Monday – Friday', hours: '8:30am – 6:00pm' },
                  { day: 'Saturday', hours: 'By appointment' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between">
                    <span className="text-white/35">{h.day}</span>
                    <span className="text-white/55 font-medium">{h.hours}</span>
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
