const chapters = [
  {
    kicker: 'Domain',
    title: 'Regulated decisions need evidence, not vibes.',
    body: 'Medical-device and IVD teams live inside EU MDR / IVDR: classification rules, Annex I GSPR, technical files that span thousands of pages. Clarity is a compliance risk — and a time risk.',
  },
  {
    kicker: 'RAccelerator',
    title: 'Map every requirement to proof you can defend.',
    body: 'Device classification and GSPR gap assessment with reasoning tied to the rule and the document. Experts stay in the loop; the system surfaces the argument, not a black box.',
  },
  {
    kicker: 'ReviewsIntel',
    title: 'When agents buy, the rationale must travel with them.',
    body: 'Agentic commerce fails silently without evidence. ReviewsIntel binds purchase authorization to independent review proof — visible before checkout.',
  },
  {
    kicker: 'Craton method',
    title: 'Invent. Protect. Assemble domain ownership. Ship.',
    body: 'A patent-first product company in Frisco, Texas — one engineering bedrock, many high-trust domains. Not consulting theatre. Products you can evaluate.',
  },
]

export default function DomainScroll() {
  return (
    <section id="domain" className="section-pad bg-paper-2" aria-label="Domain narrative">
      <div className="shell grid grid-cols-1 items-start gap-8 min-[900px]:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] min-[900px]:gap-12">
        <div className="min-w-0 min-[900px]:sticky min-[900px]:top-[6rem] min-[900px]:self-start">
          <p className="kicker">Domain</p>
          <h2 className="display mt-4 max-w-[14ch] text-cream">
            Built for rooms where a wrong citation costs months.
          </h2>
          <p className="lede mt-5 max-w-[36ch] border-t border-[var(--hairline)] pt-5">
            Four chapters. Each one stays fully on the panel.
          </p>
        </div>

        <ol className="min-w-0">
          {chapters.map((chapter, index) => (
            <li
              key={chapter.kicker}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 border-b border-[var(--hairline)] py-5 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span className="pt-1 font-mono text-[11px] tracking-[0.14em] text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="kicker">{chapter.kicker}</p>
                <h3 className="mt-2 text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-snug tracking-[-0.03em] text-cream">
                  {chapter.title}
                </h3>
                <p className="lede mt-2">{chapter.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
