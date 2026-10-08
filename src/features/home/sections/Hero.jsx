'use client'

import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ArrowRight } from 'lucide-react'
import HeroSculpture from '@/components/effects/HeroSculpture'
import SignalFlowBackground from '@/components/effects/SignalFlowBackground'
import SiteContainer from '@/components/layout/SiteContainer'
import ProofMarquee from '@/components/ui/ProofMarquee'
import { useLenis } from '@/components/providers/LenisProvider'
import { env } from '@/config/env'
import { scrollToId } from '@/lib/scroll'

/** Soft, premium ease — no bounce */
const ease = [0.22, 1, 0.36, 1]
const LINE_DURATION = 1.2
const STAGGER = 0.16

/**
 * One line at a time: clipped window + smooth rise.
 * Same treatment for every hero line so the sequence feels even.
 */
function RevealLine({
  children,
  delay = 0,
  className,
  reduced,
  as: Tag = 'div',
}) {
  if (reduced) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag className="block overflow-hidden py-[0.04em]">
      <motion.span
        className={`block will-change-transform ${className || ''}`}
        initial={{ y: '105%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{
          y: { duration: LINE_DURATION, delay, ease },
          opacity: { duration: LINE_DURATION * 0.75, delay, ease },
        }}
      >
        {children}
      </motion.span>
    </Tag>
  )
}

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const lenis = useLenis()

  const t = (i) => (reduced ? 0 : 0.08 + i * STAGGER)
  const go = (href) => (event) => {
    event.preventDefault()
    scrollToId(href, lenis)
  }

  return (
    <section
      id="top"
      className="relative flex h-svh min-h-svh flex-col overflow-hidden bg-craton text-hero-fg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-base"
      />

      {/* Below lg the sculpture is hidden, so the funnel runs behind the copy.
          At lg+ it stays masked to the left so the trunk misses the sculpture. */}
      <div
        aria-hidden
        className="hero-signal-mask pointer-events-none absolute inset-0 z-[1]"
      >
        <SignalFlowBackground />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at 40% 45%, var(--hero-veil) 0%, var(--hero-veil-mid) 55%, var(--hero-veil-edge) 100%)',
        }}
      />

      {/* v2 sculpture — right side, above funnel and the proof bar */}
      <HeroSculpture className="z-[3] right-[2%] top-6 bottom-24 w-[50%] lg:bottom-28" />

      <SiteContainer className="relative z-[4] flex min-h-0 flex-1 flex-col justify-center px-6 pb-4 pt-20 sm:px-8 sm:pt-28 lg:pb-6">
        <div className="w-full lg:max-w-[46%]">
          <div className="mb-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-hero-muted sm:mb-6">
            <RevealLine delay={t(0)} reduced={reduced}>
              <span className="inline-flex items-center gap-3">
                <span aria-hidden className="inline-block h-px w-7 bg-copper" />
                {env.appName}
              </span>
            </RevealLine>
          </div>

          <h1 className="max-w-[12ch] font-display text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-hero-fg">
            <RevealLine delay={t(1)} reduced={reduced}>
              Bold ideas.
            </RevealLine>
            <RevealLine
              delay={t(2)}
              reduced={reduced}
              className="font-serif text-[1.06em] font-normal italic tracking-[-0.03em] text-hero-soft"
            >
              Engineered forward.
            </RevealLine>
          </h1>

          <div className="mt-5 max-w-[36ch] font-body text-[15px] leading-[1.75] text-hero-body sm:mt-7 sm:text-[16px]">
            <RevealLine delay={t(3)} reduced={reduced}>
              We invent, protect, and ship AI-enabled products
            </RevealLine>
            <RevealLine delay={t(4)} reduced={reduced}>
              for trust-critical work — from a stable core,
            </RevealLine>
            <RevealLine delay={t(5)} reduced={reduced}>
              across many domains.
            </RevealLine>
          </div>

          <div className="mt-6 sm:mt-9">
            <RevealLine delay={t(6)} reduced={reduced}>
              <span className="inline-flex flex-wrap items-center gap-3 py-1 sm:gap-4">
                <a
                  href="#products"
                  onClick={go('#products')}
                  className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-hero-cta px-6 text-[13px] font-semibold text-craton transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
                >
                  Explore products
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="#contact"
                  onClick={go('#contact')}
                  className="inline-flex min-h-11 items-center rounded-full border border-line-on-dark px-5 text-[13px] font-medium text-hero-cta transition-all duration-200 hover:-translate-y-0.5 hover:border-hero-fg/35 hover:bg-hero-fg/[0.04]"
                >
                  Get in touch
                </a>
              </span>
            </RevealLine>
          </div>
        </div>

        <span className="sr-only">{env.appName}</span>
      </SiteContainer>

      <ProofMarquee className="relative z-[5] shrink-0" />
    </section>
  )
}
