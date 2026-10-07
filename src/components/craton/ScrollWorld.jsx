import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/** Lightweight scroll-linked backdrop — gradients + cheap transforms only */
export default function ScrollWorld() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const yA = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yB = useTransform(scrollYProgress, [0, 1], [0, -160])
  const drift = useTransform(scrollYProgress, [0, 1], [0, 40])

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
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ contain: 'strict' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 15% -10%, var(--scene-a), transparent 45%), radial-gradient(ellipse at 85% 10%, var(--scene-b), transparent 40%), radial-gradient(ellipse at 50% 90%, var(--scene-c), transparent 45%), var(--ink)',
        }}
      />

      {/* Soft orbs via radial gradients (no CSS blur filters — those tank scroll FPS) */}
      <motion.div
        style={{
          y: yA,
          x: drift,
          background:
            'radial-gradient(circle at center, var(--scene-a) 0%, transparent 68%)',
        }}
        className="absolute left-[8%] top-[8%] h-[48vmax] w-[48vmax]"
      />
      <motion.div
        style={{
          y: yB,
          background:
            'radial-gradient(circle at center, var(--scene-b) 0%, transparent 68%)',
        }}
        className="absolute right-[4%] top-[28%] h-[40vmax] w-[40vmax]"
      />

      <div className="absolute inset-0 noise opacity-[0.025]" />
    </div>
  )
}
