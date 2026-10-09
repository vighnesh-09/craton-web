import { useEffect } from 'react'
import useGsapContext from '@/hooks/useGsapContext'
import { site } from '@/config/site'

const LINES = ['AI for EU', 'MDR & IVDR.']

/**
 * Monumental type inside the XL shell. One doubled-letter pilot mark.
 */
export default function Hero() {
  const { rootRef } = useGsapContext(({ gsap, root }) => {
    const lines = root.querySelectorAll('[data-rise]')
    gsap.from(lines, {
      yPercent: 108,
      duration: 0.95,
      stagger: 0.07,
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
      <div className="shell shell-fit pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="flex items-baseline justify-between gap-4 border-b border-current/15 pb-3">
          <p className="font-mono text-[12px] tracking-[0.18em] uppercase">
            Bold ideas. Engineered forward.
          </p>
          <p className="font-mono text-[12px] tracking-[0.08em]">{site.location}</p>
        </div>

        <h1 className="film-display mt-6">
          {LINES.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-rise className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="mt-8 max-w-[38ch] text-[16px] leading-snug sm:text-[18px]">
          AI for EU MDR and IVDR technical documentation and GSPR gap assessment.
          The expert stays in the loop.
        </p>

        <a href="#contact" className="pilot-echo mt-10">
          <span className="echo" aria-hidden="true">
            Request a pilot
          </span>
          Request a pilot
        </a>

        <div className="mt-14 h-px w-full bg-current/20" aria-hidden="true" />
      </div>
    </section>
  )
}
