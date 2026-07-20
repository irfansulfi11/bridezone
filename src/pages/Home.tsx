import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Gem,
  Heart,
  ListChecks,
  MapPin,
  Search,
  Smartphone,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import { useStore } from '../store/StoreContext'
import SectionHeading, { GoldRule } from '../components/SectionHeading'
import SmartImage from '../components/SmartImage'
import VendorCard from '../components/VendorCard'
import { LOCATIONS } from '../data/categories'
import { formatINR } from '../lib/format'
import type { CategorySlug } from '../data/types'
import { PHOTOS, unsplash } from '../lib/images'

/* ── Static page content ──────────────────────────────────────────────
   Editorial copy that has no home in the vendor/collection data.
   Kept local to the page so it's easy to swap for real content later. */

const VENUE_SEARCHES = [
  {
    title: 'Backwater Resorts',
    image: unsplash(PHOTOS.venue[0], 700, 520),
    cities: ['Kochi', 'Kollam', 'Trivandrum'],
  },
  {
    title: 'Banquet Halls',
    image: unsplash(PHOTOS.venue[1], 700, 520),
    cities: ['Kochi', 'Calicut', 'Trivandrum'],
  },
  {
    title: 'Heritage Lawns',
    image: unsplash(PHOTOS.venue[2], 700, 520),
    cities: ['Trivandrum', 'Calicut', 'Kochi'],
  },
]

// Services offered by the Planning Assistant quick-start on the home page.
const QUICK_SERVICES: { slug: CategorySlug; label: string }[] = [
  { slug: 'venues', label: 'Venue' },
  { slug: 'photography', label: 'Photography' },
  { slug: 'catering', label: 'Catering' },
  { slug: 'decor', label: 'Decor' },
  { slug: 'makeup', label: 'Makeup' },
  { slug: 'music', label: 'Music' },
]

const ASSISTANT_STEPS = [
  { icon: Wallet, title: 'Set your budget', text: 'Tell us your total spend and city — no sign-up needed.' },
  { icon: ListChecks, title: 'Pick your services', text: 'Choose what you need: venue, photos, catering, decor and more.' },
  { icon: Sparkles, title: 'Get matched instantly', text: 'We shortlist a vendor for every service, tuned to fit your budget.' },
]

const CATEGORY_GROUPS = [
  {
    group: 'Venues',
    items: [
      'Backwater Resorts',
      'Banquet Halls',
      'Heritage Lawns',
      'Beach Venues',
      'Temple Halls',
      'Convention Centres',
    ],
    to: '/vendors?category=venues',
  },
  {
    group: 'Photography',
    items: ['Candid Photography', 'Cinematic Films', 'Pre-Wedding Shoots', 'Drone Coverage'],
    to: '/vendors?category=photography',
  },
  {
    group: 'Makeup',
    items: ['Bridal Makeup', 'Hair Styling', 'Family Makeup', 'Saree Draping'],
    to: '/vendors?category=makeup',
  },
  {
    group: 'Planning & Decor',
    items: ['Mandap Decor', 'Floral Design', 'Lighting', 'Wedding Planners'],
    to: '/vendors?category=decor',
  },
  {
    group: 'Catering',
    items: ['Traditional Sadhya', 'Live Counters', 'Malabar Cuisine', 'Dessert Tables'],
    to: '/vendors?category=catering',
  },
  {
    group: 'Music',
    items: ['Chenda Melam', 'Live Bands', 'Wedding DJs', 'Classical Ensembles'],
    to: '/vendors?category=music',
  },
]

const REAL_WEDDINGS = [
  {
    couple: 'Ananya & Rohit',
    date: 'January 2026',
    blurb: 'A backwater sunset ceremony in Alleppey, with a sadhya for three hundred guests.',
    image: unsplash(PHOTOS.couple[0], 700, 560),
  },
  {
    couple: 'Meera & Arjun',
    date: 'December 2025',
    blurb: 'Temple vows in Trivandrum followed by a candlelit reception on the terrace.',
    image: unsplash(PHOTOS.couple[1], 700, 560),
  },
  {
    couple: 'Divya & Nikhil',
    date: 'November 2025',
    blurb: 'Two days, two states — a Malabar nikah and a Kochi reception in kasavu and gold.',
    image: unsplash(PHOTOS.couple[2], 700, 560),
  },
]

const BLOGS = [
  {
    tag: 'Bridal Wear',
    title: 'Kasavu, reimagined: 12 modern takes on the Kerala bridal saree',
    date: '8 Jul 2026',
    image: unsplash(PHOTOS.makeup[0], 700, 480),
  },
  {
    tag: 'Planning',
    title: 'What a ₹15 lakh Kerala wedding actually covers in 2026',
    date: '2 Jul 2026',
    image: unsplash(PHOTOS.decor[0], 700, 480),
  },
  {
    tag: 'Jewellery',
    title: 'Temple jewellery vs polki: how to choose your bridal set',
    date: '24 Jun 2026',
    image: unsplash(PHOTOS.jewellery[0], 700, 480),
  },
]

const GALLERIES = [
  { title: 'Bridal Lehenga', image: unsplash(PHOTOS.makeup[1], 500, 620), count: '2.4k photos' },
  { title: 'Kasavu Sarees', image: unsplash(PHOTOS.couple[3], 500, 620), count: '1.8k photos' },
  { title: 'Mandap Decor', image: unsplash(PHOTOS.decor[1], 500, 620), count: '3.1k photos' },
  { title: 'Blouse Designs', image: unsplash(PHOTOS.makeup[2], 500, 620), count: '960 photos' },
  { title: 'Mehndi Designs', image: unsplash(PHOTOS.decor[2], 500, 620), count: '1.2k photos' },
  { title: 'Bridal Jewellery', image: unsplash(PHOTOS.jewellery[1], 500, 620), count: '2.0k photos' },
]

const APP_PERKS = [
  { icon: Bookmark, text: 'Save ideas from every gallery to one moodboard' },
  { icon: Heart, text: 'Shortlist vendors and compare them side by side' },
  { icon: ListChecks, text: 'Track your checklist and budget as the date nears' },
]

export default function Home() {
  usePageTitle('')
  const { approvedVendors, categories, collections } = useStore()
  const navigate = useNavigate()

  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [showAllCategories, setShowAllCategories] = useState(false)

  // ── Planning Assistant quick-start (deep-links into the working /plan page) ──
  const [planBudget, setPlanBudget] = useState(500000)
  const [planCity, setPlanCity] = useState<string>('Kochi')
  const [planServices, setPlanServices] = useState<CategorySlug[]>([
    'venues',
    'photography',
    'catering',
    'decor',
  ])

  const toggleService = (slug: CategorySlug) =>
    setPlanServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )

  const startPlanning = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      budget: String(planBudget),
      location: planCity,
      services: planServices.join(','),
    })
    navigate(`/plan?${params.toString()}`)
  }

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (location) params.set('location', location)
    navigate(`/vendors?${params.toString()}`)
  }

  const featured = [...approvedVendors]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
    .slice(0, 4)

  const featuredCollections = [...collections]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 4)

  const visibleGroups = showAllCategories ? CATEGORY_GROUPS : CATEGORY_GROUPS.slice(0, 3)

  return (
    <div className="animate-fade-in">
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative isolate overflow-hidden">
        <img
          src={unsplash(PHOTOS.venue[3], 1920, 1100)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-maroon-950/80 via-maroon-900/70 to-maroon-950/85" />

        <div className="container-page py-20 text-center sm:py-28 lg:py-32">
          <p className="eyebrow flex items-center justify-center gap-2 text-gold-200">
            <Sparkles size={14} className="text-gold-300" /> Kerala’s Wedding Atelier
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-ivory sm:text-5xl lg:text-6xl">
            Your wedding, <span className="italic text-gold-200">your way.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg">
            Find and book Kerala’s most-loved photographers, caterers, decorators and venues —
            with honest pricing and reviews you can trust.
          </p>

          {/* Dual-dropdown search */}
          <form
            onSubmit={submitSearch}
            className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-3 rounded-2xl bg-ivory/95 p-3 shadow-lift backdrop-blur-sm sm:flex-row sm:items-center sm:rounded-full sm:p-2"
          >
            <label className="relative flex-1">
              <span className="sr-only">Vendor category</span>
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-full bg-transparent py-3 pl-11 pr-9 text-sm text-ink focus:outline-none"
              >
                <option value="">All vendor types</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
              />
            </label>

            <span className="hidden h-7 w-px bg-ink/10 sm:block" />

            <label className="relative flex-1">
              <span className="sr-only">City</span>
              <MapPin
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none rounded-full bg-transparent py-3 pl-11 pr-9 text-sm text-ink focus:outline-none"
              >
                <option value="">All cities</option>
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
              />
            </label>

            <button type="submit" className="btn-primary shrink-0 sm:!px-7">
              Get Started <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-5 text-xs tracking-wide text-ivory/50">
            {approvedVendors.length} vendors listed across {LOCATIONS.length} cities
          </p>
        </div>
      </section>

      {/* ═════════════ Planning Assistant — the main highlight ═════════════ */}
      <section className="relative overflow-hidden bg-maroon-950">
        {/* Warm radial glow + faint texture behind the highlight */}
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(60%_60%_at_15%_0%,rgba(214,178,94,0.22),transparent_60%)]" />
        <div className="pointer-events-none absolute -right-24 -top-24 -z-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="container-page relative py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_460px]">
            {/* Left — pitch + how it works */}
            <div>
              <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 text-gold-200">
                <Sparkles size={14} className="text-gold-300" /> The Planning Assistant
              </p>
              <h2 className="mt-5 max-w-xl font-display text-3xl font-semibold leading-[1.12] text-ivory sm:text-4xl lg:text-5xl">
                Your whole wedding,{' '}
                <span className="italic text-gold-200">matched to your budget.</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ivory/70">
                Tell us your budget, city and the services you need. Our assistant instantly
                shortlists the right vendor for every single service — no sign-up, no waiting,
                right here in your browser.
              </p>

              <ol className="mt-9 space-y-5">
                {ASSISTANT_STEPS.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-4">
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-200 ring-1 ring-gold/30">
                      <s.icon size={18} />
                      <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-gold text-[11px] font-bold text-maroon-950">
                        {i + 1}
                      </span>
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold text-ivory">{s.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-ivory/60">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right — interactive quick-start that deep-links into live results */}
            <form
              onSubmit={startPlanning}
              className="rounded-3xl bg-ivory p-6 shadow-lift ring-1 ring-gold/20 sm:p-8"
            >
              <h3 className="font-display text-xl font-semibold text-ink">Start planning — free</h3>
              <p className="mt-1 text-sm text-ink-soft">Move the sliders, pick your services.</p>
              <GoldRule />

              {/* Budget */}
              <div className="mt-6">
                <label className="flex items-center justify-between text-sm font-medium text-ink-soft">
                  <span className="flex items-center gap-2">
                    <Wallet size={16} className="text-maroon" /> Total budget
                  </span>
                  <span className="font-display text-lg font-semibold text-maroon">
                    {formatINR(planBudget)}
                  </span>
                </label>
                <input
                  type="range"
                  min={100000}
                  max={2000000}
                  step={50000}
                  value={planBudget}
                  onChange={(e) => setPlanBudget(Number(e.target.value))}
                  className="mt-3 w-full accent-maroon"
                  aria-label="Total budget"
                />
                <div className="mt-1 flex justify-between text-xs text-ink-muted">
                  <span>₹1L</span>
                  <span>₹20L</span>
                </div>
              </div>

              {/* City */}
              <div className="mt-5">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-ink-soft">
                  <MapPin size={16} className="text-maroon" /> City
                </label>
                <select
                  className="field"
                  value={planCity}
                  onChange={(e) => setPlanCity(e.target.value)}
                  aria-label="City"
                >
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Services */}
              <div className="mt-5">
                <p className="mb-2 flex items-center gap-2 text-sm font-medium text-ink-soft">
                  <Users size={16} className="text-maroon" /> Services you need
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_SERVICES.map((s) => {
                    const on = planServices.includes(s.slug)
                    return (
                      <button
                        type="button"
                        key={s.slug}
                        onClick={() => toggleService(s.slug)}
                        aria-pressed={on}
                        className={`chip border px-3 py-1.5 transition ${
                          on
                            ? 'border-maroon bg-maroon text-ivory'
                            : 'border-maroon/20 text-ink-soft hover:border-maroon/40'
                        }`}
                      >
                        {on && <Check size={12} />}
                        {s.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={planServices.length === 0}
                className="btn-primary mt-7 w-full"
              >
                <Sparkles size={16} /> Match my wedding
              </button>
              {planServices.length === 0 ? (
                <p className="mt-2 text-center text-xs text-maroon-600">Pick at least one service.</p>
              ) : (
                <p className="mt-3 text-center text-xs text-ink-muted">
                  Free · instant · no sign-up required
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ═════════════ Jewellery Atelier — highlighted showcase ═════════════ */}
      <section className="bg-gradient-to-b from-maroon-50/60 to-ivory py-16 lg:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <Gem size={14} className="text-gold-500" /> The Jewellery Atelier
              </p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Heirloom bridal jewellery, <span className="italic text-maroon">made in-house.</span>
              </h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-ink-soft">
                Temple gold, uncut-diamond polki, meenakari and pearl — crafted to be worn on your
                muhurtham and remembered for generations.
              </p>
            </div>
            <Link to="/collections" className="btn-gold shrink-0">
              Explore the collection <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            {/* Signature featured piece — large editorial tile */}
            {featuredCollections[0] && (
              <Link
                to={`/collections/${featuredCollections[0].id}`}
                className="group relative overflow-hidden rounded-3xl ring-1 ring-gold/25"
              >
                <SmartImage
                  src={featuredCollections[0].images[0]}
                  alt={featuredCollections[0].name}
                  seed={featuredCollections[0].id}
                  ratio="aspect-[4/5] lg:aspect-auto lg:h-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="badge-featured">
                    <Sparkles size={12} /> Signature set
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ivory sm:text-3xl">
                    {featuredCollections[0].name}
                  </h3>
                  <p className="mt-1 max-w-sm text-sm text-ivory/75">
                    {featuredCollections[0].tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-200">
                    View the set{' '}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )}

            {/* Supporting collection cards — full-width horizontal cards, stacked
               on mobile/tablet; a single sidebar column on desktop. */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-1 lg:grid-rows-3 lg:gap-6">
              {featuredCollections.slice(1, 4).map((c) => (
                <Link
                  key={c.id}
                  to={`/collections/${c.id}`}
                  className="card card-hover group flex items-center gap-4 overflow-hidden p-3 pr-5"
                >
                  <span className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24">
                    <SmartImage
                      src={c.images[0]}
                      alt={c.name}
                      seed={c.id}
                      ratio="aspect-square"
                      imgClassName="transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <div className="min-w-0">
                    <span className="chip bg-maroon/5 text-maroon">{c.type}</span>
                    <h3 className="mt-1.5 truncate font-display text-lg font-semibold text-ink group-hover:text-maroon">
                      {c.name}
                    </h3>
                    <p className="truncate text-sm text-ink-soft">{c.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Popular venue searches ───────────────── */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Popular venue searches"
          title="Where will you say yes?"
          subtitle="The venue sets the tone for everything else — start here."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VENUE_SEARCHES.map((v) => (
            <article key={v.title} className="card card-hover group overflow-hidden">
              <Link to="/vendors?category=venues" className="block">
                <SmartImage
                  src={v.image}
                  alt={v.title}
                  seed={v.title}
                  ratio="aspect-[4/3]"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink">{v.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {v.cities.map((city) => (
                    <li key={city}>
                      <Link
                        to={`/vendors?category=venues&location=${encodeURIComponent(city)}`}
                        className="chip bg-maroon/5 text-maroon transition-colors hover:bg-maroon hover:text-ivory"
                      >
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────────────── Popular searches (category tiles) ───────────────── */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Popular searches"
          title="Browse by what you need"
        />
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/vendors?category=${c.slug}`}
              className="group text-center"
            >
              <SmartImage
                src={c.image}
                alt={c.name}
                seed={c.slug}
                ratio="aspect-square"
                className="rounded-full ring-1 ring-maroon/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-gold"
                imgClassName="transition-transform duration-500 group-hover:scale-110"
              />
              <h3 className="mt-3 font-display text-sm font-semibold text-ink group-hover:text-maroon">
                {c.name}
              </h3>
              <p className="mt-0.5 text-xs text-ink-muted">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────────── Wedding categories (expandable) ───────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Wedding categories" title="Everything, in one directory" />
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visibleGroups.map((g) => (
              <div key={g.group}>
                <h3 className="font-display text-lg font-semibold text-maroon">{g.group}</h3>
                <GoldRule />
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((item) => (
                    <li key={item}>
                      <Link
                        to={g.to}
                        className="text-sm text-ink-soft transition-colors hover:text-maroon"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAllCategories((o) => !o)}
              className="btn-outline"
              aria-expanded={showAllCategories}
            >
              {showAllCategories ? 'Show fewer categories' : 'Show all categories'}
              <ChevronDown
                size={16}
                className={`transition-transform ${showAllCategories ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* ───────────────── App promo ───────────────── */}
      <section className="container-page py-16 lg:py-20">
        <div className="overflow-hidden rounded-3xl bg-maroon-900">
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <p className="eyebrow flex items-center gap-2 text-gold-200">
                <Smartphone size={14} className="text-gold-300" /> Bridezone app
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-ivory sm:text-4xl">
                Plan it from your phone, in the queue at the tailor.
              </h2>
              <GoldRule />
              <ul className="mt-7 space-y-4">
                {APP_PERKS.map((p) => (
                  <li key={p.text} className="flex items-start gap-3 text-ivory/75">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-200">
                      <p.icon size={14} />
                    </span>
                    <span className="text-sm leading-relaxed">{p.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs italic text-ivory/40">
                Coming soon — this is a demo, the app isn’t published yet.
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <SmartImage
                src={unsplash(PHOTOS.couple[4], 700, 800)}
                alt="Bridezone app preview"
                seed="app-promo"
                ratio="aspect-[4/5]"
                className="rounded-2xl ring-1 ring-ivory/15"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Real weddings ───────────────── */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Real weddings"
          title="Stories from our couples"
          subtitle="Real budgets, real vendors, real days — told by the people who lived them."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REAL_WEDDINGS.map((w) => (
            <article key={w.couple} className="card group overflow-hidden">
              <SmartImage
                src={w.image}
                alt={`${w.couple}’s wedding`}
                seed={w.couple}
                ratio="aspect-[4/3]"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-gold-600">{w.date}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{w.couple}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────────────── Blogs ───────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="From the journal" title="Latest on the blog" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOGS.map((b) => (
              <article key={b.title} className="card group overflow-hidden">
                <SmartImage
                  src={b.image}
                  alt={b.title}
                  seed={b.title}
                  ratio="aspect-[16/10]"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-6">
                  <span className="chip bg-maroon/5 text-maroon">{b.tag}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-xs text-ink-muted">{b.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Galleries ───────────────── */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Photo galleries"
          title="Steal an idea or two"
          subtitle="Thousands of photos, sorted the way you actually search for them."
        />
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {GALLERIES.map((g) => (
            <Link
              key={g.title}
              to="/collections"
              className="group relative overflow-hidden rounded-2xl"
            >
              <SmartImage
                src={g.image}
                alt={g.title}
                seed={g.title}
                ratio="aspect-[4/5]"
                imgClassName="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/85 via-maroon-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-sm font-semibold leading-snug text-ivory">
                  {g.title}
                </h3>
                <p className="mt-0.5 text-[11px] text-ivory/60">{g.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────────── Featured vendors ───────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Handpicked" title="Featured vendors" />
            <Link to="/vendors" className="btn-outline">
              View all vendors <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((v) => (
              <VendorCard key={v.id} vendor={v} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── About ───────────────── */}
      <section className="container-page py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            align="center"
            eyebrow="About us"
            title="What Bridezone is"
          />
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            Bridezone is a Kerala wedding planning website and app. We list photographers,
            caterers, decorators, venues, musicians and heirloom bridal jewellery — with real
            pricing, real reviews and no pay-to-win rankings. Shortlist what you like, send one
            enquiry, and plan the rest from your phone.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/vendors" className="btn-primary">
              Browse vendors <ArrowRight size={16} />
            </Link>
            <Link to="/plan" className="btn-outline">
              <Sparkles size={16} /> Plan my wedding
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
