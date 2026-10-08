/** Patent-first band. Headline and supporting line share one compact row. */
export default function ClipMask() {
  return (
    <section className="section-pad bg-[#1E2A3A] text-[#f4f7fa]" aria-label="Patent-first">
      <div className="shell grid items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
        <h2 className="display max-w-[16ch]">
          Patent-first.
          <br />
          <span className="serif text-accent">Then product.</span>
        </h2>
        <div className="min-w-0">
          <p className="max-w-[46ch] text-[15px] leading-relaxed text-[#d5e0ea]">
            Novel approaches are filed before they are built — so enterprises can
            invest in a young company with confidence.
          </p>
          <div className="mt-6 h-px w-full max-w-xs bg-[#00A8C4]" />
        </div>
      </div>
    </section>
  )
}
