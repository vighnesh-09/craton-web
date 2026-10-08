'use client'

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
      autoRaf: false,
    })

    setLenis(instance)

    let rafId = 0
    let pending = false

    const loop = (time) => {
      pending = false
      instance.raf(time)
      // Keep frames only while a smooth jump is in flight. Idle pages must
      // not reschedule, and this callback must not emit a native scroll —
      // Lenis's onNativeScroll would re-enter and overflow the stack.
      if (instance.isScrolling === 'smooth' || pending) {
        rafId = requestAnimationFrame(loop)
      } else {
        rafId = 0
      }
    }

    const kick = () => {
      pending = true
      if (rafId) return
      rafId = requestAnimationFrame(loop)
    }

    instance.on('virtual-scroll', kick)

    const scrollTo = instance.scrollTo.bind(instance)
    instance.scrollTo = (target, options) => {
      const result = scrollTo(target, options)
      kick()
      return result
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      instance.off('virtual-scroll', kick)
      instance.scrollTo = scrollTo
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
