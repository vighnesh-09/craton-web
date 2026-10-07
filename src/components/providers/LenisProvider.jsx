import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return undefined

    const instance = new Lenis({
      // Agency-grade pacing: longer ease, soft wheel — scroll feels intentional
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.35,
      syncTouch: false,
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
