import { cancelFrame, frame } from 'framer-motion'
import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState } from 'react'

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    // Drive Lenis from Framer Motion's single frame loop so scroll +
    // useScroll / useTransform stay in sync (avoids dual-RAF jank).
    const instance = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 0.95,
    })

    setLenis(instance)

    const update = ({ timestamp }) => {
      instance.raf(timestamp)
    }
    frame.update(update, true)

    return () => {
      cancelFrame(update)
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
