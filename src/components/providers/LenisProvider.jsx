import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { ensureGsap } from '@/lib/gsap'

const LenisContext = createContext(null)

/** Product card ids live inside the pinned #products stage — scroll the stage. */
const HASH_ALIASES = {
  raccelerator: 'products',
  reviewsintel: 'products',
}

/**
 * Smooth scroll (Lenis) synced with GSAP ScrollTrigger —
 * same pairing used on award-site / GSAP demos.
 */
export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return undefined

    const { ScrollTrigger, gsap } = ensureGsap()
    let instance
    let refreshSoon = 0
    let refreshTimer = 0
    let ticker = () => {}
    let detach = () => {}

    const boot = window.requestAnimationFrame(() => {
    // lerp (not duration) so wheel/touch samples damp every frame.
    // Duration+easing wins in Lenis 1.3 and ignores lerp, which feels stepped.
    instance = new Lenis({
      // Per-frame follow (no duration ease). ~0.06 lets the page ease into
      // the wheel instead of tracking each tick. Touch lerp is a touch
      // lower so a flick glides about 1.1s before it settles.
      lerp: 0.06,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: true,
      syncTouchLerp: 0.055,
      touchInertiaExponent: 1.7,
      autoRaf: false,
      respectReducedMotion: true,
    })

    instance.on('scroll', ScrollTrigger.update)

    ticker = (time) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)
    // Remeasure pins after the first paint so startup does not force layout
    // in the same turn as the click or the first frame.
    refreshSoon = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => ScrollTrigger.refresh())
    })
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 400)

    const onChange = () => {
      if (mq.matches) {
        gsap.ticker.remove(ticker)
        instance.destroy()
        setLenis(null)
      }
    }
    mq.addEventListener('change', onChange)

    const onResize = () => {
      window.requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    window.addEventListener('resize', onResize)

    // Native <a href="#…"> bypasses Lenis and desyncs ScrollTrigger pins
    const onAnchorClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]')
      if (!anchor || event.defaultPrevented || event.metaKey || event.ctrlKey)
        return
      const raw = anchor.getAttribute('href')?.slice(1)
      if (!raw) return
      const id = HASH_ALIASES[raw] || raw
      const el = document.getElementById(id)
      if (!el) return
      event.preventDefault()
      // Paint the click first. Scroll and pin refresh run on a later frame.
      window.setTimeout(() => {
        instance.scrollTo(el, { offset: -12, immediate: false })
        if (raw !== id) {
          history.pushState(null, '', `#${raw}`)
        } else {
          history.pushState(null, '', `#${id}`)
        }
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => ScrollTrigger.refresh())
        })
      }, 0)
    }
    document.addEventListener('click', onAnchorClick)
    detach = () => {
      mq.removeEventListener('change', onChange)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('click', onAnchorClick)
    }
    })

    return () => {
      window.cancelAnimationFrame(boot)
      window.cancelAnimationFrame(refreshSoon)
      window.clearTimeout(refreshTimer)
      detach()
      gsap.ticker.remove(ticker)
      instance?.destroy()
      setLenis(null)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  )
}

export function useLenis() {
  return useContext(LenisContext)
}
