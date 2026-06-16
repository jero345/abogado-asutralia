import { supabase, hasSupabase } from './supabase'
import type { FormType } from '@/data/registrationForms'

export interface CommonFields {
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  postal?: string
  country?: string
}

export interface SubmitInput {
  caseSlug: string
  caseTitle: string
  /** Built-in FormType, or a custom-form reference like `custom:<id>`. */
  formType: FormType | (string & {})
  common: CommonFields
  /** Form-type-specific values keyed by field name. */
  payload: Record<string, unknown>
  /** Files chosen for the Supporting Documents section. */
  files?: File[]
  /** Vehicle form only — base64 PNG data URL of the drawn signature. */
  signatureData?: string
  /** Yes / No from the retainer question (Shareholder forms only). */
  retainer?: string
}

interface UploadedDocument {
  name: string
  url: string
  size: number
  contentType: string
}

export class RegistrationError extends Error {
  details?: string
  constructor(message: string, details?: string) {
    super(message)
    this.details = details
  }
}

const BUCKET = 'registration-uploads'

function randomId(): string {
  // Compact unique id used to namespace each submission's files.
  // crypto.randomUUID is available in all modern browsers.
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID().replace(/-/g, '').slice(0, 16)
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function sanitiseFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120)
}

async function uploadFiles(
  caseSlug: string,
  submissionId: string,
  files: File[],
): Promise<UploadedDocument[]> {
  if (!supabase) throw new RegistrationError('Supabase not configured.')
  const uploaded: UploadedDocument[] = []
  for (const file of files) {
    const path = `${caseSlug}/${submissionId}/${Date.now()}_${sanitiseFilename(file.name)}`
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    })
    if (error) {
      throw new RegistrationError(`Failed to upload "${file.name}".`, error.message)
    }
    uploaded.push({
      name: file.name,
      url: path,
      size: file.size,
      contentType: file.type || 'application/octet-stream',
    })
  }
  return uploaded
}

export async function submitRegistration(input: SubmitInput): Promise<{ id: string }> {
  if (!hasSupabase || !supabase) {
    throw new RegistrationError(
      'Submission backend is not configured for this environment.',
      'Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.',
    )
  }

  const submissionId = randomId()

  let documents: UploadedDocument[] = []
  if (input.files && input.files.length > 0) {
    documents = await uploadFiles(input.caseSlug, submissionId, input.files)
  }

  const row = {
    case_slug: input.caseSlug,
    case_title: input.caseTitle,
    form_type: input.formType,
    first_name: input.common.firstName,
    last_name: input.common.lastName,
    email: input.common.email,
    phone: input.common.phone,
    address_line1: input.common.addressLine1 || null,
    address_line2: input.common.addressLine2 || null,
    city: input.common.city || null,
    state: input.common.state || null,
    postal: input.common.postal || null,
    country: input.common.country || null,
    payload: input.payload,
    documents,
    signature_data: input.signatureData || null,
    retainer: input.retainer || null,
  }

  const { data, error } = await supabase
    .from('registrations')
    .insert(row)
    .select('id')
    .single()

  if (error || !data) {
    throw new RegistrationError(
      'Could not save your registration. Please try again.',
      error?.message,
    )
  }

  return { id: data.id }
}

/**
 * Generate a short-lived signed URL for an uploaded document.
 * Used in the admin dashboard to download attachments.
 */
export async function getDocumentSignedUrl(path: string, expiresIn = 60): Promise<string | null> {
  if (!supabase) return null
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, expiresIn)
  if (error) {
    console.error('[registrations] createSignedUrl failed', error)
    return null
  }
  return data.signedUrl
}
