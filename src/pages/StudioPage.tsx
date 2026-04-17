import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { hasSanity } from '@/lib/sanityClient'

/**
 * Sanity Studio embed.
 *
 * The Studio ships a lot of JS (~2MB) that nobody except the admin needs,
 * so we lazy-load it here — it only downloads when someone actually
 * navigates to /studio. React.lazy handles route-level code splitting
 * automatically.
 */

const LazyStudio = lazy(async () => {
  const [sanityPkg, configModule] = await Promise.all([
    import('sanity'),
    import('../../sanity.config'),
  ])
  const config = (configModule as { default: unknown }).default
  // We wrap in a tiny component so the default export shape matches what
  // React.lazy expects.
  const { Studio } = sanityPkg as { Studio: React.ComponentType<{ config: unknown }> }
  return {
    default: () => <Studio config={config} />,
  }
})

export function StudioPage() {
  if (!hasSanity) {
    return (
      <div className="min-h-screen bg-[#EFF4F4] flex items-center justify-center p-8">
        <div className="max-w-xl bg-white rounded-2xl border border-[#1C3A64]/15 p-8 text-center shadow-sm">
          <h1 className="text-[#1C3A64] text-[24px] font-medium mb-3">Studio not configured</h1>
          <p className="text-[#555555] text-[14px] leading-[1.7] mb-6">
            The content management system is not set up yet. Add{' '}
            <code className="bg-[#F4F6FB] px-1.5 py-0.5 rounded text-[12px] text-[#1C3A64]">
              VITE_SANITY_PROJECT_ID
            </code>{' '}
            and{' '}
            <code className="bg-[#F4F6FB] px-1.5 py-0.5 rounded text-[12px] text-[#1C3A64]">
              VITE_SANITY_DATASET
            </code>{' '}
            to your environment variables, then redeploy.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium hover:underline"
          >
            Back to site
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#1C3A64]/20 border-t-[#1C3A64] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#555555] text-[14px]">Loading Studio…</p>
          </div>
        </div>
      }
    >
      <div className="min-h-screen">
        <LazyStudio />
      </div>
    </Suspense>
  )
}
