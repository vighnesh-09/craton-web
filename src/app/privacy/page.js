import LegalDocument from '@/components/layout/LegalDocument'
import { privacy } from '@/content/legal'
import { pages } from '@/content/pages'

const meta = pages.privacy

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.path },
}

export default function PrivacyPage() {
  return (
    <LegalDocument
      kicker={privacy.kicker}
      title={privacy.title}
      updated={privacy.updated}
      lede={privacy.lede}
      sections={privacy.sections}
    />
  )
}
