import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { site } from '@/config/site'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 48])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 28])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden text-[#eef8f4]"
    >
      {/* Full-bleed foundation */}
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={reduced ? undefined : { y: mediaY }}
      >
        <img
          src="/hero/foundation.jpg"
          alt=""
          className="h-full w-full scale-[1.02] object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[#07110f]/50" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,15,0.78)_0%,rgba(7,17,15,0.42)_42%,rgba(7,17,15,0.55)_68%,rgba(7,17,15,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_0%,rgba(7,17,15,0.62)_100%)]" />
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />
      </motion.div>

      {/* Quiet edge frame — one composition, not stacked chrome */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-4 border border-white/[0.08] sm:inset-6 lg:inset-8"
      >
        <span className="absolute left-0 top-0 h-8 w-px bg-[#3ecfba]/70" />
        <span className="absolute left-0 top-0 h-px w-8 bg-[#3ecfba]/70" />
        <span className="absolute right-0 top-0 h-8 w-px bg-[#3ecfba]/70" />
        <span className="absolute right-0 top-0 h-px w-8 bg-[#3ecfba]/70" />
        <span className="absolute bottom-0 left-0 h-8 w-px bg-[#3ecfba]/55" />
        <span className="absolute bottom-0 left-0 h-px w-8 bg-[#3ecfba]/55" />
        <span className="absolute bottom-0 right-0 h-8 w-px bg-[#3ecfba]/55" />
        <span className="absolute bottom-0 right-0 h-px w-8 bg-[#3ecfba]/55" />
      </div> */}

      {/* Center composition */}
      <motion.div
        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-[920px] flex-1 flex-col items-center justify-center px-6 pb-10 pt-32 text-center sm:px-10"
      >
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mono-label text-[#8ebdb0]"
        >
          Frisco, Texas · Evidence-led products
        </motion.p>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="mt-5 text-[clamp(2.75rem,9vw,6.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-[#eef8f4]"
        >
          Craton
          <span className="block text-[0.38em] font-medium tracking-[0.18em] text-[#eef8f4]/72">
            Technologies
          </span>
        </motion.h1>

        <motion.div
          aria-hidden
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="mt-7 h-px w-16 origin-center bg-[#3ecfba]/80"
        />

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease }}
          className="mt-7 max-w-[34ch] text-[clamp(1.05rem,2.1vw,1.35rem)] font-medium leading-snug tracking-[-0.02em] text-[#eef8f4]"
        >
          AI for EU MDR &amp; IVDR regulatory evidence.
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease }}
          className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-[#c5ddd4]/78 sm:text-[16px]"
        >
          Complex requirements. Clearer decisions. Human judgment in the loop.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.74, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#eef8f4] px-7 text-[13px] font-semibold text-[#0a1412] shadow-[0_16px_40px_-18px_rgba(0,0,0,0.65)] transition hover:bg-white"
          >
            Request a pilot
            <ArrowUpRight size={15} strokeWidth={2.25} />
          </a>
          <a
            href="#domain"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-white/25 bg-white/[0.04] px-6 text-[13px] font-medium text-[#eef8f4]/90 transition hover:border-white/40 hover:bg-white/[0.08]"
          >
            Explore the work
          </a>
        </motion.div>
      </motion.div>

      {/* Hero foot */}
      <div className="relative z-10 pad-x grid grid-cols-1 items-center gap-4 border-t border-white/[0.08] py-5 text-[11px] tracking-[0.14em] text-[#8ebdb0] uppercase sm:grid-cols-[1fr_auto_1fr] sm:py-6">
        <span className="hidden justify-self-start font-mono sm:block">
          01 — Foundation
        </span>
        <a
          href="#proof"
          className="inline-flex items-center justify-center gap-2 justify-self-center normal-case tracking-[0.02em] text-[#eef8f4]/70 transition hover:text-[#eef8f4]"
        >
          <ArrowDown size={14} className="opacity-70" />
          From complexity to clarity
        </a>
        <span className="hidden justify-self-end font-mono text-[10px] opacity-70 sm:block">
          {site.location}
        </span>
      </div>
    </section>
  )
}
