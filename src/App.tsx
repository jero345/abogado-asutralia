import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { PracticeAreas } from '@/components/sections/PracticeAreas'
import { ClassActions } from '@/components/sections/ClassActions'
import { About } from '@/components/sections/About'
import { Team } from '@/components/sections/Team'
import { Technology } from '@/components/sections/Technology'
import { Contact } from '@/components/sections/Contact'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'

function App() {
  return (
    <div className="min-h-screen bg-white text-[#1e3a5f]">
      <CustomCursor />
      <ScrollProgressBar />
      <Header />
      <main>
        <Hero />
        <Stats />
        <PracticeAreas />
        <ClassActions />
        <About />
        <Team />
        <Technology />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
