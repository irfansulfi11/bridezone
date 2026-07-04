import { Link } from 'react-router-dom'

// Wordmark: a small gold diamond + serif name. Reused in nav & footer.
export default function Brand({
  className = '',
  tone = 'dark',
}: {
  className?: string
  tone?: 'dark' | 'light'
}) {
  const text = tone === 'light' ? 'text-ivory' : 'text-maroon'
  const sub = tone === 'light' ? 'text-ivory/70' : 'text-ink-muted'
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-maroon text-gold shadow-sm transition-transform duration-300 group-hover:rotate-[8deg]">
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 4 L26 14 L16 28 L6 14 Z" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16" cy="15" r="2.4" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-semibold tracking-wide ${text}`}>
          Bridezone
        </span>
        <span className={`text-[10px] uppercase tracking-[0.28em] ${sub}`}>Wedding Atelier</span>
      </span>
    </Link>
  )
}
