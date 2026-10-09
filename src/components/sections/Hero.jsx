import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import SignalField from '@/components/craton/SignalField'
import { cn } from '@/lib/cn'

/**
 * Hero stays cinematic dark regardless of site light/dark toggle.
 * Site theme still drives header + rest of page elsewhere.
 */
export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [showField, setShowField] = useState(false)
  const [desktopField, setDesktopField] = useState(false)

  useEffect(() => {
    const boot = document.getElementById('boot-hero')
    const dropBoot = () => {
      requestAnimationFrame(() => boot?.remove())
    }
    const links = [...document.querySelectorAll('link[data-deferred-css]')]
    if (!boot) return undefined
    if (!links.length) {
      dropBoot()
      return undefined
    }
    let pending = links.length
    const ready = () => {
      pending -= 1
      if (pending <= 0) dropBoot()
    }
    links.forEach((link) => {
      const finish = () => {
        if (link.media !== 'all') link.media = 'all'
        ready()
      }
      const finishNext = () => {
        requestAnimationFrame(() => finish())
      }
      if (link.sheet) finishNext()
      else {
        link.addEventListener('load', finishNext, { once: true })
        link.addEventListener('error', finishNext, { once: true })
      }
    })
    const backup = window.setTimeout(dropBoot, 2000)
    return () => window.clearTimeout(backup)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const apply = () => setDesktopField(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (reduced) {
      setShowField(true)
      return undefined
    }
    const start = () => setShowField(true)
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(start, 400)
    return () => window.clearTimeout(id)
  }, [reduced])

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
      className="relative flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-[#0E1A24] text-[#eef8f4]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={reduced ? undefined : { scale: mediaScale, y: mediaY }}
      >
        {desktopField && showField && !reduced ? (
          <SignalField active />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,#163044_0%,#0E1A24_58%,#070e14_100%)]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_46%,rgba(14,26,36,0.42)_0%,rgba(14,26,36,0.08)_48%,transparent_72%)]" />
      </motion.div>

      {/* Center copy — solid light type (no dark blur slab that turns letters black) */}
      <motion.div
        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-32 text-center isolate sm:px-10 sm:pb-28"
      >
        <motion.p
          initial={false}
          className="serif text-[clamp(1.05rem,2.1vw,1.35rem)] !text-[#e8eef5] [text-shadow:0_1px_2px_rgba(0,0,0,0.65)]"
        >
          Bold ideas. Engineered forward.
        </motion.p>

        <motion.h1
          initial={false}
          className="mt-7 min-h-[0.94em] max-w-[18ch] text-[clamp(2.15rem,7.4vw,5.75rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] !text-[#f4f7fb] [text-shadow:0_1px_2px_rgba(0,0,0,0.75),0_0_1px_rgba(255,255,255,0.35)] min-[1024px]:max-w-none min-[1024px]:whitespace-nowrap min-[1024px]:text-[clamp(2.85rem,6.6vw,6.25rem)]"
        >
          Craton Technologies
        </motion.h1>

        <motion.p
          initial={false}
          className="mt-8 max-w-[38ch] text-[clamp(0.98rem,1.7vw,1.2rem)] font-medium leading-relaxed !text-[#e8eef5] [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]"
        >
          AI for EU MDR and IVDR technical documentation and GSPR gap assessment.
        </motion.p>

        <motion.p
          initial={false}
          className="mt-4 max-w-[40ch] text-[13px] leading-relaxed !text-[#c9d8e8] [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] sm:text-[14px]"
        >
          Complex requirements. Clearer decisions. Human judgment.
        </motion.p>

        <motion.div initial={false} className="mt-10">
          <Button
            href="#contact"
            className="!min-h-12 !rounded-sm !bg-[image:none] !bg-[#00A8C4] !px-7 !text-[13px] !font-semibold !text-[#1E2A3A] !shadow-none hover:!translate-y-0 hover:!bg-[#007A96] hover:!text-[#102033] hover:!brightness-105"
          >
            Request a pilot
            <ArrowUpRight size={15} strokeWidth={2.25} />
          </Button>
        </motion.div>
      </motion.div>

      {/* Quiet foot — scroll cue only */}
      <div
        className={cn(
          'relative z-10 pad-x flex items-end justify-between gap-4 border-t border-white/10 pb-5 pt-4 text-[11px] uppercase tracking-[0.12em] text-[#8aa0b8] sm:pb-7',
        )}
      >
        <span className="font-mono text-[12px] text-[#d5e0ea]">
          01 — The foundation
        </span>
        <a
          href="#proof"
          className="inline-flex min-h-6 items-center gap-2 normal-case tracking-[0.04em] text-[#e8eef5] transition hover:text-white"
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
