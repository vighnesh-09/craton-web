import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

const roster = [
  ['Chief Regulatory Affairs Officer', 'Co-founder · EU MDR / IVDR'],
  ['Chief Product Officer', 'Co-founder · product & user acceptance'],
  ['Head of Regulatory Affairs, IVD', 'In vitro diagnostics'],
  ['Chief Commercial Officer', 'Go-to-market'],
  ['Regulatory consultants', 'Independent MD and IVD specialists'],
  ['AI engineering team', 'Palo Alto'],
]

/**
 * Normal document flow — balanced columns, readable measure.
 * Light scroll-linked roster highlight (no sticky trap).
 */
export default function About() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.35'],
  })

  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  if (reduced) {
    return <AboutStatic />
  }

  return (
    <section
      ref={ref}
      id="about"
      className="pad-x relative py-[clamp(2.5rem,4vw,4rem)]"
      aria-label="About Craton"
    >
      <div className="shell">
        <div className="mx-auto grid w-full max-w-[66rem] gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12 xl:gap-14">
        <div className="min-w-0 max-w-[36rem]">
          <p className="mono-label text-accent">04 / Craton Technologies</p>
          <h2 className="mt-3 max-w-[14ch] text-[clamp(2rem,4vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.04em]">
            Bold thinking.{' '}
            <span className="serif text-accent">Grounded execution.</span>
          </h2>
          <div className="mt-5 space-y-3.5 text-[15px] leading-[1.65] text-muted">
            <p>
              Craton Technologies is an innovation-driven product company based
              in Frisco, Texas. We identify hard, high-trust problems in
              regulated or evidence-heavy industries, invent a novel approach,
              protect it, assemble the domain leadership to make it credible,
              and ship it as a product — then repeat the method in the next
              domain.
            </p>
            <p>
              A craton is the ancient, stable core of a continent — the bedrock
              everything else is built on. That is the idea: one method, one
              engineering discipline, one patent-first habit.
            </p>
          </div>

          <div className="glass-panel mt-6 rounded-2xl p-5 sm:p-6">
            <div className="relative z-10">
              <p className="text-lg font-medium tracking-tight">
                {site.founder.name}
              </p>
              <p className="mono-label mt-1 text-accent">{site.founder.role}</p>
              <p className="mt-2.5 max-w-md text-[14px] leading-relaxed text-muted">
                {site.founder.bio}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 lg:pt-1">
          <div className="mb-4 flex items-center gap-4">
            <p className="mono-label shrink-0 text-cream">Leadership roster</p>
            <div className="h-px min-w-0 flex-1 overflow-hidden rounded-full bg-line">
              <motion.div style={{ width: fill }} className="h-full bg-accent" />
            </div>
          </div>

          <ul className="relative border-y border-line">
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-line"
            >
              <motion.div
                style={{ height: fill }}
                className="w-full origin-top bg-accent"
              />
            </div>

            {roster.map(([role, detail], i) => (
              <RosterRow
                key={role}
                role={role}
                detail={detail}
                index={i}
                total={roster.length}
                progress={scrollYProgress}
              />
            ))}
          </ul>
          <p className="mt-3 text-[12px] text-muted">
            Roles shown; names appear with each person’s consent.
          </p>
        </div>
        </div>
      </div>
    </section>
  )
}

function RosterRow({ role, detail, index, total, progress }) {
  const start = index / total
  const end = (index + 1) / total
  const marker = useTransform(
    progress,
    [start, start + 0.12, end],
    [0.3, 1, 0.4],
  )
  const rowBg = useTransform(
    progress,
    [start, start + 0.1, end - 0.02, end],
    [
      'rgba(15, 143, 123, 0)',
      'rgba(15, 143, 123, 0.07)',
      'rgba(15, 143, 123, 0.07)',
      'rgba(15, 143, 123, 0)',
    ],
  )

  return (
    <motion.li
      style={{ backgroundColor: rowBg }}
      className="relative grid gap-1 py-3.5 pl-5 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:items-baseline sm:gap-6 sm:py-4"
    >
      <motion.span
        aria-hidden
        style={{ opacity: marker, scale: marker }}
        className="absolute left-[-3px] top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-accent"
      />
      <span className="text-[15px] font-semibold tracking-tight text-cream">
        {role}
      </span>
      <span className="text-[13.5px] leading-snug text-muted sm:text-right">
        {detail}
      </span>
    </motion.li>
  )
}

function AboutStatic() {
  return (
    <section
      id="about"
      className="pad-x relative py-[clamp(2.5rem,4vw,4rem)]"
      aria-label="About Craton"
    >
      <div className="shell">
        <div className="mx-auto grid w-full max-w-[66rem] gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <div className="min-w-0 max-w-[36rem]">
          <p className="mono-label text-accent">04 / Craton Technologies</p>
          <Reveal
            as="h2"
            className="mt-3 max-w-[14ch] text-[clamp(2rem,4vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.04em]"
          >
            Bold thinking.{' '}
            <span className="serif text-accent">Grounded execution.</span>
          </Reveal>
          <p className="mt-5 max-w-[50ch] text-[15px] leading-relaxed text-muted">
            Craton Technologies is an innovation-driven product company based in
            Frisco, Texas. We invent, protect, and ship AI-enabled products for
            regulated and evidence-heavy work.
          </p>
          <div className="glass-panel mt-6 rounded-2xl p-5 sm:p-6">
            <p className="text-lg font-medium tracking-tight">
              {site.founder.name}
            </p>
            <p className="mono-label mt-1 text-accent">{site.founder.role}</p>
            <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
              {site.founder.bio}
            </p>
          </div>
        </div>
        <div className="min-w-0">
          <p className="mono-label mb-4 text-cream">Leadership roster</p>
          <ul className="divide-y divide-line border-y border-line">
            {roster.map(([role, detail]) => (
              <li
                key={role}
                className={cn(
                  'grid gap-1 py-3.5 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:items-baseline sm:gap-6',
                )}
              >
                <b className="text-[15px] font-semibold tracking-tight text-cream">
                  {role}
                </b>
                <span className="text-[13.5px] text-muted sm:text-right">
                  {detail}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] text-muted">
            Roles shown; names appear with each person’s consent.
          </p>
        </div>
        </div>
      </div>
    </section>
  )
}
