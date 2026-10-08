'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from '@/components/providers/LenisProvider'

/** Lenis has anchors disabled, so a URL hash needs an explicit scroll after navigation. */
export default function HashScroll() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '')
    if (!id) return undefined

    const timer = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      if (lenis) lenis.scrollTo(el, { offset: -88, duration: 1.05 })
      else el.scrollIntoView()
    }, 60)

    return () => window.clearTimeout(timer)
  }, [pathname, lenis])

  return null
}
