import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle'

export function NotFound() {
  usePageTitle('Not found')
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center animate-fade-in">
      <p className="font-display text-7xl font-semibold text-maroon">404</p>
      <p className="mt-3 text-ink-soft">We couldn’t find that page.</p>
      <Link to="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  )
}
