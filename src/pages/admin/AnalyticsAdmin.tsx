import { useEffect, useState } from 'react'
import { Loader2, Check, BarChart3, ExternalLink, LineChart } from 'lucide-react'
import { fetchSiteSettings, saveSiteSettings } from '@/lib/seo'

const GA_HELP_URL = 'https://support.google.com/analytics/answer/9304153'
const GA_DASHBOARD_URL = 'https://analytics.google.com/'
const ID_RE = /^G-[A-Z0-9]{6,}$/i

export function AnalyticsAdmin() {
  const [gaId, setGaId] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSiteSettings().then((s) => {
      setGaId(s?.ga_measurement_id ?? '')
      setLoading(false)
    })
  }, [])

  const trimmed = gaId.trim()
  const valid = trimmed === '' || ID_RE.test(trimmed)

  const onSave = async () => {
    setSaving(true)
    setError(null)
    const { error: err } = await saveSiteSettings({ ga_measurement_id: trimmed || null })
    setSaving(false)
    if (err) return setError(err)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight">Analytics</h1>
        <p className="text-[#888888] text-[13px] mt-1">
          Connect Google Analytics to track visits, pages and traffic sources.
        </p>
      </div>

      {error && (
        <div className="mb-6 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Connect card */}
      <section className="bg-white border border-[#1C3A64]/10 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2.5 mb-5">
          <BarChart3 size={16} className="text-[#1C3A64]" />
          <h2 className="text-[#1C3A64] text-[15px] font-medium">Google Analytics 4</h2>
        </div>

        {loading ? (
          <div className="flex items-center py-6">
            <Loader2 className="animate-spin text-[#1C3A64]" size={20} />
          </div>
        ) : (
          <>
            <label className="block text-[12px] font-medium text-[#1C3A64] mb-1.5">
              Measurement ID
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={gaId}
                onChange={(e) => setGaId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className={`flex-1 rounded-lg border bg-white px-3 py-2.5 text-[13px] text-[#333333] placeholder:text-[#bbbbbb] focus:outline-none transition-colors ${
                  valid ? 'border-[#1C3A64]/15 focus:border-[#1C3A64]/40' : 'border-red-300'
                }`}
              />
              <button
                type="button"
                onClick={onSave}
                disabled={saving || !valid}
                className="inline-flex items-center justify-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] disabled:opacity-60 text-white text-[13px] font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                {saving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : saved ? (
                  <Check size={14} />
                ) : null}
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
            {!valid && (
              <p className="text-[11px] text-red-500 mt-1.5">
                The ID should look like <span className="font-mono">G-XXXXXXXXXX</span>.
              </p>
            )}
            <p className="text-[12px] text-[#888888] mt-2 leading-relaxed">
              Paste the Measurement ID from your Google Analytics property. Tracking
              starts as soon as you save — no code changes needed.{' '}
              <a
                href={GA_HELP_URL}
                target="_blank"
                rel="noreferrer"
                className="text-[#1C3A64] underline hover:no-underline inline-flex items-center gap-1"
              >
                Where do I find it? <ExternalLink size={11} />
              </a>
            </p>
          </>
        )}
      </section>

      {/* Review visits card */}
      <section className="bg-white border border-[#1C3A64]/10 rounded-2xl p-6">
        <div className="flex items-center gap-2.5 mb-3">
          <LineChart size={16} className="text-[#1C3A64]" />
          <h2 className="text-[#1C3A64] text-[15px] font-medium">Review visits</h2>
        </div>
        <p className="text-[13px] text-[#555555] leading-relaxed mb-4">
          Visits, top pages, traffic sources, devices and real-time activity are
          shown in the Google Analytics dashboard. Open it with the button below
          and sign in with the connected Google account.
        </p>
        <a
          href={GA_DASHBOARD_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] text-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          Open Google Analytics
          <ExternalLink size={14} />
        </a>
      </section>
    </div>
  )
}
