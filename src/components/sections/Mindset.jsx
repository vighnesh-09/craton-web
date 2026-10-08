import { useEffect, useState } from 'react'
import useGsapContext from '@/hooks/useGsapContext'
import { site } from '@/config/site'

const WIDE_QUERY = '(min-width: 1024px)'

function useWideStage() {
  const [wide, setWide] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(WIDE_QUERY).matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY)
    const sync = () => setWide(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return wide
}

/**
 * Compact belief stage. A cyan focus frame and index scrub across three
 * cards while the section travels. No pin spacer — that held a short stage
 * at the top and left a blank viewport under the beliefs.
 */
export default function Mindset() {
  const wide = useWideStage()

  const { rootRef, reduced } = useGsapContext(({ gsap, ScrollTrigger, root }) => {
    if (!wide) return undefined

    const stage = root.querySelector('[data-stage]')
    const rail = root.querySelector('[data-rail]')
    const frame = root.querySelector('[data-frame]')
    const index = root.querySelector('[data-index]')
    const count = root.querySelector('[data-count]')
    const cards = gsap.utils.toArray(root.querySelectorAll('[data-card]'))
    const bodies = cards.map((card) => card.querySelector('[data-body]'))
    if (!stage || !rail || !frame || !cards.length || bodies.some((body) => !body)) {
      return undefined
    }

    const measureBodies = () =>
      bodies.map((body) => {
        body.classList.remove('line-clamp-1')
        body.style.height = 'auto'
        body.style.overflow = 'visible'
        const full = body.offsetHeight
        const line = parseFloat(getComputedStyle(body).lineHeight) || full
        return { full, line: Math.min(line, full) }
      })

    const lockRail = () => {
      const height = rail.offsetHeight
      rail.style.minHeight = `${height}px`
    }

    let metrics = measureBodies()
    bodies.forEach((body, i) => {
      body.style.height = `${metrics[i].full}px`
    })
    lockRail()

    const n = cards.length

    const apply = (progress) => {
      const x = gsap.utils.clamp(0, n - 1, progress * (n - 1))

      bodies.forEach((body, i) => {
        const { full, line } = metrics[i]
        const open = 1 - Math.min(Math.abs(i - x), 1)
        if (open > 0.97) {
          body.classList.remove('line-clamp-1')
          body.style.height = 'auto'
          body.style.overflow = 'visible'
        } else if (open < 0.04) {
          body.classList.add('line-clamp-1')
          body.style.height = ''
          body.style.overflow = ''
        } else {
          body.classList.remove('line-clamp-1')
          const h = line + open * (full - line)
          body.style.height = `${h}px`
          body.style.overflow = 'hidden'
        }
      })

      const i0 = Math.floor(x)
      const i1 = Math.min(n - 1, i0 + 1)
      const t = x - i0
      const a = cards[i0]
      const b = cards[i1]
      const inset = -3
      gsap.set(frame, {
        x: a.offsetLeft + (b.offsetLeft - a.offsetLeft) * t + inset,
        y: a.offsetTop + (b.offsetTop - a.offsetTop) * t + inset,
        width: a.offsetWidth + (b.offsetWidth - a.offsetWidth) * t - inset * 2,
        height: a.offsetHeight + (b.offsetHeight - a.offsetHeight) * t - inset * 2,
        opacity: 1,
      })

      const nearest = Math.min(n - 1, Math.max(0, Math.round(x)))
      const label = String(nearest + 1).padStart(2, '0')
      if (index) index.textContent = label
      if (count) count.textContent = label
      cards.forEach((card, i) => {
        const on = i === nearest
        card.setAttribute('data-active', on ? 'true' : 'false')
        if (on) card.setAttribute('aria-current', 'true')
        else card.removeAttribute('aria-current')
      })
    }

    apply(0)

    // Scrub distance stays inside the time the cards are still on screen.
    // A pin spacer was holding this short stage still and leaving a blank
    // viewport under the beliefs, so the frame travels with the section.
    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top 5.75rem',
      end: '+=18%',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => apply(self.progress),
      onRefresh: (self) => {
        metrics = measureBodies()
        bodies.forEach((body, i) => {
          body.style.height = `${metrics[i].full}px`
          body.style.overflow = 'visible'
          body.classList.remove('line-clamp-1')
        })
        lockRail()
        apply(self.progress)
      },
    })

    return () => {
      st.kill()
      bodies.forEach((body) => {
        body.classList.remove('line-clamp-1')
        body.style.height = ''
        body.style.overflow = ''
      })
      rail.style.minHeight = ''
    }
  }, [wide, 'focus-frame-v4'])

  const motionOn = wide && !reduced

  return (
    <section
      ref={rootRef}
      id="mindset"
      className="relative"
      aria-label="The Craton mindset"
    >
      <div
        data-stage
        className="pad-x py-[clamp(2.5rem,4vw,4rem)]"
      >
        <div className="shell grid items-start gap-6 lg:grid-cols-[minmax(0,35%)_minmax(0,1fr)] lg:items-center lg:gap-10">
          <div className="max-w-[22rem] lg:max-w-none">
            <p className="mono-label text-accent">01 / The Craton mindset</p>
            <h2 className="mt-3 text-[clamp(1.75rem,2.7vw,2.45rem)] font-normal leading-[1.08] tracking-[-0.04em] text-cream">
              The next breakthrough starts with a{' '}
              <span className="serif text-accent">better question.</span>
            </h2>
            <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-muted">
              <span data-count>01</span>
              <span> / {String(site.beliefs.length).padStart(2, '0')}</span>
            </p>
          </div>

          <div data-rail className="relative min-w-0 pt-4">
            <ol className="grid grid-cols-1 items-start gap-3 lg:grid-cols-3">
              {site.beliefs.map((belief, i) => (
                <li
                  key={belief.title}
                  data-card
                  data-active={i === 0 ? 'true' : 'false'}
                  className="min-w-0 rounded-2xl border border-line bg-white px-4 py-4 data-[active=true]:border-transparent"
                >
                  <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.03em] text-[#1E2A3A]">
                    {belief.title}
                  </h3>
                  <p
                    data-body
                    className="mt-2 text-[13.5px] leading-[1.55] text-[#3A6D8C] [text-wrap:wrap]"
                  >
                    {belief.body}
                  </p>
                </li>
              ))}
            </ol>

            {motionOn ? (
              <div
                data-frame
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-10 rounded-[1.15rem] border-2 border-accent opacity-0 shadow-[0_0_0_4px_rgba(0,168,196,0.14)] will-change-transform"
              >
                <span
                  data-index
                  className="absolute -top-2.5 left-3 bg-ink px-1.5 font-mono text-[11px] font-medium tracking-[0.18em] text-accent"
                >
                  01
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
