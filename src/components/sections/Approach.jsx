import { useState } from 'react'
import { site } from '@/config/site'

const SHEETS = [
  { title: 'File', line: 'One reviewable surface', tone: 'bg-[#f4f7fa] text-[#1e2a3a]' },
  { title: 'Rule', line: 'The clause stays attached', tone: 'bg-[#1e2a3a] text-[#f4f7fa]' },
  { title: 'Judgment', line: 'The expert still decides', tone: 'bg-[#e7f7fb] text-[#1e2a3a]' },
]

export default function Approach() {
  const [cut, setCut] = useState(22)

  function onMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const next = ((event.clientX - rect.left) / rect.width) * 100
    setCut(Math.min(88, Math.max(8, next)))
  }

  return (
    <section id="approach" className="scroll-mt-24 bg-ink text-cream" aria-label="How it works">
      <div className="shell section-pad">
        <p className="type-label">03 · How it works</p>
        <h2 className="type-h2 mt-2 max-w-[18ch]">
          Slice the file. See the evidence.
        </h2>
        <p className="type-body mt-3 max-w-[46ch] text-muted-ink">
          A pointer trace through a document stack. Conceptual only — not a product control and not a score.
        </p>

        <div
          className="relative mt-6 h-[min(42vh,18rem)] min-h-[12rem] overflow-hidden border border-current/15"
          onPointerMove={onMove}
          onPointerDown={onMove}
        >
          <Sheet sheet={SHEETS[2]} className="absolute inset-0" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${Math.max(cut - 14, 0)}%)` }}>
            <Sheet sheet={SHEETS[1]} className="h-full" />
          </div>
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${cut}%)` }}>
            <Sheet sheet={SHEETS[0]} className="h-full" />
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-[#00e5ff]"
            style={{ left: `${cut}%` }}
            aria-hidden
          />
        </div>

        <ol className="mt-3 grid border-t border-current/15 sm:grid-cols-2 lg:grid-cols-4">
          {site.steps.map((step) => (
            <li key={step.n} className="min-w-0 border-b border-current/15 px-1 py-5 lg:border-r lg:border-b-0 lg:px-4 lg:last:border-r-0">
              <p className="type-label">{step.n}</p>
              <h3 className="type-h3 mt-3">{step.title}</h3>
              <p className="type-body mt-2 text-muted-ink">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Sheet({ sheet, className }) {
  return (
    <div className={`${sheet.tone} flex h-full flex-col justify-between p-6 sm:p-8 ${className}`}>
      <p className="type-label opacity-70">{sheet.title}</p>
      <p className="type-h2 max-w-[16ch]">
        {sheet.line}
      </p>
    </div>
  )
}
