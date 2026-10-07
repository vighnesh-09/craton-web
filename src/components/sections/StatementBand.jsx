import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

/** Statement with letter-box crop + scale — more cinematic than a fade. */
export default function StatementBand() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [1.18, 1, 0.92])
  const crop = useTransform(
    scrollYProgress,
    [0, 0.35, 0.85],
    ['inset(18% 12% 18% 12%)', 'inset(0% 0% 0% 0%)', 'inset(8% 4% 8% 4%)'],
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.5],
  )

  if (reduced) {
    return (
      <section
        aria-label="Evidence conviction"
        className="pad-x flex min-h-[36svh] items-center py-[clamp(2.5rem,4vw,4rem)]"
      >
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="mono-label text-accent">The Craton conviction</p>
          <h2 className="mt-6 text-[clamp(2.4rem,7vw,5.6rem)] leading-[0.98] tracking-[-0.045em]">
            Evidence is the product.
            <br />
            <span className="serif text-accent">Everything else is decoration.</span>
          </h2>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      className="relative h-[120vh]"
      aria-label="Evidence conviction"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div
          style={{ clipPath: crop, scale, opacity }}
          className="pad-x mx-auto w-full text-center will-change-transform"
        >
          <p className="mono-label text-accent">The Craton conviction</p>
          <h2 className="mt-4 text-[clamp(2.2rem,6vw,4.8rem)] font-normal leading-[0.98] tracking-[-0.045em]">
            Evidence is the product.
            <br />
            <span className="serif text-accent">Everything else is decoration.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-relaxed text-muted md:text-base">
            In EU MDR / IVDR work and agentic commerce alike, a recommendation is
            only as strong as the proof behind it — rule-traced, human-reviewed,
            ready for scrutiny.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
