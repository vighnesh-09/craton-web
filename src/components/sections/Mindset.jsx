import { site } from '@/config/site'

/** Beliefs beside the question. Open list, every line fully readable. */
export default function Mindset() {
  return (
    <section id="mindset" className="section-pad bg-paper-2" aria-label="The Craton mindset">
      <div className="shell grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
        <div className="min-w-0">
          <p className="kicker">The Craton mindset</p>
          <h2 className="display mt-3 max-w-[14ch] text-cream">
            The next breakthrough starts with a{' '}
            <span className="serif text-accent">better question.</span>
          </h2>
          <p className="lede mt-4 max-w-[36ch]">
            What if complex information could become clearer decisions? We bring
            bold thinking, deep research, and thoughtful architecture together.
          </p>
        </div>
        <ol>
          {site.beliefs.map((belief, i) => (
            <li
              key={belief.title}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 border-b border-[var(--hairline)] py-5 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span className="pt-1 font-mono text-[11px] tracking-[0.14em] text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h3 className="text-[clamp(1.15rem,1.8vw,1.45rem)] font-medium leading-snug text-cream">
                  {belief.title}
                </h3>
                <p className="lede mt-2 max-w-[52ch]">{belief.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
