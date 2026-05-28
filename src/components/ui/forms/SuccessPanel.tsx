import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import type { CaseDetail } from '@/data/caseDetails'

export function SuccessPanel({ caseData }: { caseData: CaseDetail }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-[#1A6B41]/30 rounded-2xl p-10 md:p-12 text-center max-w-2xl mx-auto shadow-sm"
    >
      <div className="w-16 h-16 rounded-full bg-[#E6F4EE] border border-[#1A6B41]/30 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={30} className="text-[#1A6B41]" />
      </div>
      <h2 className="text-[#1C3A64] text-[24px] md:text-[28px] font-medium leading-[1.2] mb-4 tracking-tight">
        Registration received.
      </h2>
      <p className="text-[#555555] text-[15px] leading-[1.7] max-w-md mx-auto">
        Thank you for registering your interest in the{' '}
        <span className="text-[#1C3A64] font-medium">{caseData.title}</span>. A member of the
        Banton Group team will be in touch within one business day to confirm your registration
        and request any supporting documents.
      </p>
      {caseData.email && (
        <p className="text-[#888888] text-[13px] mt-6">
          For urgent enquiries contact{' '}
          <a href={`mailto:${caseData.email}`} className="text-[#1C3A64] underline">
            {caseData.email}
          </a>
        </p>
      )}
    </motion.div>
  )
}
