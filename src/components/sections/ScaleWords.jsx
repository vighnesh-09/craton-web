const LINES = [
  { text: 'Invent.', accent: false },
  { text: 'Protect.', accent: true },
  { text: 'Assemble.', accent: false },
  { text: 'Ship.', accent: true },
]

/** 02 — one line of large type on a single baseline. */
export default function ScaleWords() {
  return (
    <section className="pad-x py-2" aria-label="Method in four words">
      <div className="shell border-b border-[#1E2A3A]/20 pb-4 pt-2">
        <p className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          {LINES.map((line) => (
            <span
              key={line.text}
              className={
                line.accent
                  ? 'serif text-[clamp(2rem,4.2vw,3.25rem)] leading-none tracking-[-0.03em] text-accent'
                  : 'text-[clamp(1.65rem,3.4vw,2.65rem)] font-semibold uppercase leading-none tracking-[-0.045em] text-cream'
              }
            >
              {line.text}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
