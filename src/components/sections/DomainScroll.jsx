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

  return (
    <section
      ref={ref}
      id="domain"
      className="relative h-[320vh]"
      aria-label="Domain narrative"
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden pad-x py-24">
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mono-label text-accent">Scroll the continuum</p>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(2.2rem,4.4vw,4rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Built for rooms where a wrong citation costs months.
            </h2>
            <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-cream/65">
              Move through Craton’s world — from regulatory gravity to product
              clarity — as the stage shifts behind the glass.
            </p>
            <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                style={{ width: reduced ? '100%' : progressWidth }}
                className="h-full rounded-full bg-gradient-to-r from-accent to-[var(--ember)]"
              />
            </div>
          </div>

          <div className="relative h-[min(520px,62vh)]">
            {chapters.map((chapter, i) => (
              <ChapterCard
                key={chapter.kicker}
                chapter={chapter}
                index={i}
                total={chapters.length}
                progress={scrollYProgress}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ChapterCard({ chapter, index, total, progress, reduced }) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(
    progress,
    [start, start + 0.08, end - 0.08, end],
    [0, 1, 1, 0],
  )
  // Opacity + Y only — 3D rotate/scale + glass blur was a major scroll hitch
  const y = useTransform(progress, [start, end], [28, -28])

  if (reduced) {
    return (
      <Glass
        className="absolute inset-0 p-7 sm:p-9"
        style={{ opacity: index === 0 ? 1 : 0 }}
        glow
      >
        <CardInner chapter={chapter} index={index} />
      </Glass>
    )
  }

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 will-change-transform">
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
      <p className="mt-4 text-[15px] leading-[1.75] text-cream/70">
        {chapter.body}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-8">
        {['EU MDR', 'IVDR', 'GSPR', 'Evidence trail'].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-cream/75"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
