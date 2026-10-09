import { Outlet } from 'react-router-dom'
import ScrollAtmosphere from '@/components/craton/ScrollAtmosphere'
import ScrollWorld from '@/components/craton/ScrollWorld'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import FastCursor from '@/components/ui/FastCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ScrollToTop from '@/components/ui/ScrollToTop'
import SkipLink from '@/components/ui/SkipLink'

export default function SiteLayout() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <div className="relative min-h-screen bg-ink text-cream">
          <ScrollWorld />
          <ScrollAtmosphere />
          <FastCursor />
          <SkipLink />
          <ScrollProgress />
          <ScrollToTop />
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
