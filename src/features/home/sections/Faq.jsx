import SiteContainer from '@/components/layout/SiteContainer'
import { faq } from '@/content/home'
import SectionHeading from '@/features/home/components/SectionHeading'

export default function Faq() {
  return (
    <section
      id={faq.id}
      aria-labelledby="h-faq"
      className="border-t border-line bg-foam py-16 md:py-20"
    >
      <SiteContainer>
        <SectionHeading
          num={faq.eyebrow.num}
          label={faq.eyebrow.label}
          title={faq.title}
          titleAccent={faq.titleAccent}
          headingId="h-faq"
        />

        <dl className="mt-8 border-t border-line md:mt-10">
          {faq.items.map((item) => (
            <div
              key={item.q}
              className="grid min-w-0 gap-2 border-b border-line py-4 md:grid-cols-[38%_minmax(0,1fr)] md:items-start md:gap-8 md:py-5"
            >
              <dt className="min-w-0 font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.03em] text-ink">
                {item.q}
              </dt>
              <dd className="min-w-0 font-body text-[15px] leading-[1.65] text-ink/65">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </SiteContainer>
    </section>
  )
}
