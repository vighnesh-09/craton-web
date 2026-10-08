/** Slim index label beside a chapter. No pin. */
export default function ChapterIndex({ n, kicker, tone = 'paper' }) {
  const navy = tone === 'navy'
  return (
    <div
      data-chapter-index
      className={
        navy
          ? `chapter-index chapter-index--navy flex items-baseline gap-3 sm:block sm:pl-3${n === '01' ? ' is-active' : ''}`
          : `chapter-index flex items-baseline gap-3 sm:block sm:pl-3${n === '01' ? ' is-active' : ''}`
      }
    >
      <p className="font-mono text-[1.35rem] leading-none tracking-[-0.04em]">
        {n}
      </p>
      <p
        className={
          navy
            ? 'mono-label mt-0 max-w-[14ch] leading-snug text-ink-3 sm:mt-2'
            : 'mono-label mt-0 max-w-[14ch] leading-snug text-muted-ink sm:mt-2'
        }
      >
        {kicker}
      </p>
    </div>
  )
}
