import ProductView from '@/features/products/ProductView'
import { pages } from '@/content/pages'

const meta = pages.reviewsintel

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.path },
  openGraph: {
    title: meta.ogTitle,
    description: meta.description,
    url: meta.path,
  },
}

export default function ReviewsIntelPage() {
  return <ProductView id="ri" />
}
