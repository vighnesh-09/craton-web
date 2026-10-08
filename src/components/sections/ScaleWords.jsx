const LINES = [
  { text: 'Invent.', accent: false },
  { text: 'Protect.', accent: true },
  { text: 'Assemble.', accent: false },
  { text: 'Ship.', accent: true },
]

function wordClass(accent) {
  const size =
    'text-[clamp(2.4rem,10vw,3.25rem)] leading-[0.95] min-[800px]:text-[clamp(2.4rem,4.2vw,4.75rem)]'
  return accent
    ? `serif ${size} tracking-[-0.04em] text-accent`
    : `${size} font-semibold uppercase tracking-[-0.05em] text-cream`
}

/** Four method words in one typographic row. Content height only. */
export default function ScaleWords() {
  return (
    <section
      id="method"
      className="section-pad border-y border-[var(--hairline)] bg-canvas"
      aria-label="Method in four words"
    >
      <div className="shell">
        <p className="kicker">Method in four words</p>
        <ol className="mt-4 flex flex-col min-[800px]:flex-row min-[800px]:items-baseline">
          {LINES.map((line) => (
            <li
              key={line.text}
              className="min-w-0 border-b border-[var(--hairline)] py-3 last:border-b-0 min-[800px]:border-r min-[800px]:border-b-0 min-[800px]:px-5 min-[800px]:py-0 min-[800px]:first:pl-0 min-[800px]:last:border-r-0 min-[800px]:last:pr-0"
            >
              <span className={wordClass(line.accent)}>{line.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
