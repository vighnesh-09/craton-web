'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SiteContainer from '@/components/layout/SiteContainer'
import { useLenis } from '@/components/providers/LenisProvider'
import { products } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'
import { scrollToId } from '@/lib/scroll'

const ease = [0.22, 1, 0.36, 1]

const statusTone = {
  ok: 'text-lagoon',
  gap: 'text-copper',
  crit: 'text-coral',
}

function ProductPreview({ item }) {
  const { preview } = item

  if (item.id === 'ri') {
    return (
      <div className="relative overflow-hidden border border-line-on-dark bg-hero-base/80">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 80% 0%, var(--highlight), transparent 55%)',
          }}
        />
        <div className="relative flex items-center justify-between gap-4 border-b border-line-on-dark px-5 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-hero-muted">
          <span className="inline-flex items-center gap-2 text-hero-soft">
            <span className="size-1.5 rounded-full bg-copper" />
            {preview.label}
          </span>
          <span>{preview.note}</span>
        </div>

        <div className="relative space-y-5 px-5 py-5">
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-hero-muted">
              Agent request
            </p>
            <p className="mt-2 font-body text-[13.5px] leading-relaxed text-hero-fg/90">
              {preview.request}
            </p>
          </div>

          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-hero-muted">
              Review evidence
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
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
          </div>

          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-hero-muted">
              Decision context
            </p>
            <p className="mt-2 font-body text-[13.5px] leading-relaxed text-hero-body">
              {preview.context}
            </p>
          </div>

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

        <div className="relative flex flex-wrap justify-between gap-3 border-t border-line-on-dark px-5 py-3.5 font-body text-[11px] text-hero-muted">
          {preview.foot.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden border border-line-on-dark bg-hero-base/80">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, var(--highlight), transparent 50%)',
        }}
      />
      <div className="relative flex items-center justify-between gap-4 border-b border-line-on-dark px-5 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-hero-muted">
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
            <p className="mt-2 font-mono text-[1.55rem] font-medium tracking-[-0.02em] text-hero-fg">
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

      <div className="relative flex flex-wrap justify-between gap-3 border-t border-line-on-dark px-5 py-3.5 font-body text-[11px] text-hero-muted">
        {preview.foot.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </div>
  )
}

export default function Products() {
  const reduced = useReducedMotion()
  const lenis = useLenis()
  const [activeId, setActiveId] = useState(products.items[0].id)
  const active = products.items.find((item) => item.id === activeId)

  return (
    <section
      id={products.id}
      aria-labelledby="h-products"
      className="bg-craton px-6 py-24 text-hero-fg sm:px-8 md:py-32"
    >
      <SiteContainer>
        <SectionHeading
          layout="split-aside"
          tone="dark"
          num={products.eyebrow.num}
          label={products.eyebrow.label}
          title={products.title}
          titleAccent={products.titleAccent}
          aside={products.aside}
          headingId="h-products"
        />

        <div
          role="tablist"
          aria-label="Products"
          className="mt-12 grid gap-0 border-t border-line-on-dark sm:mt-16 md:grid-cols-2"
        >
          {products.items.map((item) => {
            const selected = item.id === activeId
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(item.id)}
                className={`group relative flex items-center justify-between gap-4 border-b border-line-on-dark py-5 text-left transition-colors duration-300 md:border-b-0 md:border-r md:pr-6 md:last:border-r-0 md:last:pr-0 md:first:pl-0 ${
                  selected ? 'text-hero-fg' : 'text-hero-muted hover:text-hero-soft'
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 h-px origin-left bg-copper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    selected ? 'w-full scale-x-100' : 'w-full scale-x-0'
                  }`}
                />
                <span className="inline-flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-hero-muted">
                    {item.num}
                  </span>
                  <span className="font-display text-[1.15rem] font-semibold tracking-[-0.02em] sm:text-[1.25rem]">
                    {item.name}
                  </span>
                </span>
                <span className="hidden font-body text-[12px] text-hero-muted sm:inline">
                  {item.domain}
                </span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              id={`panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${active.id}`}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease }}
              className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:items-start"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-hero-muted">
                    {active.kicker}
                  </p>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line-on-dark px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-hero-soft">
                    <span className="size-1.5 rounded-full bg-copper" />
                    {active.badge}
                  </span>
                </div>

                <h3 className="mt-6 max-w-[18ch] font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-hero-fg">
                  {active.title}{' '}
                  <span className="font-serif text-[1.05em] font-normal italic tracking-[-0.03em] text-hero-soft">
                    {active.titleAccent}
                  </span>
                </h3>

                <p className="mt-5 max-w-[44ch] font-body text-[14.5px] leading-[1.7] text-hero-body">
                  {active.description}
                </p>

                <dl className="mt-8 space-y-4 border-t border-line-on-dark pt-5">
                  {active.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-hero-muted pt-0.5">
                        {fact.label}
                      </dt>
                      <dd
                        className={`text-[13.5px] leading-relaxed text-hero-soft ${
                          fact.mono ? 'font-mono text-[12px] text-hero-fg' : 'font-body'
                        }`}
                      >
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <ProductPreview item={active} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-line-on-dark pt-6 sm:mt-16 sm:flex-row sm:items-center">
          <p className="max-w-xl font-body text-[14px] leading-relaxed text-hero-body">
            <span className="font-medium text-hero-fg">{products.foot.lead}</span>{' '}
            {products.foot.copy}
          </p>
          <a
            href={products.foot.cta.href}
            onClick={(event) => {
              event.preventDefault()
              scrollToId(products.foot.cta.href, lenis)
            }}
            className="group inline-flex items-center gap-2 font-body text-[13px] font-medium text-hero-cta transition-colors duration-300 hover:text-copper"
          >
            {products.foot.cta.label}
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </SiteContainer>
    </section>
  )
}
