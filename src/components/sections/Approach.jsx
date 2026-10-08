import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import Section, { SectionHead } from '@/components/ui/Section'
import useGsapContext from '@/hooks/useGsapContext'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

/**
 * Method stage. Ink spine and the step wash scrub with scroll.
 * Copy stays fully readable. The step label updates at the nearest row.
 * Pin only when the stage fits.
 */
export default function Approach() {
  const [active, setActive] = useState(0)

  const { rootRef, reduced } = useGsapContext(({ gsap, root }) => {
    const stage = root.querySelector('[data-stage]')
    const ink = root.querySelector('[data-ink]')
    const wash = root.querySelector('[data-wash]')
    const steps = gsap.utils.toArray(root.querySelectorAll('[data-step]'))
    if (!stage || !ink || !wash || !steps.length) return

    const total = steps.length
    gsap.set(steps, { autoAlpha: 1 })

    const releaseStage = () => {
      stage.style.height = ''
      stage.style.maxHeight = ''
      stage.style.overflow = ''
    }

    const rowBox = (index) => {
      const row = steps[index]
      return { y: row.offsetTop, height: row.offsetHeight }
    }

    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (min-height: 680px)', () => {
      stage.style.height = '100svh'
      stage.style.maxHeight = '100svh'
      stage.style.overflow = 'hidden'

      gsap.set(ink, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(wash, {
        y: () => rowBox(0).y,
        height: () => rowBox(0).height,
        autoAlpha: 1,
      })

      let current = 0
      const syncLabel = (progress) => {
        const index = Math.min(
          total - 1,
          Math.max(0, Math.round(progress * (total - 1))),
        )
        steps.forEach((el, i) => {
          el.setAttribute('data-active', i === index ? 'true' : 'false')
        })
        if (index === current) return
        current = index
        setActive(index)
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=160%',
          pin: stage,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => syncLabel(self.progress),
          onRefresh: (self) => {
            current = -1
            syncLabel(self.progress)
          },
        },
      })

      tl.to(ink, { scaleY: 1, duration: 1 }, 0)
      tl.fromTo(
        wash,
        { y: () => rowBox(0).y, height: () => rowBox(0).height, autoAlpha: 1 },
        {
          y: () => rowBox(total - 1).y,
          height: () => rowBox(total - 1).height,
          autoAlpha: 1,
          duration: 1,
        },
        0,
      )

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
        releaseStage()
        gsap.set(steps, { autoAlpha: 1 })
        gsap.set(wash, { autoAlpha: 0, clearProps: 'transform,height' })
        gsap.set(ink, { clearProps: 'transform' })
        setActive(0)
      }
    })
  }, [])

  if (reduced) {
    return (
      <Section id="approach" tone="light">
        <SectionHead
          eyebrow="03 / How we move forward"
          title={
            <Reveal
              as="h2"
              className="text-[clamp(2.2rem,4.2vw,4.4rem)] font-normal leading-[1.05] tracking-[-0.04em]"
            >
              Curious by nature.{' '}
              <span className="serif text-accent-deep">Rigorous by design.</span>
            </Reveal>
          }
        />
        <ol className="grid gap-8 md:grid-cols-2">
          {site.steps.map((step) => (
            <li key={step.n} className="border-t border-line pt-6">
              <StepBody step={step} />
            </li>
          ))}
        </ol>
      </Section>
    )
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
        className="flex flex-col pad-x pb-6 pt-24 sm:pb-8"
      >
        <div className="shell grid h-full min-h-0 w-full grid-rows-[auto_1fr] gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-1 lg:items-stretch lg:gap-10">
          <div className="min-w-0 shrink-0 self-center lg:pr-2">
            <p className="mono-label text-accent">03 / How we move forward</p>
            <h2 className="mt-3 max-w-[12ch] text-[clamp(1.7rem,3.2vw,2.85rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Curious by nature.{' '}
              <span className="serif text-accent-deep">Rigorous by design.</span>
            </h2>
            <p className="mt-3 max-w-[36ch] text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
              One method — ink fills the spine as scroll lights each step in
              turn.
            </p>
            <p className="mono-label mt-5 text-muted">
              Step 0{active + 1} · {site.steps[active]?.name}
            </p>
          </div>

          <div className="relative flex min-h-0 min-w-0 gap-4 overflow-hidden">
            <div
              aria-hidden
              className="relative w-1 shrink-0 self-stretch overflow-hidden rounded-full bg-line"
            >
              <div
                data-ink
                className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-accent will-change-transform"
              />
            </div>

            <ol className="relative flex min-h-0 min-w-0 flex-1 flex-col justify-between gap-1 py-0.5">
              <span
                aria-hidden
                data-wash
                className="pointer-events-none absolute inset-x-0 top-0 z-0 rounded-md bg-accent/10 opacity-0"
              />
              {site.steps.map((step, i) => (
                <li
                  key={step.n}
                  data-step
                  data-active={i === 0 ? 'true' : 'false'}
                  className="relative z-[1] min-w-0 border-b border-line py-2.5 pl-3 last:border-b-0 sm:py-3 sm:pl-4"
                >
                  <StepBody step={step} compact />
                </li>
              ))}
            </ol>

            <ol
              aria-hidden
              className="hidden w-16 shrink-0 flex-col justify-between py-2 xl:flex"
            >
              {site.steps.map((step, i) => (
                <li
                  key={step.name}
                  data-side
                  className={cn(
                    'font-mono text-[9px] uppercase tracking-[0.14em]',
                    active === i ? 'text-accent' : 'text-muted/70',
                  )}
                >
                  {step.name}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepBody({ step, compact }) {
  return (
    <>
      <div className="flex min-w-0 items-baseline justify-between gap-3">
        <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
          {step.n}
        </span>
        <span className="truncate text-[12px] text-muted sm:text-[13px]">
          {step.name}
        </span>
      </div>
      <h3
        className={cn(
          'mt-1.5 font-medium tracking-tight',
          compact
            ? 'text-[clamp(1.05rem,1.8vw,1.35rem)]'
            : 'text-[1.2rem]',
        )}
      >
        {step.title}
      </h3>
      <p
        className={cn(
          'mt-1 max-w-[46ch] leading-relaxed text-muted',
          compact
            ? 'text-[12.5px] line-clamp-2 sm:text-[13px]'
            : 'text-[13.5px]',
        )}
      >
        {step.body}
      </p>
      <span className="mono-label mt-2 inline-block text-accent">{step.tag}</span>
    </>
  )
}
