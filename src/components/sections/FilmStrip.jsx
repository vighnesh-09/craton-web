import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const FRAMES = [
  {
    n: '01',
    title: 'Ingest the file',
    body: 'Technical documentation enters once — structured for mapping, not buried in folders.',
  },
  {
    n: '02',
    title: 'Map to Annex I',
    body: 'Each GSPR row finds candidate evidence with the rule path shown beside it.',
  },
  {
    n: '03',
    title: 'Surface the gaps',
    body: 'Critical holes rise first so experts spend judgment where it matters.',
  },
  {
    n: '04',
    title: 'Defend the call',
    body: 'Human review stays central — the system shows the argument, not a black box.',
  },
]

/** Horizontal film scrubbed by vertical scroll — unique motion beat. */
export default function FilmStrip() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-58%'])
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 1, 0.7])

  if (reduced) {
    return (
      <section aria-label="RAccelerator flow" className="pad-x py-[clamp(2.5rem,4vw,4rem)]">
        <p className="mono-label text-accent">RAccelerator flow</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FRAMES.map((f) => (
            <li key={f.n} className="border-t border-line pt-5">
              <p className="font-mono text-[11px] text-accent">{f.n}</p>
              <h3 className="mt-2 text-lg tracking-tight">{f.title}</h3>
              <p className="mt-2 text-[13px] text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      id="film"
      className="relative h-[170vh]"
      aria-label="RAccelerator flow"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-8 sm:py-10">
        <div className="pad-x mb-5 shrink-0">
          <div className="shell flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mono-label text-accent">RAccelerator · film strip</p>
              <h2 className="mt-3 max-w-[16ch] text-[clamp(2rem,4vw,3.4rem)] font-normal tracking-[-0.04em]">
                Scroll sideways through the{' '}
                <span className="serif text-accent">evidence path.</span>
              </h2>
            </div>
            <motion.p
              style={{ opacity: glow }}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
            >
              Vertical scroll → horizontal story
            </motion.p>
          </div>
        </div>

        <motion.ul
          style={{ x }}
          className="flex w-max gap-5 px-[var(--pad)] will-change-transform sm:gap-7"
        >
          {FRAMES.map((frame, i) => (
            <li
              key={frame.n}
              className="relative w-[min(86vw,520px)] shrink-0 overflow-hidden rounded-[1.75rem] border border-line bg-[var(--glass-bg)] p-7 shadow-[var(--glass-shadow)] backdrop-blur-xl sm:w-[560px] sm:p-9"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-accent/15 blur-3xl"
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[12px] tracking-[0.16em] text-accent">
                    {frame.n}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    0{i + 1} / 04
                  </span>
                </div>
                <h3 className="mt-10 text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium tracking-tight">
                  {frame.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  {frame.body}
                </p>
                <div className="mt-10 h-24 overflow-hidden rounded-xl border border-line bg-ink/50">
                  <div
                    className="h-full w-full opacity-80"
                    style={{
                      backgroundImage: `linear-gradient(120deg, transparent 20%, rgba(62,207,186,0.25) 45%, transparent 70%), repeating-linear-gradient(90deg, rgba(238,248,244,0.06) 0 1px, transparent 1px 18px)`,
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
