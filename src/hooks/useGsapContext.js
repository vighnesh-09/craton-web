import { useEffect, useRef } from 'react'
import { ensureGsap } from '@/lib/gsap'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * Run a GSAP setup fn inside gsap.context (auto-cleanup on unmount).
 * Skips when prefers-reduced-motion.
 */
export default function useGsapContext(setup, deps = []) {
  const rootRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !rootRef.current) return undefined

    const { gsap, ScrollTrigger } = ensureGsap()
    const ctx = gsap.context(() => {
      setup({ gsap, ScrollTrigger, root: rootRef.current })
    }, rootRef)

    ScrollTrigger.refresh()
    // Second pass after layout settles (images / pin spacers / Lenis)
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200)

    return () => {
      window.clearTimeout(t)
      ctx.revert()
    }
  }, [reduced, ...deps])

  return { rootRef, reduced }
}
