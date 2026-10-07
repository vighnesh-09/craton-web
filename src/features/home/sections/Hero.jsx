import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SignalFlowBackground from '@/components/effects/SignalFlowBackground'
import ProofMarquee from '@/components/ui/ProofMarquee'
import { env } from '@/config/env'
import { site } from '@/config/site'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden bg-craton text-hero-fg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-base"
      />

      <SignalFlowBackground className="z-[1]" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at 40% 45%, var(--hero-veil) 0%, var(--hero-veil-mid) 55%, var(--hero-veil-edge) 100%)',
        }}
      />

      <div className="relative z-[3] mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-8 pt-28 sm:px-8 lg:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mb-6 flex items-center gap-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-hero-muted"
        >
          <span aria-hidden className="inline-block h-px w-7 bg-copper" />
          {env.appName}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease }}
          className="max-w-[11ch] font-display text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-hero-fg"
        >
          Bold ideas.
          <span className="mt-1 block font-serif text-[1.06em] font-normal italic tracking-[-0.03em] text-hero-soft">
            Engineered forward.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease }}
          className="mt-7 max-w-[34ch] font-body text-[15px] leading-[1.75] text-hero-body sm:text-[16px]"
        >
          We invent, protect, and ship AI-enabled products for trust-critical
          work — from a stable core, across many domains.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42, ease }}
          className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
        >
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
        </motion.div>

        <span className="sr-only">{site.name}</span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="relative z-[3] mt-auto"
      >
        <ProofMarquee />
      </motion.div>
    </section>
  )
}
