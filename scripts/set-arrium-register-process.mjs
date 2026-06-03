// One-off — set Arrium's register_process_html with the content shown
// on bantongroup.com/registration-process-for-arrium-class-action/.
// Run with:  node scripts/set-arrium-register-process.mjs
//
// Re-runnable. The supabase/schema.sql ALTER statement is idempotent so
// the column add is safe to issue from PostgREST via raw RPC if needed.

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

function loadEnv(file) {
  try {
    const t = readFileSync(file, 'utf8')
    for (const l of t.split(/\r?\n/)) {
      const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  } catch {}
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
loadEnv(path.join(root, '.env.local'))

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const ARRIUM_REGISTER_HTML = `
<p>This case is being run as an open class action, but is currently the subject of a class closure order, the effect of which is that group members must register their claim <strong>by 4pm AEDT on 15 December 2025</strong> in order to benefit from any settlement of the class action that may be reached at any time up to 20 July 2026.</p>

<p>You are eligible to register for the Arrium Class Action if you acquired an interest in Arrium ordinary shares traded during the period 14 August 2014 to 4 April 2016 (inclusive) and you are not:</p>

<ul>
  <li>a related party, related body corporate, associated entity or officer or close associate of Arrium (as defined by the Corporations Act 2001 (Cth)); or</li>
  <li>a judge or the Chief Justice of the Supreme Court of Victoria.</li>
</ul>

<p>You may register by:</p>

<ul>
  <li>Completing the online registration below; or</li>
  <li>Printing or downloading and completing the Registration Form with your supporting documents and
    <ul>
      <li>emailing it to <a href="mailto:arrium@bantongroup.com">arrium@bantongroup.com</a>; or</li>
      <li>posting it to Banton Group, Level 12, 60 Martin Place, Sydney NSW 2000.</li>
    </ul>
  </li>
</ul>

<p>If you are an agent or trustee of a claimant, you may complete the registration (online or in hard copy) on the claimant's behalf.</p>

<h3>Online Registration</h3>

<p>During the online registration process, you will need to provide the following information:</p>

<ul>
  <li>An email address which you check regularly;</li>
  <li>The claimant's Holder Identification Number (HIN) or relevant Security Holder Reference Number (SRN);</li>
  <li>If the claimant's shares are held on his, her or its behalf by another person or entity (such as a broker or custodian), details of both of those persons or entities and the capacities in which they held those shares;</li>
  <li>If the claimant holds the shares jointly with another person, that other person's name; and</li>
  <li>If the claimant has multiple holdings of shares, separate transaction details for each holding.</li>
</ul>

<p>You will also be asked to provide details about the claimant's shareholding(s) including:</p>

<ul>
  <li>The number of Arrium ordinary shares held at close of trade on 18 August 2014;</li>
  <li>The date, quantity and price of the claimant's Arrium share purchases from the commencement of trading on 19 August 2014 to 4 April 2016;</li>
  <li>The date, quantity and price of the claimant's Arrium shares sold from the commencement of trading on 19 August 2014 to 4 April 2016;</li>
  <li>The number of Arrium ordinary shares held at close of trade on 4 April 2016.</li>
</ul>

<p>You will also be asked to attach your supporting documents of the above share holding purchases and sales and holdings.</p>

<p><em>Please note when you are completing the online registration form, that mandatory fields are marked with this symbol (*); an error notification will appear for invalid data entered or required fields left blank.</em></p>

<h3>Institutional Investors</h3>

<p>Please contact Banton Group at <a href="mailto:arrium@bantongroup.com">arrium@bantongroup.com</a> to provide your contact details and to obtain an investment information template to complete and return to us.</p>

<h3>Privacy and confidentiality</h3>

<p>The privacy and confidentiality of our clients and group members is very important to Banton Group. For the current version of our Privacy Policy <a href="/privacy-policy">please click here</a>.</p>
`.trim()

const { error } = await supabase
  .from('cases')
  .update({ register_process_html: ARRIUM_REGISTER_HTML })
  .eq('slug', 'arrium')

if (error) {
  console.error('❌', error.message)
  process.exit(1)
}
console.log('✔ Arrium register_process_html updated.')
