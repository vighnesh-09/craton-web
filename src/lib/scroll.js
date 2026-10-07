/**
 * Smooth-scroll to a section id (Lenis when available).
 * Accepts "#products", "/#products", or "products".
 */
export function scrollToId(target, lenis, { offset = -88 } = {}) {
  if (typeof window === 'undefined') return

  const raw = String(target || '')
  const id = raw.includes('#') ? raw.split('#').pop() : raw.replace(/^\//, '')

  if (!id || id === 'top') {
    if (lenis) lenis.scrollTo(0, { offset: 0, duration: 1.1 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const el = document.getElementById(id)
  if (!el) return

  if (lenis) lenis.scrollTo(el, { offset, duration: 1.15 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })

  try {
    window.history.replaceState(null, '', `#${id}`)
  } catch {
    /* ignore */
  }
}
