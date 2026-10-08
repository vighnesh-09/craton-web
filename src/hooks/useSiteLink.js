'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLenis } from '@/components/providers/LenisProvider'
import { scrollToId } from '@/lib/scroll'

/**
 * Homepage hashes scroll in place. From any other page they return home.
 * Ordinary paths navigate. Modifier-clicks keep the browser default.
 */
export function useSiteLink() {
  const pathname = usePathname()
  const router = useRouter()
  const lenis = useLenis()

  return (href) => (event) => {
    if (!event) return
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }

    const raw = String(href || '')
    if (
      raw.startsWith('mailto:') ||
      raw.startsWith('http://') ||
      raw.startsWith('https://')
    ) {
      return
    }

    event.preventDefault()

    const hash = raw.includes('#') ? raw.split('#').pop() : ''
    const pathOnly = raw.split('#')[0]
    const onHome = pathname === '/'

    if (pathOnly && pathOnly !== '/' && pathOnly.startsWith('/')) {
      router.push(raw)
      return
    }

    if (!onHome) {
      router.push(hash && hash !== 'top' ? `/#${hash}` : '/')
      return
    }

    scrollToId(hash && hash !== 'top' ? `#${hash}` : '#top', lenis)
  }
}
