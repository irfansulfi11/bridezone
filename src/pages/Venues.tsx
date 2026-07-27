import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MapPin, Star, Users } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import { useStore } from '../store/StoreContext'
import { useCity } from '../store/CityContext'
import SmartImage from '../components/SmartImage'
import { SectionHead } from '../components/Rail'
import { formatINR } from '../lib/format'
import { ALL_CITIES, VENUE_TYPES } from '../data/wmg'

export default function Venues() {
  usePageTitle('Wedding Venues')
  const [params, setParams] = useSearchParams()
  const { city, setCity } = useCity()
  const { approvedVendors } = useStore()

  const type = params.get('type') ?? ''
  const selected = VENUE_TYPES.find((t) => t.slug === type)
  // A `city` in the URL wins; otherwise fall back to the header's city.
  const cityFilter = params.get('city') ?? city

  const setType = (slug: string) => {
    const next = new URLSearchParams(params)
    if (slug) next.set('type', slug)
    else next.delete('type')
    setParams(next, { replace: true })
  }

  const changeCity = (next: string) => {
    setCity(next)
    const q = new URLSearchParams(params)
    q.set('city', next)
    setParams(q, { replace: true })
  }

  // Real venue listings come from the vendor directory. When the selected city
  // has none, fall back to every venue rather than showing an empty page.
  const { listings, showingAll } = useMemo(() => {
    const all = approvedVendors
      .filter((v) => v.category === 'venues')
      .sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
    const inCity = all.filter((v) => v.location === cityFilter)
    return inCity.length
      ? { listings: inCity, showingAll: false }
      : { listings: all, showingAll: true }
  }, [approvedVendors, cityFilter])

  return (
    <div className="animate-fade-in">
      {/* Banner */}
      <section className="bg-maroon-900 text-ivory">
        <div className="container-page py-12">
          <p className="eyebrow !text-gold-300">Venues</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ivory sm:text-4xl">
            {selected ? selected.title : 'Wedding Venues'} in {cityFilter}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-ivory/75">
            {selected?.blurb ??
              'Banquet halls, backwater resorts, kalyana mandapams and destination properties — compare capacity, pricing and real reviews.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 rounded-full border border-ivory/25 bg-ivory/10 px-4 py-2 text-sm">
              <MapPin size={15} className="text-gold-300" />
              <select
                value={cityFilter}
                onChange={(e) => changeCity(e.target.value)}
                className="bg-transparent text-ivory focus:outline-none [&>option]:text-ink"
              >
                {ALL_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <Link to="/vendors?category=venues" className="btn-gold !py-2 text-sm">
              Browse all listings
            </Link>
          </div>
        </div>
      </section>

      {/* Type chips */}
      <section className="border-b border-maroon/10 bg-white">
        <div className="container-page flex gap-2 overflow-x-auto py-4 scrollbar-none">
          <Chip active={!type} onClick={() => setType('')} label="All venue types" />
          {VENUE_TYPES.map((t) => (
            <Chip
              key={t.slug}
              active={type === t.slug}
              onClick={() => setType(t.slug)}
              label={t.title}
            />
          ))}
        </div>
      </section>

      {/* Venue types grid */}
      <section className="bg-ivory">
        <div className="container-page py-12">
          <SectionHead title="Browse by venue type" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(selected ? [selected] : VENUE_TYPES).map((t) => (
              <button
                key={t.slug}
                onClick={() => setType(t.slug)}
                className="card card-hover group overflow-hidden text-left"
              >
                <div className="relative">
                  <SmartImage
                    src={t.image}
                    alt={t.title}
                    seed={t.slug}
                    ratio="aspect-[16/10]"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-maroon-950/70 to-transparent" />
                  <span className="absolute bottom-3 left-4 font-display text-lg font-semibold text-ivory">
                    {t.title}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <p className="text-sm text-ink-muted">{t.blurb}</p>
                  <p className="shrink-0 pl-3 text-sm font-semibold text-maroon">
                    {formatINR(t.from)}+
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Real listings */}
      <section className="bg-white">
        <div className="container-page py-12">
          <SectionHead
            title={showingAll ? 'All wedding venues' : `Venues in ${cityFilter}`}
            href="/vendors?category=venues"
            linkLabel="See all"
            subtitle={
              showingAll
                ? `No listings in ${cityFilter} yet — showing all ${listings.length} venues`
                : `${listings.length} listing${listings.length === 1 ? '' : 's'} available`
            }
          />

          {listings.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((v) => (
                <Link
                  key={v.id}
                  to={`/vendors/${v.id}`}
                  className="card card-hover group flex flex-col overflow-hidden"
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
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold text-ink group-hover:text-maroon">
                      {v.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
                      <MapPin size={14} /> {v.location}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{v.tagline}</p>
                    <div className="mt-4 flex items-end justify-between border-t border-maroon/10 pt-4">
                      <p className="font-display text-lg font-semibold text-maroon">
                        {formatINR(v.startingPrice)}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-ink-muted">
                        <Users size={13} /> {v.reviews} reviews
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-maroon/20 bg-ivory/60 p-12 text-center">
              <p className="font-display text-xl text-maroon">No venues listed in {cityFilter} yet</p>
              <Link to="/vendors?category=venues" className="btn-primary mt-6">
                Browse every venue
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
        active
          ? 'border-maroon bg-maroon text-ivory'
          : 'border-maroon/20 text-ink-soft hover:border-maroon/50 hover:text-maroon'
      }`}
    >
      {label}
    </button>
  )
}
