import { motion, useReducedMotion } from 'framer-motion'
import { easeOutExpo } from '@/lib/motion'

const motionMap = {
  div: motion.div,
  li: motion.li,
  h2: motion.h2,
  h3: motion.h3,
  article: motion.article,
  section: motion.section,
  p: motion.p,
}

/** Premium entrance — once in view, expo ease (GSAP-feel). */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = 'div',
  ...rest
}) {
  const reduced = useReducedMotion()
  const Motion = motionMap[as] || motion.div

  if (reduced) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -6% 0px' }}
      transition={{
        duration: 0.7,
        delay: Math.min(delay, 0.18),
        ease: easeOutExpo,
      }}
      {...rest}
    >
      {children}
    </Motion>
  )
}
