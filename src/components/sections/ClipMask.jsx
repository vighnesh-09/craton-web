import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

/**
 * Type revealed through a scroll-driven mask — distinctive, not a card stack.
 */
export default function ClipMask() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const clip = useTransform(
    scrollYProgress,
    [0.05, 0.7],
    ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'],
  )
  const sub = useTransform(scrollYProgress, [0.45, 0.75], [0, 1])

  if (reduced) {
    return (
      <section className="pad-x py-[clamp(2.5rem,4vw,4rem)] text-center" aria-label="Patent-first">
        <h2 className="text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.045em]">
          Patent-first.
          <br />
          Then product.
        </h2>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      className="relative h-[130vh]"
      aria-label="Patent-first"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden pad-x">
        <div className="relative mx-auto w-full text-center">
          <p
            aria-hidden
            className="text-[clamp(2.4rem,7vw,5.5rem)] font-normal leading-[0.98] tracking-[-0.045em] text-cream/10"
          >
            Patent-first.
            <br />
            Then product.
          </p>

          <motion.h2
            style={{ clipPath: clip }}
            className="absolute inset-0 text-[clamp(2.4rem,7vw,5.5rem)] font-normal leading-[0.98] tracking-[-0.045em]"
          >
            Patent-first.
            <br />
            <span className="serif text-accent">Then product.</span>
          </motion.h2>

          <motion.p
            style={{ opacity: sub }}
            className="mx-auto mt-10 max-w-[42ch] text-[15px] leading-relaxed text-muted sm:mt-14"
          >
            Novel approaches are filed before they are built — so enterprises can
            invest in a young company with confidence.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
