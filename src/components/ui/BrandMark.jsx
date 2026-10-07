import { cn } from '@/lib/cn'

/**
 * Craton wordmark — “craton” + stacked TECHNO / LOGIES (logo lockup).
 */
export default function BrandMark({
  href = '#top',
  tone = 'on-dark',
  size = 'md',
  className,
  ariaLabel = 'Craton Technologies — home',
  onClick,
}) {
  const onDark = tone === 'on-dark'
  const sizes = {
    sm: {
      word: 'text-[1.35rem]',
      sub: 'text-[6.5px]',
      gap: 'gap-2',
    },
    md: {
      word: 'text-[1.75rem] sm:text-[1.875rem]',
      sub: 'text-[7px] sm:text-[7.5px]',
      gap: 'gap-2.5',
    },
  }
  const s = sizes[size] || sizes.md

  const content = (
    <>
      <span
        className={cn(
          'font-display font-semibold leading-none tracking-[-0.06em] transition-colors duration-300',
          s.word,
          onDark ? 'text-hero-fg' : 'text-ink',
        )}
      >
        craton
      </span>
      <span
        aria-hidden
        className={cn(
          'mb-[2px] flex flex-col font-mono font-medium uppercase leading-[1.2] tracking-[0.18em] transition-colors duration-300',
          s.sub,
          onDark ? 'text-hero-muted' : 'text-ink/45',
        )}
      >
        <span>Techno</span>
        <span>logies</span>
      </span>
    </>
  )

  const classes = cn(
    'inline-flex items-end transition-opacity duration-300 hover:opacity-90',
    s.gap,
    className,
  )

  if (!href) {
    return (
      <span className={classes} aria-label={ariaLabel}>
        {content}
      </span>
    )
  }

  return (
    <a href={href} aria-label={ariaLabel} className={classes} onClick={onClick}>
      {content}
    </a>
  )
}
