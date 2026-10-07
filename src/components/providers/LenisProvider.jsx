import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return undefined

    const instance = new Lenis({
      // Whyphy / Cohere-like pacing: long ease, intentional wheel response
      duration: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.25,
      syncTouch: false,
      // Keep native scroll position in sync for Framer / IntersectionObserver
      autoRaf: false,
    })

    setLenis(instance)

    let rafId = 0
    const raf = (time) => {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onChange = () => {
      if (mq.matches) {
        instance.destroy()
        setLenis(null)
        cancelAnimationFrame(rafId)
      }
    }
    mq.addEventListener('change', onChange)

    return () => {
      mq.removeEventListener('change', onChange)
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  )
}

export function useLenis() {
  return useContext(LenisContext)
}
