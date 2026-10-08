import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ShieldCheck, Eye, Scale } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import Glass from '@/components/ui/Glass'
import Section from '@/components/ui/Section'

const items = [
  {
    icon: Eye,
    title: 'Human-in-the-loop',
    body: 'Expert review and visible exceptions stay central. Our products support judgment — they do not replace it.',
  },
  {
    icon: Scale,
    title: 'Evidence you can audit',
    body: 'Outputs are tied to rules and source evidence so regulatory teams can challenge, revise, and own the work.',
  },
  {
    icon: ShieldCheck,
    title: 'Data handling with care',
    body: 'Technical files and review evidence are trust-critical. We design for least privilege, clear retention, and enterprise evaluation pathways.',
  },
]

export default function Trust() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.55],
  )

  if (reduced) {
    return (
      <Section id="trust" tone="dark">
        <Reveal
          as="h2"
          className="max-w-[18ch] text-[clamp(2rem,3.6vw,3.4rem)] font-normal tracking-[-0.04em]"
        >
          Built for work where{' '}
          <span className="serif text-accent">trust is non-negotiable.</span>
        </Reveal>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.title}>
              <Glass className="h-full p-6">
                <item.icon className="mb-4 text-accent" size={22} strokeWidth={1.6} />
                <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-cream/65">
                  {item.body}
                </p>
              </Glass>
            </li>
          ))}
        </ul>
      </Section>
    )
  }

  return (
    <section
      ref={ref}
      id="trust"
      className="relative overflow-hidden pad-x py-[var(--section-y)]"
      aria-label="Trust"
    >
      <motion.div style={{ opacity }} className="shell">
        <h2 className="max-w-[18ch] text-[clamp(2rem,3.6vw,3.4rem)] font-normal tracking-[-0.04em]">
          Built for work where{' '}
          <span className="serif text-accent">trust is non-negotiable.</span>
        </h2>

        <motion.ul
          style={{ x }}
          className="mt-7 flex w-max gap-4 will-change-transform md:gap-5"
        >
          {[...items, ...items].map((item, i) => (
            <li
              key={`${item.title}-${i}`}
              className="w-[min(320px,78vw)] shrink-0 md:w-[360px]"
            >
              <Glass className="h-full p-6 sm:p-7">
                <item.icon
                  className="mb-4 text-accent"
                  size={22}
                  strokeWidth={1.6}
                />
                <h3 className="text-lg font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-cream/65">
                  {item.body}
                </p>
              </Glass>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
