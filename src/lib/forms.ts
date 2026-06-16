import { supabase } from './supabase'

export type CustomFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'

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
  number: 'Number',
  date: 'Date',
  textarea: 'Long text',
  select: 'Dropdown',
  radio: 'Multiple choice',
  checkbox: 'Checkbox',
}

/** Field types that need an options list. */
export const OPTION_FIELD_TYPES: CustomFieldType[] = ['select', 'radio']

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

// Starter field sets so a built-in (code) form can be "duplicated" into an
// editable manual form. Contact fields (name/email/phone) are always added by
// the renderer, so these are the EXTRA fields. Special widgets (file upload,
// signature) can't be represented in a manual form and are noted in the copy.
type BuiltinType = string
export function builtinFormTemplate(
  ft: BuiltinType,
): { name: string; description: string; fields: CustomField[] } | null {
  const f = (
    label: string,
    type: CustomFieldType = 'text',
    required = false,
    options?: string[],
  ): CustomField => ({
    name: fieldKey(label, label),
    label,
    type,
    required,
    ...(options ? { options } : {}),
  })
  const ROLES = ['Class member', 'Lawyer for a class member', 'Director of a class member', 'Other']
  const addr = [
    f('Address Line 1', 'text', true),
    f('Address Line 2'),
    f('City'),
    f('State / Province / Region'),
    f('ZIP / Postal Code'),
    f('Country'),
  ]
  switch (ft) {
    case 'mini-interest':
      return { name: 'Mini interest (copy)', description: '', fields: [f('I am a…', 'select', true, ROLES)] }
    case 'shareholder':
      return {
        name: 'Shareholder (copy)',
        description: '',
        fields: [
          ...addr,
          f('Number of shares held at start of the relevant period', 'number'),
          f('Number of shares held at end of the relevant period', 'number'),
        ],
      }
    case 'investment-interest':
      return {
        name: 'Register interest (copy)',
        description: '',
        fields: [
          ...addr,
          f('I can provide my trade information now', 'radio', true, ['Yes', 'No, I will provide it later']),
          f('I agree to receive updates regarding this class action', 'radio', true, ['Yes', 'No']),
        ],
      }
    case 'claim-detailed':
      return {
        name: 'Claim (copy)',
        description: '',
        fields: [
          f('Name of class member', 'text', true),
          f('Authority of person completing this form', 'text'),
          ...addr,
          f('Name of instrument(s) acquired'),
          f('Series / ISIN'),
          f('Purchase amount $AUS', 'number'),
          f('Amount of loss $AUS', 'number'),
          f('Date of acquisition', 'date'),
          f('I am completing this form as a…', 'select', true, ROLES),
        ],
      }
    case 'investment-detailed':
      return {
        name: 'Investment detailed (copy)',
        description: 'Note: file uploads from the original form are not included.',
        fields: [
          ...addr,
          f('Name of SCDO(s) acquired'),
          f('Series / ISIN'),
          f('Purchase amount $AUD', 'number'),
          f('Amount of loss $AUD', 'number'),
          f('Date of acquisition', 'date'),
          f('Date sold', 'date'),
        ],
      }
    case 'vehicle':
      return {
        name: 'Vehicle (copy)',
        description: 'Note: the signature pad from the original form is not included.',
        fields: [
          f('Vehicle model', 'text', true),
          f('Vehicle series'),
          f('VIN', 'text', true),
          f('Date acquired', 'date'),
        ],
      }
    default:
      return null // formstack and unknown types have no manual template
  }
}
