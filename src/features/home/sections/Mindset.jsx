'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SiteContainer from '@/components/layout/SiteContainer'
import { mindset } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'

const ease = [0.22, 1, 0.36, 1]

export default function Mindset() {
  const reduced = useReducedMotion()

  return (
    <section
      id={mindset.id}
      aria-labelledby="h-mindset"
      className="bg-foam px-6 py-24 sm:px-8 md:py-32"
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

        <ul className="mt-14 grid border-t border-line md:mt-20 md:grid-cols-3">
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
              className="border-line py-8 md:border-r md:px-7 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-copper">
                0{index + 1}
              </p>
              <h3 className="mt-4 font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.025em] text-ink">
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
