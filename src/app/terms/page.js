import LegalDocument from '@/components/layout/LegalDocument'
import { terms } from '@/content/legal'
import { pages } from '@/content/pages'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata(pages.terms)

export default function TermsPage() {
  return (
    <LegalDocument
      kicker={terms.kicker}
      title={terms.title}
      updated={terms.updated}
      lede={terms.lede}
      sections={terms.sections}
    />
  )
}
