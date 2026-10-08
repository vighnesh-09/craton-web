import { site } from '@/config/site'

/** Every method step in view. One row on desktop, a vertical list under 800px. */
export default function Approach() {
  return (
    <section id="approach" className="section-pad bg-canvas" aria-label="How we move forward">
      <div className="shell">
        <p className="kicker">How we move forward</p>
        <h2 className="display mt-3 max-w-[14ch] text-cream">
          Curious by nature.{' '}
          <span className="serif text-accent">Rigorous by design.</span>
        </h2>
        <p className="lede mt-4 max-w-[58ch]">
          One method. Question deeply, protect the idea, assemble the domain’s
          best, then ship — and repeat it in the next domain.
        </p>
        <ol className="mt-8 flex flex-col min-[800px]:flex-row min-[800px]:items-start">
          {site.steps.map((step) => (
            <li
              key={step.n}
              className="min-w-0 border-b border-[var(--hairline)] py-5 last:border-b-0 min-[800px]:flex-1 min-[800px]:border-r min-[800px]:border-b-0 min-[800px]:px-4 min-[800px]:py-0 min-[800px]:first:pl-0 min-[800px]:last:border-r-0 min-[800px]:last:pr-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[11px] tracking-[0.14em] text-accent">{step.n}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-ink">{step.name}</span>
              </div>
              <h3 className="mt-3 text-[1.05rem] font-medium leading-snug text-cream">{step.title}</h3>
              <p className="lede mt-2">{step.body}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{step.tag}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
