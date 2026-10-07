import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { env } from '@/config/env'

export default function Contact() {
  const mail = `mailto:${env.contactEmail}`

  return (
    <section id="contact" className="bg-foam px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end"
      >
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
            Ready to shape the next screen?
          </h2>
          <p className="mt-4 max-w-md text-ink/60">
            This project is a UI/UX base — swap content, extend sections, and
            keep styling inline with Tailwind.
          </p>
        </div>

        <a
          href={mail}
          className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-foam transition-all duration-300 hover:bg-ink hover:shadow-lg hover:shadow-ink/20"
        >
          {env.contactEmail}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </motion.div>
    </section>
  )
}
