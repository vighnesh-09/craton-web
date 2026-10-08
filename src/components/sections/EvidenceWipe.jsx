import useGsapContext from '@/hooks/useGsapContext'

/** GSAP sticky wipe — burden → clarity with clip scrub. */
export default function EvidenceWipe() {
  const { rootRef, reduced } = useGsapContext(({ gsap, root }) => {
    const stage = root.querySelector('[data-stage]')
    const after = root.querySelector('[data-after]')
    const bar = root.querySelector('[data-bar]')
    if (!stage || !after) return

    gsap.set(after, { clipPath: 'inset(0 100% 0 0)' })
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })

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

    tl.to(after, { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: 1 }, 0).to(
      bar,
      { scaleX: 1, ease: 'none', duration: 1 },
      0,
    )
  }, [])

  if (reduced) {
    return (
      <section
        aria-label="From burden to evidence"
        className="pad-x grid gap-8 py-16 md:grid-cols-2"
      >
        <div className="rounded-2xl border border-line bg-ink-2 p-8">
          <p className="mono-label text-muted">Before</p>
          <h2 className="mt-4 text-2xl tracking-tight">
            Thousands of pages. Manual mapping. Deadline pressure.
          </h2>
        </div>
        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8">
          <p className="mono-label text-accent">After</p>
          <h2 className="mt-4 text-2xl tracking-tight">
            Requirement → evidence → human review, in one defended view.
          </h2>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={rootRef}
      id="wipe"
      className="relative"
      aria-label="From burden to evidence"
    >
      <div data-stage className="relative h-[100svh] overflow-hidden">
        <div className="absolute inset-0 flex items-center bg-[#0f1621] pad-x">
          <div className="shell w-full">
            <p className="mono-label text-[#8aa0b8]">The burden</p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(2.4rem,6vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.045em] text-[#e8eef5]">
              Thousands of pages.
              <br />
              Manual mapping.
              <br />
              <span className="text-[#8aa0b8]">Deadline pressure.</span>
            </h2>
            <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-[#8aa0b8]">
              GSPR gap assessment and classification still force teams to rebuild
              the argument by hand — every submission cycle.
            </p>
          </div>
        </div>

        <div
          data-after
          className="absolute inset-0 flex items-center bg-[linear-gradient(135deg,#00a8c4_0%,#007a96_45%,#1e2a3a_100%)] pad-x"
        >
          <div className="shell w-full">
            <p className="mono-label text-white/80">The Craton cut</p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(2.4rem,6vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.045em] text-white">
              Requirement.
              <br />
              Evidence.
              <br />
              <span className="serif">Human judgment.</span>
            </h2>
            <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-white/85">
              RAccelerator surfaces the defended path — rule-traced,
              document-linked, ready for expert review.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 pad-x sm:bottom-8">
          <div className="shell flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
              Wipe
            </span>
            <div className="h-px flex-1 overflow-hidden bg-white/20">
              <div data-bar className="h-full origin-left bg-white" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
              Clarity
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
