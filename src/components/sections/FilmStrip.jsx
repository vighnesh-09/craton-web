import useGsapContext from '@/hooks/useGsapContext'

const FRAMES = [
  {
    n: '01',
    title: 'Ingest the file',
    body: 'Technical documentation enters once — structured for mapping, not buried in folders.',
  },
  {
    n: '02',
    title: 'Map to Annex I',
    body: 'Each GSPR row finds candidate evidence with the rule path shown beside it.',
  },
  {
    n: '03',
    title: 'Surface the gaps',
    body: 'Critical holes rise first so experts spend judgment where it matters.',
  },
  {
    n: '04',
    title: 'Defend the call',
    body: 'Human review stays central — the system shows the argument, not a black box.',
  },
]

/** GSAP horizontal scrub — vertical scroll drives the film track. */
export default function FilmStrip() {
  const { rootRef, reduced } = useGsapContext(({ gsap, root }) => {
    const stage = root.querySelector('[data-stage]')
    const track = root.querySelector('[data-track]')
    if (!stage || !track) return

    const getTravel = () => {
      const max = track.scrollWidth - window.innerWidth + 48
      return Math.max(0, max)
    }

    gsap.to(track, {
      x: () => -getTravel(),
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 0.62)}`,
        pin: stage,
        scrub: 0.75,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
  }, [])

  if (reduced) {
    return (
      <section
        aria-label="RAccelerator flow"
        className="pad-x py-[var(--section-y)]"
      >
        <p className="mono-label text-accent">RAccelerator flow</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FRAMES.map((f) => (
            <li key={f.n} className="border-t border-line pt-5">
              <p className="font-mono text-[11px] text-accent">{f.n}</p>
              <h3 className="mt-2 text-lg tracking-tight">{f.title}</h3>
              <p className="mt-2 text-[13px] text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section
      ref={rootRef}
      id="film"
      className="relative"
      aria-label="RAccelerator flow"
    >
      <div
        data-stage
        className="flex h-[100svh] max-h-[100svh] flex-col justify-center overflow-hidden py-5 sm:py-6"
      >
        <div className="pad-x mb-6 shrink-0">
          <div className="shell flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mono-label text-accent">RAccelerator · film strip</p>
              <h2 className="mt-3 max-w-[16ch] text-[clamp(2rem,4vw,3.4rem)] font-normal tracking-[-0.04em]">
                Scroll sideways through the{' '}
                <span className="serif text-accent">evidence path.</span>
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Vertical scroll → horizontal story
            </p>
          </div>
        </div>

        <ul
          data-track
          className="flex w-max gap-5 px-[var(--pad)] will-change-transform sm:gap-7"
        >
          {FRAMES.map((frame, i) => (
            <li
              key={frame.n}
              className="glass-panel glass-panel--strong jelly relative w-[min(86vw,520px)] shrink-0 overflow-hidden rounded-[1.75rem] p-7 sm:w-[560px] sm:p-9"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-accent/15 blur-3xl"
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[12px] tracking-[0.16em] text-accent">
                    {frame.n}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    0{i + 1} / 04
                  </span>
                </div>
                <h3 className="mt-10 text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium tracking-tight">
                  {frame.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  {frame.body}
                </p>
                <div className="mt-10 h-24 overflow-hidden rounded-xl border border-line bg-ink/50">
                  <div
                    className="h-full w-full opacity-80"
                    style={{
                      backgroundImage: `linear-gradient(120deg, transparent 20%, rgba(0,229,255,0.28) 45%, transparent 70%), repeating-linear-gradient(90deg, rgba(232,238,245,0.08) 0 1px, transparent 1px 18px)`,
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
