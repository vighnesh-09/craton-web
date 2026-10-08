import useGsapContext from '@/hooks/useGsapContext'
import { site } from '@/config/site'

/**
 * Method stage — horizontal step rail.
 * Adapted from GSAP's pinned horizontal scrub (ease: none, no snap):
 * vertical scroll drives the track's x through a window.
 * The card nearest the window center stays full size; neighbors scale
 * down slightly and never drop below 0.85 opacity.
 * Pin only on a tall desktop where the stage fits. Otherwise a vertical list.
 */
export default function Approach() {
  const { rootRef, reduced } = useGsapContext(({ gsap, root }) => {
    const stage = root.querySelector('[data-stage]')
    const windowEl = root.querySelector('[data-window]')
    const track = root.querySelector('[data-track]')
    const label = root.querySelector('[data-step-label]')
    const steps = gsap.utils.toArray(root.querySelectorAll('[data-step]'))
    if (!stage || !windowEl || !track || !steps.length) return

    const release = () => {
      stage.style.minHeight = ''
      windowEl.style.overflow = ''
      track.style.flexDirection = ''
      track.style.width = ''
      steps.forEach((el) => {
        el.style.width = ''
        el.style.flexShrink = ''
        el.style.opacity = ''
        el.style.transform = ''
      })
      gsap.set(track, { clearProps: 'transform' })
      gsap.set(steps, { clearProps: 'transform,opacity' })
      if (label) label.textContent = `Step ${site.steps[0].n} · ${site.steps[0].name}`
    }

    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (min-height: 680px)', () => {
      const layoutCards = () => {
        const win = windowEl.clientWidth
        const gap = 24
        const maxByNeighbor = Math.floor((win / 2 - gap) / 1.35)
        const width = Math.max(200, Math.min(260, maxByNeighbor))
        steps.forEach((el) => {
          el.style.width = `${width}px`
          el.style.flexShrink = '0'
        })
      }

      windowEl.style.overflow = 'hidden'
      track.style.flexDirection = 'row'
      track.style.width = 'max-content'
      layoutCards()

      if (stage.scrollHeight > window.innerHeight + 4) {
        release()
        return undefined
      }

      stage.style.minHeight = '100svh'

      const place = (index) => {
        const card = steps[index]
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        return windowEl.clientWidth / 2 - cardCenter
      }

      let current = 0
      const emphasize = () => {
        const winRect = windowEl.getBoundingClientRect()
        const mid = winRect.left + winRect.width / 2
        const reach = Math.max(winRect.width * 0.55, 1)
        let best = 0
        let bestDist = Infinity

        steps.forEach((el, i) => {
          const rect = el.getBoundingClientRect()
          const dist = Math.abs(rect.left + rect.width / 2 - mid)
          const unit = Math.min(1, dist / reach)
          gsap.set(el, {
            scale: 1 - unit * 0.08,
            opacity: Math.max(0.85, 1 - unit * 0.12),
            transformOrigin: 'center center',
          })
          if (dist < bestDist) {
            bestDist = dist
            best = i
          }
        })

        if (best !== current && label) {
          current = best
          const step = site.steps[best]
          label.textContent = `Step ${step.n} · ${step.name}`
        }
      }

      layoutCards()

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=90%',
          pin: stage,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: layoutCards,
          onUpdate: emphasize,
          onRefresh: () => {
            current = -1
            emphasize()
          },
        },
      })

      tl.fromTo(
        track,
        { x: () => place(0) },
        { x: () => place(steps.length - 1), duration: 1 },
      )

      emphasize()

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
        release()
      }
    })
  }, [])

  if (reduced) {
    return <ApproachList />
  }

  return (
    <section
      ref={rootRef}
      id="approach"
      className="relative"
      aria-label="How we move forward"
    >
      <div
        data-stage
        className="flex flex-col justify-center pad-x pb-10 pt-24 sm:pb-12"
      >
        <div className="shell grid w-full items-center gap-8 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:gap-10">
          <div className="min-w-0 max-w-[34rem]">
            <p className="mono-label text-accent">03 / How we move forward</p>
            <h2 className="mt-3 max-w-[12ch] text-[clamp(1.7rem,3.2vw,2.85rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Curious by nature.{' '}
              <span className="serif text-accent-deep">Rigorous by design.</span>
            </h2>
            <p className="mt-3 max-w-[36ch] text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
              One method.
            </p>
            <p
              data-step-label
              className="mono-label mt-5 text-accent"
              aria-live="polite"
            >
              Step {site.steps[0].n} · {site.steps[0].name}
            </p>
          </div>

          <div data-window className="min-w-0">
            <ol data-track className="relative flex w-full flex-col gap-6">
              {site.steps.map((step) => (
                <li
                  key={step.n}
                  data-step
                  className="min-w-0 rounded-2xl border border-line border-t-accent/50 bg-white/90 p-5 shadow-[var(--glass-shadow)]"
                >
                  <StepBody step={step} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function ApproachList() {
  return (
    <section
      id="approach"
      className="pad-x py-[clamp(2.5rem,4vw,4rem)]"
      aria-label="How we move forward"
    >
      <div className="shell max-w-[46rem]">
        <p className="mono-label text-accent">03 / How we move forward</p>
        <h2 className="mt-3 max-w-[12ch] text-[clamp(2.2rem,4.2vw,4.4rem)] font-normal leading-[1.05] tracking-[-0.04em]">
          Curious by nature.{' '}
          <span className="serif text-accent-deep">Rigorous by design.</span>
        </h2>
        <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted">
          One method.
        </p>
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {site.steps.map((step) => (
            <li key={step.n} className="py-6">
              <StepBody step={step} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function StepBody({ step }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
          {step.n}
        </span>
        <span className="text-right text-[12px] text-muted sm:text-[13px]">
          {step.name}
        </span>
      </div>
      <h3 className="mt-2 text-[1.15rem] font-medium tracking-tight sm:text-[1.28rem]">
        {step.title}
      </h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{step.body}</p>
      <span className="mono-label mt-3 inline-block text-accent">{step.tag}</span>
    </>
  )
}
