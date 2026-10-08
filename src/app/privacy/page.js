import LegalDocument from '@/components/layout/LegalDocument'
import { privacy } from '@/content/legal'
import { pages } from '@/content/pages'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata(pages.privacy)

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
