// One-off — ensure the cases.register_process_html column exists.
// Uses a raw SQL execution via the supabase REST 'sql' extension if
// available; otherwise prints the SQL the user needs to run manually.

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

const url = process.env.VITE_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

// Try probing whether the column exists by selecting it.
const supa = createClient(url, key)
const probe = await supa.from('cases').select('register_process_html').limit(1)
if (!probe.error) {
  console.log('✔ Column register_process_html already exists.')
  process.exit(0)
}

console.log('⚠ Column missing. Run this SQL in Supabase → SQL Editor:\n')
console.log('  alter table public.cases\n    add column if not exists register_process_html text;\n')
console.log('Then re-run:  node scripts/set-arrium-register-process.mjs')
process.exit(1)
