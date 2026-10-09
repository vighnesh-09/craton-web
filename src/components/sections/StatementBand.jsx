import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

const LINE = 'For EU MDR and IVDR, evidence stays attached to the requirement.'

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

  const phrase = (
    <span className="manifesto-phrase font-sans text-[clamp(1.15rem,2.2vw,1.65rem)] leading-none font-bold tracking-[-0.03em]">
      {LINE}
      <span className="manifesto-dot" aria-hidden="true">
        ·
      </span>
    </span>
  )

  return (
    <section className="border-y border-current/15 bg-ink text-cream" aria-label="Evidence stays attached">
      <div ref={clipRef} className="shell film-marquee-clip py-6">
        <div ref={trackRef} className="film-marquee items-center">
          <p className="flex items-center">{phrase}</p>
          <p className="film-marquee-dup flex items-center" aria-hidden="true">
            {phrase}
          </p>
        </div>
      </div>
    </section>
  )
}
