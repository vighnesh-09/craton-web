'use client'

import { MotionConfig } from 'framer-motion'
import Footer from '@/components/layout/Footer'
import HashScroll from '@/components/layout/HashScroll'
import Navbar from '@/components/layout/Navbar'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
// import CustomCursor from '@/components/ui/CustomCursor'
import BackToTop from '@/components/ui/BackToTop'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ScrollToTop from '@/components/ui/ScrollToTop'
import SkipLink from '@/components/ui/SkipLink'

export default function Providers({ children }) {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <ThemeProvider>
          <LenisProvider>
            <HashScroll />
            <div className="min-h-screen bg-foam text-ink">
              <SkipLink />
              <ScrollToTop />
              <ScrollProgress />
              <BackToTop />
              {/* <CustomCursor /> */}
              <Navbar />
              <main id="main-content" tabIndex={-1} className="outline-none">
                {children}
              </main>
              <Footer />
            </div>
          </LenisProvider>
        </ThemeProvider>
      </MotionConfig>
    </ErrorBoundary>
  )
}
