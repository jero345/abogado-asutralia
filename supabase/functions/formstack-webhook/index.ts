// Formstack → panel webhook.
//
// Receives a Formstack submission (configured per form in Formstack as a
// "Webhook"/"Remote submit" pointing here) and stores it in the public
// `registrations` table so the team reviews it in the admin panel.
//
// Deploy (no JWT — Formstack can't send a Supabase token):
//   supabase functions deploy formstack-webhook --no-verify-jwt
//
// Then in Formstack, for each form, add a Webhook to:
//   https://<project-ref>.supabase.co/functions/v1/formstack-webhook?case=<slug>&title=<Case+Title>
//
// `case`  = the case slug it belongs to (required to link the submission)
// `title` = optional human title snapshot
//
// Field mapping is best-effort: name/email/phone are detected by key name and
// the FULL submission is kept in `payload` so nothing is ever lost.

import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405)
  }

  const url = new URL(req.url)
  const caseSlug = url.searchParams.get('case') ?? 'formstack'

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // Title snapshot: use ?title= if given, else look it up from the case.
  let caseTitle = url.searchParams.get('title') ?? ''
  if (!caseTitle) {
    const { data: c } = await supabase.from('cases').select('title').eq('slug', caseSlug).maybeSingle()
    caseTitle = c?.title ?? caseSlug
  }

  // Parse body — Formstack may send JSON or form-urlencoded / multipart.
  const data: Record<string, unknown> = {}
  const ct = req.headers.get('content-type') ?? ''
  try {
    if (ct.includes('application/json')) {
      Object.assign(data, await req.json())
    } else {
      const form = await req.formData()
      for (const [k, v] of form.entries()) data[k] = typeof v === 'string' ? v : (v as File).name
    }
  } catch (_) {
    // leave data empty; we still record the attempt
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v))
  const pick = (re: RegExp): string => {
    for (const [k, v] of Object.entries(data)) {
      const s = str(v)
      if (re.test(k) && s) return s
    }
    return ''
  }

  const email = pick(/e-?mail/i)
  const phone = pick(/phone|tel|mobile|cell/i)
  let firstName = pick(/first.?name|fname|given/i)
  let lastName = pick(/last.?name|lname|surname|family/i)
  if (!firstName && !lastName) {
    const full = pick(/full.?name|(^|[_\s])name([_\s]|$)/i)
    if (full) {
      const parts = full.split(/\s+/)
      firstName = parts[0] ?? ''
      lastName = parts.slice(1).join(' ')
    }
  }

  const { error } = await supabase.from('registrations').insert({
    case_slug: caseSlug,
    case_title: caseTitle,
    form_type: 'formstack',
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    payload: data,
  })

  if (error) {
    console.error('[formstack-webhook] insert failed:', error.message)
    return json({ ok: false, error: error.message }, 500)
  }
  return json({ ok: true })
})

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
