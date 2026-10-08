/** Shared motion language — GSAP-like easing without a new dependency. */
export const easeOutExpo = [0.16, 1, 0.3, 1]
export const easeOutQuart = [0.25, 1, 0.5, 1]
export const easeInOutCubic = [0.65, 0, 0.35, 1]

export const revealTransition = (delay = 0) => ({
  duration: 0.75,
  delay,
  ease: easeOutExpo,
})

export const stickyOffsets = ['start start', 'end end']
