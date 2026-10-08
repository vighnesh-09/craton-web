import { site } from '@/config/site'

const roster = [
  ['Chief Regulatory Affairs Officer', 'Co-founder · EU MDR / IVDR'],
  ['Chief Product Officer', 'Co-founder · product & user acceptance'],
  ['Head of Regulatory Affairs, IVD', 'In vitro diagnostics'],
  ['Chief Commercial Officer', 'Go-to-market'],
  ['Regulatory consultants', 'Independent MD and IVD specialists'],
  ['AI engineering team', 'Palo Alto'],
]

/** 04 — one navy band: founder type left, roles as a list. */
export default function About() {
  return (
    <section
      id="about"
      className="pad-x scroll-mt-24 py-8"
      aria-label="About Craton"
    >
      <div className="shell bg-[#1E2A3A] px-6 py-8 text-[#f4f7fa] sm:px-8 sm:py-10">
        <p className="mono-label text-[#00A8C4]">04 / Craton Technologies</p>
        <h2 className="mt-3 max-w-[16ch] text-[clamp(1.85rem,3.6vw,3rem)] font-normal leading-[1.02] tracking-[-0.04em]">
          Bold thinking.{' '}
          <span className="serif text-[#00A8C4]">Grounded execution.</span>
        </h2>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-[#d5e0ea]">
          A craton is the ancient, stable core of a continent — the bedrock
          everything else is built on. That is the idea: one method, one
          engineering discipline, one patent-first habit.
        </p>

        <div className="mt-8 grid items-start gap-10 border-t border-white/15 pt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[15px] leading-[1.65] text-[#e8eef5]">
              Craton Technologies is an innovation-driven product company based
              in Frisco, Texas. We identify hard, high-trust problems in
              regulated or evidence-heavy industries, invent a novel approach,
              protect it, assemble the domain leadership to make it credible,
              and ship it as a product — then repeat the method in the next
              domain.
            </p>
            <p className="mt-6 text-[1.15rem] font-medium tracking-tight">
              {site.founder.name}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#00A8C4]">
              {site.founder.role}
            </p>
            <p className="mt-3 max-w-[48ch] text-[14px] leading-relaxed text-[#d5e0ea]">
              {site.founder.bio}
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="mono-label text-[#9ec9d6]">Leadership roster</p>
              <p className="text-[13px] text-[#c5d4e0]">
                Roles shown; names appear with each person’s consent.
              </p>
            </div>
            <ul className="mt-4 border-t border-white/15">
              {roster.map(([role, detail]) => (
                <li
                  key={role}
                  className="grid grid-cols-1 gap-0.5 border-b border-white/12 py-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] sm:items-baseline sm:gap-4"
                >
                  <p className="text-[14.5px] font-medium leading-snug">{role}</p>
                  <p className="text-[13px] leading-snug text-[#c5d4e0] sm:text-right">
                    {detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
