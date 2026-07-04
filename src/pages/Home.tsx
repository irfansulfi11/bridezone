import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Gem, MapPin, Search, Sparkles, Star } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import { useStore } from '../store/StoreContext'
import SectionHeading, { GoldRule } from '../components/SectionHeading'
import SmartImage from '../components/SmartImage'
import VendorCard from '../components/VendorCard'
import CollectionCard from '../components/CollectionCard'
import { LOCATIONS } from '../data/categories'
import { PHOTOS, unsplash } from '../lib/images'

export default function Home() {
  usePageTitle('')
  const { approvedVendors, collections, categories } = useStore()
  const navigate = useNavigate()

  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set('q', q.trim())
    if (category) params.set('category', category)
    if (location) params.set('location', location)
    navigate(`/vendors?${params.toString()}`)
  }

  const featured = [...approvedVendors]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
    .slice(0, 4)

  const teaserCollections = [
    ...collections.filter((c) => c.featured),
    ...collections.filter((c) => !c.featured),
  ].slice(0, 3)

  return (
    <div className="animate-fade-in">
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative overflow-hidden bg-ivory">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-maroon/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <Sparkles size={14} className="text-gold" /> Kerala’s Wedding Atelier
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              Plan your entire wedding, <span className="italic text-maroon">in one place.</span>
            </h1>
            <GoldRule />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              Discover Kerala’s finest photographers, caterers, decorators, venues and heirloom
              bridal jewellery — curated, compared and booked without the chaos.
            </p>

            {/* Search bar */}
            <form
              onSubmit={submitSearch}
              className="mt-8 rounded-2xl border border-maroon/10 bg-white p-2 shadow-card sm:flex sm:items-center"
            >
              <div className="flex flex-1 items-center gap-2 px-3 py-2">
                <Search size={18} className="shrink-0 text-ink-muted" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search photographers, caterers…"
                  className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 border-t border-maroon/10 px-3 py-2 sm:border-l sm:border-t-0">
                <Gem size={16} className="shrink-0 text-ink-muted" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-transparent text-sm text-ink-soft focus:outline-none"
                >
                  <option value="">All services</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 border-t border-maroon/10 px-3 py-2 sm:border-l sm:border-t-0">
                <MapPin size={16} className="shrink-0 text-ink-muted" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-sm text-ink-soft focus:outline-none"
                >
                  <option value="">All cities</option>
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-primary m-1 w-full sm:w-auto">
                Search
              </button>
            </form>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-soft">
              <span className="flex items-center gap-2">
                <Star size={16} className="fill-gold text-gold" /> 1,200+ curated reviews
              </span>
              <span className="flex items-center gap-2">
                <Gem size={16} className="text-gold" /> Verified Kerala vendors
              </span>
            </div>
          </div>

          {/* Editorial image collage */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-10">
                <SmartImage
                  src={unsplash(PHOTOS.couple[0], 600, 800)}
                  alt="Wedding couple"
                  seed="hero-couple"
                  ratio="aspect-[3/4]"
                  className="rounded-2xl shadow-lift"
                  eager
                />
                <SmartImage
                  src={unsplash(PHOTOS.jewellery[0], 600, 600)}
                  alt="Bridal jewellery"
                  seed="hero-jewel"
                  ratio="aspect-square"
                  className="rounded-2xl shadow-card"
                  eager
                />
              </div>
              <div className="space-y-4">
                <SmartImage
                  src={unsplash(PHOTOS.decor[0], 600, 600)}
                  alt="Wedding decor"
                  seed="hero-decor"
                  ratio="aspect-square"
                  className="rounded-2xl shadow-card"
                  eager
                />
                <SmartImage
                  src={unsplash(PHOTOS.venue[0], 600, 800)}
                  alt="Wedding venue"
                  seed="hero-venue"
                  ratio="aspect-[3/4]"
                  className="rounded-2xl shadow-lift"
                  eager
                />
              </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-maroon/10 bg-white px-5 py-3 shadow-lift">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-maroon text-gold">
                <Sparkles size={16} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-ink">Everything, curated</p>
                <p className="text-xs text-ink-muted">6 categories · 4 cities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Browse by category ───────────────── */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Browse by category"
          title="Every part of your celebration"
          subtitle="From the first click of the camera to the last helping of payasam."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/vendors?category=${c.slug}`}
              className="card card-hover group overflow-hidden text-center"
            >
              <SmartImage src={c.image} alt={c.name} seed={c.slug} ratio="aspect-square" />
              <div className="p-3">
                <p className="font-display text-sm font-semibold text-ink group-hover:text-maroon">
                  {c.name}
                </p>
                <p className="mt-0.5 hidden text-[11px] text-ink-muted sm:block">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────────── Featured vendors ───────────────── */}
      <section className="bg-maroon-50/40 py-16 lg:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Handpicked" title="Featured vendors" />
            <Link to="/vendors" className="btn-ghost group">
              View all vendors
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((v) => (
              <VendorCard key={v.id} vendor={v} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Plan My Wedding CTA ───────────────── */}
      <section className="container-page py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-maroon px-8 py-14 text-center text-ivory shadow-lift sm:px-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-gold/10 blur-2xl" />
          <div className="relative mx-auto max-w-2xl">
            <span className="chip mx-auto mb-5 bg-gold/20 text-gold-100">
              <Sparkles size={13} /> The Planning Assistant
            </span>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl">
              Tell us your budget. We’ll match your whole wedding.
            </h2>
            <div className="flex justify-center">
              <GoldRule align="center" />
            </div>
            <p className="mx-auto mt-5 max-w-lg text-ivory/80">
              Set a budget, pick your city and the services you need — and get a recommended vendor
              for every part of your day, tuned to fit.
            </p>
            <Link to="/plan" className="btn-gold mt-8 group">
              Plan My Wedding
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── Jewellery teaser ───────────────── */}
      <section className="container-page pb-4 lg:pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="The Jewellery Atelier"
            title="Heirlooms for the big day"
            subtitle="Temple gold, uncut-diamond polki and pearl grace — collections worth the aisle."
          />
          <Link to="/collections" className="btn-ghost group">
            Explore collections
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teaserCollections.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </section>
    </div>
  )
}
