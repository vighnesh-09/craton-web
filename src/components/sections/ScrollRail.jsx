import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const TRACK_A = [
  'EU MDR',
  'IVDR',
  'GSPR gap assessment',
  'Regulatory AI',
  'Human in the loop',
  'Evidence systems',
]
const TRACK_B = [
  'RAccelerator',
  'ReviewsIntel',
  'Technical documentation',
  'Device classification',
  'Agentic commerce',
  'Patent-first',
]

/** Dual opposing marquees — Whyphy-style motion energy, Craton keywords (SEO-visible). */
export default function ScrollRail() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const xA = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])
  const xB = useTransform(scrollYProgress, [0, 1], ['-28%', '0%'])

  return (
    <section
      ref={ref}
      aria-label="Craton focus areas"
      className="relative overflow-hidden border-y border-line py-3 sm:py-4"
    >
      <p className="sr-only">
        Craton focuses on EU MDR, IVDR, GSPR gap assessment, regulatory AI,
        RAccelerator, and ReviewsIntel for evidence-heavy work.
      </p>

      {reduced ? (
        <div className="pad-x flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-muted">
          {[...TRACK_A, ...TRACK_B].slice(0, 8).map((word) => (
            <span key={word}>{word}</span>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <MarqueeRow style={{ x: xA }} words={[...TRACK_A, ...TRACK_A]} />
          <MarqueeRow
            style={{ x: xB }}
            words={[...TRACK_B, ...TRACK_B]}
            muted
          />
        </div>
      )}
    </section>
  )
}

function MarqueeRow({ words, style, muted }) {
  return (
    <motion.div
      style={style}
      className="flex w-max gap-8 whitespace-nowrap px-6 will-change-transform sm:gap-12"
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={
            muted
              ? 'text-[clamp(1.35rem,3.2vw,2.4rem)] font-normal tracking-[-0.03em] text-muted/55'
              : 'text-[clamp(1.6rem,3.8vw,2.85rem)] font-medium tracking-[-0.04em] text-cream/90'
          }
        >
          {word}
          <span className="mx-3 text-accent/50" aria-hidden>
            ·
          </span>
        </span>
      ))}
    </motion.div>
  )
}
