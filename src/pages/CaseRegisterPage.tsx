import { useParams, Navigate } from 'react-router-dom'

// Public online registration has been disabled (the firm does not collect
// registrations on-site). Any /class-actions/<slug>/register URL now simply
// redirects to the case detail page, where visitors are directed to contact
// the firm privately instead of submitting a form.
export function CaseRegisterPage() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={slug ? `/class-actions/${slug}` : '/class-actions'} replace />
}
