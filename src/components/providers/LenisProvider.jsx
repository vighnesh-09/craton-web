'use client'

import { cancelFrame, frame } from 'framer-motion'
import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState } from 'react'

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const instance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 0.92,
      anchors: false,
    })

    setLenis(instance)

    const update = ({ timestamp }) => {
      instance.raf(timestamp)
    }
    frame.update(update, true)

    // Keep native scroll listeners in sync for UI that reads scrollY
    const onLenisScroll = () => {
      window.dispatchEvent(new Event('scroll'))
    }
    instance.on('scroll', onLenisScroll)

    return () => {
      instance.off('scroll', onLenisScroll)
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
