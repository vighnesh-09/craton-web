import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

const LINES = ['MDR', 'IVDR', 'GSPR', 'Evidence', 'Trace', 'Annex I', 'Human in the loop']

export default function StatementBand() {
  const reduced = usePrefersReducedMotion()
  const clipRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const clip = clipRef.current
    const track = trackRef.current
    if (!clip || !track || reduced) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        track.classList.toggle('is-paused', !entry.isIntersecting)
      },
      { threshold: 0.05 },
    )
    observer.observe(clip)
    return () => observer.disconnect()
  }, [reduced])

  const row = LINES.map((word) => (
    <span key={word} className="px-4 font-serif text-[clamp(2rem,4.5vw,4rem)] leading-none tracking-[-0.04em]">
      {word}
      <span className="px-4 text-[#00a8c4]" aria-hidden="true">
        /
      </span>
    </span>
  ))

  return (
    <section className="border-y border-current/15 bg-ink text-cream" aria-label="Domains">
      <div ref={clipRef} className="shell film-marquee-clip py-6">
        <div ref={trackRef} className="film-marquee items-center">
          <p className="flex items-center">{row}</p>
          <p className="film-marquee-dup flex items-center" aria-hidden="true">
            {row}
          </p>
        </div>
      </div>
    </section>
  )
}
