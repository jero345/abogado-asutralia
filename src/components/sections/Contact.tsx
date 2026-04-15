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
    city: 'Sydney',
    address: 'Level 12, 60 Martin Place',
    suburb: 'Sydney NSW 2000',
    phone: '+61 2 8076 8090',
    email: 'info@bantongroup.com',
    primary: true,
  },
  {
    city: 'Melbourne',
    address: 'Level 40, 140 William Street',
    suburb: 'Melbourne VIC 3000',
    phone: '+61 03 9229 3948',
    email: 'info@bantongroup.com',
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
    'w-full bg-[#1e3a5f]/[0.04] border border-[#1e3a5f]/[0.08] rounded-xl px-5 py-3.5 text-[#1e3a5f] text-sm placeholder:text-[#1e3a5f]/25 focus:outline-none focus:border-[#1e3a5f]/40 focus:bg-[#1e3a5f]/[0.06] transition-all duration-200'

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] to-[#f0f4f8]" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(30,58,95,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="section-label justify-center mb-4 block">
            <span className="w-5 h-px bg-[#1e3a5f]" />
            Get in Touch
            <span className="w-5 h-px bg-[#1e3a5f]" />
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight mb-6">
            Your case starts
            <br />
            <span className="italic-display text-[#6D8FB5]">with a conversation.</span>
          </h2>
          <p className="text-[#1e3a5f]/40 text-lg max-w-xl mx-auto leading-relaxed">
            Initial consultations are confidential and obligation-free. Tell us about your matter and we'll assess whether we can help.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <ScrollReveal className="lg:col-span-3">
            <div className="bg-[#1e3a5f]/[0.02] border border-[#1e3a5f]/[0.06] rounded-2xl p-8">
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
                        <label className="block text-[#1e3a5f]/50 text-xs font-medium mb-2 tracking-wide">Full Name *</label>
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
                        <label className="block text-[#1e3a5f]/50 text-xs font-medium mb-2 tracking-wide">Email Address *</label>
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
                        <label className="block text-[#1e3a5f]/50 text-xs font-medium mb-2 tracking-wide">Phone Number</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+61 4__ ___ ___"
                          className={inputClass}
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-[#1e3a5f]/50 text-xs font-medium mb-2 tracking-wide">Enquiry Type</label>
                        <button
                          type="button"
                          onClick={() => setTypeOpen(!typeOpen)}
                          className={`${inputClass} flex items-center justify-between text-left`}
                        >
                          <span className={form.type ? 'text-[#1e3a5f]' : 'text-[#1e3a5f]/25'}>
                            {form.type || 'Select type…'}
                          </span>
                          <motion.div animate={{ rotate: typeOpen ? 180 : 0 }}>
                            <ChevronDown size={15} className="text-[#1e3a5f]/30" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {typeOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#1e3a5f]/[0.1] rounded-xl overflow-hidden z-50 shadow-lg"
                            >
                              {enquiryTypes.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => { setForm({ ...form, type }); setTypeOpen(false) }}
                                  className="w-full text-left px-5 py-3 text-sm text-[#1e3a5f]/60 hover:text-[#1e3a5f] hover:bg-[#1e3a5f]/[0.04] transition-colors duration-150"
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
                      <label className="block text-[#1e3a5f]/50 text-xs font-medium mb-2 tracking-wide">Your Message *</label>
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
                      <div className="w-4 h-4 border border-[#1e3a5f]/20 rounded flex-shrink-0 mt-0.5" />
                      <p className="text-[#1e3a5f]/40 text-xs leading-relaxed">
                        By submitting this form, you agree to our Privacy Policy. All information is strictly confidential and subject to legal professional privilege.
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-[#1e3a5f] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2.5 hover:bg-[#2a4f82] transition-colors duration-200 disabled:opacity-70"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
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
                      className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={28} className="text-emerald-600" />
                    </motion.div>
                    <h3 className="text-[#1e3a5f] text-2xl font-semibold mb-3">Enquiry Received</h3>
                    <p className="text-[#1e3a5f]/60 text-sm leading-relaxed max-w-xs mx-auto">
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
                  { day: 'Monday – Friday', hours: '8:30am – 6:00pm' },
                  { day: 'Saturday', hours: 'By appointment' },
                  { day: 'Sunday', hours: 'Closed' },
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
