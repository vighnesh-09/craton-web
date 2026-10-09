import { site } from '@/config/site'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 overflow-hidden bg-ink" aria-label="About">
      <div className="shell grid items-end gap-8 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <p className="kicker">About</p>
          <p className="mt-4 font-mono text-[12px] tracking-[0.16em] text-muted uppercase">
            {site.founder.role}
          </p>
          <p className="mt-2 text-[14px] text-muted-ink">{site.location}</p>
        </div>
        <div className="lg:col-span-8">
          <h2 className="font-serif text-[clamp(3rem,7vw,6.2rem)] leading-[0.86] font-medium tracking-[-0.045em] text-cream">
            {site.founder.name}
          </h2>
          <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-muted-ink">{site.founder.bio}</p>
          <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-cream">
            {site.legalName} invents, protects, and ships AI-enabled products. It is a
            product and IP company — RAccelerator for EU MDR and IVDR, ReviewsIntel for
            review evidence in agentic commerce.
          </p>
        </div>
      </div>
    </section>
  )
}
