import { motion, useReducedMotion } from 'framer-motion'

const motionMap = {
  div: motion.div,
  li: motion.li,
  h2: motion.h2,
  h3: motion.h3,
  article: motion.article,
  section: motion.section,
  p: motion.p,
}

/** Section entrance — calm, scroll-forward (once in view). */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
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
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -4% 0px' }}
      transition={{
        duration: 0.55,
        delay: Math.min(delay, 0.12),
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </Motion>
  )
}
