/**
 * Burden and clarity sit side by side at content height.
 */
export default function EvidenceWipe() {
  return (
    <section id="wipe" className="section-pad bg-canvas" aria-label="From burden to evidence">
      <div className="shell grid gap-4 md:grid-cols-2">
        <div className="rounded-[var(--radius)] bg-[#1E2A3A] p-6 text-[#f4f7fa] sm:p-7">
          <p className="kicker">The burden</p>
          <h2 className="mt-3 text-[clamp(1.4rem,2.2vw,1.85rem)] font-medium leading-snug tracking-[-0.03em]">
            Thousands of pages. Manual mapping. Deadline pressure.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#d5e0ea]">
            GSPR gap assessment and classification still force teams to rebuild
            the argument by hand — every submission cycle.
          </p>
        </div>
        <div className="rounded-[var(--radius)] border border-[var(--hairline)] bg-[#f7f8fa] p-6 sm:p-7">
          <p className="kicker">The Craton cut</p>
          <h2 className="mt-3 text-[clamp(1.4rem,2.2vw,1.85rem)] font-medium leading-snug tracking-[-0.03em] text-[#1E2A3A]">
            Requirement. Evidence.{' '}
            <span className="serif text-[#075e73]">Human judgment.</span>
          </h2>
          <p className="lede mt-3">
            RAccelerator surfaces the defended path — rule-traced,
            document-linked, ready for expert review.
          </p>
        </div>
      </div>
    </section>
  )
}
