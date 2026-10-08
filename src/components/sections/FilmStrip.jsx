const FRAMES = [
  {
    n: '01',
    title: 'Ingest the file',
    body: 'Technical documentation enters once — structured for mapping, not buried in folders.',
  },
  {
    n: '02',
    title: 'Map to Annex I',
    body: 'Each GSPR row finds candidate evidence with the rule path shown beside it.',
  },
  {
    n: '03',
    title: 'Surface the gaps',
    body: 'Critical holes rise first so experts spend judgment where it matters.',
  },
  {
    n: '04',
    title: 'Defend the call',
    body: 'Human review stays central — the system shows the argument, not a black box.',
  },
]

/** Four evidence-path steps in one row on desktop, stacked under 800px. */
export default function FilmStrip() {
  return (
    <section id="film" className="section-pad bg-canvas" aria-label="RAccelerator flow">
      <div className="shell">
        <p className="kicker">RAccelerator · evidence path</p>
        <h2 className="display mt-3 max-w-[16ch] text-cream">
          From the file to a <span className="serif text-accent">defended call.</span>
        </h2>
        <ol className="mt-8 flex flex-col min-[800px]:flex-row min-[800px]:items-start">
          {FRAMES.map((frame) => (
            <li
              key={frame.n}
              className="min-w-0 border-b border-[var(--hairline)] py-5 last:border-b-0 min-[800px]:flex-1 min-[800px]:border-r min-[800px]:border-b-0 min-[800px]:px-5 min-[800px]:py-0 min-[800px]:first:pl-0 min-[800px]:last:border-r-0 min-[800px]:last:pr-0"
            >
              <span className="font-mono text-[11px] tracking-[0.14em] text-accent">{frame.n}</span>
              <h3 className="mt-3 text-[1.25rem] font-medium leading-snug text-cream">{frame.title}</h3>
              <p className="lede mt-2">{frame.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
