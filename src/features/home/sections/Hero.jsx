import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SignalFlowBackground from '@/components/effects/SignalFlowBackground'
import { env } from '@/config/env'
import { site } from '@/config/site'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-svh overflow-hidden bg-craton text-[#f8f6ee]"
    >
      {/* V7-style charcoal base */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#1c1c1c]"
      />

      {/* Exact V7 ParticleFunnel (Three.js) */}
      <SignalFlowBackground className="z-[1]" />

      {/* Soft readability veil — keep funnel visible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_40%_45%,rgba(28,28,28,0.4)_0%,rgba(28,28,28,0.08)_55%,rgba(28,28,28,0.25)_100%)]"
      />

      <div className="relative z-[3] mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pb-16 pt-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center gap-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#ced0c5]"
        >
          <span aria-hidden className="inline-block h-px w-7 bg-copper" />
          {env.appName}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#f8f6ee] sm:text-6xl md:text-7xl"
        >
          Bold ideas.
          <span className="mt-1 block font-serif text-[1.05em] font-normal italic tracking-[-0.03em] text-[#e6e5d9]">
            Engineered forward.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-md text-[15px] leading-[1.8] text-[#c3c6ba]"
        >
          We invent, protect, and ship AI-enabled products for trust-critical
          work — from a stable core, across many domains.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#f0eee7] px-6 text-[12.5px] font-medium text-craton transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
          >
            Explore products
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="/#contact"
            className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 text-[12.5px] font-medium text-[#f0eee7] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/5"
          >
            Get in touch
          </a>
        </motion.div>

        <span className="sr-only">{site.name}</span>
      </div>
    </section>
  )
}
