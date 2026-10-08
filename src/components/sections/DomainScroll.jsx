import { useEffect, useState } from 'react'
import Glass from '@/components/ui/Glass'
import useGsapContext from '@/hooks/useGsapContext'
import { cn } from '@/lib/cn'

const chapters = [
  {
    kicker: 'Domain',
    title: 'Regulated decisions need evidence, not vibes.',
    body: 'Medical-device and IVD teams live inside EU MDR / IVDR: classification rules, Annex I GSPR, technical files that span thousands of pages. Clarity is a compliance risk — and a time risk.',
  },
  {
    kicker: 'RAccelerator',
    title: 'Map every requirement to proof you can defend.',
    body: 'Device classification and GSPR gap assessment with reasoning tied to the rule and the document. Experts stay in the loop; the system surfaces the argument, not a black box.',
  },
  {
    kicker: 'ReviewsIntel',
    title: 'When agents buy, the rationale must travel with them.',
    body: 'Agentic commerce fails silently without evidence. ReviewsIntel binds purchase authorization to independent review proof — visible before checkout.',
  },
  {
    kicker: 'Craton method',
    title: 'Invent. Protect. Assemble domain ownership. Ship.',
    body: 'A patent-first product company in Frisco, Texas — one engineering bedrock, many high-trust domains. Not consulting theatre. Products you can evaluate.',
  },
]

const WIDE_QUERY = '(min-width: 1024px) and (min-height: 680px)'

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
 * Mask-reveal stage. One card stays put. Scroll scrubs a left-to-right
 * clip on the incoming chapter while its faint index scales behind the
 * words. The left headline never travels.
 */
export default function DomainScroll() {
  const [active, setActive] = useState(0)
  const wide = useWideStage()

  const { rootRef, reduced } = useGsapContext(({ gsap, ScrollTrigger, root }) => {
    const stage = root.querySelector('[data-stage]')
    const frame = root.querySelector('[data-frame]')
    const layers = gsap.utils.toArray(root.querySelectorAll('[data-layer]'))
    const bar = root.querySelector('[data-bar]')
    const edge = root.querySelector('[data-edge]')
    if (!stage || !frame || layers.length < 2) return

    const n = layers.length
    let current = -1

    const publish = (index) => {
      if (index === current) return
      current = index
      setActive(index)
    }

    const coverOf = (i, x) => {
      const enter = i === 0 ? 1 : gsap.utils.clamp(0, 1, (x - (i - 0.5)) / 0.5)
      const exit = gsap.utils.clamp(0, 1, (x - i) / 0.5)
      return enter * (1 - exit)
    }

    const numeral = root.querySelector('[data-numeral]')

    const apply = (progress) => {
      const x = gsap.utils.clamp(0, n - 1, progress * (n - 1))
      let edgeAt = null

      layers.forEach((layer, i) => {
        const cover = coverOf(i, x)
        const right = (1 - cover) * 100
        layer.style.clipPath = `inset(0% ${right}% 0% 0%)`
        layer.style.zIndex = String(i + 1)
        layer.dataset.cover = cover.toFixed(3)
        if (cover > 0.02 && cover < 0.98) edgeAt = cover
      })

      if (numeral) {
        gsap.set(numeral, {
          scale: 0.86 + (x / (n - 1)) * 0.22,
          transformOrigin: '100% 100%',
        })
      }

      if (edge) {
        gsap.set(edge, {
          left: edgeAt == null ? '0%' : `${edgeAt * 100}%`,
          opacity: edgeAt == null ? 0 : 1,
        })
      }

      if (bar) {
        gsap.set(bar, {
          scaleX: (x + 1) / n,
          transformOrigin: 'left center',
        })
      }

      // Switch once the incoming chapter is mostly open, not at the blank midpoint.
      publish(Math.min(n - 1, Math.max(0, Math.floor(x + 0.2))))
    }

    apply(0)

    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * (n - 1) * 0.82)}`,
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
    }
  }, [wide])

  if (reduced || !wide) {
    return <StackedDomain />
  }

  return (
    <section
      ref={rootRef}
      id="domain"
      className="relative"
      aria-label="Domain narrative"
    >
      <div
        data-stage
        className="flex h-[100svh] max-h-[100svh] items-center bg-ink pad-x pb-8 pt-[5.5rem]"
      >
        <div className="shell grid w-full grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] items-center gap-10 lg:gap-14">
          <div>
            <p className="mono-label text-accent">Scroll the continuum</p>
            <h2 className="mt-3 max-w-[14ch] text-[clamp(1.9rem,3.8vw,3.35rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Built for rooms where a wrong citation costs months.
            </h2>
            <p className="mt-3 max-w-[40ch] text-[14.5px] leading-relaxed text-muted">
              Move through Craton’s world — from regulatory gravity to product
              clarity — as each chapter follows the scroll.
            </p>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-line">
              <div
                data-bar
                className="h-full origin-left scale-x-[0.25] bg-accent will-change-transform"
              />
            </div>
            <ol className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {chapters.map((chapter, i) => (
                <li
                  key={chapter.kicker}
                  className={cn(
                    'font-mono text-[10px] uppercase tracking-[0.12em]',
                    active === i ? 'text-accent' : 'text-muted',
                  )}
                  aria-current={active === i ? 'true' : 'false'}
                >
                  0{i + 1} {chapter.kicker}
                </li>
              ))}
            </ol>
          </div>

          <div
            data-frame
            className="glass-panel glass-panel--strong relative h-[min(440px,52vh)] min-w-0 overflow-hidden rounded-[1.75rem]"
          >
            <span aria-hidden className="glass-fluted" />
            <span
              data-numeral
              aria-hidden
              className="serif pointer-events-none absolute bottom-3 right-5 select-none text-[clamp(6.5rem,11vw,9rem)] leading-none text-[#1E2A3A]/[0.08]"
            >
              0{active + 1}
            </span>
            {chapters.map((chapter, i) => (
              <article
                key={chapter.kicker}
                data-layer
                className={cn(
                  'absolute inset-0 p-7 sm:p-9',
                  i === 0
                    ? '[clip-path:inset(0%_0%_0%_0%)]'
                    : '[clip-path:inset(0%_100%_0%_0%)]',
                )}
                aria-hidden={active !== i}
              >
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="mono-label text-accent">{chapter.kicker}</span>
                    <span className="font-mono text-[11px] text-muted">
                      0{i + 1} / 04
                    </span>
                  </div>
                  <h3 className="mt-8 max-w-[22ch] text-[clamp(1.5rem,2.6vw,2.15rem)] font-normal leading-tight tracking-tight">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.75] text-muted">
                    {chapter.body}
                  </p>
                </div>
              </article>
            ))}
            <div
              data-edge
              aria-hidden
              className="pointer-events-none absolute inset-y-6 z-20 w-px bg-accent opacity-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function StackedDomain() {
  return (
    <section
      id="domain"
      className="pad-x relative py-[clamp(2.5rem,4vw,4rem)]"
      aria-label="Domain narrative"
    >
      <div className="shell">
        <p className="mono-label text-accent">Domain continuum</p>
        <h2 className="mt-3 max-w-[16ch] text-[clamp(2rem,4vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.04em]">
          Built for rooms where a wrong citation costs months.
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {chapters.map((chapter, i) => (
            <Glass
              key={chapter.kicker}
              className="p-6 sm:p-7"
              strong
              glow={i === 0}
              fluted={i === 0}
              lift
            >
              <CardInner chapter={chapter} index={i} />
            </Glass>
          ))}
        </div>
      </div>
    </section>
  )
}

function CardInner({ chapter, index }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-4">
        <span className="mono-label text-accent">{chapter.kicker}</span>
        <span className="font-mono text-[11px] text-muted">
          0{index + 1} / 04
        </span>
      </div>
      <h3 className="mt-8 text-[clamp(1.5rem,2.6vw,2.15rem)] font-normal leading-tight tracking-tight">
        {chapter.title}
      </h3>
      <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.75] text-muted">
        {chapter.body}
      </p>
    </div>
  )
}
