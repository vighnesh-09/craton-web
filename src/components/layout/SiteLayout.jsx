import { Outlet } from 'react-router-dom'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ScrollToTop from '@/components/ui/ScrollToTop'
import SkipLink from '@/components/ui/SkipLink'

export default function SiteLayout() {
  return (
    <div className="min-h-screen">
      <SkipLink />
      <ScrollToTop />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
