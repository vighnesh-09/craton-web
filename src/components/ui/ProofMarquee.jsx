'use client'

import SiteContainer from '@/components/layout/SiteContainer'
import { proof } from '@/content/home'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

const facts = proof.facts

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
    <div className={cn('border-t border-line-on-dark bg-craton', className)}>
      <SiteContainer className="px-6 pb-1.5 pt-3 text-center sm:px-8 sm:pt-4">
        <p className="font-serif text-[15px] italic tracking-[-0.01em] text-hero-soft/80 sm:text-[16px]">
          {proof.line}
        </p>
      </SiteContainer>

      <div className="relative pb-3 pt-1.5 sm:pb-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-craton via-craton/80 to-transparent sm:w-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-craton via-craton/80 to-transparent sm:w-20"
        />

        {reduced ? (
          <SiteContainer className="px-6 sm:px-8">
            <p className="text-center font-body text-[13px] leading-relaxed text-hero-muted">
              {facts.join('  ·  ')}
            </p>
          </SiteContainer>
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
