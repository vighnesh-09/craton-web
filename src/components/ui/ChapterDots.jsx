import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const CHAPTERS = [
  { id: 'top', label: 'Hero' },
  { id: 'domain', label: 'Domain' },
  { id: 'products', label: 'Products' },
  { id: 'wipe', label: 'Wipe' },
  { id: 'film', label: 'Film' },
  { id: 'proof', label: 'Proof' },
  { id: 'voices', label: 'Voices' },
  { id: 'approach', label: 'Method' },
  { id: 'mindset', label: 'Mindset' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

/** Side chapter dots — scroll map without cluttering the hero. */
export default function ChapterDots() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const nodes = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      Boolean,
    )
    if (!nodes.length || !('IntersectionObserver' in window)) return undefined

    const visible = new Map()
    const pick = () => {
      let bestId = null
      let bestTop = Infinity
      for (const [id, top] of visible) {
        const dist = Math.abs(top)
        if (dist < bestTop) {
          bestTop = dist
          bestId = id
        }
      }
      if (bestId) setActive(bestId)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top)
          else visible.delete(entry.target.id)
        }
        pick()
      },
      { rootMargin: '-38% 0px -48% 0px', threshold: [0, 0.2, 0.5, 1] },
    )
    nodes.forEach((node) => io.observe(node))
    return () => io.disconnect()
  }, [])

  return (
    <nav
      aria-label="Page chapters"
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex xl:right-5"
    >
      {CHAPTERS.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          title={c.label}
          aria-label={c.label}
          aria-current={active === c.id ? 'true' : undefined}
          className="pointer-events-auto grid size-6 place-items-center"
        >
          <span
            className={cn(
              'block size-2 rounded-full border transition-all duration-300',
              active === c.id
                ? 'scale-125 border-accent bg-accent shadow-[0_0_12px_var(--glow)]'
                : 'border-[color:var(--cream)]/30 bg-transparent',
            )}
          />
        </a>
      ))}
    </nav>
  )
}
