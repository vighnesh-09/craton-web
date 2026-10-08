/** Patent-first line in normal flow. No absolute glow that paints into the next section. */
export default function ClipMask() {
  return (
    <section
      className="pad-x py-8 text-center sm:py-10"
      aria-label="Patent-first"
    >
      <div className="mx-auto w-full max-w-[48rem]">
        <h2 className="text-[clamp(2rem,5.2vw,3.6rem)] font-normal leading-[1.08] tracking-[-0.045em]">
          Patent-first.
          <br />
          <span className="serif text-accent">Then product.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-[14px] leading-relaxed text-muted sm:text-[15px]">
          Novel approaches are filed before they are built — so enterprises can
          invest in a young company with confidence.
        </p>
      </div>
    </section>
  )
}
