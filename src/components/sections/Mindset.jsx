import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

/**
 * Dense editorial beliefs — all three always visible.
 * Scroll softly highlights the active belief (no full-viewport sticky void).
 * Distinct from Domain card-swap and Products dual cards.
 */
export default function Mindset() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.7', 'end 0.35'],
  })

  const rail = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={ref}
      id="mindset"
      className="pad-x relative py-[clamp(2.5rem,4vw,4rem)]"
      aria-label="The Craton mindset"
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[36rem]">
            <p className="mono-label text-accent">01 / The Craton mindset</p>
            <Reveal
              as="h2"
              className="mt-3 text-[clamp(1.75rem,3.2vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.04em]"
            >
              The next breakthrough starts with a{' '}
              <span className="serif text-accent">better question.</span>
            </Reveal>
          </div>
          {!reduced && (
            <div className="w-full max-w-[12rem] sm:w-40">
              <div className="h-1 overflow-hidden rounded-full bg-line">
                <motion.div
                  style={{ width: rail }}
                  className="h-full bg-accent"
                />
              </div>
              <p className="mono-label mt-2 text-muted">Beliefs · 03</p>
            </div>
          )}
        </div>

        <ol className="mt-8 grid gap-0 border-t border-line md:grid-cols-3">
          {site.beliefs.map((belief, i) =>
            reduced ? (
              <li
                key={belief.title}
                className={panelClass}
              >
                <BeliefBody belief={belief} index={i} />
              </li>
            ) : (
              <BeliefPanel
                key={belief.title}
                belief={belief}
                index={i}
                total={site.beliefs.length}
                progress={scrollYProgress}
              />
            ),
          )}
        </ol>
      </div>
    </section>
  )
}

const panelClass = cn(
  'border-line py-7 md:border-r md:px-6 md:py-8',
  'md:first:pl-0 md:last:border-r-0 md:last:pr-0',
)

function BeliefBody({ belief, index }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="serif text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-accent/30">
          “
        </span>
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
          0{index + 1}
        </span>
      </div>
      <h3 className="-mt-2 text-[clamp(1.2rem,2vw,1.45rem)] font-medium leading-snug tracking-tight">
        {belief.title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.65] text-muted">{belief.body}</p>
      <footer className="mono-label mt-5 text-accent">
        Belief 0{index + 1} · Craton method
      </footer>
    </>
  )
}

function BeliefPanel({ belief, index, total, progress }) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(
    progress,
    [start, start + 0.12, end - 0.08, end],
    index === 0
      ? [1, 1, 1, 0.62]
      : index === total - 1
        ? [0.62, 1, 1, 1]
        : [0.62, 1, 1, 0.62],
  )

  return (
    <motion.li style={{ opacity }} className={panelClass}>
      <BeliefBody belief={belief} index={index} />
    </motion.li>
  )
}
