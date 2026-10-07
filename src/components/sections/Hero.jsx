import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import ParticleSculpture from '@/components/craton/ParticleSculpture'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'

/** Single soft precision frame — cinematic, not a HUD stack. */
const FRAME_INSET = '12%'

/**
 * Hero stays cinematic dark regardless of site light/dark toggle.
 * Site theme still drives header + rest of page elsewhere.
 */
export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 64])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.12])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section
      ref={ref}
      id="top"
      data-hero-mode="cinematic"
      className="relative flex min-h-[100svh] flex-col overflow-hidden text-[#eef8f4]"
    >
      {/* Full-bleed foundation — always dark/forest grade (no mint-white wash) */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={reduced ? undefined : { scale: mediaScale, y: mediaY }}
      >
        <img
          src="/hero/foundation.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        {/* Crush photo whites (windows) into forest ink — hero never reads as a white wall */}
        <div className="absolute inset-0 bg-[#040c0a]/72" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,10,0.88)_0%,rgba(6,16,14,0.55)_36%,rgba(6,16,14,0.62)_58%,rgba(3,10,8,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,transparent_0%,rgba(3,10,8,0.55)_55%,rgba(2,8,6,0.85)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,12,10,0.55)_0%,transparent_28%,transparent_72%,rgba(4,12,10,0.4)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,143,123,0.16),transparent_38%,transparent_62%,rgba(224,154,95,0.07))] mix-blend-soft-light" />
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay" />
      </motion.div>

      {/* Particle morph — behind type; keep opacity modest so copy stays white */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <ParticleSculpture
          className="h-full w-full"
          canvasClassName="inset-[14%] opacity-[0.38] sm:inset-[15%]"
          showControls={false}
          heroScale
          themeMode="dark"
        />
      </div>

      {/* One precision frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute border border-[#eef8f4]/14"
          style={{
            inset: FRAME_INSET,
            boxShadow:
              '0 0 0 1px rgba(62,207,186,0.08), inset 0 0 48px rgba(6,16,14,0.35)',
          }}
        >
          <span className="absolute -left-px -top-px size-2 border-l border-t border-[#3ecfba]/70" />
          <span className="absolute -right-px -top-px size-2 border-r border-t border-[#3ecfba]/70" />
          <span className="absolute -bottom-px -left-px size-2 border-b border-l border-[#3ecfba]/70" />
          <span className="absolute -bottom-px -right-px size-2 border-b border-r border-[#3ecfba]/70" />
        </motion.div>
      </div>

      {/* Center copy — solid light type (no dark blur slab that turns letters black) */}
      <motion.div
        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-20 flex flex-1 flex-col items-center justify-center px-5 pb-20 pt-28 text-center isolate sm:px-8 sm:pb-24"
      >
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="serif text-[clamp(1.05rem,2.1vw,1.35rem)] !text-[#f4faf7] [text-shadow:0_1px_2px_rgba(0,0,0,0.65)]"
        >
          Bold ideas. Engineered forward.
        </motion.p>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.24 }}
          className="mt-4 max-w-[18ch] text-[clamp(2.15rem,7.4vw,5.5rem)] font-semibold uppercase leading-[0.94] tracking-[-0.04em] !text-[#f7fcf9] [text-shadow:0_1px_2px_rgba(0,0,0,0.75),0_0_1px_rgba(255,255,255,0.35)]"
        >
          Craton Technologies
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.38 }}
          className="mt-5 max-w-[36ch] text-[clamp(0.98rem,1.7vw,1.2rem)] font-medium leading-relaxed !text-[#f4faf7] [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]"
        >
          AI for EU MDR &amp; IVDR regulatory evidence.
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-2.5 max-w-[40ch] text-[13px] leading-relaxed !text-[#e5f4ee] [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] sm:text-[14px]"
        >
          Complex requirements. Clearer decisions. Human judgment.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="mt-8"
        >
          <Button
            href="#contact"
            className="!min-h-11 !rounded-sm !bg-[image:none] !bg-[#0f8f7b] !px-7 !text-[13px] !font-semibold !text-[#0a1412] !shadow-none hover:!translate-y-0 hover:!bg-[#3ecfba] hover:!brightness-105"
          >
            Request a pilot
            <ArrowUpRight size={15} strokeWidth={2.25} />
          </Button>
        </motion.div>
      </motion.div>

      {/* Quiet foot — scroll cue only */}
      <div
        className={cn(
          'relative z-10 pad-x flex items-end justify-between gap-4 border-t border-white/10 pb-5 pt-4 text-[11px] uppercase tracking-[0.12em] text-[#8ebdb0] sm:pb-7',
        )}
      >
        <span className="font-mono text-[10px] opacity-80 sm:text-[11px]">
          01 — The foundation
        </span>
        <a
          href="#proof"
          className="inline-flex items-center gap-2 normal-case tracking-[0.04em] text-[#eef8f4]/75 transition hover:text-[#eef8f4]"
        >
          <ArrowDown size={14} className="opacity-70" />
          <span className="hidden sm:inline">From complexity to clarity</span>
          <span className="sm:hidden">Scroll</span>
        </a>
        <span className="w-[7.5rem] sm:w-[9rem]" aria-hidden />
      </div>
    </section>
  )
}
