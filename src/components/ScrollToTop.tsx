import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Reset scroll position on navigation (SPA doesn't do this by default).
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}
