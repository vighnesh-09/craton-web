import useGsapContext from '@/hooks/useGsapContext'

/** GSAP clip-path type reveal. */
export default function ClipMask() {
  const { rootRef, reduced } = useGsapContext(({ gsap, root }) => {
    const stage = root.querySelector('[data-stage]')
    const reveal = root.querySelector('[data-reveal]')
    const sub = root.querySelector('[data-sub]')
    const glow = root.querySelector('[data-glow]')
    if (!stage || !reveal) return

    gsap.set(reveal, { clipPath: 'inset(0 0 100% 0)' })
    gsap.set(sub, { opacity: 0, y: 16 })
    gsap.set(glow, { opacity: 0.15, scale: 0.85 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=150%',
        pin: stage,
        scrub: 0.7,
        anticipatePin: 1,
      },
    })

    tl.to(glow, { opacity: 1, scale: 1, ease: 'none', duration: 0.5 }, 0)
      .to(reveal, { clipPath: 'inset(0 0 0% 0)', ease: 'none', duration: 0.55 }, 0.05)
      .to(sub, { opacity: 1, y: 0, ease: 'none', duration: 0.35 }, 0.45)
  }, [])

  if (reduced) {
    return (
      <section
        className="pad-x py-[clamp(3rem,6vw,5rem)] text-center"
        aria-label="Patent-first"
      >
        <h2 className="text-[clamp(2.2rem,6vw,4.5rem)] tracking-[-0.045em]">
          Patent-first.
          <br />
          <span className="serif text-accent">Then product.</span>
        </h2>
      </section>
    )
  }

  return (
    <section ref={rootRef} className="relative" aria-label="Patent-first">
      <div
        data-stage
        className="flex h-[100svh] items-center justify-center overflow-hidden pad-x"
      >
        <div className="relative mx-auto w-full max-w-[48rem] text-center">
          <div
            data-glow
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[min(80vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
          />

          <p
            aria-hidden
            className="relative text-[clamp(2.2rem,6.5vw,4.75rem)] font-normal leading-[0.98] tracking-[-0.05em] text-cream/[0.08]"
          >
            Patent-first.
            <br />
            Then product.
          </p>

          <h2
            data-reveal
            className="absolute inset-x-0 top-0 text-[clamp(2.2rem,6.5vw,4.75rem)] font-normal leading-[0.98] tracking-[-0.05em]"
          >
            Patent-first.
            <br />
            <span className="serif text-accent">Then product.</span>
          </h2>

          <p
            data-sub
            className="relative mx-auto mt-10 max-w-[40ch] text-[15px] leading-relaxed text-muted"
          >
            Novel approaches are filed before they are built — so enterprises can
            invest in a young company with confidence.
          </p>
        </div>
      </div>
    </section>
  )
}
