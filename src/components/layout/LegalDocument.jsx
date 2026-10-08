import Link from 'next/link'
import SiteContainer from '@/components/layout/SiteContainer'

export default function LegalDocument({
  kicker,
  title,
  updated,
  lede,
  sections,
}) {
  return (
    <article className="bg-foam pb-24 pt-28 text-center text-ink md:pb-32 md:pt-36">
      <SiteContainer>
        <p className="inline-flex items-center gap-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-lagoon">
          <span aria-hidden className="inline-block h-px w-7 bg-copper" />
          {kicker}
        </p>
        <h1 className="mx-auto mt-5 max-w-[14ch] font-display text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          {title}
        </h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">
          {updated}
        </p>
        <p className="mx-auto mt-8 max-w-[62ch] font-body text-[16px] leading-[1.7] text-ink/70">
          {lede}
        </p>

        <div className="mx-auto mt-14 max-w-[68ch] space-y-10 border-t border-line pt-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-[1.35rem] font-semibold tracking-[-0.03em] text-ink">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-3 font-body text-[15px] leading-[1.75] text-ink/70"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="mt-14 font-body text-[14px]">
          <Link
            href="/"
            className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-lagoon-deep"
          >
            Back to the homepage
          </Link>
        </p>
      </SiteContainer>
    </article>
  )
}
