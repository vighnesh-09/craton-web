import { ArrowUpRight } from 'lucide-react'
import GsprMock from '@/components/craton/GsprMock'
import ReviewsMock from '@/components/craton/ReviewsMock'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/config/site'

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
 * Clear dual product presentation — both cards always visible on desktop.
 * No sticky scrub / focus wipe. Light enter reveal only.
 */
export default function Products() {
  return (
    <section
      id="products"
      className="pad-x relative py-[clamp(2.5rem,4vw,4rem)]"
      aria-label="Products"
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[36rem]">
            <p className="mono-label text-accent">02 / Intelligence, applied</p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.6vw,3.2rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Complexity meets{' '}
              <span className="serif text-accent">clarity.</span>
            </h2>
            <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-muted">
              Two products. Same evidence-first method — MedTech regulatory AI
              and proof for agentic commerce.
            </p>
          </div>
          <ol className="flex gap-6">
            {products.map(({ product, chapter }, i) => (
              <li key={product.id} className="min-w-[7.5rem]">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {chapter} / 0{products.length}
                </p>
                <a
                  href={`#${product.id}`}
                  className="mt-1 block text-[1rem] tracking-tight hover:text-accent"
                >
                  {product.name}
                </a>
                <p className="mt-0.5 text-[11px] text-muted">{product.domain}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {products.map(({ product, visual, chapter, cta }, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard
                product={product}
                chapter={chapter}
                cta={cta}
                visual={
                  visual === 'gspr' ? (
                    <GsprMock compact />
                  ) : (
                    <ReviewsMock compact />
                  )
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, chapter, cta, visual }) {
  return (
    <article
      id={product.id}
      aria-label={product.name}
      className="flex h-full flex-col rounded-[1.5rem] border border-line bg-[color-mix(in_oklab,var(--paper)_82%,transparent)] p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="mono-label text-accent">{chapter}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {product.status}
          </span>
        </div>
        <span className="text-[12px] text-muted">{product.domain}</span>
      </div>

      <h3 className="mt-3 text-[clamp(1.45rem,2.2vw,1.95rem)] font-normal tracking-tight">
        {product.name}
      </h3>
      <p className="mt-1.5 max-w-[44ch] text-[13.5px] leading-relaxed text-muted">
        {product.headline}
      </p>

      <div className="mt-4 min-h-0 flex-1 overflow-hidden rounded-2xl border border-line bg-ink/30 p-1">
        {visual}
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-4">
        <p className="max-w-[38ch] text-[12.5px] leading-relaxed text-muted">
          <span className="mono-label mr-2 text-accent">Problem</span>
          {product.problem}
        </p>
        <Button href="#contact" variant="outline" className="!min-h-10 !px-3">
          {cta}
          <ArrowUpRight size={14} />
        </Button>
      </div>
    </article>
  )
}
