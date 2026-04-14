import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'

export function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="min-h-screen bg-white text-[#1e3a5f] flex flex-col">
      <CustomCursor />
      <ScrollProgressBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
