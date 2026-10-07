import Seo from '@/components/seo/Seo'
import About from '@/components/sections/About'
import Approach from '@/components/sections/Approach'
import Contact from '@/components/sections/Contact'
import DomainScroll from '@/components/sections/DomainScroll'
import Hero from '@/components/sections/Hero'
import Mindset from '@/components/sections/Mindset'
import Products from '@/components/sections/Products'
import Proof from '@/components/sections/Proof'
import Trust from '@/components/sections/Trust'

export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <Proof />
      <DomainScroll />
      <Mindset />
      <Products />
      <Approach />
      <About />
      <Trust />
      <Contact />
    </>
  )
}
