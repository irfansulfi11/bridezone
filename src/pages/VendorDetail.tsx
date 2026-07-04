import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, MapPin } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import { useStore } from '../store/StoreContext'
import { categoryName } from '../data/categories'
import { formatINR } from '../lib/format'
import { GoldRule } from '../components/SectionHeading'
import ImageGallery from '../components/ImageGallery'
import Stars from '../components/Stars'
import EnquiryModal from '../components/EnquiryModal'
import { NotFound } from './Placeholder'

export default function VendorDetail() {
  const { id } = useParams()
  const { vendors } = useStore()
  const vendor = vendors.find((v) => v.id === id)
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  usePageTitle(vendor ? vendor.name : 'Vendor')

  if (!vendor) return <NotFound />

  const perPlate = vendor.category === 'catering'

  return (
    <div className="container-page py-10 animate-fade-in">
      <Link to="/vendors" className="btn-ghost mb-6 !px-3 text-sm">
        <ArrowLeft size={16} /> Back to vendors
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Gallery */}
        <div>
          <ImageGallery images={vendor.images} alt={vendor.name} seed={vendor.id} />
        </div>

        {/* Summary */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip bg-maroon/5 text-maroon">{categoryName(vendor.category)}</span>
            {vendor.featured && <span className="badge-featured">Featured</span>}
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {vendor.name}
          </h1>
          <GoldRule />
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
            <span className="flex items-center gap-1.5">
              <MapPin size={16} className="text-maroon" /> {vendor.location}
            </span>
            <Stars rating={vendor.rating} reviews={vendor.reviews} />
          </div>

          <p className="mt-5 leading-relaxed text-ink-soft">{vendor.description}</p>

          <div className="mt-6 rounded-2xl border border-maroon/10 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">Starting price</p>
                <p className="font-display text-2xl font-semibold text-maroon">
                  {formatINR(vendor.startingPrice)}
                  {perPlate && <span className="text-sm font-normal text-ink-muted"> / plate</span>}
                </p>
              </div>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary">
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink">Service packages</h2>
        <GoldRule />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vendor.packages.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`card flex flex-col p-6 ${i === 1 ? 'ring-2 ring-gold/50' : ''}`}
            >
              {i === 1 && (
                <span className="badge-featured mb-3 self-start">Most popular</span>
              )}
              <h3 className="font-display text-xl font-semibold text-ink">{pkg.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{pkg.description}</p>
              <p className="mt-4 font-display text-2xl font-semibold text-maroon">
                {formatINR(pkg.price)}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-ink-soft">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-gold-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setEnquiryOpen(true)} className="btn-outline mt-6 w-full">
                Enquire about this
              </button>
            </div>
          ))}
        </div>
      </section>

      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        targetType="vendor"
        targetId={vendor.id}
        targetName={vendor.name}
      />
    </div>
  )
}
