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
import { categoryIcon } from '../lib/categoryIcons'

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

/** Non-category rows in the mobile drawer, below the categories block. */
const DRAWER_SECTIONS = [
  { to: '/photos', label: 'Photos' },
  { to: '/real-weddings', label: 'Real Weddings' },
  { to: '/blog', label: 'Blogs' },
  { to: '/collections', label: 'Jewellery' },
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
  // Which category accordion is expanded in the mobile drawer (one at a time)
  const [openCategory, setOpenCategory] = useState<string | null>(null)

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
            <span className={`transition-transform duration-200 ${cityOpen ? 'rotate-180' : ''}`}>
              <ChevronDown size={14} />
            </span>
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
                <span
                  className={`text-ink-muted transition-transform duration-200 ${
                    accountOpen ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown size={15} />
                </span>
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
        <>
          {/* Anchored to the header rather than the viewport, so the drawer
              still lines up when the app-install banner sits above it. */}
          <div
            className="absolute left-0 top-full z-40 h-screen w-screen bg-ink/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          <div className="absolute left-0 top-full z-50 h-[calc(100vh-4rem)] w-[86%] max-w-sm animate-fade overflow-y-auto overscroll-contain bg-white shadow-lift lg:hidden">
            <nav className="flex flex-col pb-10">
              {/* Account */}
              {!user ? (
                <Link
                  to="/login"
                  className="flex items-center gap-3 border-b border-ink/10 px-5 py-4 text-base font-semibold text-ink"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-maroon/10 text-maroon">
                    <User size={18} />
                  </span>
                  Sign In / Sign Up
                </Link>
              ) : (
                <Link
                  to={dashHref}
                  className="flex items-center gap-3 border-b border-ink/10 px-5 py-4 text-base font-semibold text-ink"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-maroon text-ivory">
                    {user.role === 'admin' ? <Shield size={16} /> : <User size={16} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate">{user.name}</span>
                    <span className="block text-xs font-normal text-ink-muted">
                      {user.role === 'admin' ? 'Admin panel' : 'My dashboard'}
                    </span>
                  </span>
                </Link>
              )}

              {/* City */}
              <label className="flex items-center gap-3 border-b border-ink/10 px-5 py-3.5 text-sm">
                <MapPin size={18} className="shrink-0 text-maroon" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent font-medium text-ink focus:outline-none"
                >
                  {CITY_GROUPS.flatMap((g) => g.cities).map((c, i) => (
                    <option key={`${c}-${i}`} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              {/* Wedding categories — each row expands to its sub-links */}
              <p className="px-5 pb-1 pt-5 text-base font-bold text-ink">Wedding Categories</p>
              {CATEGORY_GROUPS.map((g) => {
                const Icon = categoryIcon(g.icon)
                const open = openCategory === g.title
                return (
                  <div key={g.title} className="border-b border-ink/[0.07]">
                    <button
                      onClick={() => setOpenCategory(open ? null : g.title)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-3 px-5 py-3.5 text-left"
                    >
                      <Icon size={20} className="shrink-0 text-ink-muted" />
                      <span className="flex-1 text-[15px] font-medium text-ink">{g.title}</span>
                      {/* Rotate a span, not the <svg>: Tailwind's transform
                          utilities don't resolve on SVG elements here. */}
                      <span
                        className={`shrink-0 text-ink-muted transition-transform duration-200 ${
                          open ? 'rotate-180' : ''
                        }`}
                      >
                        <ChevronDown size={18} />
                      </span>
                    </button>
                    {open && (
                      <ul className="animate-fade pb-2">
                        {g.items.map((i) => (
                          <li key={i.label}>
                            <Link
                              to={i.href}
                              className="block py-2.5 pl-[3.5rem] pr-5 text-sm text-ink-soft"
                            >
                              {i.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}

              {/* Sections */}
              <div className="mt-2 border-t-8 border-ink/[0.06]" />
              {DRAWER_SECTIONS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 border-b border-ink/[0.07] px-5 py-3.5 text-[15px] font-medium ${
                      isActive ? 'text-maroon' : 'text-ink'
                    }`
                  }
                >
                  {l.label === 'Genie' && <Sparkles size={16} className="text-maroon" />}
                  {l.label}
                </NavLink>
              ))}

              {/* Utility */}
              <div className="mt-2 border-t-8 border-ink/[0.06]" />
              <Link
                to="/vendors"
                className="border-b border-ink/[0.07] px-5 py-3.5 text-[15px] font-medium text-ink"
              >
                Write a Review
              </Link>
              <Link
                to="/plan"
                className="border-b border-ink/[0.07] px-5 py-3.5 text-[15px] font-medium text-ink"
              >
                Download the App
              </Link>

              {/* Legal */}
              <div className="mt-2 border-t-8 border-ink/[0.06]" />
              {[
                { to: '/plan', label: 'About' },
                { to: '/plan', label: 'Terms & Conditions' },
                { to: '/plan', label: 'Privacy Policy' },
                { to: '/plan', label: 'Contact Us' },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="px-5 py-2.5 text-sm text-ink-soft">
                  {l.label}
                </Link>
              ))}

              {user && (
                <button
                  onClick={handleLogout}
                  className="mt-3 flex items-center gap-2 px-5 py-3 text-left text-[15px] font-medium text-maroon"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              )}
            </nav>
          </div>
        </>
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
