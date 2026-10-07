import { motion } from 'framer-motion'

export default function Studio() {
  return (
    <section
      id="studio"
      className="relative overflow-hidden bg-ink px-6 py-24 text-foam md:py-32"
    >
      <motion.div
        aria-hidden
        animate={{ rotate: [0, 8, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-lagoon/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            A studio mindset for product UI
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-foam/65 md:text-lg">
            Start from clarity — one idea per section, generous space, and
            motion that supports reading rather than competing with it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5 border-l border-foam/15 pl-8"
        >
          {[
            'Typography sets the tone before color does',
            'Atmosphere comes from layered gradients, not flat fills',
            'Interactions feel soft, quick, and intentional',
          ].map((line) => (
            <p
              key={line}
              className="text-sm leading-relaxed text-foam/75 md:text-base"
            >
              {line}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
