import { Contact, Features, Hero, Showcase, Studio } from '@/features/home'
import { pages } from '@/content/pages'

const meta = pages.home

export const metadata = {
  title: {
    absolute: `${meta.ogTitle}`,
  },
  description: meta.description,
  alternates: {
    canonical: meta.path,
  },
  openGraph: {
    title: meta.ogTitle,
    description: meta.ogDescription,
    url: meta.path,
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Showcase />
      <Studio />
      <Contact />
    </>
  )
}
