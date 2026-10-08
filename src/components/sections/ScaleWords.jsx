import useGsapContext from '@/hooks/useGsapContext'

const LINES = [
  { text: 'Invent.', accent: false },
  { text: 'Protect.', accent: true },
  { text: 'Assemble.', accent: false },
  { text: 'Ship.', accent: true },
]

/** GSAP pinned kinetic words — one peaks per scrub segment. */
export default function ScaleWords() {
  const { rootRef, reduced } = useGsapContext(({ gsap, root }) => {
    const stage = root.querySelector('[data-stage]')
    const words = root.querySelectorAll('[data-word]')
    if (!stage || !words.length) return

    gsap.set(words, { opacity: 0.18, scale: 0.9, y: 20 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=160%',
        pin: stage,
        scrub: 0.7,
        anticipatePin: 1,
      },
    })

    words.forEach((word, i) => {
      const start = i / words.length
      tl.to(
        word,
        { opacity: 1, scale: 1.06, y: 0, ease: 'none', duration: 0.2 },
        start,
      )
      if (i < words.length - 1) {
        tl.to(
          word,
          { opacity: 0.22, scale: 0.96, ease: 'none', duration: 0.15 },
          start + 0.18,
        )
      }
    })
  }, [])

  if (reduced) {
    return (
      <section
        aria-label="Craton method words"
        className="pad-x border-y border-line py-[clamp(2.5rem,5vw,4rem)] text-center"
      >
        <p className="text-[clamp(1.8rem,5vw,3.2rem)] tracking-tight">
          Invent. Protect. Assemble. Ship.
        </p>
      </section>
    )
  }

  return (
    <section ref={rootRef} className="relative" aria-label="Craton method words">
      <div
        data-stage
        className="flex h-[100svh] flex-col items-center justify-center overflow-hidden pad-x"
      >
        <p className="mono-label mb-6 text-accent">Method in four words</p>
        <ul className="w-full max-w-[56rem] space-y-1 text-center">
          {LINES.map((line) => (
            <li
              key={line.text}
              data-word
              className={
                line.accent
                  ? 'serif text-[clamp(2.6rem,8vw,6rem)] leading-[0.95] tracking-[-0.04em] text-accent will-change-transform'
                  : 'text-[clamp(2.4rem,7.5vw,5.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.05em] will-change-transform'
              }
            >
              {line.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
