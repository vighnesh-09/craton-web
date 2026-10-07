'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroSculpture from '@/components/effects/HeroSculpture'
import SignalFlowBackground from '@/components/effects/SignalFlowBackground'
import SiteContainer from '@/components/layout/SiteContainer'
import { env } from '@/config/env'
import { site } from '@/config/site'

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
  const reduced = useReducedMotion()

  const t = (i) => (reduced ? 0 : 0.08 + i * STAGGER)

  return (
    <section
      id="top"
      className="relative flex h-svh min-h-svh flex-col overflow-hidden bg-craton text-hero-fg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-base"
      />

      {/* Funnel stays on the left; masked so the trunk doesn't cut through the sculpture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          WebkitMaskImage:
            'linear-gradient(90deg, #000 0%, #000 38%, rgba(0,0,0,0.45) 52%, transparent 68%)',
          maskImage:
            'linear-gradient(90deg, #000 0%, #000 38%, rgba(0,0,0,0.45) 52%, transparent 68%)',
        }}
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

      {/* v2 sculpture — right side, above funnel */}
      <HeroSculpture className="z-[3] right-[-4%] top-20 bottom-8 w-[62%]" />

      <SiteContainer className="relative z-[4] flex flex-1 flex-col justify-center px-6 pb-8 pt-28 sm:px-8 lg:pb-10">
        <div className="w-full max-w-xl lg:max-w-[46%]">
          <div className="mb-6 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-hero-muted">
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

          <div className="mt-7 max-w-[36ch] font-body text-[15px] leading-[1.75] text-hero-body sm:text-[16px]">
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

          <div className="mt-9">
            <RevealLine delay={t(6)} reduced={reduced}>
              <span className="inline-flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#work"
                  className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-hero-cta px-6 text-[13px] font-semibold text-craton transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
                >
                  Explore products
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="/#contact"
                  className="inline-flex min-h-11 items-center rounded-full border border-line-on-dark px-5 text-[13px] font-medium text-hero-cta transition-all duration-200 hover:-translate-y-0.5 hover:border-hero-fg/35 hover:bg-hero-fg/[0.04]"
                >
                  Get in touch
                </a>
              </span>
            </RevealLine>
          </div>
        </div>

        <span className="sr-only">{site.name}</span>
      </SiteContainer>
    </section>
  )
}
