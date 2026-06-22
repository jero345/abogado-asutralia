import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { Lock, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { hasSupabase } from '@/lib/supabase'
import { Turnstile } from '@/components/admin/Turnstile'

// Optional Cloudflare Turnstile CAPTCHA. When a site key is configured the
// widget is shown and its token is sent to Supabase (which must also have
// CAPTCHA enabled in its dashboard). Without a key, login works as before.
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined

export function AdminLogin() {
  const { session, signIn, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [captchaKey, setCaptchaKey] = useState(0) // bump to force a fresh challenge
  const captchaEnabled = Boolean(TURNSTILE_SITE_KEY)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6FB]">
        <Loader2 className="animate-spin text-[#1C3A64]" size={28} />
      </div>
    )
  }

  if (session) {
    return <Navigate to="/admin" replace />
  }

  if (!hasSupabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6FB] p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#1C3A64]/15 p-8 shadow-sm">
          <h1 className="text-[#1C3A64] text-[20px] font-medium mb-3">Admin not configured</h1>
          <p className="text-[#555555] text-[14px] leading-[1.7]">
            Add <code className="bg-[#F4F6FB] px-1.5 py-0.5 rounded text-[12px]">VITE_SUPABASE_URL</code> and{' '}
            <code className="bg-[#F4F6FB] px-1.5 py-0.5 rounded text-[12px]">VITE_SUPABASE_ANON_KEY</code> to your
            environment, then redeploy.
          </p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (captchaEnabled && !captchaToken) {
      setError('Please complete the verification below.')
      return
    }
    setSubmitting(true)
    setError(null)
    const { error: err } = await signIn(email, password, captchaToken ?? undefined)
    if (err) {
      setError(err)
      setSubmitting(false)
      // Turnstile tokens are single-use — reset the widget for another try.
      setCaptchaToken(null)
      setCaptchaKey((k) => k + 1)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6FB] p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#1C3A64]/12 p-8 md:p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#1C3A64] flex items-center justify-center">
            <Lock size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-[#1C3A64] text-[18px] font-medium leading-tight">Banton Group</h1>
            <p className="text-[#888888] text-[12px]">Admin sign in</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-[#1C3A64] mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#1C3A64]/15 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1C3A64]/30 focus:border-[#1C3A64]/40"
              placeholder="you@bantongroup.com"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#1C3A64] mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#1C3A64]/15 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1C3A64]/30 focus:border-[#1C3A64]/40"
            />
          </div>
          {captchaEnabled && (
            <Turnstile
              key={captchaKey}
              siteKey={TURNSTILE_SITE_KEY as string}
              onVerify={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
            />
          )}
          {error && (
            <div className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting || (captchaEnabled && !captchaToken)}
            className="w-full bg-[#1C3A64] hover:bg-[#2A4E72] disabled:opacity-60 text-white text-[14px] font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 size={14} className="animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
