import { site } from '@/config/site'

export default function Proof() {
  return (
    <section id="proof" className="section-pad bg-canvas" aria-label="Proof">
      <div className="shell">
        <p className="kicker">Proof, once</p>
        <h2 className="display mt-3 max-w-[16ch] text-cream">
          Signal that survives a diligence call.
        </h2>
        <p className="lede mt-3 max-w-[42ch]">
          Patents, enterprise evaluation timing, and founder track record —
          shown once, loud enough to trust.
        </p>
        <ol className="mt-8 grid border-t border-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {site.proof.map((item, i) => (
            <li
              key={item.label}
              className="border-b border-[var(--hairline)] py-5 lg:border-b-0 lg:border-l lg:px-5 lg:first:border-l-0 lg:first:pl-0"
            >
              <p className="font-mono text-[11px] tracking-[0.14em] text-accent">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 text-[clamp(1.6rem,2.2vw,2.1rem)] font-medium tracking-[-0.03em] text-cream">
                {item.value}
              </p>
              <p className="mt-2 text-[14px] leading-snug text-muted-ink">{item.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
