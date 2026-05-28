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
const CASES = [
  ['arrium',           10],
  ['cudeco',           20],
  ['fitch-scdo',       30],
  ['phoslock',         40],
  ['fitch-ratings-uk', 50],
  ['sp-global-uk',     60],
  ['murray-darling',   70],
  ['blue-sky',         80],
  ['sp-cdo-cpdo',      90],
  ['hyundai-abs',      100],
  ['kia-abs',          110],
  // 120, 130 reserved for the salt-lake + zip-co investigations
  ['qoin',             140],
  ['light-rail',       150],
]

const INVESTIGATIONS = [
  ['Salt Lake Potash Class Action Investigation', 120],
  ['Zip Co Class Action Investigation',           130],
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
