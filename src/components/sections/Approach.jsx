import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import Section, { SectionHead } from '@/components/ui/Section'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

/** Sticky scrub through method steps — scroll-forward storytelling. */
export default function Approach() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  if (reduced) {
    return (
      <Section id="approach" tone="light">
        <SectionHead
          eyebrow="03 / How we move forward"
          title={
            <Reveal
              as="h2"
              className="text-[clamp(2.2rem,4.2vw,4.4rem)] font-normal leading-[1.05] tracking-[-0.04em]"
            >
              Curious by nature.{' '}
              <span className="serif text-accent-deep">Rigorous by design.</span>
            </Reveal>
          }
        />
        <ol className="grid gap-8 md:grid-cols-2">
          {site.steps.map((step) => (
            <li key={step.n} className="border-t border-line pt-6">
              <StepBody step={step} />
            </li>
          ))}
        </ol>
      </Section>
    )
  }

  return (
    <section
      ref={ref}
      id="approach"
      className="relative h-[300vh]"
      aria-label="How we move forward"
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden pad-x py-20">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mono-label text-accent">03 / How we move forward</p>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(2.2rem,4.2vw,4rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Curious by nature.{' '}
              <span className="serif text-accent-deep">Rigorous by design.</span>
            </h2>
            <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-muted">
              One method, scrubbed through as you scroll — from the first hard
              question to a product enterprises can evaluate.
            </p>
            <ol className="mt-10 space-y-1">
              {site.steps.map((step, i) => (
                <StepNav
                  key={step.n}
                  step={step}
                  index={i}
                  total={site.steps.length}
                  progress={scrollYProgress}
                />
              ))}
            </ol>
          </div>

          <div className="relative h-[min(420px,52vh)]">
            {site.steps.map((step, i) => (
              <StepPanel
                key={step.n}
                step={step}
                index={i}
                total={site.steps.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepNav({ step, index, total, progress }) {
  const start = index / total
  const end = (index + 1) / total
  const active = useTransform(
    progress,
    [start, start + 0.08, end - 0.08, end],
    [0.35, 1, 1, 0.35],
  )
  const scaleY = useTransform(progress, [start, end], [0, 1])

  return (
    <motion.li style={{ opacity: active }} className="relative py-2.5 pl-4">
      <span className="absolute bottom-2 left-0 top-2 w-px bg-line" />
      <motion.span
        style={{ scaleY }}
        className="absolute bottom-2 left-0 top-2 w-px origin-top bg-accent"
      />
      <span className="font-mono text-[10px] tracking-[0.14em] text-accent">
        {step.n}
      </span>
      <span className="ml-3 text-[14px] text-cream/85">{step.title}</span>
    </motion.li>
  )
}

function StepPanel({ step, index, total, progress }) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0],
  )
  const y = useTransform(progress, [start, end], [28, -28])

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center border-t border-line pt-8"
    >
      <StepBody step={step} large />
    </motion.div>
  )
}

function StepBody({ step, large }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
          {step.n}
        </span>
        <span className="text-[13px] text-muted">{step.name}</span>
      </div>
      <h3
        className={cn(
          'mt-6 font-medium tracking-tight',
          large
            ? 'text-[clamp(1.6rem,2.8vw,2.25rem)]'
            : 'text-[1.25rem]',
        )}
      >
        {step.title}
      </h3>
      <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-muted">
        {step.body}
      </p>
      <span className="mono-label mt-8 inline-block text-accent">{step.tag}</span>
    </>
  )
}
