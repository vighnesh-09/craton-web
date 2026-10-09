import { site } from '@/config/site'

/** Editorial pair: a short sticky label beside the domain argument. */
export default function DomainScroll() {
  return (
    <section id="domain" className="section-pad scroll-mt-24" aria-label="Domain">
      <div className="shell grid gap-6 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-10">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="kicker">02 · Domain</p>
          <p className="mt-2 font-mono text-[12px] text-muted">Product + IP</p>
        </div>
        <div className="min-w-0">
          <h2 className="max-w-[18ch] font-serif text-[clamp(1.85rem,3.2vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-cream">
            Two kinds of evidence. One company that files first.
          </h2>
          <div className="mt-6 grid gap-0 border-t border-[var(--hairline)] sm:grid-cols-2">
            <article className="border-b border-[var(--hairline)] py-5 sm:border-b-0 sm:border-r sm:pr-6">
              <p className="font-mono text-[12px] text-[color:var(--accent-text)]">MedTech</p>
              <h3 className="mt-2 text-[18px] font-medium text-cream">
                EU MDR / IVDR technical files
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">
                {site.products.ra.problem} {site.products.ra.change}
              </p>
            </article>
            <article className="py-5 sm:pl-6">
              <p className="font-mono text-[12px] text-[color:var(--accent-text)]">Commerce</p>
              <h3 className="mt-2 text-[18px] font-medium text-cream">
                Review evidence for agents
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">
                {site.products.ri.problem} {site.products.ri.change}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
