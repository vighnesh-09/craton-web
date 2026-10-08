/**
 * Programmatic section jumps only. Wheel smoothing stays on the Lenis
 * instance so trackpad and mouse scrolling do not slow down.
 * Ease-out cubic keeps the approach visible for the whole duration.
 * Lenis's own exponential ease spends most of the distance in the first half-second.
 */
export const SECTION_SCROLL_DURATION = 1.85

export function sectionScrollEasing(t) {
  return 1 - (1 - t) ** 3
}

function sectionJump(extra = {}) {
  return {
    duration: SECTION_SCROLL_DURATION,
    easing: sectionScrollEasing,
    ...extra,
  }
}

/**
 * Smooth-scroll to a section id (Lenis when available).
 * Accepts "#products", "/#products", or "products".
 */
export function scrollToId(target, lenis, { offset = -88 } = {}) {
  if (typeof window === 'undefined') return

  const raw = String(target || '')
  const id = raw.includes('#') ? raw.split('#').pop() : raw.replace(/^\//, '')

  if (!id || id === 'top') {
    if (lenis) lenis.scrollTo(0, sectionJump({ offset: 0 }))
    else window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const el = document.getElementById(id)
  if (!el) return

  if (lenis) lenis.scrollTo(el, sectionJump({ offset }))
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })

  try {
    window.history.replaceState(null, '', `#${id}`)
  } catch {
    /* ignore */
  }
}
