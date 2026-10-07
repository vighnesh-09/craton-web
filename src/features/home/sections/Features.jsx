'use client'

import { motion } from 'framer-motion'
import { Layers, Sparkles, Zap } from 'lucide-react'
import SiteContainer from '@/components/layout/SiteContainer'

const features = [
  {
    icon: Sparkles,
    title: 'Motion with purpose',
    copy: 'Subtle entrances and hover cues guide attention without visual noise.',
  },
  {
    icon: Layers,
    title: 'Inline Tailwind',
    copy: 'Every style lives next to the markup so iteration stays fast and clear.',
  },
  {
    icon: Zap,
    title: 'Stable modern stack',
    copy: 'React 19, Vite 8, and Tailwind 4 — latest stable tools for UI work.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Features() {
  return (
    <section id="approach" className="bg-foam px-6 py-24 md:py-32">
      <SiteContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Built for calm, confident interfaces
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/60 md:text-lg">
            A focused foundation for UI/UX exploration — hierarchy, rhythm, and
            polish first.
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 grid gap-10 md:grid-cols-3"
        >
          {features.map(({ icon: Icon, title, copy }) => (
            <motion.li key={title} variants={item} className="group">
              <div className="mb-5 inline-flex rounded-2xl bg-mist p-3 text-lagoon transition-colors duration-300 group-hover:bg-lagoon group-hover:text-foam">
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60 md:text-base">
                {copy}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </SiteContainer>
    </section>
  )
}
