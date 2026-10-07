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

/**
 * Sticky method stage — vertical ink spine + step focus (no nested scrollbars).
 * All steps fit the viewport; pin releases after ~2.2svh.
 */
export default function Approach() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const ink = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

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
      className="relative h-[180vh]"
      aria-label="How we move forward"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pad-x pt-20 pb-5 sm:pt-24 sm:pb-6">
        <div className="shell grid h-full min-h-0 w-full grid-rows-[auto_1fr] gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-1 lg:items-stretch lg:gap-10">
          <div className="min-w-0 shrink-0 self-center lg:pr-2">
            <p className="mono-label text-accent">03 / How we move forward</p>
            <h2 className="mt-3 max-w-[12ch] text-[clamp(1.7rem,3.2vw,2.85rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Curious by nature.{' '}
              <span className="serif text-accent-deep">Rigorous by design.</span>
            </h2>
            <p className="mt-3 max-w-[36ch] text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
              One method, drawn as ink fills the spine — from the first hard
              question to a product enterprises can evaluate.
            </p>
          </div>

          <div className="relative flex min-h-0 min-w-0 gap-4 overflow-hidden">
            <div
              aria-hidden
              className="relative w-1 shrink-0 self-stretch overflow-hidden rounded-full bg-line"
            >
              <motion.div
                style={{ height: ink }}
                className="absolute inset-x-0 top-0 origin-top bg-accent"
              />
            </div>

            <ol className="flex min-h-0 min-w-0 flex-1 flex-col justify-between gap-1 py-0.5">
              {site.steps.map((step, i) => (
                <StepRow
                  key={step.n}
                  step={step}
                  index={i}
                  total={site.steps.length}
                  progress={scrollYProgress}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepRow({ step, index, total, progress }) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.06, end],
    index === 0
      ? [1, 1, 1, 0.5]
      : index === total - 1
        ? [0.4, 1, 1, 1]
        : [0.4, 1, 1, 0.5],
  )
  const marker = useTransform(
    progress,
    [start, start + 0.12, end],
    [0.2, 1, 0.35],
  )

  return (
    <motion.li
      style={{ opacity }}
      className="relative min-w-0 border-b border-line py-2.5 last:border-b-0 sm:py-3"
    >
      <motion.span
        aria-hidden
        style={{ opacity: marker, scale: marker }}
        className="absolute -left-[1.15rem] top-[1.15rem] size-1.5 rounded-full bg-accent sm:-left-[1.2rem]"
      />
      <StepBody step={step} compact />
    </motion.li>
  )
}

function StepBody({ step, compact }) {
  return (
    <>
      <div className="flex min-w-0 items-baseline justify-between gap-3">
        <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
          {step.n}
        </span>
        <span className="truncate text-[12px] text-muted sm:text-[13px]">
          {step.name}
        </span>
      </div>
      <h3
        className={cn(
          'mt-1.5 font-medium tracking-tight',
          compact
            ? 'text-[clamp(1.05rem,1.8vw,1.35rem)]'
            : 'text-[1.2rem]',
        )}
      >
        {step.title}
      </h3>
      <p
        className={cn(
          'mt-1 max-w-[46ch] leading-relaxed text-muted',
          compact
            ? 'text-[12.5px] line-clamp-2 sm:text-[13px]'
            : 'text-[13.5px]',
        )}
      >
        {step.body}
      </p>
      <span className="mono-label mt-2 inline-block text-accent">{step.tag}</span>
    </>
  )
}
