import { useEffect } from 'react'
import useGsapContext from '@/hooks/useGsapContext'
import { site } from '@/config/site'

/**
 * Large type inside the XL shell. One doubled-letter pilot mark.
 */
export default function Hero() {
  const { rootRef } = useGsapContext(({ gsap, root }) => {
    const lines = root.querySelectorAll('[data-rise]')
    gsap.from(lines, {
      yPercent: 110,
      duration: 0.72,
      stagger: 0.045,
      ease: 'power3.out',
    })
  })

  useEffect(() => {
    document.getElementById('boot-hero')?.remove()
  }, [])

  return (
    <section
      id="top"
      ref={rootRef}
      className="film-hero relative scroll-mt-0 overflow-hidden"
      aria-label="Opening"
    >
      <div className="shell shell-fit pt-24 pb-[var(--section-y)] sm:pt-28">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-current/15 pb-3">
          <p className="text-[clamp(1.05rem,1.6vw,1.25rem)] italic font-normal tracking-[-0.02em]">
            Bold ideas. Engineered forward.
          </p>
          <p className="type-label">{site.location}</p>
        </div>

        <h1 className="film-display mt-6">
          {['AI', 'for', 'EU', 'MDR', '&', 'IVDR', 'GSPR', 'gap', 'assessment.'].map((word, index, words) => (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden align-bottom pb-[0.06em]"
            >
              <span data-rise className="inline-block">
                {word}
                {index < words.length - 1 ? '\u00A0' : ''}
              </span>
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.55]">
          For regulatory teams writing EU MDR and IVDR technical documentation.
          GSPR gap assessment stays with the expert in the loop.
        </p>

        <a href="#contact" className="pilot-echo mt-8">
          <span className="echo" aria-hidden="true">
            Request a pilot
          </span>
          Request a pilot
        </a>

        <div className="mt-10 h-px w-full bg-current/20" aria-hidden="true" />
      </div>
    </section>
  )
}
