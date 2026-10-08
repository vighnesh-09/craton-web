import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import GsprMock from '@/components/craton/GsprMock'
import ReviewsMock from '@/components/craton/ReviewsMock'
import Button from '@/components/ui/Button'
import Glass from '@/components/ui/Glass'
import useGsapContext from '@/hooks/useGsapContext'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

const products = [
  {
    product: site.products.ra,
    visual: 'gspr',
    chapter: '01',
    cta: 'Start a pilot',
  },
  {
    product: site.products.ri,
    visual: 'reviews',
    chapter: '02',
    cta: 'Discuss ReviewsIntel',
  },
]

/**
 * Pinned compare stage. Column width and accent rails scrub with scroll.
 * Both products stay fully opaque. Pin only when the stage fits.
 */
export default function Products() {
  const [focus, setFocus] = useState(0)

  const { rootRef, reduced } = useGsapContext(({ gsap, root }) => {
    const stage = root.querySelector('[data-stage]')
    const grid = root.querySelector('[data-grid]')
    const cards = gsap.utils.toArray(root.querySelectorAll('[data-card]'))
    const rails = gsap.utils.toArray(root.querySelectorAll('[data-rail]'))
    const bar = root.querySelector('[data-bar]')
    if (!stage || !grid || cards.length < 2) return

    const releaseStage = () => {
      stage.style.height = ''
      stage.style.maxHeight = ''
      stage.style.overflow = ''
    }

    gsap.set(cards, { autoAlpha: 1 })
    rails.forEach((rail) => gsap.set(rail, { autoAlpha: 1 }))

    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (min-height: 680px)', () => {
      stage.style.height = 'auto'
      stage.style.maxHeight = 'none'
      stage.style.overflow = 'visible'

      const shell = stage.querySelector('.shell')
      const lockFit = () => {
        stage.style.height = '100svh'
        stage.style.maxHeight = '100svh'
        stage.style.overflow = 'hidden'
        if (shell) {
          shell.style.display = 'flex'
          shell.style.flexDirection = 'column'
          shell.style.flex = '1 1 auto'
          shell.style.minHeight = '0'
        }
        grid.style.flex = '1 1 auto'
        grid.style.minHeight = '0'
        cards.forEach((card) => {
          card.style.minHeight = '0'
          card.style.height = '100%'
        })
      }
      const unlockFit = () => {
        releaseStage()
        if (shell) {
          shell.style.display = ''
          shell.style.flexDirection = ''
          shell.style.flex = ''
          shell.style.minHeight = ''
        }
        grid.style.flex = ''
        grid.style.minHeight = ''
        cards.forEach((card) => {
          card.style.minHeight = ''
          card.style.height = ''
        })
      }

      lockFit()

      gsap.set(cards[0], { flexGrow: 1.35 })
      gsap.set(cards[1], { flexGrow: 0.95 })
      gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
      if (rails[0]) gsap.set(rails[0], { autoAlpha: 1 })
      if (rails[1]) gsap.set(rails[1], { autoAlpha: 0.35 })

      let current = 0
      const syncLabel = (progress) => {
        const index = progress < 0.5 ? 0 : 1
        cards.forEach((card, i) => {
          card.setAttribute('data-active', i === index ? 'true' : 'false')
        })
        if (index === current) return
        current = index
        setFocus(index)
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

      tl.to(cards[0], { flexGrow: 0.95, ease: 'none' }, 0)
      tl.to(cards[1], { flexGrow: 1.35, ease: 'none' }, 0)
      tl.to(bar, { scaleX: 1, ease: 'none' }, 0)
      if (rails[0]) tl.to(rails[0], { autoAlpha: 0.35, ease: 'none' }, 0)
      if (rails[1]) tl.to(rails[1], { autoAlpha: 1, ease: 'none' }, 0)

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
        unlockFit()
        gsap.set(cards, { autoAlpha: 1, clearProps: 'flexGrow' })
        rails.forEach((rail) => gsap.set(rail, { autoAlpha: 1 }))
      }
    })
  }, [])

  if (reduced) {
    return (
      <section
        id="products"
        className="pad-x relative py-[clamp(2.5rem,4vw,4rem)]"
        aria-label="Products"
      >
        <div className="shell">
          <HeaderStatic />
          <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
            {products.map(({ product, visual, chapter, cta }) => (
              <ProductCard
                key={product.id}
                product={product}
                chapter={chapter}
                cta={cta}
                active
                visual={
                  visual === 'gspr' ? (
                    <GsprMock compact />
                  ) : (
                    <ReviewsMock compact />
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={rootRef}
      id="products"
      className="relative"
      aria-label="Products"
    >
      <div
        data-stage
        className="flex flex-col pad-x pb-4 pt-24"
      >
        <div className="shell w-full">
          <div className="flex shrink-0 flex-wrap items-end justify-between gap-4">
            <div className="max-w-[36rem]">
              <p className="mono-label text-accent">02 / Intelligence, applied</p>
              <h2 className="mt-3 text-[clamp(1.85rem,3.6vw,3.2rem)] font-normal leading-[1.05] tracking-[-0.04em]">
                Complexity meets{' '}
                <span className="serif text-accent">clarity.</span>
              </h2>
              <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-muted">
                Scroll to compare — both products stay in view; focus expands
                the one under evaluation.
              </p>
            </div>
            <div className="min-w-[12rem]">
              <div className="mb-3 h-0.5 overflow-hidden rounded-full bg-line">
                <div
                  data-bar
                  className="h-full origin-left bg-accent will-change-transform"
                />
              </div>
              <ol className="flex gap-6">
                {products.map(({ product, chapter }, i) => (
                  <li key={product.id} className="min-w-[7.5rem]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      {chapter} / 0{products.length}
                    </p>
                    <a
                      href={`#${product.id}`}
                      data-label
                      className={cn(
                        'mt-1 block text-[1rem] tracking-tight',
                        focus === i ? 'text-accent' : 'text-muted',
                      )}
                    >
                      {product.name}
                    </a>
                    <p className="mt-0.5 text-[11px] text-muted">
                      {product.domain}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div
            data-grid
            className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-5"
          >
            {products.map(({ product, visual, chapter, cta }, i) => (
              <div
                key={product.id}
                data-card
                data-active={i === 0 ? 'true' : 'false'}
                className="flex min-h-0 min-w-0 flex-col opacity-100 lg:basis-0 lg:h-full lg:grow"
              >
                <ProductCard
                  product={product}
                  chapter={chapter}
                  cta={cta}
                  active={focus === i}
                  visual={
                    visual === 'gspr' ? (
                      <GsprMock compact />
                    ) : (
                      <ReviewsMock compact />
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HeaderStatic() {
  return (
    <div className="max-w-[36rem]">
      <p className="mono-label text-accent">02 / Intelligence, applied</p>
      <h2 className="mt-3 text-[clamp(1.85rem,3.6vw,3.2rem)] font-normal leading-[1.05] tracking-[-0.04em]">
        Complexity meets <span className="serif text-accent">clarity.</span>
      </h2>
      <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-muted">
        Two products. Same evidence-first method — MedTech regulatory AI and
        proof for agentic commerce.
      </p>
    </div>
  )
}

function ProductCard({ product, chapter, cta, visual, active }) {
  return (
    <article
      id={product.id}
      aria-label={product.name}
      aria-current={active ? 'true' : undefined}
      className="flex h-full min-h-0 flex-col"
    >
      <Glass
        strong
        lift
        className="relative flex h-full min-h-0 flex-col p-3 sm:p-4 [&>div]:flex [&>div]:h-full [&>div]:min-h-0 [&>div]:flex-col"
      >
        <span
          aria-hidden
          data-rail
          className="pointer-events-none absolute bottom-4 left-0 top-4 w-0.5 rounded-full bg-accent"
        />
        <div className="relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-2 pl-2">
          <div className="flex items-center gap-3">
            <span className="mono-label text-accent">{chapter}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              {product.status}
            </span>
          </div>
          <span className="text-[12px] text-muted">{product.domain}</span>
        </div>

        <h3 className="relative z-10 mt-3 shrink-0 pl-2 text-[clamp(1.45rem,2.2vw,1.95rem)] font-normal tracking-tight">
          {product.name}
        </h3>
        <p className="relative z-10 mt-1.5 max-w-[44ch] shrink-0 pl-2 text-[13.5px] leading-relaxed text-muted">
          {product.headline}
        </p>

        <div className="relative z-10 mt-4 min-h-0 flex-1 overflow-hidden rounded-2xl border border-line bg-ink/40 p-1">
          {visual}
        </div>

        <div className="relative z-10 mt-4 flex shrink-0 flex-wrap items-end justify-between gap-3 border-t border-line pt-4 pl-2">
          <p className="max-w-[38ch] text-[12.5px] leading-relaxed text-muted">
            <span className="mono-label mr-2 text-accent">Problem</span>
            {product.problem}
          </p>
          <Button
            href="#contact"
            variant="outline"
            className="!min-h-10 !rounded-md !px-3"
          >
            {cta}
            <ArrowUpRight size={14} />
          </Button>
        </div>
      </Glass>
    </article>
  )
}
