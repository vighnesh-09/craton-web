import SiteContainer from '@/components/layout/SiteContainer'
import { patents } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'

export default function Patents() {
  return (
    <section
      id={patents.id}
      aria-labelledby="h-patents"
      className="bg-foam px-6 py-24 sm:px-8 md:py-32"
    >
      <SiteContainer>
        <SectionHeading
          layout="split-aside"
          num={patents.eyebrow.num}
          label={patents.eyebrow.label}
          title={patents.title}
          titleAccent={patents.titleAccent}
          aside={patents.lead}
          headingId="h-patents"
        />

        <ul className="mt-14 grid gap-8 border-t border-line pt-10 sm:mt-20 sm:grid-cols-3">
          {patents.figures.map((figure) => (
            <li key={figure.label}>
              <p className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.045em] text-ink">
                {figure.value}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">
                {figure.label}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {patents.notes.map((note) => (
            <li key={note.title}>
              <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.03em] text-ink">
                {note.title}
              </h3>
              <p className="mt-2 font-body text-[14.5px] leading-[1.7] text-ink/65">
                {note.copy}
              </p>
            </li>
          ))}
        </ul>
      </SiteContainer>
    </section>
  )
}
