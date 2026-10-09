import { site } from '@/config/site'

const ra = site.products.ra
const ri = site.products.ri

const INDEX = {
  [ra.id]: ['Device classification', 'GSPR gap assessment', 'Traceable reasoning'],
  [ri.id]: ['Review evidence', 'Decision context', 'Visible rationale'],
}

export default function Products() {
  return (
    <section id="products" aria-label="Products">
      <Product product={ra} tone="paper" />
      <Product product={ri} tone="ink" />
    </section>
  )
}

function Product({ product, tone }) {
  const ink = tone === 'ink'
  return (
    <article
      id={product.id}
      className={`scroll-mt-28 ${ink ? 'bg-[#0c141c] text-[#f4f7fa]' : 'bg-[#f4f7fa] text-[#1e2a3a]'}`}
    >
      <div className="shell shell-fit py-16 sm:py-24">
        <p
          className={`font-mono text-[12px] tracking-[0.16em] uppercase ${ink ? 'text-[#9af3ff]' : 'text-[#075e73]'}`}
        >
          {product.status} · {product.domain}
        </p>
        <h2 className="product-display mt-4">{product.name}</h2>
        <p className={`mt-6 max-w-[46ch] text-[17px] leading-relaxed ${ink ? 'text-[#d5dee8]' : 'text-[#2f3f54]'}`}>
          {product.headline}
        </p>
        <div className={`mt-10 h-px w-full ${ink ? 'bg-white/20' : 'bg-[#1e2a3a]/15'}`} />
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {INDEX[product.id].map((item, index) => (
            <li key={item}>
              <p className={`font-mono text-[12px] tracking-[0.14em] ${ink ? 'text-[#9af3ff]' : 'text-[#075e73]'}`}>
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-2 font-serif text-[clamp(1.35rem,2.2vw,1.85rem)] leading-tight tracking-[-0.03em]">
                {item}
              </p>
            </li>
          ))}
        </ol>
        <p className={`mt-10 max-w-[62ch] text-[13px] leading-relaxed ${ink ? 'text-[#c5d0dc]' : 'text-[#3a6d8c]'}`}>
          {product.disclaimer}
        </p>
      </div>
    </article>
  )
}
