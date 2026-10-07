import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { site } from '@/config/site'

const FRAMES = [
  { inset: '6%', delay: 0 },
  { inset: '12%', delay: 0.08 },
  { inset: '18%', delay: 0.16 },
  { inset: '24%', delay: 0.24 },
  { inset: '30%', delay: 0.32 },
]

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 56])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 32])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden text-[#eef8f4]"
    >
      {/* Full-bleed foundation plane */}
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={reduced ? undefined : { y: mediaY }}
      >
        <img
          src="/hero/foundation.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[#0a1412]/55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,20,18,0.72)_0%,rgba(10,20,18,0.35)_38%,rgba(10,20,18,0.45)_62%,rgba(10,20,18,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,20,18,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,143,123,0.18),transparent_35%,transparent_65%,rgba(224,154,95,0.10))] mix-blend-soft-light" />
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay" />
      </motion.div>

      {/* Precision frames — depth tunnel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ perspective: '1400px' }}
      >
        {FRAMES.map((frame, i) => (
          <motion.div
            key={frame.inset}
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 0.35 + i * 0.08, scale: 1 }}
            transition={{
              duration: 1.1,
              delay: frame.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute border border-white/25"
            style={{
              inset: frame.inset,
              borderRadius: i === FRAMES.length - 1 ? '2px' : '0',
              boxShadow:
                i === FRAMES.length - 1
                  ? '0 0 0 1px rgba(62,207,186,0.12), inset 0 0 60px rgba(10,20,18,0.15)'
                  : undefined,
            }}
          >
            {/* Corner ticks */}
            <span className="absolute -left-px -top-px size-2.5 border-l border-t border-[#3ecfba]/70" />
            <span className="absolute -right-px -top-px size-2.5 border-r border-t border-[#3ecfba]/70" />
            <span className="absolute -bottom-px -left-px size-2.5 border-b border-l border-[#3ecfba]/70" />
            <span className="absolute -bottom-px -right-px size-2.5 border-b border-r border-[#3ecfba]/70" />
          </motion.div>
        ))}

        <div className="absolute inset-[30%] border border-[#3ecfba]/25 opacity-30" />
      </div>

      {/* Center composition */}
      <motion.div
        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-8 pt-28 text-center sm:px-8"
      >
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="serif text-[clamp(1rem,2vw,1.25rem)] text-[#eef8f4]/80"
        >
          Bold ideas. Engineered forward.
        </motion.p>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.28 }}
          className="mt-4 max-w-[18ch] text-[clamp(2.1rem,7.2vw,5.4rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-[#eef8f4]"
        >
          Craton Technologies
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.42 }}
          className="mt-5 max-w-[36ch] text-[clamp(0.95rem,1.6vw,1.15rem)] leading-relaxed text-[#eef8f4]/78"
        >
          AI for EU MDR &amp; IVDR regulatory evidence.
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-2 max-w-[40ch] text-[13px] leading-relaxed text-[#8ebdb0] sm:text-[14px]"
        >
          Complex requirements. Clearer decisions. Human judgment.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68 }}
          className="mt-8"
        >
          <Button
            href="#contact"
            className="!min-h-11 !rounded-sm !bg-[#eef8f4] !px-7 !text-[13px] !font-semibold !text-[#0a1412] !shadow-[0_12px_40px_-16px_rgba(0,0,0,0.55)] hover:!brightness-100 hover:!bg-white"
          >
            Request a pilot
            <ArrowUpRight size={15} strokeWidth={2.25} />
          </Button>
        </motion.div>
      </motion.div>

      {/* Hero foot */}
      <div className="relative z-10 pad-x grid grid-cols-[1fr_auto_1fr] items-end gap-3 pb-6 pt-2 text-[11px] tracking-[0.12em] text-[#8ebdb0] uppercase sm:pb-8">
        <span className="justify-self-start font-mono">01 — The foundation</span>
        <a
          href="#proof"
          className="inline-flex items-center gap-2 justify-self-center normal-case tracking-[0.04em] text-[#eef8f4]/75 transition hover:text-[#eef8f4]"
        >
          <ArrowDown size={14} className="opacity-70" />
          From complexity to clarity
        </a>
        <span className="justify-self-end font-mono text-[10px] opacity-70">
          {site.location}
        </span>
      </div>
    </section>
  )
}
