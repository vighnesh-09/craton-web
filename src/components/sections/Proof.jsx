import { useEffect, useRef, useState } from 'react'
import { site } from '@/config/site'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

function PatentCount() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [pair, setPair] = useState(reduced ? [3, 9] : [0, 0])

  useEffect(() => {
    if (reduced) {
      setPair([3, 9])
      return undefined
    }
    const node = ref.current
    if (!node) return undefined
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / 700)
          const eased = 1 - (1 - t) ** 3
          setPair([Math.round(3 * eased), Math.round(9 * eased)])
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  return (
    <p ref={ref} className="type-stat mt-2 break-words">
      {pair[0]} · {pair[1]}
    </p>
  )
}

export default function Proof() {
  return (
    <section className="border-y border-current/15 bg-ink text-cream" aria-label="Proof">
      <ul className="shell grid sm:grid-cols-2 lg:grid-cols-4">
        {site.proof.map((item, index) => (
          <li
            key={item.label}
            className="min-w-0 border-b border-current/15 py-6 sm:py-8 lg:border-r lg:border-b-0 lg:px-5 lg:py-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
          >
            <p className="type-label">
              {String(index + 1).padStart(2, '0')}
            </p>
            {item.value === '3 · 9' ? (
              <PatentCount />
            ) : (
              <p className="type-stat mt-2 break-words">{item.value}</p>
            )}
            <p className="type-body mt-2 max-w-[22ch] text-muted-ink">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
