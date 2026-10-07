import { lazy, Suspense } from 'react'
import PageLoader from '@/components/ui/PageLoader'

const HomePage = lazy(() => import('@/pages/HomePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const LegalPage = lazy(() => import('@/pages/LegalPage'))

function wrap(Page) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  )
}

export function LazyHomePage() {
  return wrap(HomePage)
}

export function LazyNotFoundPage() {
  return wrap(NotFoundPage)
}

export function LazyLegalPage() {
  return wrap(LegalPage)
}
