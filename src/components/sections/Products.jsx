import { useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import GsprMock from '@/components/craton/GsprMock'
import ReviewsMock from '@/components/craton/ReviewsMock'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import Section, { SectionHead } from '@/components/ui/Section'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

export default function Products() {
  return (
    <Section id="products" tone="dark" className="overflow-hidden">
      <SectionHead
        eyebrow="02 / Intelligence, applied"
        title={
          <Reveal
            as="h2"
            className="text-[clamp(2.2rem,4.2vw,4.4rem)] font-normal leading-[1.05] tracking-[-0.04em]"
          >
            Complexity meets{' '}
            <span className="serif text-accent">clarity.</span>
          </Reveal>
        }
        aside={
          <Reveal
            delay={0.08}
            className="max-w-[36ch] text-[15px] leading-relaxed text-cream/65"
          >
            Two products, two domains, one conviction: deep problems deserve
            purpose-built intelligence with the reasoning shown.
          </Reveal>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProductCard product={site.products.ra} visual={<GsprMock />} />
        <ProductCard product={site.products.ri} visual={<ReviewsMock />} />
      </div>
    </Section>

  )
}

function ProductCard({ product, visual }) {
  const [open, setOpen] = useState(false)

  return (
    <Reveal
      as="article"
      id={product.id}
      className="group flex flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-7"
    >
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="mono-label text-muted">{product.domain}</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-cream/80">
          <span className="size-1.5 rounded-full bg-accent" />
          {product.status}
        </span>
      </div>

      <h3 className="text-[clamp(1.6rem,2.4vw,2.2rem)] font-normal leading-tight tracking-tight">
        {product.name}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-cream/70">
        {product.headline}
      </p>

      <div className="mt-6">{visual}</div>

      <dl className="mt-6 space-y-4 border-t border-line pt-5 text-[13.5px]">
        <div>
          <dt className="mono-label text-muted">Problem</dt>
          <dd className="mt-2 text-cream/75">{product.problem}</dd>
        </div>
        <div>
          <dt className="mono-label text-muted">What changes</dt>
          <dd className="mt-2 text-cream/75">{product.change}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-left text-[13px] font-medium text-cream"
        aria-expanded={open}
      >
        Does today / next
        <ChevronDown
          size={16}
          className={cn('transition-transform duration-300', open && 'rotate-180')}
        />
      </button>

      <div
        className={cn(
          'grid transition-all duration-300',
          open ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="grid gap-4 sm:grid-cols-2">
            <List title="Does today" items={product.today} />
            <List title="Next" items={product.next} />
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-muted">
            {product.disclaimer}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Button href="#contact" variant="outline" className="w-full sm:w-auto">
          {product.id === 'raccelerator' ? 'Start a pilot' : 'Discuss ReviewsIntel'}
          <ArrowUpRight size={14} />
        </Button>
      </div>
    </Reveal>
  )
}

function List({ title, items }) {
  return (
    <div>
      <p className="mono-label text-accent">{title}</p>
      <ul className="mt-2 space-y-2 text-[13px] text-cream/70">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
