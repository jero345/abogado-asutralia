// Bulk setter for cases.register_process_html — the registration-process
// content shown on /class-actions/<slug>/register, above the form
// (eligibility, "Online Registration", supporting documents, institutional
// investors, privacy). Content is transcribed from the firm's live
// bantongroup.com "Registration Process for <Case>" pages.
//
// Arrium is handled by scripts/set-arrium-register-process.mjs. Add the
// remaining cases to REGISTER below as the firm supplies their content.
//
// Re-runnable / idempotent. Run with:
//   node scripts/set-register-processes.mjs
// Optionally limit to specific slugs:
//   node scripts/set-register-processes.mjs cudeco fitch-scdo

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

// slug -> register_process_html
const REGISTER = {
  cudeco: `
<h3>Registration Process</h3>

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
  <li>The number of CuDeco ordinary shares held at close of trade on 10 April 2016;</li>
  <li>The date, quantity and price of the claimant's CuDeco share purchases from the commencement of trading on 11 April 2016 to 13 March 2018;</li>
  <li>The date, quantity and price of the claimant's CuDeco shares sold from the commencement of trading on 11 April 2016 to 31 March 2018;</li>
  <li>The number of CuDeco ordinary shares held at close of trade on 13 March 2018.</li>
</ul>

<p>You will also be asked to attach your supporting documents of the above share holding purchases and sales and holdings.</p>

<p><em>Please note when you are completing the online registration form, that mandatory fields are marked with this symbol (*); an error notification will appear for invalid data entered or required fields left blank.</em></p>

<h3>Institutional Investors</h3>

<p>Please contact Banton Group at <a href="mailto:CuDeco@bantongroup.com">CuDeco@bantongroup.com</a> to provide your contact details and to obtain an investment information template to complete and return to us.</p>

<h3>Privacy and confidentiality</h3>

<p>The privacy and confidentiality of our clients and group members is very important to Banton Group. For the current version of our Privacy Policy <a href="/privacy-policy">please click here</a>.</p>
`.trim(),

  'fitch-scdo': `
<h3>Registration Process</h3>

<p>You are a group member if you:</p>

<ol>
  <li>acquired interests in one or more SCDO assigned credit ratings AAA, AA+, AA or AA- by Fitch using:</li>
  <li>VECTOR 2.2; and/or</li>
  <li>VECTOR 3.0; and/or</li>
  <li>VECTOR 3.1</li>
</ol>

<p>(together, the <strong>Claim SCDOs</strong>); or</p>

<ol>
  <li>facilitated the acquisition of interests by other persons in the Claim SCDOs, or provided services to other persons to acquire interests in the Claim SCDOs, or advised other persons to acquire interests in the Claim SCDOs, or promoted the Claim SCDOs to others, or acquired the Claim SCDOs on behalf of others, or sold the Claim SCDOs, or otherwise dealt in the Claim SCDOs (<strong>contributed to the acquisition by other persons of interests in the Claim SCDOs</strong>); and</li>
  <li>acquired their interest in the Claim SCDOs, or contributed to the acquisition by other persons of interests in the Claim SCDOs, by reason of the publication or dissemination of the ratings for those products in Australia or receipt of the ratings for those products in Australia; and</li>
  <li>have suffered loss or damage by reason of their acquisition of interests in the Claim SCDOs, or contribution to the acquisition by other persons of interests in the Claim SCDOs, excluding those persons whose claims against the Respondents have been extinguished by final orders made in Mid-Coast Council &amp; Anor v Fitch Ratings, Inc &amp; Ors Federal Court Proceeding NSD 995 of 2014 on 25 July 2019.</li>
</ol>

<p>Please see button below for a list of Claim SCDOs.</p>

<p><a href="https://bantongroup.com/wp-content/uploads/2025/11/20250904-Updated-Global-list-of-SCDOs.pdf" target="_blank" rel="noopener">Product List</a></p>

<p>You may register by:</p>

<ul>
  <li>Completing the online registration below; or</li>
  <li>Printing or downloading and completing the Registration Form with your supporting documents and
    <ul>
      <li>emailing it to <a href="mailto:fitchcdos@bantongroup.com">fitchcdos@bantongroup.com</a> or</li>
      <li>posting it to Banton Group, Level 12, 60 Martin Place, Sydney NSW 2000.</li>
    </ul>
  </li>
</ul>

<p>If you are an agent or trustee of a claimant, you may complete the registration (online or in hard copy) on the claimant's behalf.</p>

<h3>Online Registration</h3>

<p>During the online registration process, you will need to provide the following information:</p>

<ul>
  <li>An email address which you check regularly;</li>
  <li>The name of the SCDO(s) acquired;</li>
  <li>The Series/ISIN;</li>
  <li>The purchase amount ($AUS);</li>
  <li>The amount of loss ($AUS);</li>
  <li>The date of acquisition of the SCDO;</li>
  <li>The date of sale of the SCDO (if relevant);</li>
  <li>The date of last payment received (if relevant).</li>
</ul>

<p>You will also be asked to attach your supporting documents of the above holdings.</p>

<p><em>Please note when you are completing the online registration form, that mandatory fields are marked with this symbol (*); an error notification will appear for invalid data entered or required fields left blank.</em></p>

<h3>Institutional Investors</h3>

<p>Please contact Banton Group at <a href="mailto:fitchcdos@bantongroup.com">fitchcdos@bantongroup.com</a> to provide your contact details and to obtain an investment information template to complete and return to us.</p>

<h3>Privacy and confidentiality</h3>

<p>The privacy and confidentiality of our clients and group members is very important to Banton Group. For the current version of our Privacy Policy <a href="/privacy-policy">please click here</a>.</p>
`.trim(),

  phoslock: `
<p>This case is currently being run as an open class action, however, discussions with the Respondents are in place regarding any potential court ordered registration, opt out process and class closure before the mediation ordered to occur on or before 20 May 2026.</p>

<p>Should you wish to register with us before any court ordered registration process or opt out notice you may register by completing the online registration below.</p>

<p>You will need to provide the following information:</p>

<ul>
  <li>Your name;</li>
  <li>Contact details including an email address which you check regularly;</li>
  <li>Your Holder Identification Number (HIN) or relevant Security Holder Reference Number (SRN);</li>
</ul>

<p>You will also be asked to provide details about your shareholding(s) including:</p>

<ul>
  <li>The number of Phoslock shares held at close of trade on 11 October 2018;</li>
  <li>The total purchase price of any shares (including brokerage) held at close of trade on 11 October 2018;</li>
  <li>The date, quantity and price of your Phoslock share purchases from the commencement of trading on 11 October 2018 to 17 September 2020;</li>
  <li>The date, quantity and price of your Phoslock shares sold from the commencement of trading on 11 October 2018 to 17 September 2020; and</li>
  <li>The number of Phoslock shares held at close of trade on 17 September 2020.</li>
</ul>

<p>You will also be asked to attach your supporting documents of the above shareholding purchases and sales and holdings.</p>

<p><em>Please note when you are completing the online registration form, that mandatory fields are marked with this symbol (*); an error notification will appear for invalid data entered or required fields left blank.</em></p>

<h3>Institutional Investors</h3>

<p>Please contact Banton Group at <a href="mailto:phoslockclassaction@bantongroup.com">phoslockclassaction@bantongroup.com</a> to provide your contact details and to obtain an investment information template to complete and return to us.</p>

<h3>Privacy and confidentiality</h3>

<p>The privacy and confidentiality of our clients and group members is very important to Banton Group. For the current version of our Privacy Policy <a href="/privacy-policy">please click here</a>.</p>
`.trim(),
}

const only = process.argv.slice(2)
const slugs = only.length ? only : Object.keys(REGISTER)

let ok = 0
for (const slug of slugs) {
  const html = REGISTER[slug]
  if (!html) {
    console.error(`  ⚠ no content defined for "${slug}" — skipping`)
    continue
  }
  const { data, error } = await supabase
    .from('cases')
    .update({ register_process_html: html })
    .eq('slug', slug)
    .select('slug')
  if (error) {
    console.error(`  ❌ ${slug}: ${error.message}`)
  } else if (!data || data.length === 0) {
    console.error(`  ⚠ ${slug}: no matching row in cases (check the slug)`)
  } else {
    console.log(`  ✔ ${slug}: register_process_html updated`)
    ok++
  }
}

console.log(`\nUpdated ${ok} case(s).`)
