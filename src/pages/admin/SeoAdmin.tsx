import { useEffect, useMemo, useState } from 'react'
import { Loader2, Check, ChevronDown, Globe, Settings2 } from 'lucide-react'
import {
  fetchSeoSettings,
  fetchSiteSettings,
  saveSeoSetting,
  saveSiteSettings,
  emptySeo,
  MANAGED_ROUTES,
  type SeoSetting,
  type SiteSettings,
} from '@/lib/seo'

const EMPTY_SITE: SiteSettings = {
  ga_measurement_id: null,
  default_title: null,
  title_suffix: null,
  default_description: null,
  default_og_image: null,
}

export function SeoAdmin() {
  const [site, setSite] = useState<SiteSettings | null>(null)
  const [drafts, setDrafts] = useState<Record<string, SeoSetting> | null>(null)
  const [openPath, setOpenPath] = useState<string | null>(null)
  const [savingSite, setSavingSite] = useState(false)
  const [savingPath, setSavingPath] = useState<string | null>(null)
  const [savedPath, setSavedPath] = useState<string | null>(null)
  const [siteSaved, setSiteSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([fetchSiteSettings(), fetchSeoSettings()]).then(([s, rows]) => {
      setSite({ ...EMPTY_SITE, ...(s ?? {}) })
      const map: Record<string, SeoSetting> = {}
      for (const r of MANAGED_ROUTES) {
        map[r.path] = rows.find((x) => x.path === r.path) ?? emptySeo(r.path)
      }
      setDrafts(map)
    })
  }, [])

  const customCount = useMemo(() => {
    if (!drafts) return 0
    return Object.values(drafts).filter((d) => d.title || d.description).length
  }, [drafts])

  const patchSite = (patch: Partial<SiteSettings>) =>
    setSite((s) => ({ ...(s ?? EMPTY_SITE), ...patch }))

  const patchDraft = (path: string, patch: Partial<SeoSetting>) =>
    setDrafts((d) => (d ? { ...d, [path]: { ...d[path], ...patch } } : d))

  const onSaveSite = async () => {
    if (!site) return
    setSavingSite(true)
    setError(null)
    const { error: err } = await saveSiteSettings(site)
    setSavingSite(false)
    if (err) return setError(err)
    setSiteSaved(true)
    window.setTimeout(() => setSiteSaved(false), 2000)
  }

  const onSavePage = async (path: string) => {
    if (!drafts) return
    setSavingPath(path)
    setError(null)
    const { error: err } = await saveSeoSetting(drafts[path])
    setSavingPath(null)
    if (err) return setError(err)
    setSavedPath(path)
    window.setTimeout(() => setSavedPath((p) => (p === path ? null : p)), 2000)
  }

  if (!site || !drafts) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin text-[#1C3A64]" size={24} />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[#1C3A64] text-[26px] font-medium tracking-tight">SEO</h1>
        <p className="text-[#888888] text-[13px] mt-1">
          Control the title, description and social preview for each page. Custom on{' '}
          {customCount} of {MANAGED_ROUTES.length} pages.
        </p>
      </div>

      {error && (
        <div className="mb-6 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* ── Site-wide defaults ─────────────────────────────── */}
      <section className="bg-white border border-[#1C3A64]/10 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2.5 mb-5">
          <Settings2 size={16} className="text-[#1C3A64]" />
          <h2 className="text-[#1C3A64] text-[15px] font-medium">Site defaults</h2>
        </div>
        <p className="text-[#888888] text-[12px] mb-5 -mt-2">
          Used as a fallback on any page without its own values.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Default title"
            value={site.default_title}
            onChange={(v) => patchSite({ default_title: v })}
            placeholder="Banton Group | Strategic Litigation."
          />
          <Field
            label="Title suffix"
            value={site.title_suffix}
            onChange={(v) => patchSite({ title_suffix: v })}
            placeholder=" | Banton Group"
            hint="Appended after each page's own title."
          />
        </div>
        <div className="mt-4">
          <Field
            label="Default description"
            value={site.default_description}
            onChange={(v) => patchSite({ default_description: v })}
            placeholder="Elite litigation specialists…"
            textarea
          />
        </div>
        <div className="mt-4">
          <Field
            label="Default social image (OG image URL)"
            value={site.default_og_image}
            onChange={(v) => patchSite({ default_og_image: v })}
            placeholder="https://…/og-default.jpg"
          />
        </div>
        <div className="mt-5 flex justify-end">
          <SaveButton saving={savingSite} saved={siteSaved} onClick={onSaveSite} />
        </div>
      </section>

      {/* ── Per-page SEO ───────────────────────────────────── */}
      <div className="bg-white border border-[#1C3A64]/10 rounded-2xl overflow-hidden">
        <ul className="divide-y divide-[#1C3A64]/10">
          {MANAGED_ROUTES.map(({ path, label }) => {
            const d = drafts[path]
            const open = openPath === path
            const hasCustom = Boolean(d.title || d.description)
            return (
              <li key={path}>
                <button
                  type="button"
                  onClick={() => setOpenPath(open ? null : path)}
                  className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-[#1C3A64]/[0.02] transition-colors"
                >
                  <Globe size={15} className="text-[#6D8FB5] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[#1C3A64] text-[14px] font-medium">{label}</div>
                    <div className="text-[#999999] text-[12px] truncate">
                      {d.title || `${path} — using defaults`}
                    </div>
                  </div>
                  {hasCustom && (
                    <span className="text-[10px] tracking-[0.1em] uppercase text-[#1C3A64] bg-[#1C3A64]/[0.06] px-2 py-0.5 rounded">
                      Custom
                    </span>
                  )}
                  {d.noindex && (
                    <span className="text-[10px] tracking-[0.1em] uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      No-index
                    </span>
                  )}
                  <ChevronDown
                    size={16}
                    className={`text-[#888888] transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>

                {open && (
                  <div className="px-5 pb-6 pt-1 bg-[#F4F6FB]/40 border-t border-[#1C3A64]/[0.06]">
                    <div className="grid gap-4 mt-4">
                      <Field
                        label="Title"
                        value={d.title}
                        onChange={(v) => patchDraft(path, { title: v })}
                        placeholder="e.g. About Banton Group"
                        hint="Around 50–60 characters works best."
                      />
                      <Field
                        label="Meta description"
                        value={d.description}
                        onChange={(v) => patchDraft(path, { description: v })}
                        placeholder="One or two sentences shown in search results."
                        textarea
                        hint="Around 150–160 characters."
                      />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field
                          label="Keywords"
                          value={d.keywords}
                          onChange={(v) => patchDraft(path, { keywords: v })}
                          placeholder="comma, separated, terms"
                        />
                        <Field
                          label="Canonical URL"
                          value={d.canonical}
                          onChange={(v) => patchDraft(path, { canonical: v })}
                          placeholder="https://bantongroup.com.au/about"
                        />
                      </div>
                      <Field
                        label="Social image (OG image URL)"
                        value={d.og_image}
                        onChange={(v) => patchDraft(path, { og_image: v })}
                        placeholder="https://…/about-og.jpg"
                      />
                      <label className="flex items-center gap-2.5 text-[13px] text-[#3A4A5F] select-none cursor-pointer">
                        <input
                          type="checkbox"
                          checked={d.noindex}
                          onChange={(e) => patchDraft(path, { noindex: e.target.checked })}
                          className="w-4 h-4 accent-[#1C3A64]"
                        />
                        Hide this page from search engines (no-index)
                      </label>
                    </div>
                    <div className="mt-5 flex justify-end">
                      <SaveButton
                        saving={savingPath === path}
                        saved={savedPath === path}
                        onClick={() => onSavePage(path)}
                      />
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <p className="text-[#999999] text-[12px] mt-5 leading-relaxed">
        Note: changes apply when a visitor loads the page. Social link previews
        (WhatsApp, Facebook, LinkedIn) read the page's HTML directly and won't
        reflect these until the site is pre-rendered — search engines like Google
        do pick them up.
      </p>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  textarea,
}: {
  label: string
  value: string | null
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
  textarea?: boolean
}) {
  const cls =
    'w-full rounded-lg border border-[#1C3A64]/15 bg-white px-3 py-2 text-[13px] text-[#333333] placeholder:text-[#bbbbbb] focus:outline-none focus:border-[#1C3A64]/40 transition-colors'
  return (
    <div>
      <label className="block text-[12px] font-medium text-[#1C3A64] mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className={`${cls} resize-y`}
        />
      ) : (
        <input
          type="text"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
      {hint && <p className="text-[11px] text-[#aaaaaa] mt-1">{hint}</p>}
    </div>
  )
}

function SaveButton({
  saving,
  saved,
  onClick,
}: {
  saving: boolean
  saved: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] disabled:opacity-60 text-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
    >
      {saving ? (
        <Loader2 size={14} className="animate-spin" />
      ) : saved ? (
        <Check size={14} />
      ) : null}
      {saved ? 'Saved' : 'Save'}
    </button>
  )
}
