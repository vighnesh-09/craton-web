import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Expand, Volume2, VolumeX, X } from 'lucide-react'
import { site } from '@/config/site'
import { easeOutExpo } from '@/lib/motion'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

const INITIAL = 3

/**
 * Rise-only entrance — opacity stays 1 so Lenis / hash jumps never hide copy.
 */
function VoiceReveal({ children, className, delay = 0, y = 18 }) {
  const reduced = usePrefersReducedMotion()
  if (reduced) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -4% 0px' }}
      transition={{
        duration: 0.55,
        delay: Math.min(delay, 0.16),
        ease: easeOutExpo,
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Market voices — Whyphy-style sticky card-stack wipe (CSS sticky + rising z),
 * Craton paper/navy/cyan tokens. Expand + load more preserved.
 */
export default function Voices() {
  const [visible, setVisible] = useState(INITIAL)
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState(false)
  const [liveId, setLiveId] = useState(site.voices[0]?.id ?? null)
  const titleId = useId()
  const reduced = usePrefersReducedMotion()
  const voices = site.voices
  const shown = voices.slice(0, visible)
  const hasMore = visible < voices.length

  useEffect(() => {
    if (!active) {
      setOpen(false)
      return undefined
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => setOpen(true))
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  function close() {
    setOpen(false)
    window.setTimeout(() => setActive(null), 220)
  }

  return (
    <section
      id="voices"
      className="relative border-y border-line bg-paper-2 text-cream"
      aria-label="Proof from the market"
    >
      <div className="relative z-0 pad-x">
        <div className="shell py-[clamp(2.5rem,4vw,4rem)]">
          <VoiceReveal>
            <p className="mono-label text-accent">Proof</p>
          </VoiceReveal>
          <VoiceReveal delay={0.06} y={22}>
            <h2 className="mt-3 max-w-[18ch] text-[clamp(2rem,4vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.04em]">
              Don’t just take our word for it.{' '}
              <span className="serif text-accent">Diligence rooms ask for this.</span>
            </h2>
          </VoiceReveal>
          <VoiceReveal delay={0.1}>
            <p className="mt-4 max-w-[48ch] text-[14px] leading-relaxed text-muted">
              Illustrative evaluation voices — not named customer endorsements.
              Swap logos, quotes, and media when partners consent.
            </p>
          </VoiceReveal>
        </div>
      </div>

      <ul className="list-none">
        {shown.map((v, i) => {
          const isLive = liveId === v.id
          return (
            <li
              key={v.id}
              className={
                reduced
                  ? 'relative border-t border-line bg-paper-2'
                  : `relative border-t border-line bg-paper-2 lg:sticky lg:top-[5.25rem] xl:top-[6.5rem]${
                      i < shown.length - 1 ? ' lg:mb-4' : ''
                    }`
              }
              style={reduced ? undefined : { zIndex: i + 1 }}
            >
              <div className="pad-x">
                <div className="shell flex flex-col gap-6 py-10 sm:gap-8 sm:py-14 lg:grid lg:grid-cols-[0.9fr_1.6fr_18rem] lg:items-start lg:gap-12">
                  <VoiceReveal delay={reduced ? 0 : 0.02} className="min-w-0">
                    <img
                      src={v.logo}
                      alt={v.logoAlt}
                      width={240}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="voice-logo h-10 w-auto max-w-[14rem] object-contain object-left sm:h-14"
                    />
                    <p className="mt-4 text-[clamp(1.25rem,1.05rem+0.7vw,1.65rem)] font-medium tracking-[-0.02em] text-cream sm:mt-6">
                      {v.name}
                    </p>
                    <p className="mono-label mt-2 text-muted">{v.role}</p>
                  </VoiceReveal>

                  <VoiceReveal delay={reduced ? 0 : 0.08} y={22} className="min-w-0">
                    <blockquote className="relative">
                      <span
                        aria-hidden
                        className="serif pointer-events-none absolute -top-6 left-0 select-none text-[5.5rem] leading-none text-accent/20 sm:-top-8 sm:text-[7.5rem]"
                      >
                        “
                      </span>
                      <p className="relative text-[clamp(1.05rem,0.95rem+0.55vw,1.55rem)] font-normal leading-[1.45] tracking-[-0.02em] text-cream">
                        {v.quote}
                      </p>
                    </blockquote>
                  </VoiceReveal>

                  <VoiceReveal delay={reduced ? 0 : 0.14}>
                    <VoiceMedia
                      voice={v}
                      isLive={isLive}
                      onToggleLive={() =>
                        setLiveId((id) => (id === v.id ? null : v.id))
                      }
                      onExpand={() => setActive(v)}
                    />
                  </VoiceReveal>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Opaque closer sits above sticky rows so the last card is wiped cleanly */}
      <div className="relative z-20 border-t border-line bg-paper-2">
        <div className="pad-x">
          <div className="shell flex flex-wrap items-center justify-between gap-4 py-8">
            {hasMore ? (
              <button
                type="button"
                onClick={() => setVisible((n) => Math.min(n + 3, voices.length))}
                className="text-[14px] font-medium tracking-tight text-cream underline decoration-line underline-offset-4 transition hover:text-accent hover:decoration-accent"
              >
                Load more
                <span className="ml-2 font-mono text-[12px] text-muted no-underline">
                  ({visible} of {voices.length})
                </span>
              </button>
            ) : (
              <p className="text-[12px] text-muted">
                Showing all {voices.length} illustrative voices.
              </p>
            )}
          </div>
        </div>
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`fixed inset-0 z-[200] grid place-items-center bg-black/55 p-4 backdrop-blur-md transition-opacity duration-300 ease-out sm:p-8 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={close}
        >
          <div
            className={`relative w-full max-w-[min(92vw,22rem)] transition duration-300 ease-out sm:max-w-[28rem] ${
              open
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-3 scale-[0.96] opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute -right-1 -top-12 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:-right-3"
            >
              <X size={18} />
            </button>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src={active.image}
                alt=""
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="mt-4 text-center">
              <p id={titleId} className="text-[1.05rem] font-medium text-white">
                {active.name}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">
                {active.role}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function VoiceMedia({ voice, isLive, onToggleLive, onExpand }) {
  const imgRef = useRef(null)
  const [inView, setInView] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = imgRef.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const ken = !reduced && isLive

  return (
    <div className="relative mx-auto w-[min(100%,16rem)] lg:mx-0 lg:w-full">
      <div
        ref={imgRef}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-[#1e2a3a] to-[#2a3548]"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(70% 60% at 50% 25%, ${voice.glow} 0%, transparent 60%)`,
          }}
        />
        <img
          src={voice.image}
          alt={voice.name}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className={`absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-[1400ms] ease-out ${
            inView || isLive
              ? ken
                ? 'scale-105 opacity-100 voice-ken'
                : 'scale-100 opacity-100'
              : 'scale-105 opacity-90'
          }`}
        />

        <button
          type="button"
          onClick={onToggleLive}
          aria-label={isLive ? 'Mute motion' : 'Tap for sound'}
          className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#1e2a3a]/75 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white backdrop-blur-md transition hover:bg-[#1e2a3a]"
        >
          {isLive ? <Volume2 size={12} /> : <VolumeX size={12} />}
          {isLive ? 'Live' : 'Tap for sound'}
        </button>

        <button
          type="button"
          onClick={onExpand}
          aria-label={`Expand ${voice.name}'s photo`}
          className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-[#1e2a3a]/75 text-white backdrop-blur-md transition-colors duration-300 hover:bg-[#1e2a3a] lg:right-4 lg:top-4 lg:h-9 lg:w-9"
        >
          <Expand size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
