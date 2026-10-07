import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/** Scroll-driven soft 3D stage — pastel orbs in light, smoked glass depth in dark */
export default function ScrollWorld() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const yFar = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -280])
  const yNear = useTransform(scrollYProgress, [0, 1], [0, -460])
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -6])
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 14])
  const blobY = useTransform(scrollYProgress, [0, 1], ['12%', '70%'])

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 30% 0%, var(--scene-a), var(--ink) 55%)',
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
            'radial-gradient(ellipse at 15% -10%, var(--scene-a), transparent 45%), radial-gradient(ellipse at 85% 10%, var(--scene-b), transparent 40%), radial-gradient(ellipse at 50% 90%, var(--scene-c), transparent 45%), var(--ink)',
        }}
      />

      <motion.div
        style={{ top: blobY }}
        className="absolute left-[12%] h-[42vmax] w-[42vmax] -translate-y-1/2 rounded-full blur-3xl"
        animate={{ scale: [1, 1.08, 1], x: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-full w-full rounded-full bg-[var(--scene-a)]" />
      </motion.div>

      <motion.div
        className="absolute right-[8%] top-[20%] h-[36vmax] w-[36vmax] rounded-full bg-[var(--scene-b)] blur-3xl"
        animate={{ scale: [1.05, 0.95, 1.05], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative h-[68vmin] w-[68vmin]"
        >
          <motion.div
            style={{ y: yFar, transform: 'translateZ(-200px)' }}
            className="absolute inset-[10%] rounded-[2rem] border border-[var(--glass-border)] bg-[var(--glass-bg)] opacity-50"
          />
          <motion.div
            style={{ y: yMid, transform: 'translateZ(-60px) rotateZ(6deg)' }}
            className="absolute inset-[20%] rounded-[1.6rem] border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] shadow-[var(--glass-shadow)] backdrop-blur-md"
          />
          <motion.div
            style={{ y: yNear, transform: 'translateZ(40px) rotateZ(-5deg)' }}
            className="absolute inset-[30%] rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-glow)]"
          />

          {[
            { x: '18%', y: '24%' },
            { x: '72%', y: '20%' },
            { x: '66%', y: '68%' },
            { x: '28%', y: '70%' },
          ].map((n, i) => (
            <motion.span
              key={n.x}
              style={{ left: n.x, top: n.y, y: yMid }}
              animate={{ opacity: [0.35, 0.85, 0.35], scale: [1, 1.2, 1] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
              className="absolute size-2 rounded-full bg-accent shadow-[0_0_16px_var(--glow)]"
            />
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 noise opacity-[0.03]" />
    </div>
  )
}
