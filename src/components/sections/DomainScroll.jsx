import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Glass from '@/components/ui/Glass'

const chapters = [
  {
    kicker: 'Domain',
    title: 'Regulated decisions need evidence, not vibes.',
    body: 'Medical-device and IVD teams live inside EU MDR / IVDR: classification rules, Annex I GSPR, technical files that span thousands of pages. Clarity is a compliance risk — and a time risk.',
  },
  {
    kicker: 'RAccelerator',
    title: 'Map every requirement to proof you can defend.',
    body: 'Device classification and GSPR gap assessment with reasoning tied to the rule and the document. Experts stay in the loop; the system surfaces the argument, not a black box.',
  },
  {
    kicker: 'ReviewsIntel',
    title: 'When agents buy, the rationale must travel with them.',
    body: 'Agentic commerce fails silently without evidence. ReviewsIntel binds purchase authorization to independent review proof — visible before checkout.',
  },
  {
    kicker: 'Craton method',
    title: 'Invent. Protect. Assemble domain ownership. Ship.',
    body: 'A patent-first product company in Frisco, Texas — one engineering bedrock, many high-trust domains. Not consulting theatre. Products you can evaluate.',
  },
]

/**
 * Sticky continuum — one solid card, hard chapter swap (always opaque active).
 * Progress bar + ticks driven by the same scroll progress. No mid-fade ghosts.
 */
export default function DomainScroll() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  if (reduced) {
    return (
      <section
        id="domain"
        className="pad-x relative py-[clamp(2.5rem,4vw,4rem)]"
        aria-label="Domain narrative"
      >
        <div className="shell">
          <p className="mono-label text-accent">Domain continuum</p>
          <h2 className="mt-3 max-w-[16ch] text-[clamp(2rem,4vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.04em]">
            Built for rooms where a wrong citation costs months.
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {chapters.map((chapter, i) => (
              <Glass key={chapter.kicker} className="p-6 sm:p-7" glow={i === 0}>
                <CardInner chapter={chapter} index={i} />
              </Glass>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      id="domain"
      className="relative h-[200vh]"
      aria-label="Domain narrative"
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pad-x py-8 sm:py-10">
        <div className="shell grid w-full gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-8">
          <div>
            <p className="mono-label text-accent">Scroll the continuum</p>
            <h2 className="mt-3 max-w-[14ch] text-[clamp(1.85rem,3.6vw,3.2rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Built for rooms where a wrong citation costs months.
            </h2>
            <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-muted">
              Move through Craton’s world — from regulatory gravity to product
              clarity — as the stage shifts with the scroll.
            </p>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-line">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-accent"
              />
            </div>
            <ol className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {chapters.map((c, i) => (
                <ChapterTick
                  key={c.kicker}
                  label={c.kicker}
                  index={i}
                  total={chapters.length}
                  progress={scrollYProgress}
                />
              ))}
            </ol>
          </div>

          <div className="relative min-h-[300px] h-[min(420px,52vh)]">
            {chapters.map((chapter, i) => (
              <ChapterCard
                key={chapter.kicker}
                chapter={chapter}
                index={i}
                total={chapters.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ChapterTick({ label, index, total, progress }) {
  // Hard on/off — no ghost ticks
  const color = useTransform(progress, (p) => {
    const active = Math.min(total - 1, Math.floor(p * total + 0.001))
    return index === active ? 'var(--cream)' : 'var(--muted)'
  })

  return (
    <motion.li
      style={{ color }}
      className="font-mono text-[10px] uppercase tracking-[0.12em]"
    >
      0{index + 1} {label}
    </motion.li>
  )
}

function ChapterCard({ chapter, index, total, progress }) {
  // Hard swap: only the active segment is fully opaque
  const opacity = useTransform(progress, (p) => {
    const active = Math.min(total - 1, Math.floor(p * total + 0.001))
    return index === active ? 1 : 0
  })
  const zIndex = useTransform(progress, (p) => {
    const active = Math.min(total - 1, Math.floor(p * total + 0.001))
    return index === active ? 2 : 0
  })

  return (
    <motion.div
      style={{ opacity, zIndex }}
      className="absolute inset-0"
    >
      <Glass className="h-full p-6 sm:p-8" glow strong>
        <CardInner chapter={chapter} index={index} />
      </Glass>
    </motion.div>
  )
}

function CardInner({ chapter, index }) {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="mono-label text-accent">{chapter.kicker}</span>
          <span className="font-mono text-[11px] text-muted">
            0{index + 1} / 04
          </span>
        </div>
        <h3 className="mt-5 text-[clamp(1.35rem,2.3vw,1.95rem)] font-normal leading-tight tracking-tight sm:mt-6">
          {chapter.title}
        </h3>
        <p className="mt-3 max-w-[46ch] text-[14px] leading-[1.65] text-muted sm:text-[15px]">
          {chapter.body}
        </p>
      </div>
      <p className="mono-label text-muted">
        Chapter 0{index + 1} · Continuum
      </p>
    </div>
  )
}
