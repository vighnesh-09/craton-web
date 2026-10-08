import { useEffect, useState } from 'react'
import useGsapContext from '@/hooks/useGsapContext'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

const WIDE_QUERY = '(min-width: 1024px) and (min-height: 760px)'

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
 * Typographic pass. Beliefs are large lines on a shared track. Scroll
 * scrubs the track so the active line sits in the center at full navy,
 * then travels up as the next line takes that seat. No card stack.
 */
export default function Mindset() {
  const [beliefN, setBeliefN] = useState(1)
  const [pinOk, setPinOk] = useState(true)
  const wide = useWideStage()
  const total = site.beliefs.length

  useEffect(() => {
    setPinOk(true)
  }, [wide])

  const { rootRef, reduced } = useGsapContext(({ gsap, ScrollTrigger, root }) => {
    const stage = root.querySelector('[data-stage]')
    const head = root.querySelector('[data-head]')
    const pass = root.querySelector('[data-pass]')
    const track = root.querySelector('[data-track]')
    const lines = gsap.utils.toArray(root.querySelectorAll('[data-line]'))
    const body = root.querySelector('[data-body]')
    const bar = root.querySelector('[data-bar]')
    if (!stage || !pass || !track || !lines.length || !body) return

    const release = () => {
      stage.style.height = ''
      stage.style.maxHeight = ''
      stage.style.display = ''
      stage.style.flexDirection = ''
      stage.style.justifyContent = ''
      pass.style.height = ''
      pass.style.position = ''
      track.style.position = ''
      track.style.left = ''
      track.style.right = ''
      track.style.top = ''
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.width = ''
      body.style.minHeight = ''
      lines.forEach((line) => {
        line.style.position = ''
        line.style.left = ''
        line.style.top = ''
        line.style.height = ''
        const title = line.querySelector('[data-title]')
        if (title) gsap.set(title, { clearProps: 'transform,opacity' })
      })
      gsap.set(track, { clearProps: 'transform' })
      if (bar) gsap.set(bar, { clearProps: 'transform' })
    }

    const titles = lines.map((line) => line.querySelector('[data-title]'))
    const titleH = Math.max(...titles.map((title) => title?.offsetHeight || 0), 1)
    body.style.width = 'min(100%, 52rem)'
    const probe = body.textContent
    let bodyH = 0
    site.beliefs.forEach((item) => {
      body.textContent = item.body
      bodyH = Math.max(bodyH, body.offsetHeight)
    })
    body.textContent = probe
    const gap = 12
    const slot = titleH + gap + bodyH + 14
    const n = lines.length
    const headroom = (n - 1) * slot
    const passH = headroom + (n - 1) * slot + titleH

    const cs = getComputedStyle(stage)
    const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) || 0
    const needed = Math.max(head?.offsetHeight || 0, passH) + padY + 24
    if (needed > window.innerHeight) {
      release()
      setPinOk(false)
      return undefined
    }

    stage.style.height = '100svh'
    stage.style.maxHeight = '100svh'
    stage.style.display = 'flex'
    stage.style.flexDirection = 'column'
    stage.style.justifyContent = 'center'

    pass.style.position = 'relative'
    pass.style.height = `${passH}px`
    track.style.position = 'absolute'
    track.style.left = '0'
    track.style.right = '0'
    track.style.top = '0'
    lines.forEach((line, i) => {
      line.style.position = 'absolute'
      line.style.left = '0'
      line.style.top = `${i * slot}px`
      line.style.height = `${titleH}px`
    })
    body.style.position = 'absolute'
    body.style.left = '0'
    body.style.width = 'min(100%, 52rem)'
    body.style.minHeight = `${bodyH}px`
    body.style.top = `${headroom + titleH + gap}px`

    let current = 0

    const apply = (progress) => {
      const x = gsap.utils.clamp(0, n - 1, progress * (n - 1))
      gsap.set(track, { y: headroom - x * slot })

      lines.forEach((line, i) => {
        const focus = 1 - Math.min(Math.abs(i - x), 1)
        const title = line.querySelector('[data-title]')
        if (!title) return
        gsap.set(title, {
          scale: 0.72 + focus * 0.28,
          opacity: 0.68 + focus * 0.32,
          transformOrigin: '0% 50%',
        })
      })

      if (bar) {
        gsap.set(bar, {
          scaleX: (x + 1) / n,
          transformOrigin: 'left center',
        })
      }

      const index = Math.min(n - 1, Math.max(0, Math.round(x)))
      if (index === current) return
      current = index
      setBeliefN(index + 1)
    }

    apply(0)

    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * (n - 1) * 0.78)}`,
      pin: stage,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => apply(self.progress),
      onRefresh: (self) => apply(self.progress),
    })

    return () => {
      st.kill()
      release()
    }
  }, [wide, pinOk])

  if (reduced) {
    return <BeliefCards layout="row" />
  }

  if (!wide || !pinOk) {
    return <BeliefCards layout="stack" />
  }

  const belief = site.beliefs[beliefN - 1]

  return (
    <section
      ref={rootRef}
      id="mindset"
      className="relative"
      aria-label="The Craton mindset"
    >
      <div
        data-stage
        className="flex flex-col justify-center pad-x pb-10 pt-[5.5rem]"
      >
        <div className="shell grid w-full items-start gap-x-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div data-head className="max-w-[34rem]">
            <p className="mono-label text-accent">01 / The Craton mindset</p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.2vw,2.7rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              The next breakthrough starts with a{' '}
              <span className="serif text-accent">better question.</span>
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-14 overflow-hidden bg-line">
                <div
                  data-bar
                  className="h-full w-full origin-left scale-x-[0.34] bg-accent will-change-transform"
                />
              </div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted">
                {String(beliefN).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
            </div>
          </div>

          <div data-pass className="relative">
            <div data-track>
              {site.beliefs.map((item, i) => (
                <div key={item.title} data-line className="flex items-center">
                  <h3
                    data-title
                    className="max-w-[22ch] text-[clamp(2.15rem,3.4vw,2.95rem)] font-medium leading-[1.08] tracking-[-0.045em] text-[#1E2A3A]"
                  >
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
            <p
              data-body
              className="max-w-[62ch] text-[15.5px] leading-[1.7] text-muted"
            >
              {belief.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BeliefCards({ layout }) {
  return (
    <section
      id="mindset"
      className="pad-x relative py-[clamp(2.75rem,5vw,4.5rem)]"
      aria-label="The Craton mindset"
    >
      <div className="shell">
        <p className="mono-label text-accent">01 / The Craton mindset</p>
        <h2 className="mt-3 max-w-[36rem] text-[clamp(1.85rem,3.4vw,2.9rem)] font-normal leading-[1.05] tracking-[-0.04em]">
          The next breakthrough starts with a{' '}
          <span className="serif text-accent">better question.</span>
        </h2>
        <ol
          className={cn(
            'mt-8 grid gap-4',
            layout === 'row' && 'md:grid-cols-3',
          )}
        >
          {site.beliefs.map((belief, i) => (
            <li
              key={belief.title}
              className="glass-panel glass-panel--strong rounded-2xl border border-line bg-white p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="serif text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-accent/40">
                  “
                </span>
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
                  0{i + 1} / 03
                </span>
              </div>
              <h3 className="-mt-1 text-[clamp(1.25rem,2vw,1.5rem)] font-medium leading-snug tracking-tight">
                {belief.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.7] text-muted">{belief.body}</p>
              <footer className="mono-label mt-6 text-accent">
                Belief 0{i + 1} · Craton method
              </footer>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
