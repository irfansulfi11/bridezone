import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  User,
  X,
} from 'lucide-react'
import Brand from './Brand'
import { useAuth } from '../store/AuthContext'
import { CATEGORY_GROUPS, CITY_GROUPS, PHOTO_ALBUMS, VENUE_TYPES } from '../data/wmg'
import { useCity } from '../store/CityContext'

/** Main nav entries. `menu` selects which mega-panel opens on hover. */
const NAV_LINKS: { to: string; label: string; menu?: 'venues' | 'vendors' | 'photos' }[] = [
  { to: '/venues', label: 'Venues', menu: 'venues' },
  { to: '/vendors', label: 'Vendors', menu: 'vendors' },
  { to: '/photos', label: 'Photos', menu: 'photos' },
  { to: '/real-weddings', label: 'Real Weddings' },
  { to: '/blog', label: 'Blog' },
  { to: '/e-invites', label: 'E-Invites' },
  { to: '/plan', label: 'Genie' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { city, setCity } = useCity()
  const navigate = useNavigate()
  const location = useLocation()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const accountRef = useRef<HTMLDivElement>(null)
  const cityRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number>()

  // Close everything on navigation
  useEffect(() => {
    setMobileOpen(false)
    setAccountOpen(false)
    setCityOpen(false)
    setOpenMenu(null)
  }, [location.pathname, location.search])

  // Outside-click for the two click-driven dropdowns
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (accountRef.current && !accountRef.current.contains(t)) setAccountOpen(false)
      if (cityRef.current && !cityRef.current.contains(t)) setCityOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // Hover intent — small delay so the pointer can travel into the panel
  const openWithIntent = (menu?: string) => {
    window.clearTimeout(closeTimer.current)
    setOpenMenu(menu ?? null)
  }
  const closeWithIntent = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const dashHref = user?.role === 'admin' ? '/admin' : '/dashboard'

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(124,31,43,0.10)]">
      {/* ------------------------------------------------ utility strip */}
      <div className="hidden bg-maroon-900 text-ivory/85 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="tracking-wide">India&rsquo;s Favourite Wedding Planning Platform</p>
          <div className="flex items-center gap-6">
            <Link to="/vendors" className="inline-flex items-center gap-1.5 hover:text-gold-200">
              <Star size={13} className="text-gold-300" />
              Write A Review
            </Link>
            <Link to="/plan" className="inline-flex items-center gap-1.5 hover:text-gold-200">
              <Smartphone size={13} className="text-gold-300" />
              Download App
            </Link>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- main bar */}
      <div className="container-page flex h-16 items-center gap-4">
        <Brand />

        {/* City selector */}
        <div className="relative hidden lg:block" ref={cityRef}>
          <button
            onClick={() => setCityOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-full border border-maroon/15 px-3.5 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-maroon/35 hover:text-maroon"
          >
            <MapPin size={15} className="text-maroon" />
            {city}
            <ChevronDown size={14} className={`transition-transform ${cityOpen ? 'rotate-180' : ''}`} />
          </button>

          {cityOpen && (
            <div className="absolute left-0 z-50 mt-2 max-h-[70vh] w-[42rem] animate-fade overflow-y-auto rounded-xl border border-maroon/10 bg-white p-5 shadow-lift">
              <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                {CITY_GROUPS.map((g) => (
                  <div key={g.region}>
                    <p className="eyebrow">{g.region}</p>
                    <ul className="mt-2.5 space-y-1.5">
                      {g.cities.map((c) => (
                        <li key={`${g.region}-${c}`}>
                          <button
                            onClick={() => {
                              setCity(c)
                              setCityOpen(false)
                            }}
                            className={`text-sm transition-colors hover:text-maroon ${
                              c === city ? 'font-semibold text-maroon' : 'text-ink-soft'
                            }`}
                          >
                            {c}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center lg:flex" onMouseLeave={closeWithIntent}>
          {NAV_LINKS.map((l) =>
            // Genie is the planning assistant — the site's headline feature, so
            // it gets a gold pill instead of a plain nav link.
            l.label === 'Genie' ? (
              <NavLink
                key={l.to}
                to={l.to}
                onMouseEnter={() => openWithIntent(undefined)}
                className={({ isActive }) =>
                  `ml-2 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-gold text-ink'
                      : 'bg-gold/15 text-gold-700 hover:bg-gold hover:text-ink'
                  }`
                }
              >
                <Sparkles size={14} />
                {l.label}
              </NavLink>
            ) : (
              <div key={l.to} onMouseEnter={() => openWithIntent(l.menu)}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `relative inline-flex items-center gap-1.5 px-3.5 py-5 text-sm font-medium transition-colors ${
                      isActive || openMenu === l.menu
                        ? 'text-maroon'
                        : 'text-ink-soft hover:text-maroon'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {l.menu && <ChevronDown size={13} className="opacity-60" />}
                      {isActive && (
                        <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-maroon" />
                      )}
                    </>
                  )}
                </NavLink>
              </div>
            ),
          )}

          {/* Mega panels — one absolutely-positioned sheet under the bar */}
          {openMenu && (
            <div
              className="absolute inset-x-0 top-full z-40 animate-fade border-t border-maroon/10 bg-white shadow-lift"
              onMouseEnter={() => openWithIntent(openMenu)}
              onMouseLeave={closeWithIntent}
            >
              <div className="container-page py-7">
                {openMenu === 'venues' && (
                  <MegaGrid
                    title="Wedding Venues"
                    href="/venues"
                    items={VENUE_TYPES.map((t) => ({ label: t.title, href: `/venues?type=${t.slug}` }))}
                  />
                )}
                {openMenu === 'vendors' && (
                  <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                    {CATEGORY_GROUPS.slice(1, 9).map((g) => (
                      <div key={g.title}>
                        <Link
                          to={g.href}
                          className="text-sm font-semibold text-ink hover:text-maroon"
                        >
                          {g.title}
                        </Link>
                        <ul className="mt-2 space-y-1.5">
                          {g.items.map((i) => (
                            <li key={i.label}>
                              <Link to={i.href} className="text-sm text-ink-muted hover:text-maroon">
                                {i.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {openMenu === 'photos' && (
                  <MegaGrid
                    title="Inspiration Gallery"
                    href="/photos"
                    items={PHOTO_ALBUMS.map((a) => ({
                      label: a.title,
                      href: `/photos?album=${a.slug}`,
                    }))}
                  />
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            to="/vendors"
            aria-label="Search vendors"
            className="hidden h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-maroon/5 hover:text-maroon sm:grid"
          >
            <Search size={18} />
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="hidden rounded-full bg-maroon px-5 py-2 text-sm font-medium text-ivory transition-colors hover:bg-maroon-800 lg:inline-flex"
            >
              Log In
            </Link>
          ) : (
            <div className="relative hidden lg:block" ref={accountRef}>
              <button
                onClick={() => setAccountOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-maroon/15 py-1.5 pl-1.5 pr-3 text-sm transition-colors hover:border-maroon/35"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-maroon text-ivory">
                  {user.role === 'admin' ? <Shield size={14} /> : <User size={14} />}
                </span>
                <span className="max-w-[8rem] truncate font-medium text-ink">{user.name}</span>
                <ChevronDown
                  size={15}
                  className={`text-ink-muted transition-transform ${accountOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-56 animate-fade overflow-hidden rounded-xl border border-maroon/10 bg-white shadow-lift">
                  <div className="border-b border-maroon/10 px-4 py-3">
                    <p className="truncate text-sm font-medium text-ink">{user.email}</p>
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

          <button
            className="grid h-10 w-10 place-items-center rounded-full text-maroon hover:bg-maroon/5 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------- mobile drawer */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] animate-fade overflow-y-auto border-t border-maroon/10 bg-white lg:hidden">
          <nav className="container-page flex flex-col py-3">
            <div className="mb-2 flex items-center gap-2 rounded-lg bg-maroon/5 px-3 py-2.5 text-sm">
              <MapPin size={16} className="text-maroon" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 bg-transparent font-medium text-maroon focus:outline-none"
              >
                {CITY_GROUPS.flatMap((g) => g.cities).map((c, i) => (
                  <option key={`${c}-${i}`} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

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
                {l.label === 'Genie' && <Sparkles size={16} className="text-gold-600" />}
                {l.label}
              </NavLink>
            ))}

            <div className="my-2 h-px bg-maroon/10" />

            <Link to="/vendors" className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-ink-soft">
              <Star size={16} className="text-gold-600" /> Write A Review
            </Link>
            <Link to="/plan" className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-ink-soft">
              <Smartphone size={16} className="text-gold-600" /> Download App
            </Link>

            <div className="my-2 h-px bg-maroon/10" />

            {!user ? (
              <Link to="/login" className="btn-primary w-full">
                Log In
              </Link>
            ) : (
              <>
                <Link
                  to={dashHref}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-ink-soft"
                >
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

/** Four-column link sheet used by the Venues and Photos mega menus. */
function MegaGrid({
  title,
  href,
  items,
}: {
  title: string
  href: string
  items: { label: string; href: string }[]
}) {
  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        <Link to={href} className="text-sm font-medium text-maroon hover:text-maroon-800">
          View all &rarr;
        </Link>
      </div>
      <ul className="grid grid-cols-4 gap-x-8 gap-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.href} className="text-sm text-ink-soft hover:text-maroon">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
