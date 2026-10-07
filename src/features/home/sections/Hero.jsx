import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { env } from '@/config/env'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_20%_0%,#d4ebe4_0%,transparent_50%),radial-gradient(ellipse_at_90%_20%,#fde8d0_0%,transparent_40%),linear-gradient(180deg,#f4faf7_0%,#e8f0ed_100%)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          animate={{ y: [0, -18, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-20 top-24 h-[420px] w-[420px] rounded-full bg-lagoon/10 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 22, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-16 bottom-10 h-[360px] w-[360px] rounded-full bg-sun/15 blur-3xl"
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-16 pt-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-lagoon"
        >
          {env.appName}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl"
        >
          Interfaces that feel as clear as they look.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65"
        >
          A React + Tailwind playground built for smooth motion, thoughtful
          hierarchy, and inline utility styling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-lagoon px-6 py-3.5 text-sm font-semibold text-foam transition-all duration-300 hover:bg-lagoon-deep hover:shadow-xl hover:shadow-lagoon/30"
          >
            Explore the work
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#approach"
            className="rounded-full border border-ink/15 bg-white/50 px-6 py-3.5 text-sm font-semibold text-ink backdrop-blur-sm transition-all duration-300 hover:border-ink/30 hover:bg-white"
          >
            See the approach
          </a>
        </motion.div>
      </div>
    </section>
  )
}
