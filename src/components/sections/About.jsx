import Reveal from '@/components/ui/Reveal'
import Section, { SectionHead } from '@/components/ui/Section'
import { site } from '@/config/site'

const roster = [
  ['Chief Regulatory Affairs Officer', 'Co-founder · EU MDR / IVDR'],
  ['Chief Product Officer', 'Co-founder · product & user acceptance'],
  ['Head of Regulatory Affairs, IVD', 'In vitro diagnostics'],
  ['Chief Commercial Officer', 'Go-to-market'],
  ['Regulatory consultants', 'Independent MD and IVD specialists'],
  ['AI engineering team', 'Palo Alto'],
]

export default function About() {
  return (
    <Section id="about" tone="light">
      <SectionHead
        eyebrow="04 / Craton Technologies"
        title={
          <Reveal
            as="h2"
            className="text-[clamp(2.2rem,4.2vw,4.4rem)] font-normal leading-[1.05] tracking-[-0.04em]"
          >
            Bold thinking.{' '}
            <span className="serif text-accent-deep">Grounded execution.</span>
          </Reveal>
        }
      />

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="space-y-5 text-[15px] leading-[1.75] text-muted md:text-base">

          <p>
            Craton Technologies is an innovation-driven product company based in
            Frisco, Texas. We identify hard, high-trust problems in regulated or
            evidence-heavy industries, invent a novel approach, protect it,
            assemble the domain leadership to make it credible, and ship it as a
            product — then repeat the method in the next domain.
          </p>
          <p>
            A craton is the ancient, stable core of a continent — the bedrock
            everything else is built on. That is the idea: one method, one
            engineering discipline, one patent-first habit, from which restless,
            domain-specific products rise.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              'Artificial intelligence',
              'Domain expertise',
              'Evidence-led thinking',
              'Patent-first',
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-line bg-[var(--glass-bg)] px-3 py-1.5 text-[12.5px] text-cream backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="glass-panel mt-8 rounded-2xl p-6">
            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:justify-between">
              <div>
                <p className="text-lg font-medium tracking-tight text-cream">
                  {site.founder.name}
                </p>
                <p className="mono-label mt-1 text-accent">
                  {site.founder.role}
                </p>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted">
                  {site.founder.bio}
                </p>
              </div>
              <div className="shrink-0 font-mono text-[12px] leading-relaxed text-muted">

                3 granted US patents
                <br />
                9 pending
                <br />
                Judge, R&amp;D 100 Awards
                <br />
                TOGAF 9.1
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="divide-y divide-line border-y border-line">
            {roster.map(([role, detail]) => (
              <li
                key={role}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <b className="text-[14.5px] font-medium text-cream">{role}</b>
                <span className="text-[13px] text-muted">{detail}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] text-muted">
            Roles shown; names appear with each person’s consent.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <aside className="glass-panel rounded-2xl p-5">
              <div className="relative z-10">
                <p className="mono-label text-accent">Next generation</p>
                <h4 className="mt-2 text-[1.05rem] font-medium">DiscoverSTEM</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  A 501(c)(3) our founder helped establish, supporting
                  underprivileged children in STEM and innovation.
                </p>
              </div>
            </aside>
            <aside className="glass-panel rounded-2xl p-5">
              <div className="relative z-10">
                <p className="mono-label text-accent">Recognition</p>
                <h4 className="mt-2 text-[1.05rem] font-medium">R&amp;D 100</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  Our founder serves on the judging panel for applied research and
                  innovation.
                </p>
              </div>
            </aside>
          </div>

        </Reveal>
      </div>
    </Section>
  )
}
