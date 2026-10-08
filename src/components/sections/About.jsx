import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import useGsapContext from '@/hooks/useGsapContext'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

const roster = [
  ['Chief Regulatory Affairs Officer', 'Co-founder · EU MDR / IVDR'],
  ['Chief Product Officer', 'Co-founder · product & user acceptance'],
  ['Head of Regulatory Affairs, IVD', 'In vitro diagnostics'],
  ['Chief Commercial Officer', 'Go-to-market'],
  ['Regulatory consultants', 'Independent MD and IVD specialists'],
  ['AI engineering team', 'Palo Alto'],
]

/**
 * About stage — roster rail and row highlight scrub with scroll.
 * The marker stays inside the list (never a stray dot above the section).
 * Pin only when the stage fits; otherwise a static readable layout.
 */
export default function About() {
  const [active, setActive] = useState(0)

  const { rootRef, reduced } = useGsapContext(({ gsap, root }) => {
    const stage = root.querySelector('[data-stage]')
    const rows = gsap.utils.toArray(root.querySelectorAll('[data-row]'))
    const marker = root.querySelector('[data-marker]')
    const highlight = root.querySelector('[data-highlight]')
    const fill = root.querySelector('[data-fill]')
    if (!stage || !rows.length || !marker) return

    gsap.set(rows, { autoAlpha: 1 })
    gsap.set(marker, { autoAlpha: 0 })

    const listOf = () => rows[0].parentElement

    const rowBox = (index) => {
      const list = listOf()
      const row = rows[index]
      const listRect = list.getBoundingClientRect()
      const rowRect = row.getBoundingClientRect()
      const y = rowRect.top - listRect.top
      const maxY = Math.max(0, list.clientHeight - rowRect.height)
      return {
        y: Math.min(Math.max(0, y), maxY),
        height: rowRect.height,
      }
    }

    const markerY = (index) => {
      const box = rowBox(index)
      const y = box.y + box.height / 2 - marker.offsetHeight / 2
      const max = Math.max(0, listOf().clientHeight - marker.offsetHeight)
      return Math.min(Math.max(0, y), max)
    }

    const releaseStage = () => {
      stage.style.height = ''
      stage.style.maxHeight = ''
      stage.style.overflow = ''
    }

    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (min-height: 720px)', () => {
      if (stage.scrollHeight + 8 > window.innerHeight) {
        releaseStage()
        gsap.set(marker, { autoAlpha: 0, clearProps: 'transform' })
        return undefined
      }

      stage.style.height = '100svh'
      stage.style.maxHeight = '100svh'
      stage.style.overflow = 'hidden'

      const total = rows.length
      let current = 0

      const syncLabel = (progress) => {
        const index = Math.min(
          total - 1,
          Math.max(0, Math.round(progress * (total - 1))),
        )
        rows.forEach((el, i) => {
          el.setAttribute('data-active', i === index ? 'true' : 'false')
        })
        if (index === current) return
        current = index
        setActive(index)
      }

      if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(marker, { y: () => markerY(0), autoAlpha: 1 })
      if (highlight) {
        gsap.set(highlight, {
          y: () => rowBox(0).y,
          height: () => rowBox(0).height,
          autoAlpha: 1,
        })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=140%',
          pin: stage,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => syncLabel(self.progress),
          onRefresh: (self) => syncLabel(self.progress),
        },
      })

      tl.fromTo(
        marker,
        { y: () => markerY(0), autoAlpha: 1 },
        { y: () => markerY(total - 1), autoAlpha: 1, ease: 'none' },
        0,
      )
      if (highlight) {
        tl.fromTo(
          highlight,
          { y: () => rowBox(0).y, height: () => rowBox(0).height, autoAlpha: 1 },
          {
            y: () => rowBox(total - 1).y,
            height: () => rowBox(total - 1).height,
            autoAlpha: 1,
            ease: 'none',
          },
          0,
        )
      }
      if (fill) tl.to(fill, { scaleY: 1, ease: 'none' }, 0)

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
        releaseStage()
        gsap.set(marker, { autoAlpha: 0, clearProps: 'transform' })
        if (highlight) gsap.set(highlight, { autoAlpha: 0, clearProps: 'transform,height' })
        if (fill) gsap.set(fill, { clearProps: 'transform' })
        gsap.set(rows, { autoAlpha: 1 })
        setActive(0)
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
        className="flex flex-col justify-center pad-x py-8 sm:py-10 lg:py-8"
      >
        <div className="shell mx-auto grid w-full max-w-[66rem] gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10 xl:gap-12">
          <div className="min-w-0 max-w-[36rem]">
            <p className="mono-label text-accent">04 / Craton Technologies</p>
            <h2 className="mt-2 max-w-[14ch] text-[clamp(1.75rem,3.4vw,3rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Bold thinking.{' '}
              <span className="serif text-accent">Grounded execution.</span>
            </h2>
            <div className="mt-3 space-y-2.5 text-[13.5px] leading-[1.6] text-muted sm:text-[14.5px]">
              <p className="line-clamp-4 lg:line-clamp-none">
                Craton Technologies is an innovation-driven product company based
                in Frisco, Texas. We identify hard, high-trust problems in
                regulated or evidence-heavy industries, invent a novel approach,
                protect it, assemble the domain leadership to make it credible,
                and ship it as a product — then repeat the method in the next
                domain.
              </p>
              <p className="hidden sm:block">
                A craton is the ancient, stable core of a continent — the bedrock
                everything else is built on. That is the idea: one method, one
                engineering discipline, one patent-first habit.
              </p>
            </div>

            <div className="glass-panel mt-4 rounded-2xl p-4 sm:mt-5 sm:p-5">
              <div className="relative z-10">
                <p className="text-base font-medium tracking-tight sm:text-lg">
                  {site.founder.name}
                </p>
                <p className="mono-label mt-1 text-accent">
                  {site.founder.role}
                </p>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted sm:text-[14px]">
                  {site.founder.bio}
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-4">
              <p className="mono-label shrink-0 text-cream">Leadership roster</p>
              <p className="mono-label text-muted">
                0{active + 1} / 0{roster.length}
              </p>
            </div>

            <ul className="relative border-y border-line">
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 top-0 w-px overflow-hidden bg-line"
              >
                <div
                  data-fill
                  className="h-full w-full origin-top scale-y-0 bg-accent will-change-transform"
                />
              </div>
              <span
                aria-hidden
                data-highlight
                className="pointer-events-none absolute inset-x-0 top-0 z-0 bg-accent/10 opacity-0 will-change-transform"
              />
              <span
                aria-hidden
                data-marker
                className="pointer-events-none absolute left-[-3px] top-0 z-10 size-1.5 rounded-full bg-accent opacity-0 will-change-transform"
              />

              {roster.map(([role, detail], i) => (
                <li
                  key={role}
                  data-row
                  data-active={i === 0 ? 'true' : 'false'}
                  className="relative z-[1] grid gap-0.5 py-2.5 pl-4 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:items-baseline sm:gap-5 sm:py-3 sm:pl-5"
                >
                  <span
                    className={cn(
                      'text-[14px] font-semibold tracking-tight sm:text-[15px]',
                      active === i ? 'text-accent' : 'text-cream',
                    )}
                  >
                    {role}
                  </span>
                  <span className="text-[12.5px] leading-snug text-muted sm:text-right sm:text-[13.5px]">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11.5px] text-muted sm:text-[12px]">
              Roles shown; names appear with each person’s consent.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutStatic() {
  return (
    <section
      id="about"
      className="pad-x relative py-[clamp(2.5rem,4vw,4rem)]"
      aria-label="About Craton"
    >
      <div className="shell">
        <div className="mx-auto grid w-full max-w-[66rem] gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="min-w-0 max-w-[36rem]">
            <p className="mono-label text-accent">04 / Craton Technologies</p>
            <Reveal
              as="h2"
              className="mt-3 max-w-[14ch] text-[clamp(2rem,4vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.04em]"
            >
              Bold thinking.{' '}
              <span className="serif text-accent">Grounded execution.</span>
            </Reveal>
            <p className="mt-5 max-w-[50ch] text-[15px] leading-relaxed text-muted">
              Craton Technologies is an innovation-driven product company based in
              Frisco, Texas. We invent, protect, and ship AI-enabled products for
              regulated and evidence-heavy work.
            </p>
            <div className="glass-panel mt-6 rounded-2xl p-5 sm:p-6">
              <p className="text-lg font-medium tracking-tight">
                {site.founder.name}
              </p>
              <p className="mono-label mt-1 text-accent">{site.founder.role}</p>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                {site.founder.bio}
              </p>
            </div>
          </div>
          <div className="min-w-0">
            <p className="mono-label mb-4 text-cream">Leadership roster</p>
            <ul className="divide-y divide-line border-y border-line">
              {roster.map(([role, detail]) => (
                <li
                  key={role}
                  className="grid gap-1 py-3.5 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:items-baseline sm:gap-6"
                >
                  <b className="text-[15px] font-semibold tracking-tight text-cream">
                    {role}
                  </b>
                  <span className="text-[13.5px] text-muted sm:text-right">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] text-muted">
              Roles shown; names appear with each person’s consent.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
