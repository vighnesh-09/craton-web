import Image from 'next/image'
import { cn } from '@/lib/cn'

/**
 * Brand lockup — transparent mark + “craton” wordmark.
 */
export default function BrandMark({
  href = '#top',
  tone = 'on-dark',
  size = 'md',
  className,
  ariaLabel = 'Craton Technologies — home',
  onClick,
  showWord = true,
}) {
  const onDark = tone === 'on-dark'
  const sizes = {
    sm: {
      mark: 'h-8 w-8',
      word: 'text-[1.25rem]',
      sub: 'text-[6px]',
      gap: 'gap-2',
    },
    md: {
      mark: 'h-10 w-10 sm:h-11 sm:w-11',
      word: 'text-[1.6rem] sm:text-[1.75rem]',
      sub: 'text-[6.5px] sm:text-[7px]',
      gap: 'gap-2.5',
    },
  }
  const s = sizes[size] || sizes.md

  const content = (
    <>
      <Image
        src="/brand/logo.png"
        alt=""
        width={88}
        height={88}
        priority
        className={cn('shrink-0 object-contain', s.mark)}
      />
      {showWord ? (
        <span className="inline-flex items-end gap-2">
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
              'mb-0.5 flex flex-col font-mono font-medium uppercase leading-[1.15] tracking-[0.16em] transition-colors duration-300',
              s.sub,
              onDark ? 'text-hero-muted' : 'text-ink/40',
            )}
          >
            <span>Techno</span>
            <span>logies</span>
          </span>
        </span>
      ) : null}
    </>
  )

  const classes = cn(
    'inline-flex items-center transition-opacity duration-300 hover:opacity-90',
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
