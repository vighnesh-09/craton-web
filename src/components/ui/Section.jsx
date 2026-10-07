import { cn } from '@/lib/cn'
import Glass from '@/components/ui/Glass'

export default function Section({
  id,
  tone = 'dark',
  className,
  children,
  glass = false,
  ...props
}) {
  const useGlass = tone === 'light' || glass

  return (
    <section
      id={id}
      className={cn(
        'pad-x relative py-[clamp(4.5rem,8vw,7.5rem)] text-cream',
        className,
      )}
      {...props}
    >
      {useGlass ? (
        <Glass
          strong
          glow={tone === 'light'}
          className="mx-auto max-w-[1400px] p-6 sm:p-10 md:p-12"
        >
          {children}
        </Glass>
      ) : (
        <div className="mx-auto max-w-[1400px]">{children}</div>
      )}
    </section>
  )
}

export function SectionHead({ eyebrow, title, aside, className }) {
  return (
    <div
      className={cn(
        'mb-[clamp(2.2rem,5vw,4.5rem)] grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-12',
        className,
      )}
    >
      {eyebrow ? (
        <p className="mono-label pt-2 text-accent">{eyebrow}</p>
      ) : (
        <span />
      )}
      <div className="space-y-5">
        {title}
        {aside}
      </div>
    </div>
  )
}
