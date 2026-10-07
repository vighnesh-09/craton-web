import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const CHAPTERS = [
  { id: 'top', label: 'Hero' },
  { id: 'proof', label: 'Proof' },
  { id: 'wipe', label: 'Wipe' },
  { id: 'domain', label: 'Domain' },
  { id: 'film', label: 'Film' },
  { id: 'products', label: 'Products' },
  { id: 'mindset', label: 'Mindset' },
  { id: 'approach', label: 'Method' },
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
    if (!nodes.length) return undefined

    const onScroll = () => {
      const mid = window.innerHeight * 0.38
      let best = nodes[0]
      let bestDist = Infinity
      for (const n of nodes) {
        const r = n.getBoundingClientRect()
        const center = r.top + Math.min(r.height, window.innerHeight) * 0.2
        const dist = Math.abs(center - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = n
        }
      }
      if (best?.id) setActive(best.id)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
          className={cn(
            'pointer-events-auto block size-2 rounded-full border transition-all duration-300',
            active === c.id
              ? 'scale-125 border-accent bg-accent shadow-[0_0_12px_var(--glow)]'
              : 'border-[color:var(--cream)]/30 bg-transparent hover:border-accent/60',
          )}
        />
      ))}
    </nav>
  )
}
