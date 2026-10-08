'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import SiteContainer from '@/components/layout/SiteContainer'
import { pilot } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'
import { useSiteLink } from '@/hooks/useSiteLink'

/**
 * Scrubbed step fall from Approach.jsx (5404196 / 9df261f):
 * each box translates down by a smaller share of its height as the
 * section scrolls, so the row settles into an ascending diagonal.
 */
const FALL_Y = ['56%', '38%', '20%', '4%']

function useWideStagger() {
  const [wide, setWide] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)')
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return wide
}

export default function Pilot() {
  const reduced = usePrefersReducedMotion()
  const wide = useWideStagger()
  const follow = useSiteLink()
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const animate = wide && !reduced
  const [dropRoom, setDropRoom] = useState(0)

  useEffect(() => {
    if (!animate) {
      setDropRoom(0)
      return
    }
    const grid = gridRef.current
    if (!grid) return
    const measure = () => {
      const card = grid.querySelector('li')
      if (!card) return
      setDropRoom(card.offsetHeight * (parseFloat(FALL_Y[0]) / 100))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    return () => observer.disconnect()
  }, [animate])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  })

  const y0 = useTransform(scrollYProgress, [0.05, 0.7], ['0%', FALL_Y[0]])
  const y1 = useTransform(scrollYProgress, [0.05, 0.7], ['0%', FALL_Y[1]])
  const y2 = useTransform(scrollYProgress, [0.05, 0.7], ['0%', FALL_Y[2]])
  const y3 = useTransform(scrollYProgress, [0.05, 0.7], ['0%', FALL_Y[3]])
  const ys = [y0, y1, y2, y3]

  return (
    <section
      ref={sectionRef}
      id={pilot.id}
      aria-labelledby="h-pilot"
      className="bg-foam px-6 py-24 sm:px-8 md:py-32"
    >
      <SiteContainer>
        <SectionHeading
          layout="split-aside"
          num={pilot.eyebrow.num}
          label={pilot.eyebrow.label}
          title={pilot.title}
          titleAccent={pilot.titleAccent}
          aside={pilot.lead}
          headingId="h-pilot"
        />

        <ol
          ref={gridRef}
          style={dropRoom ? { paddingBottom: dropRoom } : undefined}
          className="mt-14 grid gap-3 sm:mt-20 md:grid-cols-2 xl:grid-cols-4"
        >
          {pilot.steps.map((step, index) => (
            <motion.li
              key={step.num}
              style={animate ? { y: ys[index] } : undefined}
              className="rounded-2xl border border-line bg-foam px-5 py-6"
            >
              <p className="font-mono text-[11px] tracking-[0.14em] text-ink/40">
                {step.num}
              </p>
              <h3 className="mt-4 font-display text-[1.25rem] font-semibold tracking-[-0.03em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-[14px] leading-[1.65] text-ink/60">
                {step.copy}
              </p>
            </motion.li>
          ))}
        </ol>

        <a
          href="#contact"
          onClick={follow('#contact')}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-lagoon px-5 py-2.5 font-body text-[13.5px] font-semibold text-craton transition-colors hover:bg-lagoon-deep"
        >
          {pilot.cta}
          <ArrowUpRight size={15} strokeWidth={2.25} />
        </a>
      </SiteContainer>
    </section>
  )
}
