'use client'

import { motion } from 'framer-motion'

const projects = [
  {
    name: 'Harbor',
    role: 'Product redesign',
    tone: 'from-lagoon/80 to-ink-soft',
  },
  {
    name: 'Atlas',
    role: 'Design system',
    tone: 'from-sun/70 to-coral/80',
  },
  {
    name: 'North',
    role: 'Marketing site',
    tone: 'from-ink-soft to-lagoon-deep',
  },
]

export default function Showcase() {
  return (
    <section id="work" className="bg-mist px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Selected work
            </h2>
            <p className="mt-3 max-w-md text-ink/60">
              Sample surfaces to extend with your own screens and flows.
            </p>
          </div>
          <a
            href="#contact"
            className="text-sm font-semibold text-lagoon transition-colors duration-300 hover:text-lagoon-deep"
          >
            Request the full deck →
          </a>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br ${project.tone}`}
              >
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 20%, var(--highlight), transparent 45%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 text-foam">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-foam/70">
                    {project.role}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold">
                    {project.name}
                  </h3>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
