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
        'pad-x relative py-[clamp(2.5rem,4vw,4rem)] text-cream',
        className,
      )}
      {...props}
    >
      {useGlass ? (
        <Glass
          strong
          glow={tone === 'light'}
          className="shell p-5 sm:p-7 md:p-9"
        >
          {children}
        </Glass>
      ) : (
        <div className="shell">{children}</div>
      )}
    </section>
  )
}

export function SectionHead({ eyebrow, title, aside, className }) {
  return (
    <div
      className={cn(
        'mb-[clamp(1.25rem,2.5vw,2rem)] grid gap-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-8',
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
