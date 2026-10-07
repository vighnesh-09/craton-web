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
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...rest}
    >
      {children}
    </Motion>
  )
}
