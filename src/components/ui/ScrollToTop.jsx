import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '@/components/providers/LenisProvider'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -80 })
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    if (lenis) lenis.scrollTo(0, { immediate: false })
    else window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname, hash, lenis])

  return null
}
