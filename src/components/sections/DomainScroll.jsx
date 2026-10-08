import Glass from '@/components/ui/Glass'

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

/**
 * Chapters in a grid. The clip-path scrub cut titles off the card
 * ("Map to p") and the pin held an empty stage.
 */
export default function DomainScroll() {
  return (
    <section
      id="domain"
      className="pad-x relative py-[var(--section-y)]"
      aria-label="Domain narrative"
    >
      <div className="shell">
        <p className="mono-label text-accent">Scroll the continuum</p>
        <h2 className="mt-3 max-w-[16ch] text-[clamp(1.7rem,3.2vw,2.85rem)] font-normal leading-[1.05] tracking-[-0.04em]">
          Built for rooms where a wrong citation costs months.
        </h2>
        <p className="mt-3 max-w-[46ch] text-[14.5px] leading-relaxed text-muted">
          Move through Craton’s world — from regulatory gravity to product
          clarity — as each chapter follows the scroll.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {chapters.map((chapter, i) => (
            <Glass
              key={chapter.kicker}
              className="min-w-0 p-5 sm:p-6"
              strong
              lift
            >
              <div className="flex min-w-0 flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span className="mono-label text-accent">{chapter.kicker}</span>
                  <span className="font-mono text-[11px] text-muted">
                    0{i + 1} / 04
                  </span>
                </div>
                <h3 className="mt-3 text-[clamp(1.25rem,2vw,1.65rem)] font-normal leading-snug tracking-tight">
                  {chapter.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted sm:text-[15px]">
                  {chapter.body}
                </p>
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  )
}
