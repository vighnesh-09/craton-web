import { ArrowUpRight } from 'lucide-react'
import GsprMock from '@/components/craton/GsprMock'
import ReviewsMock from '@/components/craton/ReviewsMock'
import Button from '@/components/ui/Button'
import { site } from '@/config/site'

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

/** Both products side by side. Content height, no pin or width scrub. */
export default function Products() {
  return (
    <section id="products" className="section-pad bg-canvas" aria-label="Products">
      <div className="shell">
        <div className="max-w-[36rem]">
          <p className="kicker">Intelligence, applied</p>
          <h2 className="display mt-3 max-w-[16ch] text-cream">
            Complexity meets <span className="serif text-accent">clarity.</span>
          </h2>
          <p className="lede mt-3 max-w-[46ch]">
            Two products. Same evidence-first method — MedTech regulatory AI and proof for agentic commerce.
          </p>
        </div>
        <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-2">
          {products.map(({ product, visual, chapter, cta, tone }) => (
            <ProductCard
              key={product.id}
              product={product}
              chapter={chapter}
              cta={cta}
              tone={tone}
              visual={visual === 'gspr' ? <GsprMock compact /> : <ReviewsMock compact />}
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
      className={
        ink
          ? 'relative flex h-full min-w-0 flex-col rounded-[var(--radius)] bg-vault p-4 text-[#f4f7fa] sm:p-5'
          : 'relative flex h-full min-w-0 flex-col rounded-[var(--radius)] border border-[var(--hairline)] bg-paper-2 p-4 text-cream sm:p-5'
      }
    >
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-0 top-4 w-0.5 rounded-full bg-accent"
      />
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 pl-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.16em] text-accent">{chapter}</span>
          <span className={ink ? 'font-mono text-[11px] uppercase tracking-[0.12em] text-[#c5d4e0]' : 'font-mono text-[11px] uppercase tracking-[0.12em] text-muted-ink'}>
            {product.status}
          </span>
        </div>
        <span className={ink ? 'text-[13px] text-[#c5d4e0]' : 'text-[13px] text-muted-ink'}>
          {product.domain}
        </span>
      </div>
      <h3 className="mt-2 shrink-0 pl-2 text-[clamp(1.2rem,1.6vw,1.45rem)] font-medium tracking-[-0.03em]">
        {product.name}
      </h3>
      <p className={ink ? 'mt-1 shrink-0 pl-2 text-[13.5px] leading-snug text-[#d5e0ea]' : 'mt-1 shrink-0 pl-2 text-[13.5px] leading-snug text-muted-ink'}>
        {product.headline}
      </p>
      <div
        className={
          ink
            ? 'mt-3 min-w-0 overflow-hidden rounded-[var(--radius)] bg-paper p-1 text-cream'
            : 'mt-3 min-w-0 overflow-hidden rounded-[var(--radius)] border border-[var(--hairline)] bg-paper p-1'
        }
      >
        {visual}
      </div>
      <div className={ink ? 'mt-3 flex shrink-0 flex-wrap items-end justify-between gap-3 border-t border-white/15 pl-2 pt-3' : 'mt-3 flex shrink-0 flex-wrap items-end justify-between gap-3 border-t border-[var(--hairline)] pl-2 pt-3'}>
        <p className={ink ? 'max-w-[36ch] text-[13px] leading-snug text-[#d5e0ea]' : 'max-w-[36ch] text-[13px] leading-snug text-muted-ink'}>
          <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            Problem
          </span>
          {product.problem}
        </p>
        <Button
          href="#contact"
          variant={ink ? 'light' : 'outline'}
          className={
            ink
              ? '!min-h-12 !rounded-sm !bg-[image:none] !bg-[#00A8C4] !px-3 !text-[#102033] !shadow-none hover:!bg-[#007A96] hover:!text-[#102033]'
              : '!min-h-12 !rounded-sm !border-[var(--hairline)] !bg-canvas !px-3 !text-cream !shadow-none hover:!border-accent'
          }
        >
          {cta}
          <ArrowUpRight size={14} />
        </Button>
      </div>
    </article>
  )
}
