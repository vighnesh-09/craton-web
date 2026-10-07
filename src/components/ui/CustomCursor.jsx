'use client'

import { useEffect, useRef, useState } from 'react'

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'

/** Lower = silkier trail; ~0.08–0.14 feels premium */
const RING_LERP = 0.1
const DOT_LERP = 0.55
const SCALE_LERP = 0.14

export default function CustomCursor() {
  const [active, setActive] = useState(false)
  const rootRef = useRef(null)
  const tipRef = useRef(null)
  const ringRef = useRef(null)
  const state = useRef({
    mx: -100,
    my: -100,
    dx: -100,
    dy: -100,
    rx: -100,
    ry: -100,
    scale: 1,
    targetScale: 1,
    visible: 0,
    targetVisible: 0,
    primed: false,
    raf: 0,
  })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => {
      const on = fine.matches && !reduced.matches
      setActive(on)
      document.documentElement.classList.toggle('has-custom-cursor', on)
    }

    sync()
    fine.addEventListener('change', sync)
    reduced.addEventListener('change', sync)
    return () => {
      fine.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  useEffect(() => {
    if (!active) return undefined

    const s = state.current
    const tip = tipRef.current
    const ring = ringRef.current
    const root = rootRef.current
    if (!tip || !ring || !root) return undefined

    const onMove = (e) => {
      s.mx = e.clientX
      s.my = e.clientY
      s.targetVisible = 1

      if (!s.primed) {
        s.dx = s.mx
        s.dy = s.my
        s.rx = s.mx
        s.ry = s.my
        s.visible = 1
        s.primed = true
      }
    }

    const onLeave = () => {
      s.targetVisible = 0
    }

    const onEnter = () => {
      if (s.primed) s.targetVisible = 1
    }

    const onOver = (e) => {
      const el = e.target
      if (!(el instanceof Element)) return
      s.targetScale = el.closest(INTERACTIVE) ? 1.55 : 1
    }

    const tick = () => {
      s.dx += (s.mx - s.dx) * DOT_LERP
      s.dy += (s.my - s.dy) * DOT_LERP
      s.rx += (s.mx - s.rx) * RING_LERP
      s.ry += (s.my - s.ry) * RING_LERP
      s.scale += (s.targetScale - s.scale) * SCALE_LERP
      s.visible += (s.targetVisible - s.visible) * 0.18

      tip.style.transform = `translate3d(${s.dx}px, ${s.dy}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%) scale(${s.scale})`
      root.style.opacity = String(s.visible)

      s.raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver, { passive: true })
    s.raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(s.raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
    }
  }, [active])

  if (!active) return null

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[10000] mix-blend-difference"
      style={{ opacity: 0 }}
    >
      <div
        ref={ringRef}
        className="absolute top-0 left-0 size-9 rounded-full border border-cursor will-change-transform"
        style={{ transform: 'translate3d(-100px,-100px,0) translate(-50%,-50%)' }}
      />
      <div
        ref={tipRef}
        className="absolute top-0 left-0 size-[7px] rounded-full bg-cursor will-change-transform"
        style={{ transform: 'translate3d(-100px,-100px,0) translate(-50%,-50%)' }}
      />
    </div>
  )
}
