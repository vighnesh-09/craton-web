import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

const FRAMES = [
  {
    n: '01',
    label: 'File',
    title: 'The technical file',
    body: 'Thousands of pages of device evidence, held as one reviewable surface.',
    tone: 'dark',
  },
  {
    n: '02',
    label: 'Gap',
    title: 'Where the file breaks',
    body: 'GSPR rows that lack a document a reviewer can defend.',
    tone: 'light',
  },
  {
    n: '03',
    label: 'Clause',
    title: 'Annex I, in view',
    body: 'Each requirement stays attached to the rule that named it.',
    tone: 'dark',
  },
  {
    n: '04',
    label: 'Proof',
    title: 'The argument',
    body: 'Reasoning shown beside the evidence — not a score without a source.',
    tone: 'light',
  },
  {
    n: '05',
    label: 'Trace',
    title: 'Rule to document',
    body: 'CER, RMF, and IFU references sit on the same row as the gap.',
    tone: 'dark',
  },
  {
    n: '06',
    label: 'Loop',
    title: 'Expert still decides',
    body: 'The system prepares the file. The regulatory team owns the judgment.',
    tone: 'light',
  },
]

export default function FilmStrip() {
  const scrollerRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = scrollerRef.current
    if (!el || reduced) return undefined
    let active = false
    let startX = 0
    let startLeft = 0

    const down = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      active = true
      startX = event.clientX
      startLeft = el.scrollLeft
      el.setPointerCapture(event.pointerId)
    }
    const move = (event) => {
      if (!active) return
      el.scrollLeft = startLeft - (event.clientX - startX)
    }
    const up = () => {
      active = false
    }

    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
  }, [reduced])

  return (
    <section id="evidence" className="scroll-mt-24 overflow-x-clip bg-ink py-14 sm:py-20" aria-label="Evidence index">
      <div className="shell mb-6 flex items-end justify-between gap-4">
        <h2 className="font-serif text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.86] font-medium tracking-[-0.045em] text-cream">
          Drag the file.
        </h2>
        <p className="max-w-[16ch] text-right text-[13px] leading-snug text-muted">
          Large frames. The next one stays in view.
        </p>
      </div>

      <div
        ref={scrollerRef}
        className="evidence-rail shell shell-fit cursor-grab overflow-x-auto active:cursor-grabbing"
        tabIndex={0}
        aria-label="Horizontal evidence frames"
      >
        <ul className="flex w-max gap-3 pb-2">
          {FRAMES.map((frame) => (
            <li key={frame.n} className="evidence-frame shrink-0">
              <article
                className={`flex h-[min(62vh,32rem)] min-h-[22rem] flex-col justify-between p-5 sm:p-8 ${
                  frame.tone === 'dark'
                    ? 'bg-[#0c141c] text-[#f4f7fa]'
                    : 'bg-[#f4f7fa] text-[#1e2a3a]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`font-mono text-[12px] tracking-[0.18em] uppercase ${
                      frame.tone === 'dark' ? 'text-[#9af3ff]' : 'text-[#075e73]'
                    }`}
                  >
                    {frame.label}
                  </span>
                  <span
                    className={`font-serif text-[clamp(5rem,12vw,9rem)] leading-none tracking-[-0.06em] ${
                      frame.tone === 'dark' ? 'text-white/15' : 'text-[#1e2a3a]/12'
                    }`}
                    aria-hidden
                  >
                    {frame.n}
                  </span>
                </div>
                <div>
                  <h3 className="max-w-[12ch] font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.88] font-medium tracking-[-0.045em]">
                    {frame.title}
                  </h3>
                  <p
                    className={`mt-4 max-w-[28ch] text-[16px] leading-relaxed ${
                      frame.tone === 'dark' ? 'text-[#d5dee8]' : 'text-[#2f3f54]'
                    }`}
                  >
                    {frame.body}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
