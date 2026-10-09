const chapters = [
  { n: '02', label: 'Domain', href: '#domain', line: 'Regulated files and review evidence' },
  { n: '03', label: 'Product', href: '#products', line: 'RAccelerator and ReviewsIntel' },
  { n: '04', label: 'Evidence', href: '#evidence', line: 'What a file has to show' },
  { n: '05', label: 'How it works', href: '#approach', line: 'File first, then ship' },
  { n: '06', label: 'About', href: '#about', line: 'Frisco · founder-led' },
  { n: '07', label: 'Contact', href: '#contact', line: 'Request a pilot' },
]

/** Numbered index row — native overflow, no pinned blank. */
export default function ChapterIndex() {
  return (
    <nav className="section-pad !py-0" aria-label="Chapters">
      <div className="shell">
        <ul className="flex snap-x gap-0 overflow-x-auto border-y border-[var(--hairline)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chapters.map((item) => (
            <li key={item.href} className="min-w-[11.5rem] flex-1 snap-start">
              <a
                href={item.href}
                className="group flex h-full min-h-[6.75rem] flex-col justify-between gap-3 border-r border-[var(--hairline)] px-3 py-3 transition-colors duration-[180ms] last:border-r-0 hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]"
              >
                <span className="font-mono text-[12px] text-[color:var(--accent-text)]">
                  {item.n}
                </span>
                <span>
                  <span className="block text-[14px] font-medium text-cream group-hover:underline group-hover:underline-offset-4">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-muted">
                    {item.line}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
