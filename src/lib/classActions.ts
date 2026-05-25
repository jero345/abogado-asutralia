import {
  classActions as staticCases,
  investigations as staticInvestigations,
  pastActions as staticPastActions,
  type ClassAction,
  type CaseStatus,
  type Block,
  type RecallTable,
} from '@/data/classActions'
import { supabase, hasSupabase } from './supabase'

export interface Investigation {
  id: string
  title: string
  summary: string
  body: string
  link: { label: string; href: string }
}

interface DbCaseRow {
  id: string
  slug: string
  title: string
  status: string
  category: string
  year: string
  court: string | null
  summary: string
  body_html: string | null
  key_date: string | null
  wordpress_link: string | null
  detail_slug: string | null
  recalls: RecallTable[] | null
  order_index: number
  published: boolean
  publish_at: string | null
}

interface DbInvestigationRow {
  id: string
  title: string
  summary: string
  body: string
  link_label: string | null
  link_href: string | null
  order_index: number
  published: boolean
}

interface DbPastActionRow {
  id: string
  name: string
  order_index: number
}

const VALID_STATUSES: CaseStatus[] = ['Active', 'Settled', 'On Appeal', 'Investigating']

function rowToCase(row: DbCaseRow): ClassAction {
  // DB cases store the body as HTML (TipTap output) plus an optional
  // recalls JSON. We rebuild the Block[] used by the public renderer:
  // first an `html` block with the body, then any recall tables.
  const content: Block[] = []
  if (row.body_html) {
    content.push({ kind: 'html', html: row.body_html })
  }
  if (row.recalls && row.recalls.length > 0) {
    for (const r of row.recalls) {
      content.push({ kind: 'recalls', columns: r.columns, rows: r.rows })
    }
  }
  const status = (VALID_STATUSES.includes(row.status as CaseStatus)
    ? row.status
    : 'Active') as CaseStatus
  return {
    id: row.id,
    title: row.title,
    status,
    category: row.category,
    year: row.year,
    court: row.court ?? undefined,
    summary: row.summary,
    content,
    keyDate: row.key_date ?? undefined,
    wordpressLink: row.wordpress_link ?? undefined,
    detailSlug: row.detail_slug ?? undefined,
  }
}

function rowToInvestigation(row: DbInvestigationRow): Investigation {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    body: row.body,
    link: { label: row.link_label ?? 'Learn more', href: row.link_href ?? '#' },
  }
}

export async function fetchCases(): Promise<ClassAction[]> {
  if (!hasSupabase || !supabase) return staticCases
  const nowIso = new Date().toISOString()
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('published', true)
    .or(`publish_at.is.null,publish_at.lte.${nowIso}`)
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[Supabase] fetchCases failed, using static only:', error)
    return staticCases
  }
  const dbCases = (data ?? []).map(rowToCase)
  // DB cases first (newest at top), then statics — by id collisions DB wins.
  const byId = new Map<string, ClassAction>()
  for (const c of staticCases) byId.set(c.id, c)
  for (const c of dbCases) byId.set(c.id, c)
  const dbIds = new Set(dbCases.map((c) => c.id))
  return [
    ...dbCases,
    ...staticCases.filter((c) => !dbIds.has(c.id)),
  ].map((c) => byId.get(c.id)!)
}

export async function fetchInvestigations(): Promise<Investigation[]> {
  if (!hasSupabase || !supabase) return staticInvestigations
  const { data, error } = await supabase
    .from('investigations')
    .select('*')
    .eq('published', true)
    .order('order_index', { ascending: true })
  if (error) {
    console.error('[Supabase] fetchInvestigations failed, using static only:', error)
    return staticInvestigations
  }
  return [...staticInvestigations, ...(data ?? []).map(rowToInvestigation)]
}

export async function fetchPastActions(): Promise<string[]> {
  if (!hasSupabase || !supabase) return staticPastActions
  const { data, error } = await supabase
    .from('past_actions')
    .select('*')
    .order('order_index', { ascending: true })
  if (error) {
    console.error('[Supabase] fetchPastActions failed, using static only:', error)
    return staticPastActions
  }
  return [...staticPastActions, ...(data as DbPastActionRow[] ?? []).map((r) => r.name)]
}

export type { ClassAction, CaseStatus, Block }
