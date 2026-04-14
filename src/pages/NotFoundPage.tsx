import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#EFF4F4]">
      <div className="text-center px-6">
        <div className="text-[120px] md:text-[180px] font-medium text-[#1C3A64]/15 leading-none mb-4">
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-medium text-[#1C3A64] mb-4">
          Page <span className="italic-display text-[#6D8FB5]">not found</span>
        </h1>
        <p className="text-[#555555] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C3A64] text-white text-sm font-medium rounded-full hover:bg-[#2A4E72] transition-colors"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>
      </div>
    </section>
  )
}
