'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import SiteContainer from '@/components/layout/SiteContainer'
import { approach } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'

/**
 * Abridge `.step_grid_press` stagger: scrubbed yPercent fall
 * (block1 → 100, block2 → 75, block3 → 50, block4 → ~25) for an
 * ascending diagonal as the section scrolls.
 */
const FALL_Y = ['56%', '38%', '20%', '4%']

function useWideStagger() {
  const [wide, setWide] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)')
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return wide
}

function StepCard({ step, y, animate }) {
  return (
    <motion.li
      style={animate ? { y } : undefined}
      className="relative flex min-h-[17.5rem] flex-col rounded-2xl border border-line bg-foam p-6 sm:min-h-[19rem] sm:p-7"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-copper">
          {step.num}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
          {step.phase}
        </span>
      </div>

      <h3 className="mt-8 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-[1.35rem]">
        {step.title}
      </h3>
      <p className="mt-3 max-w-[34ch] font-body text-[14px] leading-relaxed text-ink/60">
        {step.copy}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-8">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-lagoon">
          <span aria-hidden className="size-1.5 rounded-full bg-copper" />
          {step.tag}
        </span>
        <span
          aria-hidden
          className="grid size-8 place-items-center rounded-lg border border-line bg-mist/70 font-display text-[15px] text-ink/45"
        >
          →
        </span>
      </div>
    </motion.li>
  )
}

export default function Approach() {
  const reduced = usePrefersReducedMotion()
  const wide = useWideStagger()
  const sectionRef = useRef(null)
  const animate = wide && !reduced

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  })

  const y0 = useTransform(scrollYProgress, [0.05, 0.7], ['0%', FALL_Y[0]])
  const y1 = useTransform(scrollYProgress, [0.05, 0.7], ['0%', FALL_Y[1]])
  const y2 = useTransform(scrollYProgress, [0.05, 0.7], ['0%', FALL_Y[2]])
  const y3 = useTransform(scrollYProgress, [0.05, 0.7], ['0%', FALL_Y[3]])
  const ys = [y0, y1, y2, y3]

  return (
    <section
      ref={sectionRef}
      id={approach.id}
      aria-labelledby="h-approach"
      className="bg-mist/40 px-6 pb-24 pt-24 sm:px-8 md:pt-32 xl:pb-[23rem]"
    >
      <SiteContainer>
        <SectionHeading
          layout="split-eyebrow"
          num={approach.eyebrow.num}
          label={approach.eyebrow.label}
          title={approach.title}
          titleAccent={approach.titleAccent}
          lead={approach.lead}
          headingId="h-approach"
        />

        <ol className="mt-14 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-3 xl:mt-16 xl:grid-cols-4 xl:gap-1">
          {approach.steps.map((step, index) => (
            <StepCard
              key={step.num}
              step={step}
              y={ys[index]}
              animate={animate}
            />
          ))}
        </ol>
      </SiteContainer>
    </section>
  )
}
