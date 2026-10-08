import { cn } from '@/lib/cn'

/**
 * Craton mark — lightbulb + circuit brain + navy chevrons.
 * Asset: /brand/craton-logo.webp (from Logo-3D-04242026-v2)
 */
export default function BrandLogo({
  className,
  imgClassName,
  showWordmark = true,
  size = 'md',
  inverted = false,
}) {
  const sizes = {
    sm: { box: 'size-8', word: 'text-[1.1rem]', gap: 'gap-2' },
    md: { box: 'size-10', word: 'text-[1.35rem]', gap: 'gap-2.5' },
    lg: { box: 'size-12', word: 'text-[1.55rem]', gap: 'gap-3' },
  }
  const s = sizes[size] || sizes.md

  return (
    <span className={cn('inline-flex items-center', s.gap, className)}>
      <span
        className={cn(
          s.box,
          'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/5',
          imgClassName,
        )}
      >
        <img
          src="/brand/craton-logo.webp"
          alt=""
          width={184}
          height={192}
          className="h-full w-auto max-w-none"
          decoding="async"
          fetchPriority="low"
        />
      </span>
      {showWordmark ? (
        <span className="flex flex-col gap-0.5">
          <span
            className={cn(
              s.word,
              'font-semibold leading-none tracking-[-0.06em]',
              inverted ? 'text-[#e8eef5]' : 'text-cream',
            )}
          >
            craton
            <span className={inverted ? 'text-[#8fe7f8]' : 'text-[#075e73]'}>.</span>
          </span>
          {/* <span
            className={cn(
              'mono-label text-[7.5px]',
              inverted ? 'text-[#8aa0b8]' : 'text-muted',
            )}
          >
            Innovation-first. Evidence-led.
          </span> */}
        </span>
      ) : null}
    </span>
  )
}
