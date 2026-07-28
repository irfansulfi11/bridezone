import { Link, useLocation } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

/**
 * Floating shortcut to the Planning Assistant — the site's headline feature.
 * Sits above the mobile tab bar; on desktop it drops to the bottom-right
 * corner, where the tab bar isn't in the way.
 */
export default function AssistantFab() {
  const { pathname } = useLocation()

  // Don't float a shortcut to the page you're already on.
  if (pathname === '/plan') return null

  return (
    <Link
      to="/plan"
      aria-label="Open the Planning Assistant"
      // bottom-20 / lg:bottom-6 are plain utilities so the responsive override
      // sorts correctly; an arbitrary bottom-[calc(…)] loses to neither and
      // wins over lg:. The safe-area inset rides along as a margin instead.
      className="group fixed bottom-20 right-4 z-40 mb-[env(safe-area-inset-bottom)] flex items-center gap-2 rounded-full bg-gradient-to-br from-maroon-500 to-maroon-800 p-3 text-ivory shadow-lift ring-2 ring-ivory/25 transition-all hover:pr-5 lg:bottom-6 lg:mb-0"
    >
      <Sparkles size={22} className="shrink-0" />
      {/* Label reveals on hover/focus so the resting state stays a compact circle */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[10rem] group-focus-visible:max-w-[10rem]">
        Plan my wedding
      </span>
    </Link>
  )
}
