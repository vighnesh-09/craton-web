'use client'

import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import SiteContainer from '@/components/layout/SiteContainer'
import { domains } from '@/content/home'
import { SectionEyebrow } from '@/features/home/components/SectionHeading'

const ease = [0.22, 1, 0.36, 1]

export default function Domains() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id={domains.id}
      aria-labelledby="h-focus"
      className="border-y border-line bg-mist px-6 py-24 sm:px-8 md:py-32"
    >
      <SiteContainer>
        <div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease }}
          >
            <SectionEyebrow
              num={domains.eyebrow.num}
              label={domains.eyebrow.label}
              className="mb-6"
            />
          </motion.div>
          <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-x-12">
            <motion.h2
              id="h-focus"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, delay: reduced ? 0 : 0.06, ease }}
              className="min-w-0 max-w-[16ch] font-display text-[clamp(2.25rem,4.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance text-ink"
            >
              {domains.title}{' '}
              <span className="font-serif text-[1.06em] font-normal italic tracking-[-0.03em] text-lagoon-deep">
                {domains.titleAccent}
              </span>
            </motion.h2>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, delay: reduced ? 0 : 0.12, ease }}
              className="min-w-0 max-w-[52ch] font-body text-[15px] leading-[1.75] text-ink/65 sm:text-base"
            >
              {domains.lead}
            </motion.p>
          </div>
        </div>

        <ul className="mt-12 grid w-full grid-cols-1 gap-8 md:mt-14 md:grid-cols-2 md:gap-12 md:border-t md:border-line md:pt-12">
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
              className="group relative min-w-0 overflow-hidden border border-line bg-foam p-7 md:border-0 md:bg-transparent md:p-0"
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
              <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ink/60">
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
