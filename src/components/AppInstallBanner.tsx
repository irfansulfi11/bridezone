import { useEffect, useState } from 'react'
import { Smartphone, X } from 'lucide-react'

const STORAGE_KEY = 'bridezone.appBannerDismissed'

/**
 * Top-of-page app pitch on mobile. Dismissal persists so it doesn't nag on
 * every route change or return visit.
 */
export default function AppInstallBanner() {
  const [dismissed, setDismissed] = useState(true)

  // Read after mount: touching localStorage during render would desync the
  // first paint and flash the banner for people who already closed it.
  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === '1')
    } catch {
      setDismissed(false)
    }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* private mode — it'll reappear next visit, which is acceptable */
    }
  }

  if (dismissed) return null

  return (
    <div className="bg-maroon-50 lg:hidden">
      <div className="container-page flex items-center gap-3 py-2.5">
        <button
          onClick={dismiss}
          aria-label="Dismiss app banner"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-muted hover:bg-maroon/10 hover:text-maroon"
        >
          <X size={16} />
        </button>

        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-maroon text-ivory">
          <Smartphone size={18} />
        </span>

        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[13px] font-semibold text-ink">
            India&rsquo;s favourite wedding planning app
          </p>
          <p className="truncate text-xs text-ink-muted">Free checklist, budget &amp; shortlists</p>
        </div>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="shrink-0 rounded-full bg-maroon px-4 py-1.5 text-xs font-semibold text-ivory"
        >
          Install
        </a>
      </div>
    </div>
  )
}
