import LegalDocument from '@/components/layout/LegalDocument'
import { terms } from '@/content/legal'
import { pages } from '@/content/pages'

const meta = pages.terms

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.path },
}

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