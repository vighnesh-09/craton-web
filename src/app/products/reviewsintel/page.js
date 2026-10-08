import ProductView from '@/features/products/ProductView'
import { pages } from '@/content/pages'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata(pages.reviewsintel)

export default function ReviewsIntelPage() {
  return <ProductView id="ri" />
}
