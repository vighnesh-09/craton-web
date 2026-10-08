import ProductView from '@/features/products/ProductView'
import { pages } from '@/content/pages'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata(pages.raccelerator)

export default function RacceleratorPage() {
  return <ProductView id="ra" />
}
