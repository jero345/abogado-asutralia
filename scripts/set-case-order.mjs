// One-off — set order_index on cases and investigations to match the
// order required in the public Class Actions listing.
// Run with:  node scripts/set-case-order.mjs

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

// Use multiples of 10 so admin users can later insert new items between
// existing rows without renumbering everything.
// Firm-requested order (Jun 2026): the six headline matters first, in this
// exact sequence, regardless of status — Light Rail, CuDeco, Phoslock,
// Blue Sky, Arrium, Fitch — then the remaining matters below.
const CASES = [
  ['light-rail',       10],
  ['cudeco',           20],
  ['phoslock',         30],
  ['blue-sky',         40],
  ['arrium',           50],
  ['fitch-scdo',       60],
  ['fitch-ratings-uk', 70],
  ['sp-global-uk',     80],
  ['murray-darling',   90],
  ['sp-cdo-cpdo',      100],
  ['hyundai-abs',      110],
  ['kia-abs',          120],
  // 130, 140 reserved for the salt-lake + zip-co investigations
  ['qoin',             150],
]

const INVESTIGATIONS = [
  ['Salt Lake Potash Class Action Investigation', 130],
  ['Zip Co Class Action Investigation',           140],
  ['HighLow Markets Pty Ltd Investigation',       160],
  ['Tyro Payments Ltd Investigation',             170],
]

let okCases = 0
for (const [slug, order_index] of CASES) {
  const { error } = await supabase
    .from('cases')
    .update({ order_index })
    .eq('slug', slug)
  if (error) {
    console.error(`  ❌ cases/${slug}: ${error.message}`)
  } else {
    console.log(`  ✔ cases/${slug}  → order_index=${order_index}`)
    okCases++
  }
}

let okInv = 0
for (const [title, order_index] of INVESTIGATIONS) {
  const { error } = await supabase
    .from('investigations')
    .update({ order_index })
    .eq('title', title)
  if (error) {
    console.error(`  ❌ investigations/${title}: ${error.message}`)
  } else {
    console.log(`  ✔ investigations/${title}  → order_index=${order_index}`)
    okInv++
  }
}

console.log(`\nUpdated ${okCases} cases and ${okInv} investigations.`)
