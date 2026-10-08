/** Centered conviction. Content height, no pin. */
export default function StatementBand() {
  return (
    <section
      className="section-pad border-y border-[var(--hairline)] bg-paper-2"
      aria-label="Evidence conviction"
    >
      <div className="shell text-center">
        <p className="kicker">The Craton conviction</p>
        <h2 className="display mx-auto mt-4 max-w-[18ch] text-cream">
          Evidence is the product.{' '}
          <span className="serif text-accent">Everything else is decoration.</span>
        </h2>
        <p className="lede mx-auto mt-4 max-w-[46ch]">
          In EU MDR / IVDR work and agentic commerce alike, a recommendation is
          only as strong as the proof behind it.
        </p>
        <div className="mx-auto mt-8 h-px w-full max-w-xs bg-accent" />
      </div>
    </section>
  )
}
