'use client'

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import SiteContainer from '@/components/layout/SiteContainer'
import { products } from '@/content/home'
import { SectionEyebrow } from '@/features/home/components/SectionHeading'

const statusTone = {
  ok: 'text-lagoon',
  gap: 'text-copper',
  crit: 'text-coral',
}

function ProductPreview({ item }) {
  const { preview } = item

  if (item.id === 'ri') {
    return (
      <div className="relative overflow-hidden border border-line-on-dark bg-hero-base/70">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 80% 0%, var(--highlight), transparent 55%)',
          }}
        />
        <div className="relative flex items-center justify-between gap-3 border-b border-line-on-dark px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-hero-muted">
          <span className="inline-flex items-center gap-2 text-hero-soft">
            <span className="size-1.5 rounded-full bg-copper" />
            {preview.label}
          </span>
          <span>{preview.note}</span>
        </div>
        <div className="relative space-y-4 px-5 py-5">
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-hero-muted">
              Agent request
            </p>
            <p className="mt-2 font-body text-[13.5px] leading-relaxed text-hero-fg/90">
              {preview.request}
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {preview.chips.map((chip) => (
              <li
                key={chip.title}
                className="border border-line-on-dark px-3 py-2"
              >
                <p className="font-body text-[13px] font-medium text-hero-fg">
                  {chip.title}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-hero-muted">
                  {chip.meta}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex items-start gap-3 border-t border-line-on-dark pt-4">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-copper" />
            <div>
              <p className="font-display text-[15px] font-semibold text-hero-fg">
                {preview.verdict.title}
              </p>
              <p className="mt-1 font-body text-[12.5px] text-hero-muted">
                {preview.verdict.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden border border-line-on-dark bg-hero-base/70">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, var(--highlight), transparent 50%)',
        }}
      />
      <div className="relative flex items-center justify-between gap-3 border-b border-line-on-dark px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-hero-muted">
        <span className="inline-flex items-center gap-2 text-hero-soft">
          <span className="size-1.5 rounded-full bg-copper" />
          {preview.label}
        </span>
        <span>{preview.note}</span>
      </div>
      <div className="relative grid grid-cols-3 gap-px border-b border-line-on-dark bg-line-on-dark">
        {preview.stats.map((stat) => (
          <div key={stat.label} className="bg-craton px-4 py-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-hero-muted">
              {stat.label}
            </p>
            <p className="mt-2 font-mono text-[1.4rem] font-medium tracking-[-0.02em] text-hero-fg">
              {stat.value}
              {stat.hint ? (
                <span className="ml-1.5 text-[11px] text-hero-muted">
                  {stat.hint}
                </span>
              ) : null}
            </p>
          </div>
        ))}
      </div>
      <ul className="relative divide-y divide-line-on-dark">
        {preview.rows.map((row) => (
          <li
            key={row.req}
            className="grid gap-2 px-5 py-3.5 sm:grid-cols-[1fr_auto] sm:items-baseline"
          >
            <div>
              <p className="font-body text-[13.5px] text-hero-fg/90">
                <span className="font-mono text-[11px] text-copper">
                  {row.req}
                </span>
                <span className="text-hero-muted"> · </span>
                {row.name}
              </p>
              <p className="mt-1 font-mono text-[11px] text-hero-muted">
                {row.evidence}
              </p>
            </div>
            <p
              className={`font-mono text-[10.5px] uppercase tracking-[0.12em] ${statusTone[row.tone]}`}
            >
              {row.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProductPanel({ item, fullBleed = true }) {
  return (
    <article
      className={
        fullBleed
          ? 'flex h-full w-screen shrink-0 flex-col justify-center px-6 sm:px-8'
          : 'w-full'
      }
    >
      <div
        className={
          fullBleed
            ? 'mx-auto grid w-full max-w-site grid-cols-1 items-center gap-8 py-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12'
            : 'grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12'
        }
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-copper">
              {item.num}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-hero-muted">
              {item.kicker}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line-on-dark px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-hero-soft">
              <span className="size-1.5 rounded-full bg-copper" />
              {item.badge}
            </span>
          </div>

          <h3 className="mt-5 font-display text-[clamp(1.85rem,3.4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-hero-fg">
            <span className="block text-hero-muted">{item.name}</span>
            <span className="mt-2 block">
              {item.title}{' '}
              <span className="font-serif text-[1.05em] font-normal italic tracking-[-0.03em] text-hero-soft">
                {item.titleAccent}
              </span>
            </span>
          </h3>

          <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-hero-muted">
            {item.domain}
          </p>

          <p className="mt-5 max-w-[44ch] font-body text-[14.5px] leading-[1.7] text-hero-body">
            {item.description}
          </p>

          <dl className="mt-7 space-y-3.5 border-t border-line-on-dark pt-5">
            {item.facts.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4"
              >
                <dt className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-hero-muted">
                  {fact.label}
                </dt>
                <dd
                  className={`text-[13.5px] leading-relaxed text-hero-soft ${
                    fact.mono
                      ? 'font-mono text-[12px] text-hero-fg'
                      : 'font-body'
                  }`}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0">
          <ProductPreview item={item} />
        </div>
      </div>
    </article>
  )
}

function ProgressBar({ progress }) {
  const width = useTransform(progress, [0, 1], ['0%', '100%'])
  return (
    <div className="h-px w-28 overflow-hidden bg-line-on-dark sm:w-40">
      <motion.div className="h-full origin-left bg-copper" style={{ width }} />
    </div>
  )
}

export default function Products() {
  const reduced = useReducedMotion()
  const trackRef = useRef(null)
  const count = products.items.length

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${((count - 1) / count) * 100}%`],
  )

  if (reduced) {
    return (
      <section
        id={products.id}
        aria-labelledby="h-products"
        className="bg-craton px-6 py-24 text-hero-fg sm:px-8 md:py-32"
      >
        <SiteContainer>
          <SectionEyebrow
            num={products.eyebrow.num}
            label={products.eyebrow.label}
            tone="dark"
            className="mb-6"
          />
          <h2
            id="h-products"
            className="max-w-[16ch] font-display text-[clamp(2.25rem,4.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-hero-fg"
          >
            {products.title}{' '}
            <span className="font-serif text-[1.06em] font-normal italic text-hero-soft">
              {products.titleAccent}
            </span>
          </h2>
          <p className="mt-5 max-w-[40ch] font-body text-[15px] text-hero-body">
            {products.aside}
          </p>
          <div className="mt-14 space-y-16">
            {products.items.map((item) => (
              <div key={item.id} className="border-t border-line-on-dark pt-10">
                <ProductPanel item={item} fullBleed={false} />
              </div>
            ))}
          </div>
        </SiteContainer>
      </section>
    )
  }

  return (
    <section
      id={products.id}
      ref={trackRef}
      aria-labelledby="h-products"
      className="relative bg-craton text-hero-fg"
      style={{ height: `${Math.max(count, 2) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <SiteContainer className="relative z-10 flex shrink-0 items-end justify-between gap-6 px-6 pb-2 pt-24 sm:px-8 sm:pt-28">
          <div>
            <SectionEyebrow
              num={products.eyebrow.num}
              label={products.eyebrow.label}
              tone="dark"
              className="mb-3"
            />
            <h2
              id="h-products"
              className="max-w-[18ch] font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-hero-fg"
            >
              {products.title}{' '}
              <span className="font-serif text-[1.05em] font-normal italic text-hero-soft">
                {products.titleAccent}
              </span>
            </h2>
          </div>
          <p className="hidden max-w-[28ch] text-right font-body text-[13px] leading-relaxed text-hero-muted md:block">
            {products.aside}
          </p>
        </SiteContainer>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <motion.div
            style={{ x, width: `${count * 100}%` }}
            className="flex h-full will-change-transform"
          >
            {products.items.map((item) => (
              <ProductPanel key={item.id} item={item} />
            ))}
          </motion.div>
        </div>

        <SiteContainer className="relative z-10 flex shrink-0 items-center justify-between gap-4 px-6 pb-6 pt-3 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-hero-muted">
            {products.hint}
          </p>
          <div className="flex items-center gap-4">
            <ProgressBar progress={scrollYProgress} />
            <span className="font-mono text-[10px] tabular-nums text-hero-muted">
              01 / 0{count}
            </span>
          </div>
        </SiteContainer>
      </div>
    </section>
  )
}
