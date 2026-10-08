/**
 * Burden and clarity as two separate blocks. The pinned wipe stacked both
 * headlines in a full-viewport stage with an empty right side.
 */
export default function EvidenceWipe() {
  return (
    <section
      id="wipe"
      aria-label="From burden to evidence"
      className="pad-x py-[var(--section-y)]"
    >
      <div className="shell grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-[#0f1621] p-6 sm:p-7">
          <p className="mono-label text-[#8aa0b8]">The burden</p>
          <h2 className="mt-3 text-[clamp(1.45rem,2.4vw,2rem)] font-normal leading-snug tracking-tight text-[#e8eef5]">
            Thousands of pages. Manual mapping. Deadline pressure.
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#8aa0b8] sm:text-[15px]">
            GSPR gap assessment and classification still force teams to rebuild
            the argument by hand — every submission cycle.
          </p>
        </div>
        <div className="rounded-2xl border border-accent/30 bg-[linear-gradient(135deg,#00a8c4_0%,#007a96_55%,#1e2a3a_100%)] p-6 sm:p-7">
          <p className="mono-label text-white/80">The Craton cut</p>
          <h2 className="mt-3 text-[clamp(1.45rem,2.4vw,2rem)] font-normal leading-snug tracking-tight text-white">
            Requirement. Evidence. <span className="serif">Human judgment.</span>
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
            RAccelerator surfaces the defended path — rule-traced,
            document-linked, ready for expert review.
          </p>
        </div>
      </div>
    </section>
  )
}
