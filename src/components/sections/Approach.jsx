import { site } from '@/config/site'

/** 03 — headline, method sentence, four steps as a type row. */
export default function Approach() {
  return (
    <section
      id="approach"
      className="pad-x scroll-mt-24 py-8"
      aria-label="How we move forward"
    >
      <div className="shell">
        <p className="mono-label text-accent">03 / How we move forward</p>
        <h2 className="mt-3 max-w-[18ch] text-[clamp(1.85rem,3.6vw,3rem)] font-normal leading-[1.02] tracking-[-0.04em] text-cream">
          Curious by nature.{' '}
          <span className="serif text-accent">Rigorous by design.</span>
        </h2>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-muted-ink">
          One method. Question deeply, protect the idea, assemble the domain’s
          best, then ship — and repeat it in the next domain.
        </p>

        <ol className="mt-8 grid grid-cols-1 border-t border-[#1E2A3A]/20 sm:grid-cols-2 xl:grid-cols-4">
          {site.steps.map((step) => (
            <li
              key={step.n}
              className="min-w-0 border-b border-[#1E2A3A]/15 py-5 sm:px-5 sm:first:pl-0 xl:border-b-0 xl:border-r xl:last:border-r-0 xl:last:pr-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[11px] tracking-[0.16em] text-accent">
                  {step.n}
                </span>
                <span className="text-[12px] text-muted">{step.name}</span>
              </div>
              <h3 className="mt-3 text-[1.12rem] font-medium leading-snug tracking-tight text-cream">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-muted-ink">{step.body}</p>
              <p className="mono-label mt-4 text-accent">{step.tag}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
