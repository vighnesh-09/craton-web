import { useEffect, useState } from 'react'
import Seo from '@/components/seo/Seo'
import About from '@/components/sections/About'
import Approach from '@/components/sections/Approach'
import Contact from '@/components/sections/Contact'
import FilmStrip from '@/components/sections/FilmStrip'
import Hero from '@/components/sections/Hero'
import Products from '@/components/sections/Products'
import Proof from '@/components/sections/Proof'
import StatementBand from '@/components/sections/StatementBand'
import Voices from '@/components/sections/Voices'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

const SEEN = 'craton-film'

function seenThisSession() {
  try {
    return sessionStorage.getItem(SEEN) === '1'
  } catch {
    return true
  }
}

function FilmOpen() {
  const reduced = usePrefersReducedMotion()
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !seenThisSession()
  })
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (!show || reduced) return undefined
    try {
      sessionStorage.setItem(SEEN, '1')
    } catch {
      /* private mode */
    }
    const start = performance.now()
    let frame = 0
    const step = (now) => {
      const next = Math.min(100, Math.round(((now - start) / 900) * 100))
      setPct(next)
      if (next < 100) frame = requestAnimationFrame(step)
      else window.setTimeout(() => setShow(false), 140)
    }
    frame = requestAnimationFrame(step)
    const cap = window.setTimeout(() => setShow(false), 1200)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(cap)
    }
  }, [show, reduced])

  if (!show || reduced) return null

  return (
    <div className="film-loader" aria-hidden="true">
      <p className="font-serif text-[clamp(4rem,12vw,9rem)] leading-none tracking-[-0.06em]">
        {String(pct).padStart(2, '0')}
      </p>
      <p className="pb-3 font-mono text-[12px] tracking-[0.18em] uppercase">Craton</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Seo />
      <FilmOpen />
      <Hero />
      <Proof />
      <FilmStrip />
      <StatementBand />
      <Products />
      <Approach />
      <About />
      <Voices />
      <Contact />
    </>
  )
}
