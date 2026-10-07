import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const LINES = [
  { text: 'Invent.', accent: false },
  { text: 'Protect.', accent: true },
  { text: 'Assemble.', accent: false },
  { text: 'Ship.', accent: true },
]

/** Giant scrubbed method words — high-impact scroll beat. */
export default function ScaleWords() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  if (reduced) {
    return (
      <section
        aria-label="Craton method words"
        className="pad-x py-[clamp(2.5rem,4vw,4rem)] text-center"
      >
        <p className="text-[clamp(2rem,6vw,4rem)] tracking-tight">
          Invent. Protect. Assemble. Ship.
        </p>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      className="relative h-[140vh]"
      aria-label="Craton method words"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden pad-x">
        <ul className="w-full space-y-1.5 text-center sm:space-y-2">
          {LINES.map((line, i) => (
            <ScaleLine
              key={line.text}
              line={line}
              index={i}
              total={LINES.length}
              progress={scrollYProgress}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

function ScaleLine({ line, index, total, progress }) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(
    progress,
    [start, start + 0.15, end - 0.05, end],
    [0.15, 1, 1, 0.2],
  )
  const scale = useTransform(
    progress,
    [start, start + 0.2, end],
    [0.88, 1.04, 0.96],
  )
  const x = useTransform(
    progress,
    [start, end],
    [index % 2 === 0 ? -40 : 40, 0],
  )

  return (
    <motion.li
      style={{ opacity, scale, x }}
      className={
        line.accent
          ? 'serif text-[clamp(2.8rem,9vw,7rem)] leading-[0.95] tracking-[-0.04em] text-accent'
          : 'text-[clamp(2.6rem,8.5vw,6.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.05em]'
      }
    >
      {line.text}
    </motion.li>
  )
}
