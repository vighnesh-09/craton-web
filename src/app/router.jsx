import { createBrowserRouter } from 'react-router-dom'
import SiteLayout from '@/components/layout/SiteLayout'
import {
  LazyHomePage,
  LazyLegalPage,
  LazyNotFoundPage,
} from '@/pages/LazyPages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <LazyHomePage /> },
      { path: 'privacy', element: <LazyLegalPage /> },
      { path: 'terms', element: <LazyLegalPage /> },
      { path: 'accessibility', element: <LazyLegalPage /> },
      { path: '*', element: <LazyNotFoundPage /> },
    ],
  },
])
