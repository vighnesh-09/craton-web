import useGsapContext from '@/hooks/useGsapContext'

/**
 * GSAP ScrollTrigger pin — cinematic conviction (short, releases cleanly).
 */
export default function StatementBand() {
  const { rootRef, reduced } = useGsapContext(({ gsap, ScrollTrigger, root }) => {
    const stage = root.querySelector('[data-stage]')
    const title = root.querySelector('[data-title]')
    const line = root.querySelector('[data-line]')
    if (!stage || !title) return

    gsap.set(title, { scale: 1.1, y: 36, opacity: 0.4 })
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=140%',
        pin: stage,
        scrub: 0.65,
        anticipatePin: 1,
      },
    })

    tl.to(title, { scale: 1, y: 0, opacity: 1, ease: 'none', duration: 0.45 }, 0)
      .to(line, { scaleX: 1, ease: 'none', duration: 0.5 }, 0.15)
      .to(title, { scale: 0.97, opacity: 0.65, ease: 'none', duration: 0.35 }, 0.7)

    ScrollTrigger.refresh()
  }, [])

  if (reduced) {
    return (
      <section
        aria-label="Evidence conviction"
        className="pad-x border-y border-line bg-ink-2/50 py-[clamp(3rem,6vw,5rem)]"
      >
        <div className="shell text-center">
          <p className="mono-label text-accent">The Craton conviction</p>
          <h2 className="mx-auto mt-5 max-w-[16ch] text-[clamp(2.2rem,6vw,4.2rem)] leading-[1.02] tracking-[-0.045em]">
            Evidence is the product.
            <br />
            <span className="serif text-accent">Everything else is decoration.</span>
          </h2>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={rootRef}
      className="relative"
      aria-label="Evidence conviction"
    >
      <div
        data-stage
        className="flex h-[100svh] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,229,255,0.08),transparent_55%)]"
      >
        <div className="pad-x shell text-center">
          <p className="mono-label text-accent">The Craton conviction</p>
          <h2
            data-title
            className="mx-auto mt-5 max-w-[16ch] text-[clamp(2.2rem,6.2vw,4.5rem)] font-normal leading-[0.98] tracking-[-0.05em] will-change-transform"
          >
            Evidence is the product.
            <br />
            <span className="serif text-accent">Everything else is decoration.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[42ch] text-[15px] leading-relaxed text-muted">
            In EU MDR / IVDR work and agentic commerce alike, a recommendation is
            only as strong as the proof behind it.
          </p>
          <div className="mx-auto mt-8 h-px w-full max-w-xs overflow-hidden bg-line">
            <div data-line className="h-full origin-left bg-accent" />
          </div>
        </div>
      </div>
    </section>
  )
}
