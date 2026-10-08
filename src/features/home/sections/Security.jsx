'use client'

import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import SiteContainer from '@/components/layout/SiteContainer'
import { security } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'

const ease = [0.22, 1, 0.36, 1]

export default function Security() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id={security.id}
      aria-labelledby="h-security"
      className="border-t border-line bg-mist py-16 lg:py-24"
    >
      <SiteContainer>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          <SectionHeading
            num={security.eyebrow.num}
            label={security.eyebrow.label}
            title={security.title}
            titleAccent={security.titleAccent}
            lead={security.lead}
            headingId="h-security"
          />
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: reduced ? 0 : 0.14, ease }}
            className="font-body text-[15px] leading-[1.75] text-ink/65 sm:text-base lg:max-w-[40ch]"
          >
            {security.note}
          </motion.p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-2 md:gap-5">
          {security.items.map((item, index) => (
            <motion.li
              key={item.title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: reduced ? 0 : index * 0.06,
                ease,
              }}
              className="rounded-2xl border border-line bg-foam px-6 py-6"
            >
              <h3 className="font-display text-[1.2rem] font-semibold tracking-[-0.03em] text-ink">
                {item.title}
              </h3>
              <p className="mt-3 font-body text-[14.5px] leading-[1.7] text-ink/65">
                {item.copy}
              </p>
            </motion.li>
          ))}
        </ul>
      </SiteContainer>
    </section>
  )
}
