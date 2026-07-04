import { Link } from 'react-router-dom'
import { MapPin, Sparkles } from 'lucide-react'
import type { Vendor } from '../data/types'
import { categoryName } from '../data/categories'
import { formatINR } from '../lib/format'
import SmartImage from './SmartImage'
import Stars from './Stars'

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  const perPlate = vendor.category === 'catering'
  return (
    <Link
      to={`/vendors/${vendor.id}`}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      <div className="relative">
        <SmartImage
          src={vendor.images[0]}
          alt={vendor.name}
          seed={vendor.id}
          ratio="aspect-[4/3]"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        {vendor.featured && (
          <span className="badge-featured absolute left-3 top-3">
            <Sparkles size={12} /> Featured
          </span>
        )}
        <span className="chip absolute right-3 top-3 bg-ivory/90 text-maroon backdrop-blur-sm">
          {categoryName(vendor.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-maroon">
            {vendor.name}
          </h3>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-ink-muted">
          <MapPin size={14} /> {vendor.location}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{vendor.tagline}</p>

        <div className="mt-4 flex items-end justify-between border-t border-maroon/10 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-ink-muted">Starting</p>
            <p className="font-display text-lg font-semibold text-maroon">
              {formatINR(vendor.startingPrice)}
              {perPlate && <span className="text-xs font-normal text-ink-muted"> /plate</span>}
            </p>
          </div>
          <Stars rating={vendor.rating} reviews={vendor.reviews} />
        </div>
      </div>
    </Link>
  )
}
