import { createBrowserRouter } from 'react-router-dom'
import SiteLayout from '@/components/layout/SiteLayout'
import { LazyHomePage, LazyNotFoundPage } from '@/pages/LazyPages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <LazyHomePage /> },
      { path: '*', element: <LazyNotFoundPage /> },
    ],
  },
])
