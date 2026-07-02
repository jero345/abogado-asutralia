import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { mpTrack } from '@/lib/metaPixel'

/**
 * Meta Pixel events for the SPA. Render once inside the public Layout.
 *
 * - PageView: fired on every client-side route change (the base snippet in
 *   index.html already fires the first one on load).
 * - CompleteRegistration / Lead: the registration & contact forms are
 *   cross-domain Formstack iframes, so the page can't see their submit. To
 *   record a conversion, point the form's confirmation at any of our URLs with
 *   one of these params (Formstack must redirect the TOP window):
 *     • ?registered=<class-action-slug>  → CompleteRegistration (per class action)
 *     • ?lead=1                           → Lead
 *   e.g. https://bantongroup.com/class-actions/light-rail/register?registered=light-rail
 */
export function MetaPixelEvents() {
  const location = useLocation()
  const navigate = useNavigate()
  const firstRender = useRef(true)

  useEffect(() => {
    // The base pixel already counts the first PageView; only fire on SPA navs.
    if (firstRender.current) firstRender.current = false
    else mpTrack('PageView')

    const params = new URLSearchParams(location.search)
    const registered = params.get('registered')
    const lead = params.get('lead')

    if (registered) {
      // Identify the class action so conversions can be broken down per campaign.
      mpTrack('CompleteRegistration', {
        content_name: registered,
        content_category: 'class_action',
        content_ids: [registered],
      })
    }
    if (lead) {
      mpTrack('Lead', { content_category: 'enquiry' })
    }

    // Strip the tracking params so a reload / back-button doesn't double count.
    if (registered || lead) {
      params.delete('registered')
      params.delete('lead')
      const qs = params.toString()
      navigate({ pathname: location.pathname, search: qs ? `?${qs}` : '' }, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search])

  return null
}
