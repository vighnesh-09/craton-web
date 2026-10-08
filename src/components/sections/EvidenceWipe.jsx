import useGsapContext from '@/hooks/useGsapContext'

/**
 * Pinned clip wipe. The burden panel is fully readable at rest;
 * clarity wipes in over a short scrub. No pin when motion is reduced.
 */
export default function EvidenceWipe() {
  const { rootRef, reduced } = useGsapContext(({ gsap, root }) => {
    const stage = root.querySelector('[data-stage]')
    const after = root.querySelector('[data-after]')
    const bar = root.querySelector('[data-bar]')
    const photoBack = root.querySelector('[data-photo-back]')
    const photoFront = root.querySelector('[data-photo-front]')
    if (!stage || !after) return

    gsap.set(after, { clipPath: 'inset(0 100% 0 0)' })
    if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
    if (photoFront) gsap.set(photoFront, { clipPath: 'inset(0 0 0 100%)' })
    if (photoBack) gsap.set(photoBack, { x: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=70%',
        pin: stage,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.to(after, { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: 1 }, 0)
    if (bar) tl.to(bar, { scaleX: 1, ease: 'none', duration: 1 }, 0)
    if (photoFront) {
      tl.to(photoFront, { clipPath: 'inset(0 0 0 0%)', ease: 'none', duration: 1 }, 0)
    }
    if (photoBack) tl.to(photoBack, { x: 24, ease: 'none', duration: 1 }, 0)
  }, [])

  if (reduced) return <EvidenceStatic />

  return (
    <section ref={rootRef} id="wipe" className="relative bg-[#1E2A3A]" aria-label="From burden to evidence">
      <div data-stage className="relative h-[100svh] max-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center gap-6 bg-[#1E2A3A] min-[800px]:block">
          <div className="px-[var(--pad)] pt-[5.5rem] min-[800px]:absolute min-[800px]:inset-0 min-[800px]:flex min-[800px]:items-center min-[800px]:pb-16 min-[800px]:pt-[5.5rem]">
            <div className="shell w-full min-[800px]:ml-0! min-[800px]:max-w-[calc(100vw-var(--media-xl)-var(--pad)-1rem)]!">
              <div className="min-w-0">
                <p className="kicker">The burden</p>
                <h2 className="mt-4 max-w-[16ch] text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.04em] text-[#f4f7fa]">
                  Thousands of pages.
                  <br />
                  Manual mapping.
                  <br />
                  <span className="text-[#c5d4e0]">Deadline pressure.</span>
                </h2>
                <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-[#d5e0ea]">
                  GSPR gap assessment and classification still force teams to rebuild
                  the argument by hand — every submission cycle.
                </p>
              </div>
            </div>
          </div>
          <div
            data-photo
            className="media-xl pointer-events-none relative overflow-hidden max-[799px]:h-[280px] max-[799px]:w-full! min-[800px]:absolute min-[800px]:top-0 min-[800px]:right-0 min-[800px]:bottom-0 min-[800px]:h-full"
          >
            <img
              data-photo-back
              src="/burden-right-back.jpg"
              alt=""
              aria-hidden="true"
              width={1280}
              height={720}
              className="absolute inset-0 block h-full w-full object-cover object-center"
            />
            <img
              data-photo-front
              src="/burden-right-front.jpg"
              alt="Illustrative technical file, pages resolving into mapped evidence."
              width={1280}
              height={720}
              className="absolute inset-0 block h-full w-full object-cover object-center [clip-path:inset(0_0_0_100%)]"
            />
          </div>
        </div>

        <div
          data-after
          className="absolute inset-0 flex items-center bg-[linear-gradient(135deg,#00A8C4_0%,#007A96_42%,#1E2A3A_100%)] px-[var(--pad)] pb-16 pt-[5.5rem]"
        >
          <div className="shell w-full">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/80">
              The Craton cut
            </p>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
              Requirement.
              <br />
              Evidence.
              <br />
              <span className="serif">Human judgment.</span>
            </h2>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-white/90">
              RAccelerator surfaces the defended path — rule-traced,
              document-linked, ready for expert review.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 px-[var(--pad)] sm:bottom-8">
          <div className="shell flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
              Burden
            </span>
            <div className="h-px flex-1 overflow-hidden bg-white/25">
              <div data-bar className="h-full origin-left bg-white" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
              Clarity
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function EvidenceStatic() {
  return (
    <section id="wipe" className="section-pad bg-white" aria-label="From burden to evidence">
      <div className="shell grid gap-4 md:grid-cols-2">
        <div className="rounded-[var(--radius)] bg-[#1E2A3A] p-6 text-[#f4f7fa] sm:p-7">
          <p className="kicker">The burden</p>
          <h2 className="mt-3 text-[clamp(1.4rem,2.2vw,1.85rem)] font-medium leading-snug tracking-[-0.03em]">
            Thousands of pages. Manual mapping. Deadline pressure.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#d5e0ea]">
            GSPR gap assessment and classification still force teams to rebuild
            the argument by hand — every submission cycle.
          </p>
          <img
            src="/burden-right-front.jpg"
            alt="Illustrative technical file, pages resolving into mapped evidence."
            width={1280}
            height={720}
            className="mt-5 block h-auto w-full"
          />
        </div>
        <div className="rounded-[var(--radius)] border border-[var(--hairline)] bg-[#f7f8fa] p-6 sm:p-7">
          <p className="kicker">The Craton cut</p>
          <h2 className="mt-3 text-[clamp(1.4rem,2.2vw,1.85rem)] font-medium leading-snug tracking-[-0.03em] text-[#1E2A3A]">
            Requirement. Evidence.{' '}
            <span className="serif text-[#00A8C4]">Human judgment.</span>
          </h2>
          <p className="lede mt-3">
            RAccelerator surfaces the defended path — rule-traced,
            document-linked, ready for expert review.
          </p>
        </div>
      </div>
    </section>
  )
}
