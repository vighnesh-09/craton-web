import { useEffect, useRef } from 'react'
import { site } from '@/config/site'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

export default function Voices() {
  const reduced = usePrefersReducedMotion()
  const clipRef = useRef(null)
  const trackRef = useRef(null)
  const voices = site.voices

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

  const cards = voices.map((voice) => (
    <blockquote
      key={voice.id}
      className="w-[min(24rem,70cqi)] shrink-0 border border-current/15 bg-[#f4f7fa] p-5 text-[#1e2a3a]"
    >
      <p className="font-serif text-[1.25rem] leading-snug tracking-[-0.03em]">“{voice.quote}”</p>
      <footer className="mt-4 text-[12px] leading-snug text-[#3a6d8c]">
        {voice.name} · {voice.role}
      </footer>
    </blockquote>
  ))

  return (
    <section className="section-pad overflow-x-clip bg-ink text-cream" aria-label="Illustrative voices">
      <div className="shell mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="type-label">05 · Voices</p>
          <h2 className="type-h2 mt-2">Voices</h2>
        </div>
        <p className="text-[13px] leading-snug text-muted">Illustrative. Not customer endorsements.</p>
      </div>
      <div ref={clipRef} className="shell shell-fit film-marquee-clip">
        <div ref={trackRef} className="film-marquee gap-3">
          <div className="flex gap-3">{cards}</div>
          <div className="film-marquee-dup flex gap-3" aria-hidden="true">
            {cards}
          </div>
        </div>
      </div>
    </section>
  )
}
