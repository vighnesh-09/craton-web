import { useEffect } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

/**
 * Scroll-linked page atmosphere — subtle hue shift on --glow / scene orbs.
 * Unique ambient layer without competing with section content.
 */
export default function ScrollAtmosphere() {
  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const root = document.documentElement
    const teal = 15 + v * 30
    const ember = 0.18 + v * 0.2
    root.style.setProperty(
      '--scroll-glow',
      `rgba(${Math.round(teal)}, ${Math.round(140 + v * 60)}, ${Math.round(110 + v * 40)}, ${0.2 + v * 0.15})`,
    )
    root.style.setProperty('--scroll-ember', `rgba(224, 154, 95, ${ember})`)
    root.style.setProperty('--scroll-shift', `${(v * 12).toFixed(2)}deg`)
  })

  useEffect(() => {
    return () => {
      const root = document.documentElement
      root.style.removeProperty('--scroll-glow')
      root.style.removeProperty('--scroll-ember')
      root.style.removeProperty('--scroll-shift')
    }
  }, [])

  return null
}
