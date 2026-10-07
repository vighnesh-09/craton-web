'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SiteContainer from '@/components/layout/SiteContainer'
import { company } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'

const ease = [0.22, 1, 0.36, 1]

export default function Company() {
  const reduced = useReducedMotion()

  return (
    <section
      id={company.id}
      aria-labelledby="h-company"
      className="bg-mist px-6 py-24 sm:px-8 md:py-32"
    >
      <SiteContainer>
        <SectionHeading
          layout="split-eyebrow"
          num={company.eyebrow.num}
          label={company.eyebrow.label}
          title={company.title}
          titleAccent={company.titleAccent}
          headingId="h-company"
        />

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease }}
            className="space-y-6"
          >
            {company.story.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="max-w-[54ch] font-body text-[15px] leading-[1.75] text-ink/70 sm:text-base"
              >
                {paragraph}
              </p>
            ))}

            <ul className="flex flex-wrap gap-2 pt-2">
              {company.chips.map((chip) => (
                <li
                  key={chip}
                  className="border border-line px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/55"
                >
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-4 grid gap-6 border-t border-line pt-8 sm:grid-cols-[1.4fr_0.8fr]">
              <div>
                <p className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                  {company.founder.name}
                </p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-lagoon">
                  {company.founder.role}
                </p>
                <p className="mt-4 max-w-[42ch] font-body text-[14.5px] leading-relaxed text-ink/60">
                  {company.founder.bio}
                </p>
              </div>
              <ul className="space-y-2 border-l border-line pl-5 font-mono text-[12px] leading-relaxed text-ink/55 sm:pl-6">
                {company.founder.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.08, ease }}
          >
            <ul className="divide-y divide-line border-y border-line">
              {company.roster.map((role) => (
                <li
                  key={role.title}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <b className="font-display text-[15px] font-semibold tracking-[-0.015em] text-ink">
                    {role.title}
                  </b>
                  <span className="font-body text-[13px] text-ink/50">
                    {role.detail}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/40">
              {company.rosterNote}
            </p>

            <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
              {company.impact.map((item) => (
                <div key={item.title}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-copper">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-[13.5px] leading-relaxed text-ink/60">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </SiteContainer>
    </section>
  )
}
