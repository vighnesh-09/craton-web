import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

const Glass = forwardRef(function Glass(
  {
    as: Comp = 'div',
    className,
    glow = false,
    strong = false,
    inset = false,
    fluted = false,
    lift = false,
    children,
    ...props
  },
  ref,
) {
  return (
    <Comp
      ref={ref}
      className={cn(
        'glass-panel relative overflow-hidden rounded-[1.75rem]',
        strong && 'glass-panel--strong',
        glow && 'glass-panel--glow',
        inset && 'glass-panel--inset',
        lift && 'jelly',
        className,
      )}
      {...props}
    >
      <span aria-hidden className="glass-shine" />
      <span aria-hidden className="glass-satin" />
      {fluted ? <span aria-hidden className="glass-fluted" /> : null}
      <div className="relative z-10 h-full min-h-0">{children}</div>
    </Comp>
  )
})

export default Glass
