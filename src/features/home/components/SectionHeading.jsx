'use client'

import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const ease = [0.22, 1, 0.36, 1]

export function SectionEyebrow({ num, label, tone = 'light', className = '' }) {
  const dark = tone === 'dark'

  return (
    <p
      className={`inline-flex items-center gap-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] ${
        dark ? 'text-hero-muted' : 'text-lagoon'
      } ${className}`}
    >
      <span aria-hidden className="inline-block h-px w-7 bg-copper" />
      <span className="opacity-70">{num} /</span>
      <span>{label}</span>
    </p>
  )
}

/**
 * Shared section intro — same type rhythm as Hero (mono eyebrow, display + serif accent).
 */
export default function SectionHeading({
  num,
  label,
  title,
  titleAccent,
  lead,
  aside,
  tone = 'light',
  /** eyebrow left / title right (mindset, approach) */
  layout = 'stack',
  headingId,
  className = '',
}) {
  const reduced = usePrefersReducedMotion()
  const dark = tone === 'dark'

  const fade = (node, delay = 0) =>
    reduced ? (
      node
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, delay, ease }}
      >
        {node}
      </motion.div>
    )

  const eyebrow = (
    <SectionEyebrow num={num} label={label} tone={tone} className="mb-0" />
  )

  const heading = (
    <h2
      id={headingId}
      className={`max-w-[16ch] font-display text-[clamp(2.25rem,4.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance ${
        dark ? 'text-hero-fg' : 'text-ink'
      }`}
    >
      {title}{' '}
      {titleAccent ? (
        <span
          className={`font-serif text-[1.06em] font-normal italic tracking-[-0.03em] ${
            dark ? 'text-hero-soft' : 'text-lagoon-deep'
          }`}
        >
          {titleAccent}
        </span>
      ) : null}
    </h2>
  )

  const leadEl = lead ? (
    <p
      className={`mt-6 max-w-[52ch] font-body text-[15px] leading-[1.75] sm:text-base ${
        dark ? 'text-hero-body' : 'text-ink/65'
      }`}
    >
      {lead}
    </p>
  ) : null

  const asideEl = aside ? (
    <p
      className={`max-w-[36ch] font-body text-[15px] leading-[1.75] sm:text-base ${
        dark ? 'text-hero-body' : 'text-ink/65'
      }`}
    >
      {aside}
    </p>
  ) : null

  if (layout === 'split-eyebrow') {
    return (
      <div
        className={`grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.15fr)] lg:gap-12 lg:items-start ${className}`}
      >
        {fade(<div className="lg:pt-3">{eyebrow}</div>)}
        <div>
          {fade(heading, 0.05)}
          {leadEl ? fade(leadEl, 0.12) : null}
        </div>
      </div>
    )
  }

  if (layout === 'split-aside') {
    return (
      <div
        className={`grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-16 ${className}`}
      >
        <div>
          {fade(<div className="mb-6">{eyebrow}</div>)}
          {fade(heading, 0.06)}
        </div>
        {asideEl ? (
          <div className="lg:justify-self-end lg:pb-1">{fade(asideEl, 0.1)}</div>
        ) : null}
      </div>
    )
  }

  return (
    <div className={className}>
      {fade(<div className="mb-6">{eyebrow}</div>)}
      {fade(heading, 0.06)}
      {leadEl ? fade(leadEl, 0.12) : null}
      {asideEl ? fade(<div className="mt-4">{asideEl}</div>, 0.12) : null}
    </div>
  )
}
