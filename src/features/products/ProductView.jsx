import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import SiteContainer from '@/components/layout/SiteContainer'
import { products } from '@/content/home'

export function getProduct(id) {
  return products.items.find((item) => item.id === id) ?? null
}

export default function ProductView({ id }) {
  const item = getProduct(id)
  if (!item) notFound()

  return (
    <article className="bg-foam px-6 pb-24 pt-28 text-ink sm:px-8 md:pb-32 md:pt-36">
      <SiteContainer>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
          <Link href="/#products" className="transition-colors hover:text-ink">
            Products
          </Link>
          <span aria-hidden className="px-2">
            /
          </span>
          {item.name}
        </p>

        <div className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-lagoon">
              {item.kicker}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              {item.name}
            </h1>
            <p className="mt-5 max-w-[28ch] font-body text-[18px] font-medium leading-snug tracking-[-0.02em] text-ink-soft">
              {item.tagline}
            </p>
            <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/45">
              {item.badge}
            </p>
          </div>
          <p className="max-w-[42ch] font-body text-[15px] leading-[1.7] text-ink/65 lg:pb-2">
            {item.description}
          </p>
        </div>

        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[1.35rem] border border-line bg-mist">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            priority
            sizes="(max-width: 100rem) 100vw, 100rem"
            className="object-cover object-center"
          />
        </div>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
          <div>
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/45">
              Who it is for
            </h2>
            <p className="mt-3 font-body text-[15px] leading-[1.7] text-ink/70">
              {item.fits}
            </p>
          </div>
          <div>
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/45">
              What it does
            </h2>
            <ul className="mt-3 space-y-2.5">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 font-body text-[15px] leading-snug text-ink/75"
                >
                  <span
                    aria-hidden
                    className="mt-[0.5em] size-1 shrink-0 rounded-full bg-lagoon"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/45">
              What it does not do
            </h2>
            <ul className="mt-3 space-y-3">
              {item.limits.map((limit) => (
                <li
                  key={limit}
                  className="font-body text-[15px] leading-[1.65] text-ink/70"
                >
                  {limit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-lagoon px-5 py-2.5 font-body text-[13.5px] font-semibold text-craton transition-colors hover:bg-lagoon-deep"
          >
            Start a conversation
            <ArrowUpRight size={15} strokeWidth={2.25} />
          </Link>
          <Link
            href="/#products"
            className="font-body text-[14px] text-ink/60 underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            Both products
          </Link>
        </div>
      </SiteContainer>
    </article>
  )
}
