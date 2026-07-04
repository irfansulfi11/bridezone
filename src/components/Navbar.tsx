import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, LayoutDashboard, LogOut, Menu, Shield, Sparkles, User, X } from 'lucide-react'
import Brand from './Brand'
import { useAuth } from '../store/AuthContext'

const NAV_LINKS = [
  { to: '/vendors', label: 'Vendors' },
  { to: '/collections', label: 'Jewellery' },
  { to: '/plan', label: 'Plan My Wedding' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  // Close account dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const dashHref = user?.role === 'admin' ? '/admin' : '/dashboard'

  return (
    <header className="sticky top-0 z-40 border-b border-maroon/10 bg-ivory/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Brand />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-maroon' : 'text-ink-soft hover:text-maroon'
                }`
              }
            >
              {({ isActive }) => (
                <span className="inline-flex items-center gap-1.5">
                  {l.to === '/plan' && <Sparkles size={15} className="text-gold-600" />}
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rotate-45 bg-gold" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Account / login */}
        <div className="flex items-center gap-2">
          {!user ? (
            <Link to="/login" className="hidden md:inline-flex btn-outline !px-5 !py-2 text-sm">
              Login
            </Link>
          ) : (
            <div className="relative hidden md:block" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-maroon/15 bg-white py-1.5 pl-1.5 pr-3 text-sm shadow-sm transition-colors hover:border-maroon/30"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-maroon text-ivory">
                  {user.role === 'admin' ? <Shield size={14} /> : <User size={14} />}
                </span>
                <span className="max-w-[9rem] truncate font-medium text-ink">{user.name}</span>
                <ChevronDown size={15} className={`text-ink-muted transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-maroon/10 bg-white shadow-lift animate-fade">
                  <div className="border-b border-maroon/10 px-4 py-3">
                    <p className="text-sm font-medium text-ink">{user.email}</p>
                    <p className="mt-0.5 text-xs capitalize text-gold-600">{user.role} account</p>
                  </div>
                  <Link
                    to={dashHref}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm text-ink-soft hover:bg-maroon/5 hover:text-maroon"
                  >
                    <LayoutDashboard size={16} />
                    {user.role === 'admin' ? 'Admin panel' : 'My dashboard'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-ink-soft hover:bg-maroon/5 hover:text-maroon"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile toggle */}
          <button
            className="grid h-10 w-10 place-items-center rounded-full text-maroon hover:bg-maroon/5 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-maroon/10 bg-ivory md:hidden animate-fade">
          <nav className="container-page flex flex-col py-3">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium ${
                    isActive ? 'bg-maroon/5 text-maroon' : 'text-ink-soft'
                  }`
                }
              >
                {l.to === '/plan' && <Sparkles size={16} className="text-gold-600" />}
                {l.label}
              </NavLink>
            ))}
            <div className="my-2 h-px bg-maroon/10" />
            {!user ? (
              <Link to="/login" className="btn-primary w-full">
                Login
              </Link>
            ) : (
              <>
                <Link to={dashHref} className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-ink-soft">
                  <LayoutDashboard size={16} />
                  {user.role === 'admin' ? 'Admin panel' : 'My dashboard'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-left text-sm font-medium text-maroon"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
