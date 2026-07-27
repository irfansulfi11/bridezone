import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/** Section header: title on the left, optional "View all" link on the right. */
export function SectionHead({
  title,
  href,
  linkLabel = 'View all',
  subtitle,
}: {
  title: string
  href?: string
  linkLabel?: string
  subtitle?: string
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-[28px]">{title}</h2>
        {subtitle && <p className="mt-1.5 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {href && (
        <Link
          to={href}
          className="shrink-0 text-sm font-semibold text-maroon hover:text-maroon-800"
        >
          {linkLabel} &rarr;
        </Link>
      )}
    </div>
  )
}

/**
 * Horizontally scrollable row with arrow controls — the pattern the reference
 * site uses for real weddings, blogs and featured vendors.
 */
export default function Rail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <div className="group/rail relative">
      <div
        ref={ref}
        className="scrollbar-none -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2"
      >
        {children}
      </div>

      <RailButton side="left" onClick={() => scrollBy(-1)} />
      <RailButton side="right" onClick={() => scrollBy(1)} />
    </div>
  )
}

function RailButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      onClick={onClick}
      aria-label={side === 'left' ? 'Scroll left' : 'Scroll right'}
      className={`absolute top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-maroon/10 bg-white text-maroon shadow-lift transition-opacity hover:bg-maroon hover:text-ivory md:grid ${
        side === 'left' ? '-left-4' : '-right-4'
      } opacity-0 group-hover/rail:opacity-100`}
    >
      <Icon size={18} />
    </button>
  )
}
