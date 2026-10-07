'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from '@/components/providers/LenisProvider'
import { scrollToId } from '@/lib/scroll'

export default function ScrollToTop() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : ''

    if (hash) {
      // Defer until layout is ready (Lenis + sections mounted)
      const t = window.setTimeout(() => scrollToId(hash, lenis), 50)
      return () => window.clearTimeout(t)
    }

    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, left: 0 })
  }, [pathname, lenis])

  return null
}
