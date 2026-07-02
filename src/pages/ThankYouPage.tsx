import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Home } from 'lucide-react'
import { mpTrack } from '@/lib/metaPixel'

/**
 * Thank-you / confirmation page — the redirect target for cross-domain Formstack
 * forms. Because those forms live on Formstack's own domain, the Meta Pixel on
 * our site never sees their submit. Pointing a form's confirmation redirect at
 * this page (TOP window) lets us fire the conversion the moment the visitor
 * lands here.
 *
 * Set the Formstack confirmation redirect to any of:
 *   • https://bantongroup.com/thanks                 → CompleteRegistration
 *   • https://bantongroup.com/thanks?type=lead       → Lead (enquiry forms)
 *   • https://bantongroup.com/thanks?case=light-rail → CompleteRegistration,
 *        tagged with the class-action slug so conversions break down per campaign
 *
 * Add &source=<channel> to tell campaigns apart — the registrations arrive from
 * several channels (sms, email, flyer, facebook). The channel rides along on the
 * conversion AND stays in the page URL, so you can build a Meta "Custom
 * Conversion" filtered by URL contains `source=sms`, etc.
 *   • https://bantongroup.com/thanks?case=light-rail&source=sms
 *
 * If instead the URL carries the global ?registered= / ?lead= params (handled by
 * MetaPixelEvents), we stay quiet here so the conversion isn't counted twice.
 */
export function ThankYouPage() {
  const location = useLocation()
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    const params = new URLSearchParams(location.search)

    // MetaPixelEvents already handles these param names — don't double count.
    if (params.has('registered') || params.has('lead')) return

    const type = params.get('type')
    const caseId = params.get('case')
    const source = params.get('source') // sms | email | flyer | facebook | ...

    if (type === 'lead') {
      mpTrack('Lead', { content_category: 'enquiry', ...(source ? { source } : {}) })
    } else {
      mpTrack('CompleteRegistration', {
        content_category: 'class_action',
        ...(caseId ? { content_name: caseId, content_ids: [caseId] } : {}),
        ...(source ? { source } : {}),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="relative min-h-[82vh] flex items-center justify-center bg-[#EFF4F4] px-6 py-20 overflow-hidden">
      {/* Soft brand glow behind the card */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[420px] opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(109,143,181,0.30) 0%, transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl bg-white border border-[#1C3A64]/10 rounded-2xl px-8 py-12 md:px-14 md:py-16 text-center shadow-[0_8px_40px_rgba(28,58,100,0.10)]"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-16 rounded-full bg-[#E6F4EE] border border-[#1A6B41]/30 flex items-center justify-center mx-auto mb-7"
        >
          <CheckCircle2 size={32} className="text-[#1A6B41]" />
        </motion.div>

        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6D8FB5] mb-4">
          Submission received
        </p>

        <h1 className="text-[#1C3A64] text-[30px] md:text-[42px] font-medium leading-[1.1] tracking-tight mb-5">
          Thank <span className="italic-display text-[#6D8FB5]">you</span>
        </h1>

        <p className="text-[#555555] text-[15px] md:text-[16px] leading-[1.75] max-w-md mx-auto">
          Your form has been submitted successfully.
        </p>
        <p className="text-[#555555] text-[15px] md:text-[16px] leading-[1.75] max-w-md mx-auto mt-4">
          A copy of your submission has been emailed to you for your records.
        </p>
        <p className="text-[#555555] text-[15px] md:text-[16px] leading-[1.75] max-w-md mx-auto mt-4">
          If you need to submit documents via email, please send them to{' '}
          <a
            href="mailto:info@bantongroup.com"
            className="text-[#1C3A64] font-medium underline underline-offset-2 hover:text-[#2A4E72]"
          >
            info@bantongroup.com
          </a>
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C3A64] text-white text-[13px] font-medium tracking-[0.02em] rounded-full hover:bg-[#2A4E72] transition-colors"
          >
            <Home size={14} /> Back to home
          </Link>
          <Link
            to="/class-actions"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#1C3A64]/25 text-[#1C3A64] text-[13px] font-medium tracking-[0.02em] rounded-full hover:border-[#1C3A64]/60 hover:bg-[#F4F6FB] transition-colors"
          >
            View class actions <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
