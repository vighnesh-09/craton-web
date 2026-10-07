import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { env } from '@/config/env'
import GsprMock from '@/components/craton/GsprMock'
import Glass from '@/components/ui/Glass'
import { cn } from '@/lib/cn'

const HeroScene = lazy(() => import('@/components/craton/HeroScene'))

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}

function FallbackSurface() {
  return (
    <div className="flex h-full min-h-[320px] items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg opacity-90">
        <GsprMock className="!shadow-none" />
      </div>
    </div>
  )
}

function HeroVideo({ src, poster }) {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster || undefined}
    >
      <source
        src={src}
        type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
      />
    </video>
  )
}

export default function HeroVisual({ scrollProgress = 0, className }) {
  const rootRef = useRef(null)
  const scrollRef = useRef(0)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const reduced = usePrefersReducedMotion()
  const videoUrl = env.heroVideoUrl
  const posterUrl = env.heroPosterUrl

  scrollRef.current = scrollProgress

  useEffect(() => {
    const el = rootRef.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '120px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || reduced || videoUrl) return undefined
    const id = window.setTimeout(() => setReady(true), 80)
    return () => window.clearTimeout(id)
  }, [visible, reduced, videoUrl])

  return (
    <Glass
      ref={rootRef}
      glow
      strong
      className={cn(
        'relative aspect-[4/5] w-full overflow-hidden sm:aspect-square lg:aspect-[5/6]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-4">
        <span className="mono-label text-muted">Evidence continuum</span>
        <span className="rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[10px] text-accent">
          {videoUrl ? 'Motion reel' : '3D · scroll-linked'}
        </span>
      </div>

      {reduced ? (
        <FallbackSurface />
      ) : videoUrl && visible ? (
        <>
          <HeroVideo src={videoUrl} poster={posterUrl} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20" />
        </>
      ) : ready ? (
        <Suspense fallback={<FallbackSurface />}>
          <div className="absolute inset-0">
            <HeroScene scrollRef={scrollRef} />
          </div>
        </Suspense>
      ) : (
        <FallbackSurface />
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4">
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] px-3 py-2.5 backdrop-blur-xl">
          <p className="text-[12px] font-medium text-cream">
            Rule ↔ evidence ↔ judgment
          </p>
          <p className="mt-0.5 text-[11px] text-muted">
            Scroll to tilt the continuum · illustrative
          </p>
        </div>
      </div>
    </Glass>
  )
}
