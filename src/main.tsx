import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
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
import { NewsPage } from '@/pages/NewsPage'
import { TermsOfUsePage } from '@/pages/TermsOfUsePage'
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage'
import { StudioPage } from '@/pages/StudioPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Sanity Studio — mounted outside the site Layout so it has the
            full viewport with no header/footer */}
        <Route path="/studio/*" element={<StudioPage />} />

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
          {/* Blog — currently a "Coming Soon" placeholder. /news kept as a
              legacy redirect so old links still resolve. */}
          <Route path="/blog" element={<NewsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsPage />} />
          <Route path="/work-with-us" element={<WorkWithUsPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
