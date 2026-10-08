/** Conviction line in normal flow. The pinned viewport was empty around the type. */
export default function StatementBand() {
  return (
    <section
      aria-label="Evidence conviction"
      className="pad-x border-y border-line bg-ink-2/40 py-[clamp(1.6rem,3.2vw,2.6rem)]"
    >
      <div className="shell text-center">
        <p className="mono-label text-accent">The Craton conviction</p>
        <h2 className="mx-auto mt-3 max-w-[18ch] text-[clamp(1.85rem,4.6vw,3.35rem)] font-normal leading-[1.05] tracking-[-0.045em]">
          Evidence is the product.
          <br />
          <span className="serif text-accent">Everything else is decoration.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[42ch] text-[14px] leading-relaxed text-muted sm:text-[15px]">
          In EU MDR / IVDR work and agentic commerce alike, a recommendation is
          only as strong as the proof behind it.
        </p>
        <div className="mx-auto mt-5 h-px w-full max-w-xs bg-accent" />
      </div>
    </section>
  )
}
