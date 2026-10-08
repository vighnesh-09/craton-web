'use client'

import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import SiteContainer from '@/components/layout/SiteContainer'
import { mindset } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'

const ease = [0.22, 1, 0.36, 1]

export default function Mindset() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id={mindset.id}
      aria-labelledby="h-mindset"
      className="bg-foam py-24 md:py-32"
    >
      <SiteContainer>
        <SectionHeading
          layout="split-eyebrow"
          num={mindset.eyebrow.num}
          label={mindset.eyebrow.label}
          title={mindset.title}
          titleAccent={mindset.titleAccent}
          lead={mindset.lead}
          headingId="h-mindset"
        />

        <ul className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-3 md:gap-0 md:border-t md:border-line">
          {mindset.beliefs.map((belief, index) => (
            <motion.li
              key={belief.title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: reduced ? 0 : index * 0.1,
                ease,
              }}
              className="border border-line bg-mist/50 p-6 md:border-0 md:border-r md:bg-transparent md:px-7 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-copper">
                  0{index + 1}
                </span>
                <span
                  aria-hidden
                  className="h-px flex-1 bg-gradient-to-r from-line to-transparent"
                />
              </div>
              <h3 className="mt-5 font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.025em] text-ink">
                {belief.title}
              </h3>
              <p className="mt-3 max-w-[36ch] font-body text-[14.5px] leading-relaxed text-ink/60">
                {belief.copy}
              </p>
            </motion.li>
          ))}
        </ul>
      </SiteContainer>
    </section>
  )
}
