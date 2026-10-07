'use client'

import SiteContainer from '@/components/layout/SiteContainer'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

/** Short, scannable facts for a single-line ticker */
const facts = Object.freeze([
  '22+ years shipping enterprise systems',
  '3 US patents granted · 9 pending',
  'ReviewsIntel — patent pending, June 2026',
  'RAccelerator — first enterprise evaluation, Sept 2026',
  'Frisco, Texas · founder-funded',
])

function Fact({ text }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-8 px-4 sm:gap-10 sm:px-5">
      <span className="font-body text-[13px] font-medium tracking-[-0.01em] text-hero-fg/90 sm:text-[14px]">
        {text}
      </span>
      <span
        aria-hidden
        className="size-[3px] shrink-0 rounded-full bg-copper/70"
      />
    </span>
  )
}

/**
 * V7-inspired proof band: quiet caption + one elegant scrolling line.
 */
export default function ProofMarquee({ className }) {
  const reduced = usePrefersReducedMotion()
  const track = [...facts, ...facts]

  return (
    <div className={cn(className)}>
      <SiteContainer className="px-6 pb-3 pt-8 text-center sm:px-8">
        <p className="font-serif text-[15px] italic tracking-[-0.01em] text-hero-soft/80 sm:text-[16px]">
          Building the evidence layer for regulated work.
        </p>
      </SiteContainer>

      <div className="relative pb-7 pt-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-craton via-craton/80 to-transparent sm:w-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-craton via-craton/80 to-transparent sm:w-20"
        />

        {reduced ? (
          <p className="mx-auto max-w-4xl px-6 text-center font-body text-[13px] leading-relaxed text-hero-muted">
            {facts.join('  ·  ')}
          </p>
        ) : (
          <div className="group overflow-hidden">
            <div
              className="proof-marquee flex w-max items-center group-hover:[animation-play-state:paused]"
              aria-label={facts.join('. ')}
            >
              {track.map((text, i) => (
                <Fact key={`${text}-${i}`} text={text} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
