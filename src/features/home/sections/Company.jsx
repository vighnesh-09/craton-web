'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SiteContainer from '@/components/layout/SiteContainer'
import { company, mindset, patents } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'

const ease = [0.22, 1, 0.36, 1]

export default function Company() {
  const reduced = useReducedMotion()

  return (
    <section
      id={company.id}
      aria-labelledby="h-company"
      className="border-t border-line bg-mist px-6 py-24 sm:px-8 md:py-32"
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

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease }}
            className="space-y-6"
          >
            {company.story.map((paragraph) => (
              <p
                key={paragraph.slice(0, 36)}
                className="max-w-[52ch] font-body text-[15px] leading-[1.75] text-ink/70 sm:text-base"
              >
                {paragraph}
              </p>
            ))}

            <ul className="flex flex-wrap gap-2 pt-1">
              {company.chips.map((chip) => (
                <li
                  key={chip}
                  className="border border-line bg-foam px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/55"
                >
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-2 grid gap-6 border-t border-line pt-8 sm:grid-cols-[1.35fr_0.85fr]">
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
              <ul className="space-y-2 border-l border-line pl-5 font-mono text-[12px] leading-relaxed text-ink/55">
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
            className="border border-line bg-foam p-6 sm:p-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-copper">
              Leadership
            </p>
            <ul className="mt-5 divide-y divide-line">
              {company.roster.map((role) => (
                <li
                  key={role.title}
                  className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <b className="font-display text-[14.5px] font-semibold tracking-[-0.015em] text-ink">
                    {role.title}
                  </b>
                  <span className="font-body text-[12.5px] text-ink/50">
                    {role.detail}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/40">
              {company.rosterNote}
            </p>

            <div className="mt-8 grid gap-6 border-t border-line pt-7 sm:grid-cols-2">
              {company.impact.map((item) => (
                <div key={item.title}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-copper">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-[13px] leading-relaxed text-ink/60">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 border-t border-line pt-12 md:mt-20">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
            Why we exist
          </p>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {mindset.beliefs.map((belief) => (
              <li key={belief.title}>
                <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.03em] text-ink">
                  {belief.title}
                </h3>
                <p className="mt-2 max-w-[36ch] font-body text-[14.5px] leading-[1.7] text-ink/65">
                  {belief.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div id={patents.id} className="mt-16 border-t border-line pt-12 md:mt-20">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
            Patents
          </p>
          <h3 className="mt-4 max-w-[16ch] font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            {patents.title}{' '}
            <span className="font-serif font-normal italic text-ink-soft">
              {patents.titleAccent}
            </span>
          </h3>
          <p className="mt-4 max-w-[52ch] font-body text-[15px] leading-[1.7] text-ink/65">
            {patents.lead}
          </p>

          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {patents.figures.map((figure) => (
              <li key={figure.label}>
                <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-none tracking-[-0.045em] text-ink">
                  {figure.value}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">
                  {figure.label}
                </p>
              </li>
            ))}
          </ul>

          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {patents.notes.map((note) => (
              <li key={note.title}>
                <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.03em] text-ink">
                  {note.title}
                </h3>
                <p className="mt-2 font-body text-[14.5px] leading-[1.7] text-ink/65">
                  {note.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </SiteContainer>
    </section>
  )
}
