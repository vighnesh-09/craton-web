import { Outlet } from 'react-router-dom'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollToTop from '@/components/ui/ScrollToTop'
import SkipLink from '@/components/ui/SkipLink'

export default function SiteLayout() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <div className="min-h-screen bg-foam text-ink">
          <SkipLink />
          <ScrollToTop />
          <CustomCursor />
          <Navbar />
          <main id="main-content" tabIndex={-1} className="outline-none">
            <Outlet />
          </main>
          <Footer />
        </div>
      </LenisProvider>
    </ThemeProvider>
  )
}
