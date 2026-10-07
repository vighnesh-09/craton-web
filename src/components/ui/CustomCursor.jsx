'use client'

import { useEffect, useRef, useState } from 'react'

const INTERACTIVE =
  'a,button,[role="button"],input,textarea,select,label,summary,[data-cursor="hover"]'

/** Settle thresholds — stop the frame loop when idle */
const POS_EPS = 0.08
const SCALE_EPS = 0.002
const VIS_EPS = 0.01

export default function CustomCursor() {
  const [active, setActive] = useState(false)
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
    hovering: false,
    raf: 0,
    running: false,
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
    if (!tip || !ring) return undefined

    const paint = () => {
      tip.style.transform = `translate3d(${s.dx}px,${s.dy}px,0) translate(-50%,-50%)`
      tip.style.opacity = String(s.visible)
      ring.style.transform = `translate3d(${s.rx}px,${s.ry}px,0) translate(-50%,-50%) scale(${s.scale})`
      ring.style.opacity = String(s.visible * 0.9)
    }

    const stop = () => {
      if (s.raf) cancelAnimationFrame(s.raf)
      s.raf = 0
      s.running = false
    }

    const tick = () => {
      s.dx += (s.mx - s.dx) * 0.55
      s.dy += (s.my - s.dy) * 0.55
      s.rx += (s.mx - s.rx) * 0.22
      s.ry += (s.my - s.ry) * 0.22
      s.scale += (s.targetScale - s.scale) * 0.18
      s.visible += (s.targetVisible - s.visible) * 0.2

      paint()

      const moving =
        Math.abs(s.mx - s.dx) > POS_EPS ||
        Math.abs(s.my - s.dy) > POS_EPS ||
        Math.abs(s.mx - s.rx) > POS_EPS ||
        Math.abs(s.my - s.ry) > POS_EPS ||
        Math.abs(s.targetScale - s.scale) > SCALE_EPS ||
        Math.abs(s.targetVisible - s.visible) > VIS_EPS

      if (moving) {
        s.raf = requestAnimationFrame(tick)
      } else {
        // Snap to final values so we don't leave a tiny error
        s.dx = s.mx
        s.dy = s.my
        s.rx = s.mx
        s.ry = s.my
        s.scale = s.targetScale
        s.visible = s.targetVisible
        paint()
        s.running = false
        s.raf = 0
      }
    }

    const kick = () => {
      if (s.running) return
      s.running = true
      s.raf = requestAnimationFrame(tick)
    }

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
        paint()
      }

      const el = e.target
      if (el instanceof Element) {
        const next = Boolean(el.closest(INTERACTIVE))
        if (next !== s.hovering) {
          s.hovering = next
          s.targetScale = next ? 1.45 : 1
        }
      }

      kick()
    }

    const onLeave = () => {
      s.targetVisible = 0
      kick()
    }

    const onEnter = () => {
      if (s.primed) {
        s.targetVisible = 1
        kick()
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      stop()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [active])

  if (!active) return null

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[10000] size-8 rounded-full border border-cursor"
        style={{
          opacity: 0,
          transform: 'translate3d(-100px,-100px,0) translate(-50%,-50%)',
          willChange: 'transform, opacity',
          contain: 'layout style paint',
        }}
      />
      <div
        ref={tipRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[10001] size-1.5 rounded-full bg-cursor"
        style={{
          opacity: 0,
          transform: 'translate3d(-100px,-100px,0) translate(-50%,-50%)',
          willChange: 'transform, opacity',
          contain: 'layout style paint',
        }}
      />
    </>
  )
}
