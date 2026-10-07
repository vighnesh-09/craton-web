import { Outlet } from 'react-router-dom'
import ScrollWorld from '@/components/craton/ScrollWorld'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollToTop from '@/components/ui/ScrollToTop'
import SkipLink from '@/components/ui/SkipLink'

export default function SiteLayout() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <div className="relative min-h-screen bg-ink text-cream">
          <ScrollWorld />
          <SkipLink />
          <ScrollToTop />
          <CustomCursor />
          <Header />
          <main id="main-content" tabIndex={-1} className="relative z-10 outline-none">
            <Outlet />
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </LenisProvider>
    </ThemeProvider>
  )
}
