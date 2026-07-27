import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Brush,
  Building2,
  Camera,
  Check,
  ChevronRight,
  Circle,
  Flower2,
  Gem,
  Hand,
  Mail,
  MapPin,
  Music,
  Plane,
  Search,
  Shirt,
  Smartphone,
  Sparkles,
  Star,
  UtensilsCrossed,
  Users,
  Video,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import SmartImage from '../components/SmartImage'
import Rail, { SectionHead } from '../components/Rail'
import { useStore } from '../store/StoreContext'
import { useCity } from '../store/CityContext'
import { usePageTitle } from '../lib/usePageTitle'
import { formatINR } from '../lib/format'
import { categories, categoryName } from '../data/categories'
import type { Collection, Vendor } from '../data/types'
import { hero, PHOTOS } from '../lib/images'
import {
  ALL_CITIES,
  BLOG_POSTS,
  CATEGORY_GROUPS,
  GALLERY_TILES,
  HERO_LINKS,
  INHOUSE_SERVICES,
  POPULAR_SEARCHES,
  REAL_WEDDINGS,
  VENUE_SEARCHES,
} from '../data/wmg'

export default function Home() {
  usePageTitle('Weddings, Indian Wedding Planning Online')
  const { approvedVendors, collections } = useStore()

  const featured = [...approvedVendors]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
    .slice(0, 8)

  return (
    <>
      <Hero />
      <PlanAssistant />
      <PopularVenueSearches />
      <InhouseServices />
      <PopularSearchesRow />
      <WeddingCategories />
      <AppBanner />
      <RealWeddingStories />
      <LatestBlogs />
      <GalleryToLookFor />
      <JewelleryShowcase collections={collections} />
      <FeaturedVendors vendors={featured} />
    </>
  )
}

/* -------------------------------------------------------------------- hero */

function Hero() {
  const navigate = useNavigate()
  const { city, setCity } = useCity()
  const [vendorType, setVendorType] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (vendorType) params.set('category', vendorType)
    if (city) params.set('city', city)
    navigate(`/vendors?${params.toString()}`)
  }

  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img
          src={hero(PHOTOS.couple[0], 1920, 900)}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-950/70 via-maroon-950/45 to-maroon-950/75" />
      </div>

      <div className="container-page relative flex min-h-[30rem] flex-col items-center justify-center py-20 text-center sm:min-h-[34rem]">
        <Link
          to="/plan"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-200 backdrop-blur-sm transition-colors hover:bg-gold hover:text-ink"
        >
          <Sparkles size={13} />
          Free Planning Assistant
          <ArrowRight size={13} />
        </Link>

        <h1 className="font-display text-4xl font-semibold leading-tight text-ivory drop-shadow-sm sm:text-5xl lg:text-6xl">
          Your Wedding, Your Way
        </h1>
        <p className="mt-4 max-w-xl text-base text-ivory/85 sm:text-lg">
          Find the best wedding vendors with thousands of trusted reviews
        </p>

        {/* Search bar */}
        <form
          onSubmit={submit}
          className="mt-9 flex w-full max-w-3xl flex-col gap-2 rounded-2xl bg-white/95 p-2 shadow-lift backdrop-blur sm:flex-row sm:rounded-full"
        >
          <label className="flex flex-1 items-center gap-2 rounded-full px-4 py-3 sm:py-2">
            <Search size={17} className="shrink-0 text-maroon" />
            <span className="sr-only">Vendor type</span>
            <select
              value={vendorType}
              onChange={(e) => setVendorType(e.target.value)}
              className="w-full bg-transparent text-sm text-ink focus:outline-none"
            >
              <option value="">Select vendor type</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <span className="hidden w-px self-stretch bg-maroon/10 sm:block" />

          <label className="flex flex-1 items-center gap-2 rounded-full px-4 py-3 sm:py-2">
            <MapPin size={17} className="shrink-0 text-maroon" />
            <span className="sr-only">City</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-transparent text-sm text-ink focus:outline-none"
            >
              {ALL_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="btn-primary shrink-0 sm:!px-8">
            Get Started
          </button>
        </form>

        {/* Popular searches */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-ivory/75">
          <span className="font-medium text-ivory">Popular Searches:</span>
          {HERO_LINKS.map((l, i) => (
            <span key={l.label} className="flex items-center gap-2">
              {i > 0 && <span className="opacity-40">·</span>}
              <Link to={l.href} className="underline-offset-4 hover:text-gold-200 hover:underline">
                {l.label}
              </Link>
            </span>
          ))}
        </div>
      </div>

      <p className="absolute bottom-3 right-5 text-[11px] text-ivory/50">
        Photo Credits: Bridezone Studio
      </p>
    </section>
  )
}

/* -------------------------------------------------------- planning assistant */

const DEFAULT_SERVICES = ['photography', 'catering', 'decor', 'venues']

const ASSISTANT_POINTS = [
  'One matched vendor for every service you need',
  'Every pick priced against your budget, not guesswork',
  'Instant results — no sign-up, no waiting on callbacks',
]

/**
 * The site's headline feature. This quick-start collects the same four inputs
 * the assistant needs and deep-links into /plan, which auto-runs the match on
 * arrival — so the visitor lands straight on their results.
 */
function PlanAssistant() {
  const navigate = useNavigate()
  const { city } = useCity()
  const [budget, setBudget] = useState(500000)
  const [guests, setGuests] = useState(250)
  const [services, setServices] = useState<string[]>(DEFAULT_SERVICES)

  const toggle = (slug: string) =>
    setServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      budget: String(budget),
      guests: String(guests),
      location: city,
      services: services.join(','),
    })
    navigate(`/plan?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-maroon-950 text-ivory">
      {/* Soft gold wash so the band reads as the page's feature moment */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-maroon-600/30 blur-3xl"
      />

      <div className="container-page relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">
            <Sparkles size={12} /> The Planning Assistant
          </span>

          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl">
            Your whole wedding, matched to your budget
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ivory/75">
            Tell us your budget, city and the services you need. The assistant splits the budget
            across them and picks the best-fitting vendor for each — in seconds.
          </p>

          <ul className="mt-7 space-y-3">
            {ASSISTANT_POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-ivory/85">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-ink">
                  <Check size={12} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick-start */}
        <form
          onSubmit={submit}
          className="rounded-2xl border border-ivory/15 bg-ivory/10 p-6 shadow-lift backdrop-blur-sm sm:p-7"
        >
          <h3 className="font-display text-xl font-semibold text-ivory">Start in 10 seconds</h3>

          <div className="mt-6">
            <label className="flex items-center justify-between text-sm text-ivory/80">
              <span className="flex items-center gap-2">
                <Wallet size={15} className="text-gold-300" /> Total budget
              </span>
              <span className="font-display text-lg font-semibold text-gold-200">
                {formatINR(budget)}
              </span>
            </label>
            <input
              type="range"
              min={100000}
              max={2000000}
              step={50000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-3 w-full accent-gold"
            />
          </div>

          <div className="mt-5">
            <label className="flex items-center justify-between text-sm text-ivory/80">
              <span className="flex items-center gap-2">
                <Users size={15} className="text-gold-300" /> Guests
              </span>
              <span className="font-semibold text-ivory">{guests}</span>
            </label>
            <input
              type="range"
              min={50}
              max={1000}
              step={50}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-3 w-full accent-gold"
            />
          </div>

          <div className="mt-6">
            <p className="mb-2.5 flex items-center gap-2 text-sm text-ivory/80">
              <MapPin size={15} className="text-gold-300" /> Services you need in{' '}
              <span className="font-semibold text-ivory">{city}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const on = services.includes(c.slug)
                return (
                  <button
                    type="button"
                    key={c.slug}
                    onClick={() => toggle(c.slug)}
                    aria-pressed={on}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                      on
                        ? 'border-gold bg-gold text-ink'
                        : 'border-ivory/25 text-ivory/75 hover:border-gold/60 hover:text-ivory'
                    }`}
                  >
                    {c.name}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={!services.length}
            className="btn-gold mt-7 w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={16} /> Match my wedding
          </button>
          {!services.length && (
            <p className="mt-2 text-center text-xs text-gold-200">Pick at least one service.</p>
          )}
        </form>
      </div>
    </section>
  )
}

/* --------------------------------------------------- popular venue searches */

function PopularVenueSearches() {
  return (
    <section className="border-b border-maroon/10 bg-white">
      <div className="container-page py-12">
        <SectionHead title="Popular Venue Searches" href="/venues" />
        <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {VENUE_SEARCHES.map((g) => (
            <div key={g.title} className="border-l-2 border-gold/40 pl-4">
              <Link to={g.href} className="text-sm font-semibold text-ink hover:text-maroon">
                {g.title}
              </Link>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-sm text-ink-muted">
                {g.cities.map((c) => (
                  <span key={c} className="flex items-center gap-1.5">
                    <Link to={`${g.href}&city=${c}`} className="hover:text-maroon">
                      {c}
                    </Link>
                    <span className="opacity-40">|</span>
                  </span>
                ))}
                <Link to={g.href} className="font-medium text-maroon hover:underline">
                  More
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ in-house */

function InhouseServices() {
  return (
    <section className="bg-ivory">
      <div className="container-page py-12">
        <SectionHead
          title="Bridezone Inhouse Services"
          subtitle="Handled end-to-end by our own team"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INHOUSE_SERVICES.map((s) => (
            <Link key={s.id} to={s.href} className="card card-hover group flex overflow-hidden">
              <SmartImage
                src={s.image}
                alt={s.name}
                seed={s.id}
                ratio="aspect-square"
                className="w-32 shrink-0 sm:w-36"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col justify-center p-5">
                <h3 className="font-display text-lg font-semibold text-ink group-hover:text-maroon">
                  {s.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-maroon">
                  Know More <ChevronRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------- popular searches row */

function PopularSearchesRow() {
  return (
    <section className="bg-white">
      <div className="container-page py-12">
        <SectionHead title="Popular Searches" />
        <Rail>
          {POPULAR_SEARCHES.map((p) => (
            <Link
              key={p.label}
              to={p.href}
              className="group flex w-28 shrink-0 snap-start flex-col items-center gap-3 sm:w-32"
            >
              <SmartImage
                src={p.image}
                alt={p.label}
                seed={p.label}
                ratio="aspect-square"
                className="w-full rounded-full ring-2 ring-gold/30 transition-all duration-300 group-hover:ring-4 group-hover:ring-gold/60"
                imgClassName="transition-transform duration-500 group-hover:scale-110"
              />
              <span className="text-center text-sm font-medium leading-snug text-ink-soft group-hover:text-maroon">
                {p.label}
              </span>
            </Link>
          ))}
        </Rail>
      </div>
    </section>
  )
}

/* ------------------------------------------------------ wedding categories */

// Only the icons the category data actually names — a namespace import would
// pull the whole lucide set into the bundle.
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Brush,
  Building2,
  Camera,
  Flower2,
  Gem,
  Hand,
  Mail,
  Music,
  Plane,
  Shirt,
  UtensilsCrossed,
  Video,
}

function WeddingCategories() {
  return (
    <section className="bg-ivory-100">
      <div className="container-page py-12">
        <SectionHead title="Wedding Categories" href="/vendors" linkLabel="View all Categories" />
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_GROUPS.map((g) => {
            const Icon = CATEGORY_ICONS[g.icon] ?? Circle
            return (
              <div key={g.title} className="rounded-xl bg-white p-5 shadow-card ring-1 ring-ink/5">
                <Link to={g.href} className="group flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-maroon/10 text-maroon">
                    <Icon size={17} />
                  </span>
                  <span className="font-display text-base font-semibold text-ink group-hover:text-maroon">
                    {g.title}
                  </span>
                  <ChevronRight size={15} className="text-ink-muted group-hover:text-maroon" />
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {g.items.map((i, idx) => (
                    <span key={i.label}>
                      {idx > 0 && ', '}
                      <Link to={i.href} className="hover:text-maroon hover:underline">
                        {i.label}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- app banner */

function AppBanner() {
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (phone.trim().length < 6) return
    setSent(true)
    setPhone('')
  }

  const perks = ['Save Wedding Ideas', 'Shortlist Vendors', 'Get Free Wedding Checklist']

  return (
    <section className="bg-maroon-800 text-ivory">
      <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ivory sm:text-3xl">
            Download The Bridezone Mobile App Today!
          </h2>
          <ul className="mt-6 space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm sm:text-base">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-ink">
                  <Check size={14} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          {sent ? (
            <p className="mt-7 inline-flex items-center gap-2 rounded-lg bg-ivory/10 px-4 py-3 text-sm text-gold-200">
              <Check size={16} /> Sent! Check your SMS for the download link.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-7 flex max-w-md flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-ivory/25 bg-ivory/10 px-3.5">
                <Smartphone size={16} className="shrink-0 text-gold-300" />
                <span className="text-sm text-ivory/60">+91</span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full bg-transparent py-2.5 text-sm text-ivory placeholder:text-ivory/45 focus:outline-none"
                />
              </div>
              <button type="submit" className="btn-gold shrink-0">
                Send Link
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-ivory/55">
            You will receive an SMS with a link to download the app
          </p>
        </div>

        {/* Phone mock-up */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-56 rounded-[2.25rem] border-4 border-ivory/25 bg-maroon-950 p-2 shadow-lift sm:w-64">
            <span className="absolute left-1/2 top-3 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-ivory/25" />
            <SmartImage
              src={hero(PHOTOS.bride[0], 600, 1000)}
              alt="Bridezone app"
              seed="app-mock"
              ratio="aspect-[9/16]"
              className="overflow-hidden rounded-[1.75rem]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- real weddings */

function RealWeddingStories() {
  return (
    <section className="bg-white">
      <div className="container-page py-12">
        <SectionHead title="Real Wedding Stories" href="/real-weddings" />
        <Rail>
          {REAL_WEDDINGS.map((w) => (
            <Link
              key={w.id}
              to="/real-weddings"
              className="card card-hover group flex w-72 shrink-0 snap-start flex-col overflow-hidden sm:w-80"
            >
              <SmartImage
                src={w.image}
                alt={w.couple}
                seed={w.id}
                ratio="aspect-[4/3]"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold text-ink group-hover:text-maroon">
                  {w.couple}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                  {w.headline}
                </p>
                <p className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
                  <MapPin size={13} className="text-gold-600" />
                  {w.city}
                  <span className="opacity-40">·</span>
                  {w.date}
                </p>
              </div>
            </Link>
          ))}
        </Rail>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- latest blogs */

function LatestBlogs() {
  return (
    <section className="bg-ivory">
      <div className="container-page py-12">
        <SectionHead title="Latest Blogs" href="/blog" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((b) => (
            <Link key={b.id} to="/blog" className="card card-hover group flex flex-col overflow-hidden">
              <SmartImage
                src={b.image}
                alt={b.title}
                seed={b.id}
                ratio="aspect-[16/10]"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col p-5">
                <span className="eyebrow">{b.category}</span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink group-hover:text-maroon">
                  {b.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">{b.excerpt}</p>
                <p className="mt-4 text-xs text-ink-muted">{b.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- gallery */

function GalleryToLookFor() {
  return (
    <section className="bg-white">
      <div className="container-page py-12">
        <SectionHead title="Gallery to Look for" href="/photos" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {GALLERY_TILES.map((t) => (
            <Link key={t.label} to={t.href} className="group relative overflow-hidden rounded-xl">
              <SmartImage
                src={t.image}
                alt={t.label}
                seed={t.label}
                ratio="aspect-[4/5]"
                imgClassName="transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-maroon-950/85 via-maroon-950/10 to-transparent" />
              <span className="absolute inset-x-3 bottom-3 text-center text-sm font-semibold text-ivory">
                {t.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------ jewellery showcase */

function JewelleryShowcase({ collections }: { collections: Collection[] }) {
  if (!collections.length) return null

  // Featured pieces lead the rail; the rest follow in their authored order.
  const ordered = [...collections].sort((a, b) => Number(b.featured) - Number(a.featured))
  const [lead, ...rest] = ordered

  return (
    <section className="bg-maroon-900 text-ivory">
      <div className="container-page py-14">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">
              <Gem size={12} /> Bridal Jewellery
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-ivory sm:text-[28px]">
              The Jewellery Collections
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ivory/70">
              Temple gold, uncut polki and heirloom kasu malas — curated sets you can enquire on
              directly.
            </p>
          </div>
          <Link
            to="/collections"
            className="shrink-0 rounded-full border border-gold/50 px-5 py-2.5 text-sm font-semibold text-gold-200 transition-colors hover:bg-gold hover:text-ink"
          >
            View all collections &rarr;
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Lead collection */}
          <Link
            to={`/collections/${lead.id}`}
            className="group relative overflow-hidden rounded-2xl ring-1 ring-ivory/15"
          >
            <SmartImage
              src={lead.images[0]}
              alt={lead.name}
              seed={lead.id}
              ratio="aspect-[4/3] lg:aspect-[16/11]"
              imgClassName="transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/35 to-transparent" />
            <div className="absolute inset-x-6 bottom-6">
              <span className="badge-featured">
                <Sparkles size={12} /> Signature set
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ivory">{lead.name}</h3>
              <p className="mt-1.5 max-w-md text-sm text-ivory/80">{lead.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-200">
                Explore the {lead.pieces.length} pieces <ArrowRight size={15} />
              </span>
            </div>
          </Link>

          {/* Supporting grid */}
          <div className="grid grid-cols-2 gap-6">
            {rest.slice(0, 4).map((c) => (
              <Link
                key={c.id}
                to={`/collections/${c.id}`}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-ivory/15"
              >
                <SmartImage
                  src={c.images[0]}
                  alt={c.name}
                  seed={c.id}
                  ratio="aspect-[4/5]"
                  imgClassName="transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/20 to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-200">
                    {c.type}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold leading-snug text-ivory">
                    {c.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------- featured vendors */

function FeaturedVendors({ vendors }: { vendors: Vendor[] }) {
  if (!vendors.length) return null

  return (
    <section className="bg-ivory-100">
      <div className="container-page py-12">
        <SectionHead title="Featured Vendors" href="/vendors" />
        <Rail>
          {vendors.map((v) => (
            <Link
              key={v.id}
              to={`/vendors/${v.id}`}
              className="card card-hover group flex w-64 shrink-0 snap-start flex-col overflow-hidden"
            >
              <div className="relative">
                <SmartImage
                  src={v.images[0]}
                  alt={v.name}
                  seed={v.id}
                  ratio="aspect-[4/3]"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-xs font-bold text-maroon shadow-sm">
                  <Star size={12} className="fill-gold text-gold" />
                  {v.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-1 font-display text-base font-semibold text-ink group-hover:text-maroon">
                  {v.name}
                </h3>
                <p className="mt-1 line-clamp-1 text-xs text-ink-muted">
                  {categoryName(v.category)}, {v.location}
                </p>
                <p className="mt-3 font-display text-base font-semibold text-maroon">
                  {formatINR(v.startingPrice)}
                  <span className="text-xs font-normal text-ink-muted"> onwards</span>
                </p>
              </div>
            </Link>
          ))}
        </Rail>
      </div>
    </section>
  )
}
