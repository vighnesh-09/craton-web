import SiteContainer from '@/components/layout/SiteContainer'
import { faq } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'

export default function Faq() {
  return (
    <section
      id={faq.id}
      aria-labelledby="h-faq"
      className="border-y border-line bg-mist px-6 py-24 sm:px-8 md:py-32"
    >
      <SiteContainer>
        <SectionHeading
          layout="split-eyebrow"
          num={faq.eyebrow.num}
          label={faq.eyebrow.label}
          title={faq.title}
          titleAccent={faq.titleAccent}
          headingId="h-faq"
        />

        <dl className="mt-14 border-t border-line sm:mt-20">
          {faq.items.map((item) => (
            <div
              key={item.q}
              className="grid gap-3 border-b border-line py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 md:py-8"
            >
              <dt className="font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.03em] text-ink">
                {item.q}
              </dt>
              <dd className="font-body text-[15px] leading-[1.7] text-ink/65">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </SiteContainer>
    </section>
  )
}
