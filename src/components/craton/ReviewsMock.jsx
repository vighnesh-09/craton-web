export default function ReviewsMock({ className = '', compact = false }) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-ink-3 to-ink ${className}`}
    >
      <div
        className={`flex items-center justify-between border-b border-line font-mono text-[10px] uppercase tracking-[0.14em] text-muted ${compact ? 'px-4 py-3' : 'px-5 py-4'}`}
      >
        <span className="flex items-center gap-2 text-cream/90">
          <span className="size-1.5 rounded-full bg-accent" />
          The decision layer
        </span>
        <span>Conceptual flow</span>
      </div>

      <div
        className={`space-y-0 divide-y divide-line text-[13px] ${compact ? 'p-3.5' : 'p-5'}`}
      >
        <Row k="Agent request" tight={compact}>
          Cordless drill for a home workshop · budget ≤ $180 · needed by Friday
        </Row>
        <Row k="Review evidence" tight={compact}>
          <div className="flex flex-wrap gap-2">
            {[
              ['Battery life under load', '412 reviews · 3 sources'],
              ['Chuck durability', '168 reviews · 2 sources'],
              ...(compact
                ? []
                : [['Warranty response', '77 reviews · 1 source']]),
            ].map(([title, meta]) => (
              <span
                key={title}
                className="rounded-lg border border-line bg-white/[0.03] px-3 py-2"
              >
                <b className="block text-[12.5px] font-medium text-cream">
                  {title}
                </b>
                <small className="text-[11px] text-muted">{meta}</small>
              </span>
            ))}
          </div>
        </Row>
        {!compact ? (
          <Row k="Decision context">
            Weekend use, occasional masonry, price ceiling honored. Two
            candidates meet the evidence bar; one exceeds budget.
          </Row>
        ) : null}
        <Row k="Authorization" tight={compact}>
          <div className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/10 px-3 py-3">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
            <div>
              <b className="text-cream">Authorized on evidence</b>
              <p className="mt-1 text-[12px] text-muted">
                Rationale attached · reviewable by the buyer before checkout
              </p>
            </div>
          </div>
        </Row>
      </div>

      <figcaption
        className={`flex flex-wrap justify-between gap-2 border-t border-line text-[11px] text-muted ${compact ? 'px-4 py-2.5' : 'px-5 py-3.5'}`}
      >
        <span>Connected rationale</span>
        <span>Not just another recommendation</span>
      </figcaption>
    </figure>
  )
}

function Row({ k, children, tight = false }) {
  return (
    <div
      className={`grid gap-2 first:pt-0 last:pb-0 sm:grid-cols-[120px_1fr] sm:gap-4 ${tight ? 'py-2.5' : 'py-3.5'}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        {k}
      </span>
      <div className="text-cream/85">{children}</div>
    </div>
  )
}
