'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from '@/components/providers/LenisProvider'
import { SECTION_SCROLL_DURATION, sectionScrollEasing } from '@/lib/scroll'

const NAV_OFFSET = -88
/** Recheck after the jump finishes, so a retry does not restart it mid-ease. */
const HASH_RETRY_MS = Math.round(SECTION_SCROLL_DURATION * 1000) + 120

function hashId() {
  return window.location.hash.replace(/^#/, '')
}

function isSettled(top) {
  return top >= 40 && top <= 180
}

/**
 * Lenis disables native anchors, and its scroll limit stays on the previous
 * page until dimensions are refreshed. Next also applies the hash without a
 * hashchange event, sometimes after the pathname effect's first pass.
 */
function alignToHash(lenis) {
  const id = hashId()
  if (!id) return 'empty'

  if (id === 'top') {
    if (window.scrollY < 8) return 'done'
    if (lenis) {
      lenis.resize()
      lenis.scrollTo(0, {
        offset: 0,
        duration: SECTION_SCROLL_DURATION,
        easing: sectionScrollEasing,
        force: true,
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return 'moved'
  }

  const el = document.getElementById(id)
  if (!el) return 'missing'

  const top = el.getBoundingClientRect().top
  if (isSettled(top)) return 'done'

  if (lenis) {
    lenis.resize()
    lenis.scrollTo(el, {
      offset: NAV_OFFSET,
      duration: SECTION_SCROLL_DURATION,
      easing: sectionScrollEasing,
      force: true,
    })
  } else {
    const y = top + window.scrollY + NAV_OFFSET
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
  }
  return 'moved'
}

export default function HashScroll() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    let cancelled = false
    const timers = []
    let polls = 0
    let moves = 0

    const clearTimers = () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      timers.length = 0
    }

    const later = (fn, ms) => {
      const timer = window.setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
      timers.push(timer)
    }

    const chase = () => {
      if (cancelled) return
      const result = alignToHash(lenis)

      if (result === 'done') return

      if (result === 'moved') {
        moves += 1
        if (moves >= 4) return
        later(chase, HASH_RETRY_MS)
        return
      }

      polls += 1
      if (result === 'empty' && polls >= 18) return
      if (polls >= 24) return
      later(chase, 80)
    }

    const start = () => {
      clearTimers()
      polls = 0
      moves = 0
      chase()
    }

    start()
    window.addEventListener('hashchange', start)

    return () => {
      cancelled = true
      clearTimers()
      window.removeEventListener('hashchange', start)
    }
  }, [pathname, lenis])

  return null
}
