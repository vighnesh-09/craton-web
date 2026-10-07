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

export default function DomainScroll() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const stageOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.92, 1],
    [0.85, 1, 1, 0.9],
  )

  if (reduced) {
    return (
      <section id="domain" className="pad-x relative py-[clamp(4.5rem,8vw,7.5rem)]" aria-label="Domain narrative">
        <div className="mx-auto max-w-[1400px]">
          <p className="mono-label text-accent">Domain continuum</p>
          <h2 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,4.4vw,4rem)] font-normal leading-[1.05] tracking-[-0.04em]">
            Built for rooms where a wrong citation costs months.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {chapters.map((chapter, i) => (
              <Glass key={chapter.kicker} className="p-7 sm:p-8" glow={i === 0}>
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
      className="relative h-[360vh]"
      aria-label="Domain narrative"
    >
      <motion.div
        style={{ opacity: stageOpacity }}
        className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden pad-x py-20 sm:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <div>
            <p className="mono-label text-accent">Scroll the continuum</p>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(2.2rem,4.4vw,4rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Built for rooms where a wrong citation costs months.
            </h2>
            <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-muted">
              Move through Craton’s world — from regulatory gravity to product
              clarity — as the stage shifts with the scroll.
            </p>
            <div className="mt-8 h-px overflow-hidden bg-line">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-gradient-to-r from-accent to-[var(--ember)]"
              />
            </div>
            <ol className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
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

          <div className="relative h-[min(480px,58vh)]">
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
      </motion.div>
    </section>
  )
}

function ChapterTick({ label, index, total, progress }) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [0.35, 1, 1, 0.35],
  )

  return (
    <motion.li
      style={{ opacity }}
      className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
    >
      0{index + 1} {label}
    </motion.li>
  )
}

function ChapterCard({ chapter, index, total, progress }) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0],
  )
  const y = useTransform(progress, [start, end], [36, -36])
  const scale = useTransform(
    progress,
    [start, start + 0.12, end],
    [0.96, 1, 0.98],
  )

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0"
    >
      <Glass className="h-full p-7 sm:p-9" glow>
        <CardInner chapter={chapter} index={index} />
      </Glass>
    </motion.div>
  )
}

function CardInner({ chapter, index }) {
  return (
    <div className="relative z-10 flex h-full flex-col">
      <div className="flex items-center justify-between gap-4">
        <span className="mono-label text-accent">{chapter.kicker}</span>
        <span className="font-mono text-[11px] text-muted">
          0{index + 1} / 04
        </span>
      </div>
      <h3 className="mt-8 text-[clamp(1.5rem,2.6vw,2.15rem)] font-normal leading-tight tracking-tight">
        {chapter.title}
      </h3>
      <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.75] text-muted">
        {chapter.body}
      </p>
    </div>
  )
}
