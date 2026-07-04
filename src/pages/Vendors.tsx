import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import { useStore } from '../store/StoreContext'
import { categories as allCategories, LOCATIONS } from '../data/categories'
import { BUDGET_BANDS, inBudgetBand } from '../lib/vendorUtils'
import SectionHeading from '../components/SectionHeading'
import VendorCard from '../components/VendorCard'

export default function Vendors() {
  usePageTitle('Vendors')
  const { approvedVendors } = useStore()
  const [params, setParams] = useSearchParams()

  const [category, setCategory] = useState(params.get('category') ?? '')
  const [location, setLocation] = useState(params.get('location') ?? '')
  const [budget, setBudget] = useState('any')
  const [q, setQ] = useState(params.get('q') ?? '')
  const [showFilters, setShowFilters] = useState(false)

  // Keep the category/location in the URL in sync (shareable links).
  useEffect(() => {
    const next = new URLSearchParams()
    if (q) next.set('q', q)
    if (category) next.set('category', category)
    if (location) next.set('location', location)
    setParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, category, location])

  const filtered = useMemo(() => {
    const band = BUDGET_BANDS.find((b) => b.id === budget) ?? BUDGET_BANDS[0]
    const needle = q.trim().toLowerCase()
    return approvedVendors
      .filter((v) => (category ? v.category === category : true))
      .filter((v) => (location ? v.location === location : true))
      .filter((v) => inBudgetBand(v, band))
      .filter((v) =>
        needle
          ? v.name.toLowerCase().includes(needle) ||
            v.tagline.toLowerCase().includes(needle) ||
            v.location.toLowerCase().includes(needle)
          : true,
      )
      .sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
  }, [approvedVendors, category, location, budget, q])

  const activeCount = [category, location, budget !== 'any' ? budget : '', q].filter(Boolean).length

  const clearAll = () => {
    setCategory('')
    setLocation('')
    setBudget('any')
    setQ('')
  }

  const FilterPanel = (
    <div className="space-y-7">
      <div>
        <label className="mb-2 block text-sm font-medium text-ink-soft">Search</label>
        <input
          className="field"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Name, keyword…"
        />
      </div>

      <FilterGroup label="Category">
        <RadioRow name="cat" checked={category === ''} onChange={() => setCategory('')} label="All categories" />
        {allCategories.map((c) => (
          <RadioRow
            key={c.slug}
            name="cat"
            checked={category === c.slug}
            onChange={() => setCategory(c.slug)}
            label={c.name}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Location">
        <RadioRow name="loc" checked={location === ''} onChange={() => setLocation('')} label="All cities" />
        {LOCATIONS.map((l) => (
          <RadioRow key={l} name="loc" checked={location === l} onChange={() => setLocation(l)} label={l} />
        ))}
      </FilterGroup>

      <FilterGroup label="Budget (from cheapest package)">
        {BUDGET_BANDS.map((b) => (
          <RadioRow
            key={b.id}
            name="budget"
            checked={budget === b.id}
            onChange={() => setBudget(b.id)}
            label={b.label}
          />
        ))}
      </FilterGroup>

      {activeCount > 0 && (
        <button onClick={clearAll} className="btn-outline w-full !py-2 text-sm">
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="container-page py-12 animate-fade-in">
      <SectionHeading
        eyebrow="The Directory"
        title="Find your wedding vendors"
        subtitle="Every listing here is approved by our team. Filter by category, city and budget."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-maroon/10 bg-white p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold text-ink">Filters</h3>
            <div className="mt-5">{FilterPanel}</div>
          </div>
        </aside>

        <div>
          {/* Mobile filter toggle + count */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-ink-soft">
              <span className="font-semibold text-ink">{filtered.length}</span> vendor
              {filtered.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={() => setShowFilters(true)}
              className="btn-outline !py-2 text-sm lg:hidden"
            >
              <SlidersHorizontal size={16} /> Filters{activeCount ? ` (${activeCount})` : ''}
            </button>
          </div>

          {filtered.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((v) => (
                <VendorCard key={v.id} vendor={v} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-maroon/20 bg-white/60 p-12 text-center">
              <p className="font-display text-xl text-maroon">No vendors match those filters</p>
              <p className="mt-2 text-sm text-ink-soft">Try widening your budget or clearing the location.</p>
              <button onClick={clearAll} className="btn-primary mt-6">
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-ivory p-6 shadow-lift animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-ink">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-maroon/10">
                <X size={20} />
              </button>
            </div>
            <div className="mt-6">{FilterPanel}</div>
            <button onClick={() => setShowFilters(false)} className="btn-primary mt-6 w-full">
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function RadioRow({
  name,
  checked,
  onChange,
  label,
}: {
  name: string
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="grid h-4 w-4 place-items-center rounded-full border border-maroon/30 peer-checked:border-maroon">
        <span className={`h-2 w-2 rounded-full ${checked ? 'bg-maroon' : 'bg-transparent'}`} />
      </span>
      <span className={checked ? 'font-medium text-maroon' : 'text-ink-soft'}>{label}</span>
    </label>
  )
}
