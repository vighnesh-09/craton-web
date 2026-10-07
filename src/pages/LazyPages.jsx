import { lazy, Suspense } from 'react'
import PageLoader from '@/components/ui/PageLoader'

const HomePage = lazy(() => import('@/pages/HomePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export function LazyHomePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  )
}

export function LazyNotFoundPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <NotFoundPage />
    </Suspense>
  )
}
