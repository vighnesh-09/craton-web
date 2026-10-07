import { MotionConfig } from 'framer-motion'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </ErrorBoundary>
  )
}
