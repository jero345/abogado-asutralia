import {
  classActions as staticCases,
  investigations as staticInvestigations,
  pastActions as staticPastActions,
  type ClassAction,
  type CaseStatus,
  type Block,
  type RecallTable,
} from '@/data/classActions'
import { cases as staticDetails, type CaseDetail } from '@/data/caseDetails'
import { getFormConfig } from '@/data/registrationForms'
import { supabase, hasSupabase } from './supabase'

export interface Investigation {
  id: string
  title: string
  summary: string
  body: string
  link: { label: string; href: string }
  orderIndex?: number
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
  register_process_html: string | null
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
    slug: row.slug,
    orderIndex: row.order_index,
  }
}

function rowToInvestigation(row: DbInvestigationRow): Investigation {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    body: row.body,
    link: { label: row.link_label ?? 'Learn more', href: row.link_href ?? '#' },
    orderIndex: row.order_index,
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

// ───────────────────────────────────────────────────────────────────
// CaseDetail fetcher — used by /class-actions/:slug and the register
// page. Tries Supabase first, falls back to the static array so legacy
// rich detail entries (Arrium, CuDeco etc.) keep their original blocks.
// ───────────────────────────────────────────────────────────────────
function caseRowToDetail(row: DbCaseRow): CaseDetail {
  const config = getFormConfig(row.slug)
  return {
    slug: row.slug,
    title: row.title,
    status: (VALID_STATUSES.includes(row.status as CaseStatus)
      ? row.status
      : 'Active') as CaseStatus,
    category: row.category,
    year: row.year,
    court: row.court ?? undefined,
    summary: row.summary,
    // Render via bodyHtml only — content blocks stay empty for DB-backed cases.
    content: [],
    bodyHtml: row.body_html ?? undefined,
    registerProcessHtml: row.register_process_html ?? undefined,
    email: config?.notifyEmail,
    hasInternalForm: Boolean(config),
    registrationUrl: row.wordpress_link ?? undefined,
  }
}

export async function fetchCaseDetailBySlug(slug: string): Promise<CaseDetail | undefined> {
  // 1. Try Supabase — the freshest source (admin can edit any time).
  if (hasSupabase && supabase) {
    const nowIso = new Date().toISOString()
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .or(`publish_at.is.null,publish_at.lte.${nowIso}`)
      .maybeSingle()
    if (!error && data) {
      const dbDetail = caseRowToDetail(data as DbCaseRow)
      // If a static entry also exists, merge: keep DB's body_html but
      // preserve static-only fields (leadPlaintiff, fileNumber, funder,
      // caseSpecificFields) that the admin DB schema doesn't yet capture.
      const staticEntry = staticDetails.find((c) => c.slug === slug)
      if (staticEntry) {
        return {
          ...staticEntry,
          ...dbDetail,
          // If DB has no body_html, fall back to static content blocks.
          content: dbDetail.bodyHtml ? [] : staticEntry.content,
        }
      }
      return dbDetail
    }
  }
  // 2. Fall back to the static array.
  return staticDetails.find((c) => c.slug === slug)
}
