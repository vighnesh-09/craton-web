import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'

/** Soft follow — no overshoot, buttery trail */
const RING_SPRING = { stiffness: 120, damping: 22, mass: 0.9, restDelta: 0.001 }
/** Near-instant tip with a hair of smoothing */
const DOT_SPRING = { stiffness: 900, damping: 45, mass: 0.2, restDelta: 0.001 }
const SCALE_SPRING = { stiffness: 260, damping: 28, mass: 0.4 }

export default function CustomCursor() {
  const [active, setActive] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const opacity = useMotionValue(0)
  const hoverScale = useMotionValue(1)

  const dotX = useSpring(mouseX, DOT_SPRING)
  const dotY = useSpring(mouseY, DOT_SPRING)
  const ringX = useSpring(mouseX, RING_SPRING)
  const ringY = useSpring(mouseY, RING_SPRING)
  const scale = useSpring(hoverScale, SCALE_SPRING)

  const tipX = useTransform(dotX, (v) => v - 3.5)
  const tipY = useTransform(dotY, (v) => v - 3.5)
  const ringTX = useTransform(ringX, (v) => v - 18)
  const ringTY = useTransform(ringY, (v) => v - 18)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const enable = () => {
      if (!fine.matches || reduced.matches) {
        setActive(false)
        document.documentElement.classList.remove('has-custom-cursor')
        return
      }
      setActive(true)
      document.documentElement.classList.add('has-custom-cursor')
    }

    enable()
    fine.addEventListener('change', enable)
    reduced.addEventListener('change', enable)

    return () => {
      fine.removeEventListener('change', enable)
      reduced.removeEventListener('change', enable)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  useEffect(() => {
    if (!active) return undefined

    let primed = false

    const onMove = (e) => {
      const { clientX: cx, clientY: cy } = e

      if (!primed) {
        mouseX.jump(cx)
        mouseY.jump(cy)
        dotX.jump(cx)
        dotY.jump(cy)
        ringX.jump(cx)
        ringY.jump(cy)
        opacity.set(1)
        primed = true
        return
      }

      mouseX.set(cx)
      mouseY.set(cy)
      if (opacity.get() !== 1) opacity.set(1)
    }

    const onLeave = () => opacity.set(0)
    const onEnter = () => {
      if (primed) opacity.set(1)
    }

    const onOver = (e) => {
      const el = e.target
      if (!(el instanceof Element)) return
      hoverScale.set(el.closest(INTERACTIVE) ? 1.5 : 1)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
    }
  }, [active, mouseX, mouseY, dotX, dotY, ringX, ringY, opacity, hoverScale])

  if (!active) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[10000] mix-blend-difference"
      style={{ opacity }}
    >
      <motion.div
        className="absolute top-0 left-0 size-9 rounded-full border border-white will-change-transform"
        style={{ x: ringTX, y: ringTY, scale }}
      />
      <motion.div
        className="absolute top-0 left-0 size-[7px] rounded-full bg-white will-change-transform"
        style={{ x: tipX, y: tipY }}
      />
    </motion.div>
  )
}
