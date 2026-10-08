import { site } from '@/config/site'

const roster = [
  ['Chief Regulatory Affairs Officer', 'Co-founder · EU MDR / IVDR'],
  ['Chief Product Officer', 'Co-founder · product & user acceptance'],
  ['Head of Regulatory Affairs, IVD', 'In vitro diagnostics'],
  ['Chief Commercial Officer', 'Go-to-market'],
  ['Regulatory consultants', 'Independent MD and IVD specialists'],
  ['AI engineering team', 'Palo Alto'],
]

const rosterRows = [
  roster.slice(0, 2),
  roster.slice(2, 4),
  roster.slice(4, 6),
]

/** Founder and roster as type. Content height, no matrix. */
export default function About() {
  return (
    <section id="about" className="section-pad bg-paper-2" aria-label="About Craton">
      <div className="shell grid grid-cols-1 items-start gap-10 min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[900px]:gap-14">
        <div className="min-w-0">
          <p className="kicker">Craton Technologies</p>
          <h2 className="display mt-3 max-w-[14ch] text-cream">
            Bold thinking.{' '}
            <span className="serif text-accent">Grounded execution.</span>
          </h2>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-ink">
            <p>
              Craton Technologies is an innovation-driven product company based in
              Frisco, Texas. We identify hard, high-trust problems in regulated or
              evidence-heavy industries, invent a novel approach, protect it,
              assemble the domain leadership to make it credible, and ship it as a
              product — then repeat the method in the next domain.
            </p>
            <p>
              A craton is the ancient, stable core of a continent — the bedrock
              everything else is built on.
            </p>
          </div>
          <div className="mt-8">
            <p className="text-[1.15rem] font-medium text-cream">{site.founder.name}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              {site.founder.role}
            </p>
            <p className="lede mt-3 max-w-[54ch]">{site.founder.bio}</p>
          </div>
        </div>

        <div className="min-w-0">
          <p className="kicker">Leadership roster</p>
          <p className="mt-2 text-[13px] leading-snug text-muted-ink">
            Roles shown; names appear with each person’s consent.
          </p>
          <ul className="mt-4 min-[640px]:hidden">
            {roster.map(([role, detail]) => (
              <li key={role} className="border-b border-[var(--hairline)] py-3.5 last:border-b-0">
                <p className="text-[14px] font-medium leading-snug text-cream">{role}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-muted-ink">{detail}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-4 hidden min-[640px]:block">
            {rosterRows.map((row) => (
              <li
                key={row[0][0]}
                className="border-b border-[var(--hairline)] py-3.5 last:border-b-0"
              >
                <div className="grid grid-cols-2 gap-x-10">
                  {row.map(([role, detail]) => (
                    <div key={role} className="min-w-0">
                      <p className="text-[14px] font-medium leading-snug text-cream">{role}</p>
                      <p className="mt-1 text-[12.5px] leading-snug text-muted-ink">{detail}</p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
