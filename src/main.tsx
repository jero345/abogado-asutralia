import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuthProvider } from '@/lib/auth'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { LitigationPage } from '@/pages/LitigationPage'
import { ClassActionsPage } from '@/pages/ClassActionsPage'
import { CaseDetailPage } from '@/pages/CaseDetailPage'
import { CaseRegisterPage } from '@/pages/CaseRegisterPage'
import { AboutPage } from '@/pages/AboutPage'
import { TeamPage } from '@/pages/TeamPage'
import { AwardsPage } from '@/pages/AwardsPage'
import { WorkWithUsPage } from '@/pages/WorkWithUsPage'
import { ContactPage } from '@/pages/ContactPage'
import { ThankYouPage } from '@/pages/ThankYouPage'
import { NewsPage } from '@/pages/NewsPage'
import { NewsArticlePage } from '@/pages/NewsArticlePage'
import { TermsOfUsePage } from '@/pages/TermsOfUsePage'
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { profiles } from '@/data/profiles'
import { AdminLogin } from '@/pages/admin/AdminLogin'
import { AdminLayout } from '@/pages/admin/AdminLayout'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { ArticleEditor } from '@/pages/admin/ArticleEditor'
import { CasesAdminDashboard } from '@/pages/admin/CasesAdminDashboard'
import { CaseEditor } from '@/pages/admin/CaseEditor'
import { InvestigationsAdmin } from '@/pages/admin/InvestigationsAdmin'
import { PastActionsAdmin } from '@/pages/admin/PastActionsAdmin'
import { FormsAdmin } from '@/pages/admin/FormsAdmin'
import { FormEditor } from '@/pages/admin/FormEditor'
import { SeoAdmin } from '@/pages/admin/SeoAdmin'
import { AnalyticsAdmin } from '@/pages/admin/AnalyticsAdmin'
import { HelpPage } from '@/pages/admin/HelpPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin — sits outside the public Layout so it gets the full viewport. */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="new" element={<ArticleEditor />} />
            <Route path="edit/:id" element={<ArticleEditor />} />
            <Route path="cases" element={<CasesAdminDashboard />} />
            <Route path="cases/new" element={<CaseEditor />} />
            <Route path="cases/edit/:id" element={<CaseEditor />} />
            <Route path="investigations" element={<InvestigationsAdmin />} />
            <Route path="past-actions" element={<PastActionsAdmin />} />
            <Route path="forms" element={<FormsAdmin />} />
            <Route path="forms/new" element={<FormEditor />} />
            <Route path="forms/edit/:id" element={<FormEditor />} />
            <Route path="seo" element={<SeoAdmin />} />
            <Route path="analytics" element={<AnalyticsAdmin />} />
            <Route path="help" element={<HelpPage />} />
          </Route>

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/litigation" element={<LitigationPage />} />
            {/* Keep legacy /practice-areas URL working */}
            <Route path="/practice-areas" element={<LitigationPage />} />
            <Route path="/class-actions" element={<ClassActionsPage />} />
            <Route path="/class-actions/:slug" element={<CaseDetailPage />} />
            <Route path="/class-actions/:slug/register" element={<CaseRegisterPage />} />
            {/* Blog — list + article. /news routes kept as legacy aliases. */}
            <Route path="/blog" element={<NewsPage />} />
            <Route path="/blog/:slug" element={<NewsArticlePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsArticlePage />} />
            <Route path="/work-with-us" element={<WorkWithUsPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Formstack confirmation-redirect target → fires the Meta Pixel conversion */}
            <Route path="/thanks" element={<ThankYouPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            {/* Hidden profile pages — reachable only by direct slug (e.g. /amanda-banton),
                never linked in the nav and marked noindex. Registered from src/data/profiles.ts. */}
            {Object.keys(profiles).map((slug) => (
              <Route key={slug} path={`/${slug}`} element={<ProfilePage slug={slug} />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
