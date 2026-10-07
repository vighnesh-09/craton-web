import { cn } from '@/lib/cn'

/**
 * Shared content column for the whole site.
 * Width comes from `--max-width-site` (Tailwind: `max-w-site`).
 */
export default function SiteContainer({
  as: Tag = 'div',
  className,
  children,
  ...props
}) {
  return (
    <Tag className={cn('mx-auto w-full max-w-site', className)} {...props}>
      {children}
    </Tag>
  )
}
