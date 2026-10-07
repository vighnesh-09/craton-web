'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SiteContainer from '@/components/layout/SiteContainer'
import { domains } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'

const ease = [0.22, 1, 0.36, 1]

export default function Domains() {
  const reduced = useReducedMotion()

  return (
    <section
      id={domains.id}
      aria-labelledby="h-focus"
      className="border-y border-line bg-mist px-6 py-24 sm:px-8 md:py-32"
    >
      <SiteContainer>
        <SectionHeading
          layout="split-eyebrow"
          num={domains.eyebrow.num}
          label={domains.eyebrow.label}
          title={domains.title}
          titleAccent={domains.titleAccent}
          lead={domains.lead}
          headingId="h-focus"
        />

        <ul className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-0 md:border-t md:border-line">
          {domains.items.map((item, index) => (
            <motion.li
              key={item.title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: reduced ? 0 : index * 0.1,
                ease,
              }}
              className="group relative overflow-hidden border border-line bg-foam p-7 md:border-0 md:border-r md:border-line md:bg-transparent md:p-10 md:last:border-r-0"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-lagoon/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0"
              />
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-copper">
                {item.num}
              </p>
              <h3 className="mt-5 font-display text-[1.5rem] font-semibold tracking-[-0.03em] text-ink md:text-[1.75rem]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[40ch] font-body text-[14.5px] leading-relaxed text-ink/60">
                {item.copy}
              </p>
              <p className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-lagoon">
                <span className="size-1.5 rounded-full bg-copper" />
                {item.signal}
              </p>
            </motion.li>
          ))}
        </ul>
      </SiteContainer>
    </section>
  )
}
