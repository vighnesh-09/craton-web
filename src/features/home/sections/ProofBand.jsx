'use client'

import SiteContainer from '@/components/layout/SiteContainer'
import { proof } from '@/content/home'
import { useSiteLink } from '@/hooks/useSiteLink'

/** Honest status block. The scrolling proof ticker sits on the hero. */
export default function ProofBand() {
  const follow = useSiteLink()

  return (
    <section
      id={proof.id}
      aria-label="Company proof points"
      className="relative z-10 bg-craton text-hero-fg"
    >
      <SiteContainer className="px-6 pb-14 pt-10 sm:px-8 md:pb-16 md:pt-12">
        <div className="border-t border-line-on-dark pt-8">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-hero-muted">
            {proof.status.kicker}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-[-0.04em] text-hero-fg">
            {proof.status.title}
          </h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {proof.status.items.map((item) => (
              <li key={item.label}>
                <p className="font-display text-[15px] font-semibold tracking-[-0.02em] text-hero-fg">
                  {item.label}
                </p>
                <p className="mt-2 font-body text-[14px] leading-[1.65] text-hero-body">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
          <a
            href="#patents"
            onClick={follow('#patents')}
            className="mt-8 inline-flex font-body text-[13.5px] text-hero-soft underline decoration-line-on-dark underline-offset-4 transition-colors hover:text-hero-fg"
          >
            Read the patent record
          </a>
        </div>
      </SiteContainer>
    </section>
  )
}
