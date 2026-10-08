import { cn } from '@/lib/cn'

const variants = {
  light:
    'text-white shadow-[0_10px_28px_-12px_var(--glow),0_1px_0_rgba(255,255,255,0.35)_inset] hover:brightness-105',
  dark: 'bg-[var(--glass-bg-strong)] text-cream border border-[var(--glass-border)] backdrop-blur-xl hover:bg-[var(--glass-bg)]',
  outline:
    'border border-[var(--glass-border)] bg-[var(--glass-bg)] text-cream backdrop-blur-xl hover:border-accent/50 hover:shadow-[var(--glass-glow)]',
  ghost: 'text-muted hover:text-cream underline-offset-4 hover:underline',
}

export default function Button({
  as: Comp = 'a',
  variant = 'light',
  className,
  children,
  ...props
}) {
  return (
    <Comp
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2.5 rounded-md px-5 text-[0.8125rem] font-semibold tracking-[-0.01em] transition-all duration-300 ease-out',
        'hover:-translate-y-0.5 active:scale-[0.98]',
        variant === 'light' && 'bg-[image:var(--btn-face)]',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
