import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  ClipboardCheck,
  Gem,
  Inbox,
  LayoutGrid,
  ListTree,
  LogOut,
  ExternalLink,
} from 'lucide-react'
import { usePageTitle } from '../../lib/usePageTitle'
import { useAuth } from '../../store/AuthContext'
import Brand from '../../components/Brand'

const NAV = [
  { to: '/admin', end: true, label: 'Dashboard', icon: LayoutGrid },
  { to: '/admin/approvals', label: 'Vendor approvals', icon: ClipboardCheck },
  { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
  { to: '/admin/collections', label: 'Collections', icon: Gem },
  { to: '/admin/categories', label: 'Categories', icon: ListTree },
]

export default function AdminLayout() {
  usePageTitle('Admin')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
      isActive ? 'bg-maroon text-ivory shadow-sm' : 'text-ink-soft hover:bg-maroon/5 hover:text-maroon'
    }`

  return (
    <div className="min-h-screen bg-ivory">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-maroon/10 bg-white/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Brand />
            <span className="hidden rounded-full bg-maroon/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-maroon sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="btn-ghost !px-3 text-sm">
              <ExternalLink size={15} /> <span className="hidden sm:inline">View site</span>
            </button>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="btn-outline !px-3 !py-2 text-sm"
            >
              <LogOut size={15} /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-24 space-y-1 rounded-2xl border border-maroon/10 bg-white p-3 shadow-card">
            <p className="px-3 pb-2 pt-1 text-xs text-ink-muted">
              Signed in as <span className="font-medium text-ink">{user?.email}</span>
            </p>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
                <n.icon size={17} /> {n.label}
              </NavLink>
            ))}
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {/* Section tabs (mobile) */}
          <nav className="mb-5 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'border-maroon bg-maroon text-ivory'
                      : 'border-maroon/15 text-ink-soft'
                  }`
                }
              >
                <n.icon size={15} /> {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
