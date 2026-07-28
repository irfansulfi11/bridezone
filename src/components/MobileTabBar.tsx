import { NavLink } from 'react-router-dom'
import { Camera, Home, Newspaper, Store, Users } from 'lucide-react'

const TABS = [
  { to: '/', label: 'Home', Icon: Home, end: true },
  { to: '/venues', label: 'Venues', Icon: Store, end: false },
  { to: '/vendors', label: 'Vendors', Icon: Users, end: false },
  { to: '/photos', label: 'Photos', Icon: Camera, end: false },
  { to: '/blog', label: 'Blogs', Icon: Newspaper, end: false },
]

/**
 * Persistent bottom navigation on mobile. Hidden from lg up, where the header
 * nav takes over. Sits above the safe-area inset so it clears the iOS home bar.
 */
export default function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-maroon-950 pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="flex">
        {TABS.map(({ to, label, Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex min-h-[3.5rem] flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-gold-300' : 'text-ivory/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} strokeWidth={isActive ? 2.4 : 1.9} />
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
