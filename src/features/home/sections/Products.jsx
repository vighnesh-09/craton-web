'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import SiteContainer from '@/components/layout/SiteContainer'
import { products } from '@/content/home'
import { SectionEyebrow } from '@/features/home/components/SectionHeading'
import { cn } from '@/lib/cn'

const STACK_SURFACE = 'bg-craton'
/** Park the stack below the navbar. Later cards stop lower so the one underneath still shows. */
const STICK_TOP = 6.25
const PEEK = 1.75
const OVERLAP = 3

function StackCard({ item, index, total, sticky }) {
  const isLast = index === total - 1

  return (
    <div
      className={cn(sticky && 'sticky')}
      style={
        sticky
          ? {
              top: `${STICK_TOP + index * (PEEK + OVERLAP)}rem`,
              zIndex: index + 1,
            }
          : undefined
      }
    >
      <div
        className={cn(
          index > 0 && sticky && '-mt-12',
          !sticky && index > 0 && 'mt-6',
        )}
      >
        <article
          className={cn(
            'relative flex h-[calc(100svh-10rem)] min-h-[28rem] flex-col overflow-hidden text-hero-fg',
            STACK_SURFACE,
            'rounded-t-2xl md:rounded-t-[1.5rem]',
            isLast ? 'rounded-b-2xl md:rounded-b-[1.5rem]' : 'rounded-b-none',
            index > 0 &&
              'shadow-[0_-20px_50px_rgba(0,0,0,0.4)] ring-1 ring-line-on-dark',
            index === 0 && 'ring-1 ring-line-on-dark',
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                'linear-gradient(135deg, color-mix(in srgb, var(--highlight) 55%, transparent) 0%, transparent 42%)',
            }}
          />

          <div className="relative z-[1] mx-auto flex h-full w-full max-w-site flex-1 flex-col justify-center gap-10 px-6 py-20 sm:px-8 md:flex-row md:items-center md:gap-12 md:px-12 lg:gap-16 lg:px-16 xl:px-20">
            {/* Left — brand-first product pitch */}
            <div className="flex min-w-0 flex-1 flex-col justify-center md:max-w-[38%]">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-copper">
                {item.kicker}
              </p>

              <h3 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-hero-fg">
                {item.name}
              </h3>

              <p className="mt-5 max-w-[28ch] font-body text-[17px] font-medium leading-snug tracking-[-0.015em] text-hero-soft">
                {item.tagline}
              </p>

              <p className="mt-4 max-w-[34ch] font-body text-[14.5px] leading-[1.65] text-hero-body">
                {item.description}
              </p>

              <ul className="mt-8 space-y-2.5">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 font-body text-[14px] text-hero-soft"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.45em] size-1 shrink-0 rounded-full bg-copper"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full bg-hero-cta px-5 py-2.5 font-body text-[13.5px] font-semibold text-craton transition-opacity hover:opacity-90"
                >
                  {item.cta}
                  <ArrowUpRight size={15} strokeWidth={2.25} />
                </Link>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-hero-muted">
                  {item.badge}
                </span>
              </div>
            </div>

            {/* Right — product visual */}
            <div className="relative min-h-0 w-full flex-1 md:max-w-[54%]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-foam shadow-[0_28px_64px_rgba(0,0,0,0.38)] md:aspect-auto md:h-[min(58vh,32rem)]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 48vw"
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>
            </div>
          </div>

          {!isLast ? (
            <div
              aria-hidden
              className={cn('h-8 shrink-0 md:h-12', STACK_SURFACE)}
            />
          ) : null}
        </article>
      </div>
    </div>
  )
}

export default function Products() {
  const reduced = useReducedMotion()
  const total = products.items.length

  return (
    <section
      id={products.id}
      aria-labelledby="h-products"
      className="relative bg-mist/40 px-4 pb-16 pt-20 sm:px-6 md:px-8 md:pb-24 md:pt-28"
    >
      <SiteContainer>
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
          <div>
            <SectionEyebrow
              num={products.eyebrow.num}
              label={products.eyebrow.label}
              tone="light"
              className="mb-4"
            />
            <h2
              id="h-products"
              className="max-w-[16ch] font-display text-[clamp(2.1rem,4.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink"
            >
              {products.title}{' '}
              <span className="font-serif text-[1.06em] font-normal italic text-ink-soft">
                {products.titleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-[30ch] font-body text-[14.5px] leading-relaxed text-ink/55 md:text-right">
            {products.aside}
          </p>
        </div>

        <div className="relative">
          {products.items.map((item, index) => (
            <StackCard
              key={item.id}
              item={item}
              index={index}
              total={total}
              sticky={!reduced}
            />
          ))}
          {!reduced ? <div aria-hidden className="h-[10vh]" /> : null}
        </div>
      </SiteContainer>
    </section>
  )
}
