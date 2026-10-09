import { site } from '@/config/site'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 overflow-hidden bg-ink" aria-label="About">
      <div className="shell section-pad grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="type-label">04 · About</p>
          <p className="type-label mt-4 text-muted">{site.founder.role}</p>
          <p className="type-body mt-2 text-muted-ink">{site.location}</p>
        </div>
        <div className="min-w-0 lg:col-span-8">
          <h2 className="type-h2 text-cream">{site.founder.name}</h2>
          <p className="type-body mt-5 max-w-[46ch] text-muted-ink">{site.founder.bio}</p>
          <p className="type-body mt-4 max-w-[46ch] text-cream">
            {site.legalName} invents, protects, and ships AI-enabled products. It is a
            product and IP company — RAccelerator for EU MDR and IVDR, ReviewsIntel for
            review evidence in agentic commerce.
          </p>
        </div>
      </div>
    </section>
  )
}
