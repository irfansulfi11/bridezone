import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Inbox, MapPin, Pencil, Star, Store, X } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import { useAuth } from '../store/AuthContext'
import { useStore } from '../store/StoreContext'
import { categoryName } from '../data/categories'
import { formatINR, formatDate } from '../lib/format'
import type { EnquiryStatus, ServicePackage } from '../data/types'
import { GoldRule } from '../components/SectionHeading'
import SmartImage from '../components/SmartImage'
import Stars from '../components/Stars'

const CHIP: Record<EnquiryStatus, string> = {
  new: 'bg-gold/15 text-gold-700',
  contacted: 'bg-maroon/10 text-maroon',
  closed: 'bg-ink/5 text-ink-muted',
}

export default function VendorDashboard() {
  usePageTitle('My Dashboard')
  const { user } = useAuth()
  const { vendors, enquiries, updateVendorPackages, setEnquiryStatus } = useStore()

  // The demo vendor owns one listing (matched by ownerEmail).
  const vendor = vendors.find((v) => v.ownerEmail === user?.email) ?? vendors[0]
  const myEnquiries = enquiries.filter(
    (e) => e.targetType === 'vendor' && e.targetId === vendor.id,
  )

  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState<{ name: string; price: string; description: string }>({
    name: '',
    price: '',
    description: '',
  })

  const startEdit = (pkg: ServicePackage) => {
    setEditing(pkg.id)
    setDraft({ name: pkg.name, price: String(pkg.price), description: pkg.description })
  }

  const saveEdit = (pkgId: string) => {
    const next = vendor.packages.map((p) =>
      p.id === pkgId
        ? { ...p, name: draft.name.trim() || p.name, price: Number(draft.price) || p.price, description: draft.description }
        : p,
    )
    updateVendorPackages(vendor.id, next)
    setEditing(null)
  }

  return (
    <div className="container-page py-10 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-ink-muted">
        <Store size={16} className="text-maroon" /> Vendor dashboard
      </div>
      <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Welcome, {vendor.name}</h1>
      <GoldRule />

      {/* Profile summary */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div className="card overflow-hidden">
          <SmartImage src={vendor.images[0]} alt={vendor.name} seed={vendor.id} ratio="aspect-[4/3]" />
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-maroon/5 text-maroon">{categoryName(vendor.category)}</span>
              <span
                className={`chip capitalize ${
                  vendor.status === 'approved'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gold/15 text-gold-700'
                }`}
              >
                {vendor.status}
              </span>
              {vendor.featured && <span className="badge-featured">Featured</span>}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-soft">
              <MapPin size={15} className="text-maroon" /> {vendor.location}
            </p>
            <p className="mt-2 text-sm text-ink-soft">{vendor.tagline}</p>
            <Link to={`/vendors/${vendor.id}`} className="btn-outline mt-4 w-full !py-2 text-sm">
              View public profile
            </Link>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatBox icon={<Star size={18} />} label="Rating" value={vendor.rating.toFixed(1)} sub={`${vendor.reviews} reviews`} />
          <StatBox icon={<Inbox size={18} />} label="Enquiries" value={String(myEnquiries.length)} sub={`${myEnquiries.filter((e) => e.status === 'new').length} new`} />
          <StatBox icon={<Store size={18} />} label="Packages" value={String(vendor.packages.length)} sub={`from ${formatINR(vendor.startingPrice)}`} />
          <div className="col-span-2 rounded-2xl bg-maroon p-5 text-ivory shadow-card sm:col-span-3">
            <p className="text-sm text-ivory/80">Rating with couples</p>
            <div className="mt-2">
              <Stars rating={vendor.rating} reviews={vendor.reviews} />
            </div>
            <p className="mt-3 text-xs text-ivory/70">
              Keep your packages current — edits update your public profile instantly in this demo.
            </p>
          </div>
        </div>
      </div>

      {/* Packages — editable */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Your service packages</h2>
        <GoldRule />
        <div className="mt-6 space-y-3">
          {vendor.packages.map((pkg) => (
            <div key={pkg.id} className="rounded-2xl border border-maroon/10 bg-white p-5 shadow-card">
              {editing === pkg.id ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-ink-muted">Package name</span>
                      <input className="field" value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-ink-muted">Price (₹)</span>
                      <input className="field" type="number" value={draft.price} onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-ink-muted">Description</span>
                    <input className="field" value={draft.description} onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))} />
                  </label>
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(pkg.id)} className="btn-primary !py-2 text-sm">
                      <Check size={15} /> Save
                    </button>
                    <button onClick={() => setEditing(null)} className="btn-ghost !py-2 text-sm">
                      <X size={15} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{pkg.name}</p>
                    <p className="mt-0.5 truncate text-sm text-ink-soft">{pkg.description}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <p className="font-display text-lg font-semibold text-maroon">{formatINR(pkg.price)}</p>
                    <button onClick={() => startEdit(pkg)} className="inline-flex items-center gap-1.5 rounded-full border border-maroon/20 px-3 py-1.5 text-xs font-medium text-maroon transition hover:bg-maroon hover:text-ivory">
                      <Pencil size={13} /> Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Enquiries received */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Enquiries received</h2>
        <GoldRule />
        <div className="mt-6 space-y-3">
          {myEnquiries.length === 0 && (
            <div className="rounded-2xl border border-dashed border-maroon/20 bg-white/50 p-8 text-center text-sm text-ink-muted">
              No enquiries yet. Try sending one from your{' '}
              <Link to={`/vendors/${vendor.id}`} className="text-maroon hover:underline">
                public profile
              </Link>{' '}
              to see it appear here.
            </div>
          )}
          {myEnquiries.map((e) => (
            <div key={e.id} className="rounded-2xl border border-maroon/10 bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink">{e.name}</p>
                    <span className={`chip capitalize ${CHIP[e.status]}`}>{e.status}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {e.email} · {e.phone}
                    {e.eventDate ? ` · event ${formatDate(e.eventDate)}` : ''}
                  </p>
                </div>
                <p className="text-xs text-ink-muted">{formatDate(e.createdAt)}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">“{e.message}”</p>
              <div className="mt-4 flex items-center gap-2 border-t border-maroon/10 pt-3">
                <span className="text-xs font-medium text-ink-muted">Mark as:</span>
                {(['new', 'contacted', 'closed'] as EnquiryStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setEnquiryStatus(e.id, s)}
                    className={`chip capitalize transition ${
                      e.status === s ? 'bg-maroon text-ivory' : 'border border-maroon/15 text-ink-soft hover:border-maroon/40'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function StatBox({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-maroon/10 bg-white p-5 shadow-card">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-maroon/5 text-maroon">{icon}</span>
      <p className="mt-3 font-display text-2xl font-semibold text-ink">{value}</p>
      <p className="text-sm font-medium text-ink-soft">{label}</p>
      <p className="text-xs text-ink-muted">{sub}</p>
    </div>
  )
}
