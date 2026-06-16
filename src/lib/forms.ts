import { supabase } from './supabase'

export type CustomFieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox'

export interface CustomField {
  /** Stable key used in the submission payload (slug of the label). */
  name: string
  label: string
  type: CustomFieldType
  required: boolean
  /** Options for `select` fields. */
  options?: string[]
}

export interface CustomFormDef {
  id: string
  name: string
  description: string
  notify_email: string | null
  fields: CustomField[]
  created_at?: string
}

export const FIELD_TYPE_LABELS: Record<CustomFieldType, string> = {
  text: 'Short text',
  email: 'Email',
  tel: 'Phone',
  textarea: 'Long text',
  select: 'Dropdown',
  checkbox: 'Checkbox',
}

export function fieldKey(label: string, fallback: string): string {
  const k = label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 48)
  return k || fallback
}

export async function fetchForms(): Promise<CustomFormDef[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('forms')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[forms] fetch failed', error)
    return []
  }
  return (data ?? []) as CustomFormDef[]
}

export async function fetchForm(id: string): Promise<CustomFormDef | null> {
  if (!supabase) return null
  const { data, error } = await supabase.from('forms').select('*').eq('id', id).maybeSingle()
  if (error) {
    console.error('[forms] fetchOne failed', error)
    return null
  }
  return (data as CustomFormDef) ?? null
}

export async function saveForm(
  form: Pick<CustomFormDef, 'name' | 'description' | 'notify_email' | 'fields'> & { id?: string },
): Promise<{ id?: string; error?: string }> {
  if (!supabase) return { error: 'Backend not configured.' }
  const body = {
    name: form.name.trim(),
    description: form.description ?? '',
    notify_email: form.notify_email || null,
    fields: form.fields ?? [],
  }
  const res = form.id
    ? await supabase.from('forms').update(body).eq('id', form.id).select('id').maybeSingle()
    : await supabase.from('forms').insert(body).select('id').maybeSingle()
  if (res.error) return { error: res.error.message }
  return { id: (res.data as { id: string } | null)?.id }
}

export async function deleteForm(id: string): Promise<{ error?: string }> {
  if (!supabase) return { error: 'Backend not configured.' }
  const { error } = await supabase.from('forms').delete().eq('id', id)
  return { error: error?.message }
}
