import { MotionConfig } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <MotionConfig reducedMotion="user">
          <RouterProvider router={router} />
        </MotionConfig>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
