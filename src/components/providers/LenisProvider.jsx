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

    const instance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.2,
      syncTouch: false,
      autoRaf: false,
    })

    instance.on('scroll', ScrollTrigger.update)

    const ticker = (time) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)
    // After layout + fonts, remeasure pins so scrub ranges stay honest
    ScrollTrigger.refresh()
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 400)

    const onChange = () => {
      if (mq.matches) {
        gsap.ticker.remove(ticker)
        instance.destroy()
        setLenis(null)
      }
    }
    mq.addEventListener('change', onChange)

    const onResize = () => ScrollTrigger.refresh()
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
      instance.scrollTo(el, { offset: -12, immediate: false })
      if (raw !== id) {
        history.pushState(null, '', `#${raw}`)
      } else {
        history.pushState(null, '', `#${id}`)
      }
      window.setTimeout(() => ScrollTrigger.refresh(), 50)
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      window.clearTimeout(refreshTimer)
      mq.removeEventListener('change', onChange)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('click', onAnchorClick)
      gsap.ticker.remove(ticker)
      instance.destroy()
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
