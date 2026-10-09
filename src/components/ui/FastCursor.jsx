import { useEffect, useRef, useState } from 'react'

const HOT = 'a, button, [role="button"], input, textarea, select, summary, label'

/**
 * Fine-pointer cursor: the dot snaps to the pointer; the ring lerps in one frame budget (~50ms).
 * Coarse pointers and reduced motion keep the native cursor.
 */
export default function FastCursor() {
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setActive(fine.matches && !reduce.matches)
    sync()
    fine.addEventListener('change', sync)
    reduce.addEventListener('change', sync)
    return () => {
      fine.removeEventListener('change', sync)
      reduce.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!active) return undefined
    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!root || !dot || !ring) return undefined

    document.documentElement.classList.add('has-cursor')

    const pos = { x: -40, y: -40 }
    const ringPos = { x: -40, y: -40 }
    let raf = 0
    let live = true

    const place = (el, x, y, scale) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`
    }

    const tick = () => {
      if (!live || document.hidden) {
        raf = 0
        return
      }
      ringPos.x += (pos.x - ringPos.x) * 0.55
      ringPos.y += (pos.y - ringPos.y) * 0.55
      const hot = root.dataset.hot === '1'
      place(ring, ringPos.x, ringPos.y, hot ? 0.72 : 1)
      raf = requestAnimationFrame(tick)
    }

    const arm = () => {
      if (!raf && !document.hidden) raf = requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      pos.x = event.clientX
      pos.y = event.clientY
      const hot = root.dataset.hot === '1'
      place(dot, pos.x, pos.y, hot ? 0.55 : 1)
      root.dataset.on = '1'
      arm()
    }

    const onOver = (event) => {
      const node = event.target
      root.dataset.hot = node?.closest?.(HOT) ? '1' : '0'
    }

    const onLeave = () => {
      root.dataset.on = '0'
    }

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else {
        arm()
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVis)

    return () => {
      live = false
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [active])

  if (!active) return null

  return (
    <div ref={rootRef} className="fast-cursor" data-on="0" data-hot="0" aria-hidden="true">
      <span ref={ringRef} className="fast-cursor__ring" />
      <span ref={dotRef} className="fast-cursor__dot" />
    </div>
  )
}
