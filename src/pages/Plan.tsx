import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Check, MapPin, Sparkles, Users, Wallet } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import { useStore } from '../store/StoreContext'
import { categories as allCategories, categoryName, LOCATIONS } from '../data/categories'
import { cheapestPackage } from '../lib/vendorUtils'
import { formatINR, formatINRShort } from '../lib/format'
import type { CategorySlug, Vendor } from '../data/types'
import SectionHeading, { GoldRule } from '../components/SectionHeading'
import Stars from '../components/Stars'

interface Match {
  vendor: Vendor
  price: number
  withinBudget: boolean
  reason: string
}

const VALID_SLUGS = allCategories.map((c) => c.slug)
const DEFAULT_SERVICES: CategorySlug[] = ['photography', 'catering', 'decor', 'venues']

// Read the home-page quick-start deep link (?budget=&location=&guests=&services=)
// so the assistant can auto-run with the visitor's picks already filled in.
function readInitial(params: URLSearchParams) {
  const num = (key: string, fallback: number) => {
    const n = Number(params.get(key))
    return Number.isFinite(n) && n > 0 ? n : fallback
  }
  const rawLoc = params.get('location') ?? ''
  const location = (LOCATIONS as readonly string[]).includes(rawLoc) ? rawLoc : 'Kochi'
  const rawServices = (params.get('services') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter((s): s is CategorySlug => (VALID_SLUGS as string[]).includes(s))
  return {
    budget: num('budget', 500000),
    guests: num('guests', 250),
    location,
    services: rawServices.length ? rawServices : DEFAULT_SERVICES,
    autoRun: params.has('budget') || params.has('services') || params.has('location'),
  }
}

export default function Plan() {
  usePageTitle('Plan My Wedding')
  const { approvedVendors } = useStore()
  const [searchParams] = useSearchParams()
  const [initial] = useState(() => readInitial(searchParams))

  const [budget, setBudget] = useState(initial.budget)
  const [location, setLocation] = useState(initial.location)
  const [guests, setGuests] = useState(initial.guests)
  const [selected, setSelected] = useState<CategorySlug[]>(initial.services)
  const [submitted, setSubmitted] = useState(initial.autoRun)

  const toggle = (slug: CategorySlug) =>
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]))

  // ── Client-side matching (no AI, no API) ──
  const results = useMemo(() => {
    if (!submitted || selected.length === 0) return []
    const perService = Math.round(budget / selected.length)

    return selected.map((cat) => {
      // Prefer the chosen city; if nothing there, gracefully widen to all cities.
      const inCity = approvedVendors.filter((v) => v.category === cat && v.location === location)
      const pool = inCity.length ? inCity : approvedVendors.filter((v) => v.category === cat)
      const widened = inCity.length === 0 && pool.length > 0

      const matches: Match[] = pool
        .map((vendor) => {
          const price = cheapestPackage(vendor)
          const withinBudget = price <= perService
          // Fit: how close the cheapest package sits to the per-service share
          // (1 = perfect use of budget; over-budget is penalised).
          const fit = withinBudget ? price / perService : perService / price
          const score = fit * 0.78 + (vendor.rating / 5) * 0.22
          const reason = withinBudget
            ? `Fits your ${formatINRShort(perService)}/service budget · Based in ${vendor.location}`
            : `A little above your ${formatINRShort(perService)}/service share · Based in ${vendor.location}`
          return { vendor, price, withinBudget, reason, score }
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)

      return { cat, matches, widened, perService }
    })
  }, [submitted, selected, budget, location, guests, approvedVendors])

  const totalPicks = results.reduce((n, r) => n + (r.matches[0] ? 1 : 0), 0)

  return (
    <div className="animate-fade-in">
      {/* Intro */}
      <section className="bg-maroon-50/40">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="The Planning Assistant"
            title="Your whole wedding, matched to your budget"
            subtitle="Tell us what you need. We match a vendor for every service, tuned to fit your budget and city — instantly, right here in your browser."
            align="center"
          />
        </div>
      </section>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[380px_1fr]">
        {/* Form */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="rounded-2xl border border-maroon/10 bg-white p-6 shadow-card"
          >
            <h3 className="font-display text-xl font-semibold text-ink">Tell us about your day</h3>
            <GoldRule />

            {/* Budget */}
            <div className="mt-6">
              <label className="flex items-center justify-between text-sm font-medium text-ink-soft">
                <span className="flex items-center gap-2">
                  <Wallet size={16} className="text-maroon" /> Total budget
                </span>
                <span className="font-display text-lg font-semibold text-maroon">{formatINR(budget)}</span>
              </label>
              <input
                type="range"
                min={100000}
                max={2000000}
                step={50000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="mt-3 w-full accent-maroon"
              />
              <div className="mt-1 flex justify-between text-xs text-ink-muted">
                <span>₹1L</span>
                <span>₹20L</span>
              </div>
            </div>

            {/* Location */}
            <div className="mt-6">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-ink-soft">
                <MapPin size={16} className="text-maroon" /> City
              </label>
              <select className="field" value={location} onChange={(e) => setLocation(e.target.value)}>
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Guests */}
            <div className="mt-6">
              <label className="flex items-center justify-between text-sm font-medium text-ink-soft">
                <span className="flex items-center gap-2">
                  <Users size={16} className="text-maroon" /> Guests
                </span>
                <span className="font-semibold text-ink">{guests}</span>
              </label>
              <input
                type="range"
                min={50}
                max={1000}
                step={50}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-3 w-full accent-maroon"
              />
            </div>

            {/* Services */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-ink-soft">Services you need</p>
              <div className="grid grid-cols-2 gap-2">
                {allCategories.map((c) => {
                  const on = selected.includes(c.slug)
                  return (
                    <button
                      type="button"
                      key={c.slug}
                      onClick={() => toggle(c.slug)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                        on
                          ? 'border-maroon bg-maroon/5 text-maroon'
                          : 'border-maroon/15 text-ink-soft hover:border-maroon/30'
                      }`}
                    >
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${
                          on ? 'border-maroon bg-maroon text-ivory' : 'border-maroon/30'
                        }`}
                      >
                        {on && <Check size={11} />}
                      </span>
                      {c.name}
                    </button>
                  )
                })}
              </div>
            </div>

            <button type="submit" disabled={selected.length === 0} className="btn-primary mt-7 w-full">
              <Sparkles size={16} /> Match my wedding
            </button>
            {selected.length === 0 && (
              <p className="mt-2 text-center text-xs text-maroon-600">Pick at least one service.</p>
            )}
          </form>
        </div>

        {/* Results */}
        <div className="min-w-0">
          {!submitted ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-maroon/20 bg-white/50 p-10 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-maroon/5 text-maroon">
                <Sparkles size={26} />
              </span>
              <p className="mt-4 font-display text-xl text-ink">Your recommended vendors will appear here</p>
              <p className="mt-2 max-w-sm text-sm text-ink-soft">
                Set your budget, city and services, then hit “Match my wedding”.
              </p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="mb-6 rounded-2xl bg-maroon px-6 py-5 text-ivory shadow-card">
                <p className="text-sm text-ivory/80">Your plan</p>
                <p className="mt-1 font-display text-xl font-semibold">
                  {totalPicks} vendors for a {guests}-guest wedding in {location}
                </p>
                <p className="mt-1 text-sm text-gold-200">
                  {formatINR(budget)} total · about {formatINR(Math.round(budget / Math.max(selected.length, 1)))} per
                  service
                </p>
              </div>

              <div className="space-y-8">
                {results.map(({ cat, matches, widened }) => (
                  <div key={cat}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-semibold text-ink">{categoryName(cat)}</h3>
                      <Link to={`/vendors?category=${cat}`} className="text-sm text-maroon hover:text-gold-600">
                        See all →
                      </Link>
                    </div>
                    {widened && (
                      <p className="mt-1 text-xs text-ink-muted">
                        No approved {categoryName(cat).toLowerCase()} in {location} yet — showing nearby options.
                      </p>
                    )}
                    <div className="mt-3 space-y-3">
                      {matches.length ? (
                        matches.map(({ vendor, price, withinBudget, reason }, i) => (
                          <Link
                            key={vendor.id}
                            to={`/vendors/${vendor.id}`}
                            className={`card card-hover flex items-center gap-4 p-4 ${
                              i === 0 ? 'ring-1 ring-gold/40' : ''
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                {i === 0 && <span className="badge-featured">Top match</span>}
                                <p className="truncate font-medium text-ink">{vendor.name}</p>
                              </div>
                              <p className="mt-1 flex items-center gap-1.5 text-sm text-gold-700">
                                <Sparkles size={13} /> {reason}
                              </p>
                              <div className="mt-2 flex items-center gap-3">
                                <Stars rating={vendor.rating} />
                                <span
                                  className={`text-sm font-semibold ${
                                    withinBudget ? 'text-maroon' : 'text-ink-muted'
                                  }`}
                                >
                                  from {formatINR(price)}
                                </span>
                              </div>
                            </div>
                            <ArrowRight size={18} className="shrink-0 text-ink-muted" />
                          </Link>
                        ))
                      ) : (
                        <p className="rounded-xl border border-dashed border-maroon/20 bg-white/50 p-4 text-sm text-ink-muted">
                          No approved {categoryName(cat).toLowerCase()} vendors yet.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
