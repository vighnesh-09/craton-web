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

    const refreshFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => ScrollTrigger.refresh())
    })
    // Second pass after layout settles (images / pin spacers / Lenis)
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200)

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      window.clearTimeout(t)
      ctx.revert()
    }
  }, [reduced, ...deps])

  return { rootRef, reduced }
}

/** Short fade/slide once, when the section enters. No pin, no scrub.
 * Uses the `translate` property so hover `transform` lifts stay free. */
export function revealOnce({ gsap, ScrollTrigger, root, stagger = 0.08 }) {
  const items = root.querySelectorAll('[data-reveal]')
  if (!items.length) return

  let played = false
  const play = () => {
    if (played) return
    played = true
    gsap.killTweensOf(items)
    gsap.set(items, { clearProps: 'all' })
    items.forEach((el, i) => {
      el.style.animation = `craton-rise 0.48s cubic-bezier(0.22, 1, 0.36, 1) ${i * stagger}s both`
      el.addEventListener(
        'animationend',
        () => {
          el.style.animation = 'none'
        },
        { once: true },
      )
    })
  }

  const trigger = ScrollTrigger.create({
    trigger: root,
    start: 'top 92%',
    once: true,
    onEnter: play,
  })

  if (trigger.progress > 0) play()
}
