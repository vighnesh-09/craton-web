import { site } from '@/config/site'

const ra = site.products.ra
const ri = site.products.ri

/**
 * One asymmetric block: RAccelerator fills the left, ReviewsIntel counters on the right.
 * Sentences only — no requirement tables.
 */
export default function Products() {
  return (
    <section id="products" className="bg-[#f4f7fa] text-[#1e2a3a]" aria-label="Products">
      <div className="shell shell-fit section-pad">
        <p className="type-label text-[#075e73]">02 · Two products</p>
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
          <article id={ra.id} className="scroll-mt-28 lg:col-span-7">
            <p className="type-label text-[#075e73]">{ra.status}</p>
            <h2 className="product-display product-double mt-3">
              <span>{ra.name}</span>
              <span className="product-double-ghost" aria-hidden="true">
                {ra.name}
              </span>
            </h2>
            <p className="type-body mt-5 max-w-[46ch] text-[#2f3f54]">{ra.summary}</p>
            <p className="mt-4 max-w-[46ch] text-[13px] leading-relaxed text-[#3a6d8c]">
              {ra.disclaimer}
            </p>
          </article>

          <article id={ri.id} className="scroll-mt-28 border-t border-[#1e2a3a]/15 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <p className="type-label text-[#075e73]">{ri.status}</p>
            <h2 className="type-h2 product-double mt-3">
              <span>{ri.name}</span>
              <span className="product-double-ghost" aria-hidden="true">
                {ri.name}
              </span>
            </h2>
            <p className="type-body mt-5 text-[#2f3f54]">{ri.summary}</p>
            <p className="mt-4 text-[13px] leading-relaxed text-[#3a6d8c]">{ri.disclaimer}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
