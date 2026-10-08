'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLenis } from '@/components/providers/LenisProvider'
import { cn } from '@/lib/cn'
import { scrollToId } from '@/lib/scroll'

/** Show once the reader is past the hero — about half a screen, or 400px. */
function scrolledPastHero() {
  const y = window.scrollY || document.documentElement.scrollTop || 0
  return y > window.innerHeight * 0.45 || y > 400
}

export default function BackToTop() {
  const lenis = useLenis()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      setVisible(scrolledPastHero())
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('scroll', onScroll, { capture: true })
    }
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? 0 : -1}
      onClick={() => scrollToId('#top', lenis)}
      className={cn(
        'fixed right-5 bottom-6 z-40 grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-hero-cta text-craton',
        'shadow-[0_8px_18px_-8px_color-mix(in_srgb,var(--craton)_36%,transparent)]',
        'motion-safe:transition-[opacity,transform,background-color,box-shadow] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:-translate-y-0.5 hover:bg-hero-soft hover:shadow-[0_12px_22px_-8px_color-mix(in_srgb,var(--craton)_44%,transparent)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <ArrowUp size={16} strokeWidth={2} aria-hidden />
    </button>
  )
}
