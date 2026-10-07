'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SiteContainer from '@/components/layout/SiteContainer'
import { approach } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'

const ease = [0.22, 1, 0.36, 1]

export default function Approach() {
  const reduced = useReducedMotion()

  return (
    <section
      id={approach.id}
      aria-labelledby="h-approach"
      className="bg-foam px-6 py-24 sm:px-8 md:py-32"
    >
      <SiteContainer>
        <SectionHeading
          layout="split-eyebrow"
          num={approach.eyebrow.num}
          label={approach.eyebrow.label}
          title={approach.title}
          titleAccent={approach.titleAccent}
          headingId="h-approach"
        />

        <ol className="mt-14 grid gap-0 border-t border-line sm:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {approach.steps.map((step, index) => (
            <motion.li
              key={step.num}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: reduced ? 0 : index * 0.08,
                ease,
              }}
              className="border-line py-8 md:border-r md:px-6 md:py-10 md:first:pl-0 md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0 xl:last:pr-0"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-copper">
                  {step.num}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                  {step.phase}
                </span>
              </div>

              <div
                aria-hidden
                className="mt-6 h-px w-10 bg-gradient-to-r from-copper to-transparent"
              />

              <h3 className="mt-6 font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.025em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[34ch] font-body text-[14.5px] leading-relaxed text-ink/60">
                {step.copy}
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-lagoon">
                {step.tag}
              </p>
            </motion.li>
          ))}
        </ol>
      </SiteContainer>
    </section>
  )
}
