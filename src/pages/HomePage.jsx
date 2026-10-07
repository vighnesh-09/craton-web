import Contact from '@/components/sections/Contact'
import Features from '@/components/sections/Features'
import Hero from '@/components/sections/Hero'
import Showcase from '@/components/sections/Showcase'
import Studio from '@/components/sections/Studio'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function HomePage() {
  useDocumentTitle('UI/UX Studio')

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
