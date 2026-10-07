'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from '@/components/providers/LenisProvider'

export default function ScrollToTop() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : ''

    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -80 })
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    if (lenis) lenis.scrollTo(0, { immediate: false })
    else window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname, lenis])

  return null
}
