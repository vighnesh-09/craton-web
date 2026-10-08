'use client'

import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import SiteContainer from '@/components/layout/SiteContainer'
import { pilot } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'
import { useSiteLink } from '@/hooks/useSiteLink'

const ease = [0.22, 1, 0.36, 1]

export default function Pilot() {
  const reduced = usePrefersReducedMotion()
  const follow = useSiteLink()

  return (
    <section
      id={pilot.id}
      aria-labelledby="h-pilot"
      className="bg-foam px-6 py-24 sm:px-8 md:py-32"
    >
      <SiteContainer>
        <SectionHeading
          layout="split-aside"
          num={pilot.eyebrow.num}
          label={pilot.eyebrow.label}
          title={pilot.title}
          titleAccent={pilot.titleAccent}
          aside={pilot.lead}
          headingId="h-pilot"
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {pilot.steps.map((step, index) => (
            <motion.li
              key={step.num}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: reduced ? 0 : index * 0.06,
                ease,
              }}
              className="bg-foam px-5 py-6"
            >
              <p className="font-mono text-[11px] tracking-[0.14em] text-ink/40">
                {step.num}
              </p>
              <h3 className="mt-4 font-display text-[1.25rem] font-semibold tracking-[-0.03em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-[14px] leading-[1.65] text-ink/60">
                {step.copy}
              </p>
            </motion.li>
          ))}
        </ol>

        <a
          href="#contact"
          onClick={follow('#contact')}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-lagoon px-5 py-2.5 font-body text-[13.5px] font-semibold text-craton transition-colors hover:bg-lagoon-deep"
        >
          {pilot.cta}
          <ArrowUpRight size={15} strokeWidth={2.25} />
        </a>
      </SiteContainer>
    </section>
  )
}
