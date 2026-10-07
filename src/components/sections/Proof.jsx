import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import Glass from '@/components/ui/Glass'
import { site } from '@/config/site'

export default function Proof() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [48, -48])
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.96, 1, 0.99])

  return (
    <section
      ref={ref}
      id="proof"
      aria-label="Proof"
      className="pad-x relative z-10 py-6 sm:py-8"
    >
      <motion.div style={reduced ? undefined : { y, scale }}>
        <Glass className="shell px-5 py-6 sm:px-7 sm:py-8" glow>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <p className="mono-label text-accent">Proof, once</p>
              <h2 className="mt-3 max-w-[18ch] text-[clamp(1.6rem,3vw,2.4rem)] font-normal tracking-[-0.03em]">
                Signal that survives a diligence call.
              </h2>
            </Reveal>
            <Reveal
              delay={0.08}
              className="max-w-[32ch] text-[13px] leading-relaxed text-muted"
            >
              Patents, enterprise evaluation timing, and founder track record —
              shown once, loud enough to trust.
            </Reveal>
          </div>

          <ul className="grid gap-6 border-t border-line pt-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {site.proof.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.07} as="li">
                <p className="text-[clamp(1.65rem,2.5vw,2.15rem)] font-medium tracking-tight text-cream">
                  {item.value}
                </p>
                <p className="mt-2 text-[13px] leading-snug text-muted">
                  {item.label}
                </p>
              </Reveal>
            ))}
          </ul>
        </Glass>
      </motion.div>
    </section>
  )
}
