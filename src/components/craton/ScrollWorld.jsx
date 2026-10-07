import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Quiet scroll-linked atmosphere behind the page.
 * Soft enough not to compete with section content (Cohere-calm, not HUD noise).
 */
export default function ScrollWorld() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const yFar = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -180])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8])
  const blobY = useTransform(scrollYProgress, [0, 1], ['8%', '62%'])
  const fade = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0.35, 0.7, 0.55, 0.4])

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 28% 0%, var(--scene-a), var(--ink) 58%)',
        }}
      />
    )
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background:
            'radial-gradient(ellipse at 12% -8%, var(--scene-a), transparent 42%), radial-gradient(ellipse at 88% 8%, var(--scene-b), transparent 38%), radial-gradient(ellipse at 50% 95%, var(--scene-c), transparent 42%), var(--ink)',
        }}
      />

      <motion.div
        style={{ top: blobY, opacity: fade }}
        className="absolute left-[8%] h-[38vmax] w-[38vmax] -translate-y-1/2 rounded-full blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, var(--scroll-glow, var(--scene-a)), transparent 70%)',
          }}
        />
      </motion.div>

      <motion.div
        style={{
          opacity: fade,
          y: yMid,
          rotate: 'var(--scroll-shift, 0deg)',
        }}
        className="absolute right-[4%] top-[18%] h-[32vmax] w-[32vmax] rounded-full blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, var(--scroll-ember, var(--scene-b)), transparent 68%)',
          }}
        />
      </motion.div>

      <div
        className="absolute inset-0 flex items-center justify-center opacity-40"
        style={{ perspective: '1400px' }}
      >
        <motion.div
          style={{ rotate, transformStyle: 'preserve-3d' }}
          className="relative h-[56vmin] w-[56vmin]"
        >
          <motion.div
            style={{ y: yFar, transform: 'translateZ(-160px)' }}
            className="absolute inset-[14%] rounded-[2rem] border border-[var(--glass-border)] bg-[var(--glass-bg)] opacity-40"
          />
          <motion.div
            style={{ y: yMid, transform: 'translateZ(-40px)' }}
            className="absolute inset-[26%] rounded-[1.4rem] border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] opacity-50 backdrop-blur-sm"
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 noise opacity-[0.025]" />
    </div>
  )
}
