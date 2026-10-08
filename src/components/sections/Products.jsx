import { ArrowUpRight } from 'lucide-react'
import GsprMock from '@/components/craton/GsprMock'
import ReviewsMock from '@/components/craton/ReviewsMock'
import Button from '@/components/ui/Button'
import { site } from '@/config/site'
import useGsapContext, { revealOnce } from '@/hooks/useGsapContext'

const products = [
  {
    product: site.products.ra,
    visual: 'gspr',
    chapter: '01',
    cta: 'Start a pilot',
    tone: 'light',
  },
  {
    product: site.products.ri,
    visual: 'reviews',
    chapter: '02',
    cta: 'Discuss ReviewsIntel',
    tone: 'ink',
  },
]

/**
 * Side-by-side comparison surface. Both products stay in view.
 * No pin, no scrub.
 */
export default function Products() {
  const { rootRef } = useGsapContext(({ gsap, ScrollTrigger }) => {
    revealOnce({ gsap, ScrollTrigger, root: rootRef.current, stagger: 0.1 })
  })

  return (
    <section
      id="products"
      ref={rootRef}
      className="pad-x py-6 sm:py-8"
      aria-label="Products"
    >
      <div className="shell">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="min-w-0 max-w-[40rem]">
            <p className="mono-label text-accent">02 / Intelligence, applied</p>
            <h2 className="mt-2 text-[clamp(1.7rem,3.2vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Complexity meets{' '}
              <span className="serif text-accent">clarity.</span>
            </h2>
          </div>
          <p className="max-w-[36ch] text-[13.5px] leading-relaxed text-muted">
            Two products. Same evidence-first method — MedTech regulatory AI
            and proof for agentic commerce.
          </p>
        </div>

        <div className="mt-4 grid items-stretch gap-3 lg:grid-cols-2 lg:gap-4">
          {products.map(({ product, visual, chapter, cta, tone }) => (
            <ProductCard
              key={product.id}
              product={product}
              chapter={chapter}
              cta={cta}
              tone={tone}
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

function ProductCard({ product, chapter, cta, visual, tone }) {
  const ink = tone === 'ink'

  return (
    <article
      id={product.id}
      aria-label={product.name}
      data-reveal
      className={
        ink
          ? 'product-lift flex h-full min-w-0 flex-col rounded-2xl border border-ink/15 bg-cream p-3 text-ink sm:p-4'
          : 'product-lift navy-sheen glass-panel glass-frost glass-cyan-edge flex h-full min-w-0 flex-col rounded-2xl p-3 sm:p-4'
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span
            className={
              ink
                ? 'font-mono text-[11px] tracking-[0.16em] text-accent'
                : 'mono-label text-accent'
            }
          >
            {chapter}
          </span>
          <span
            className={
              ink
                ? 'rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent'
                : 'font-mono text-[10px] uppercase tracking-[0.12em] text-muted'
            }
          >
            {product.status}
          </span>
        </div>
        <span
          className={
            ink ? 'text-[12px] text-ink-3' : 'text-[12px] text-muted'
          }
        >
          {product.domain}
        </span>
      </div>

      <h3
        className={
          ink
            ? 'mt-2.5 text-[clamp(1.4rem,2.1vw,1.85rem)] font-normal tracking-tight text-ink'
            : 'mt-2.5 text-[clamp(1.4rem,2.1vw,1.85rem)] font-normal tracking-tight text-cream'
        }
      >
        {product.name}
      </h3>
      <p
        className={
          ink
            ? 'mt-1.5 max-w-[48ch] text-[13.5px] leading-relaxed text-ink-2'
            : 'mt-1.5 max-w-[48ch] text-[13.5px] leading-relaxed text-muted-ink'
        }
      >
        {product.headline}
      </p>

      <div
        className={
          ink
            ? 'relative z-[1] mt-3 overflow-hidden rounded-xl bg-paper p-1'
            : 'relative z-[1] mt-3 overflow-hidden rounded-xl border border-line bg-white p-1'
        }
      >
        {visual}
      </div>

      <div
        className={
          ink
            ? 'mt-3 flex flex-wrap items-end justify-between gap-3 border-t border-ink/15 pt-3'
            : 'mt-3 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-3'
        }
      >
        <p
          className={
            ink
              ? 'max-w-[42ch] text-[13px] leading-relaxed text-ink-3'
              : 'max-w-[42ch] text-[13px] leading-relaxed text-muted-ink'
          }
        >
          <span
            className={
              ink
                ? 'mr-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent'
                : 'mono-label mr-2 text-accent'
            }
          >
            Problem
          </span>
          {product.problem}
        </p>
        <Button
          href="#contact"
          variant={ink ? 'light' : 'outline'}
          className="!min-h-10 !rounded-md !px-3"
        >
          {cta}
          <ArrowUpRight size={14} />
        </Button>
      </div>
    </article>
  )
}
