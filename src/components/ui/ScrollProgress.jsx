'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/**
 * Site-wide reading progress — replaces the native scrollbar.
 */
export default function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduced ? 1000 : 140,
    damping: reduced ? 100 : 28,
    mass: 0.2,
  })

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] h-1"
      style={{
        background:
          'linear-gradient(90deg, var(--craton), color-mix(in srgb, var(--ink) 35%, var(--craton)))',
      }}
    >
      <motion.div
        className="relative h-full origin-left"
        style={{
          scaleX,
          background:
            'linear-gradient(90deg, var(--lagoon-deep), var(--copper) 55%, var(--lagoon))',
          boxShadow: '0 0 12px color-mix(in srgb, var(--copper) 55%, transparent)',
        }}
      />
    </div>
  )
}
