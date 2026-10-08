import useGsapContext from '@/hooks/useGsapContext'
import { site } from '@/config/site'

const roster = [
  ['Chief Regulatory Affairs Officer', 'Co-founder · EU MDR / IVDR'],
  ['Chief Product Officer', 'Co-founder · product & user acceptance'],
  ['Head of Regulatory Affairs, IVD', 'In vitro diagnostics'],
  ['Chief Commercial Officer', 'Go-to-market'],
  ['Regulatory consultants', 'Independent MD and IVD specialists'],
  ['AI engineering team', 'Palo Alto'],
]

/**
 * About stage — founder card stays in view, roster is a 2×3 grid.
 * Adapted from a scrubbed ScrollTrigger timeline (sequential tweens, no snap):
 * one cyan ring travels cell to cell, left to right, then the next row.
 * Names stay fully opaque. Pin only when the stage fits.
 */
export default function About() {
  const { rootRef, reduced } = useGsapContext(({ gsap, root }) => {
    const stage = root.querySelector('[data-stage]')
    const board = root.querySelector('[data-board]')
    const ring = root.querySelector('[data-ring]')
    const cells = gsap.utils.toArray(root.querySelectorAll('[data-cell]'))
    if (!stage || !board || !ring || cells.length < 2) return

    gsap.set(ring, { autoAlpha: 0 })

    const release = () => {
      stage.style.minHeight = ''
      gsap.set(ring, { autoAlpha: 0, clearProps: 'transform,width,height' })
    }

    const box = (index) => {
      const pad = 4
      const boardRect = board.getBoundingClientRect()
      const cellRect = cells[index].getBoundingClientRect()
      return {
        x: cellRect.left - boardRect.left - pad,
        y: cellRect.top - boardRect.top - pad,
        width: cellRect.width + pad * 2,
        height: cellRect.height + pad * 2,
      }
    }

    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (min-height: 720px)', () => {
      if (stage.scrollHeight > window.innerHeight + 4) {
        return release
      }

      stage.style.minHeight = '100svh'

      const placeRing = (progress) => {
        const last = cells.length - 1
        const paint = (frame) => {
          gsap.set(ring, {
            x: frame.x,
            y: frame.y,
            width: frame.width,
            height: frame.height,
            autoAlpha: 1,
          })
        }
        if (progress >= 1) {
          paint(box(last))
          return
        }
        const scaled = Math.max(0, progress) * last
        const index = Math.min(last - 1, Math.floor(scaled))
        const local = scaled - index
        const hold = 0.58
        const travel = local <= hold ? 0 : (local - hold) / (1 - hold)
        const from = box(index)
        const to = box(index + 1)
        const w = from.width + (to.width - from.width) * travel
        const h = from.height + (to.height - from.height) * travel
        const cx =
          from.x +
          from.width / 2 +
          (to.x + to.width / 2 - (from.x + from.width / 2)) * travel
        const cy =
          from.y +
          from.height / 2 +
          (to.y + to.height / 2 - (from.y + from.height / 2)) * travel
        paint({ x: cx - w / 2, y: cy - h / 2, width: w, height: h })
      }

      placeRing(0)

      const playhead = { t: 0 }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=80%',
          pin: stage,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => placeRing(self.progress),
        },
      })

      tl.to(playhead, {
        t: 1,
        ease: 'none',
        duration: 1,
        onUpdate: () => placeRing(playhead.t),
      })

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
        release()
      }
    })
  }, [])

  if (reduced) {
    return <AboutStatic />
  }

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative"
      aria-label="About Craton"
    >
      <div
        data-stage
        className="flex flex-col justify-center pad-x pb-8 pt-24 sm:pb-10"
      >
        <AboutBody ring />
      </div>
    </section>
  )
}

function AboutBody({ ring = false }) {
  return (
    <div className="shell grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12">
      <div className="min-w-0 max-w-[36rem]">
        <p className="mono-label text-accent">04 / Craton Technologies</p>
        <h2 className="mt-2 max-w-[14ch] text-[clamp(1.75rem,3.2vw,2.85rem)] font-normal leading-[1.05] tracking-[-0.04em]">
          Bold thinking.{' '}
          <span className="serif text-accent">Grounded execution.</span>
        </h2>
        <div className="mt-3 space-y-2.5 text-[13.5px] leading-[1.6] text-muted sm:text-[14.5px]">
          <p>
            Craton Technologies is an innovation-driven product company based in
            Frisco, Texas. We identify hard, high-trust problems in regulated or
            evidence-heavy industries, invent a novel approach, protect it,
            assemble the domain leadership to make it credible, and ship it as a
            product — then repeat the method in the next domain.
          </p>
          <p>
            A craton is the ancient, stable core of a continent — the bedrock
            everything else is built on. That is the idea: one method, one
            engineering discipline, one patent-first habit.
          </p>
        </div>

        <div className="glass-panel glass-panel--strong jelly relative mt-4 overflow-hidden rounded-2xl p-4 sm:mt-5 sm:p-5">
          <p className="text-base font-medium tracking-tight sm:text-lg">
            {site.founder.name}
          </p>
          <p className="mono-label mt-1 text-accent">{site.founder.role}</p>
          <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted sm:text-[14px]">
            {site.founder.bio}
          </p>
        </div>
      </div>

      <div className="min-w-0">
        <p className="mono-label mb-3 text-cream">Leadership roster</p>
        <div data-board className="relative p-1.5">
          {ring ? (
            <span
              aria-hidden
              data-ring
              className="pointer-events-none absolute left-0 top-0 z-10 hidden rounded-2xl border-2 border-accent opacity-0 shadow-[0_0_0_5px_rgba(0,168,196,0.16),0_0_28px_-8px_rgba(0,168,196,0.85)] lg:block"
            />
          ) : null}
          <ul
            data-grid
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {roster.map(([role, detail]) => (
              <li
                key={role}
                data-cell
                className="rounded-2xl border border-line bg-white/90 px-4 py-3.5"
              >
                <p className="text-[14px] font-semibold leading-snug tracking-tight text-cream sm:text-[15px]">
                  {role}
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-muted sm:text-[13px]">
                  {detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-2 text-[11.5px] text-muted sm:text-[12px]">
          Roles shown; names appear with each person’s consent.
        </p>
      </div>
    </div>
  )
}

function AboutStatic() {
  return (
    <section
      id="about"
      className="pad-x relative py-[clamp(2.5rem,4vw,4rem)]"
      aria-label="About Craton"
    >
      <AboutBody />
    </section>
  )
}
