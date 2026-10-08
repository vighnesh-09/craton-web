import { site } from '@/config/site'

/** 01 — headline, then three beliefs as a type row with hairlines. */
export default function Mindset() {
  return (
    <section
      id="mindset"
      className="pad-x scroll-mt-24 py-8"
      aria-label="The Craton mindset"
    >
      <div className="shell">
        <p className="mono-label text-accent">01 / The Craton mindset</p>
        <h2 className="mt-3 max-w-[18ch] text-[clamp(1.85rem,3.6vw,3rem)] font-normal leading-[1.02] tracking-[-0.04em] text-cream">
          The next breakthrough starts with a{' '}
          <span className="serif text-accent">better question.</span>
        </h2>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-muted-ink">
          What if complex information could become clearer decisions? We bring
          bold thinking, deep research, and thoughtful architecture together to
          build products for work where trust is the hard part.
        </p>

        <ol className="mt-8 grid grid-cols-1 border-t border-[#1E2A3A]/15 md:grid-cols-3">
          {site.beliefs.map((belief, i) => (
            <li
              key={belief.title}
              className="min-w-0 border-b border-[#1E2A3A]/15 py-5 md:border-b-0 md:border-r md:px-6 md:py-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-[1.15rem] font-medium leading-snug tracking-[-0.03em] text-cream">
                {belief.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-muted-ink">
                {belief.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
