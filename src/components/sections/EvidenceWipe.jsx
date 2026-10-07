import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

/**
 * Unique sticky wipe: problem → clarity revealed by a scroll-driven clip.
 */
export default function EvidenceWipe() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const clip = useTransform(
    scrollYProgress,
    [0.1, 0.85],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
  )
  const label = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0, 0, 1, 1])
  const bar = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%'])

  if (reduced) {
    return (
      <section
        aria-label="From burden to evidence"
        className="pad-x grid gap-6 py-[clamp(2.5rem,4vw,4rem)] md:grid-cols-2"
      >
        <div className="rounded-2xl border border-line bg-ink-2 p-8">
          <p className="mono-label text-muted">Before</p>
          <h2 className="mt-4 text-2xl tracking-tight">
            Thousands of pages. Manual mapping. Deadline pressure.
          </h2>
        </div>
        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8">
          <p className="mono-label text-accent">After</p>
          <h2 className="mt-4 text-2xl tracking-tight">
            Requirement → evidence → human review, in one defended view.
          </h2>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      id="wipe"
      className="relative h-[150vh]"
      aria-label="From burden to evidence"
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0 flex items-center bg-[#0a1412] pad-x">
          <div className="shell w-full">
            <p className="mono-label text-[#8ebdb0]">The burden</p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(2.4rem,6vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.045em] text-[#eef8f4]">
              Thousands of pages.
              <br />
              Manual mapping.
              <br />
              <span className="text-[#8ebdb0]">Deadline pressure.</span>
            </h2>
            <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-[#8ebdb0]">
              GSPR gap assessment and classification still force teams to rebuild
              the argument by hand — every submission cycle.
            </p>
          </div>
        </div>

        <motion.div
          style={{ clipPath: clip }}
          className="absolute inset-0 flex items-center bg-[linear-gradient(135deg,#0f8f7b_0%,#0b6f60_48%,#152821_100%)] pad-x"
        >
          <div className="shell w-full">
            <motion.p
              style={{ opacity: label }}
              className="mono-label text-white/80"
            >
              The Craton cut
            </motion.p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(2.4rem,6vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.045em] text-white">
              Requirement.
              <br />
              Evidence.
              <br />
              <span className="serif">Human judgment.</span>
            </h2>
            <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-white/85">
              RAccelerator surfaces the defended path — rule-traced,
              document-linked, ready for expert review.
            </p>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 pad-x sm:bottom-8">
          <div className="shell flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
              Wipe
            </span>
            <div className="h-px flex-1 overflow-hidden bg-white/20">
              <motion.div className="h-full bg-white" style={{ width: bar }} />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
              Clarity
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
