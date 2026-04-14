import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { PracticeAreasPage } from '@/pages/PracticeAreasPage'
import { ClassActionsPage } from '@/pages/ClassActionsPage'
import { AboutPage } from '@/pages/AboutPage'
import { TeamPage } from '@/pages/TeamPage'
import { AwardsPage } from '@/pages/AwardsPage'
import { ContactPage } from '@/pages/ContactPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/practice-areas" element={<PracticeAreasPage />} />
          <Route path="/class-actions" element={<ClassActionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
