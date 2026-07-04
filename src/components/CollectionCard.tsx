import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import type { Collection } from '../data/types'
import SmartImage from './SmartImage'

export default function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      to={`/collections/${collection.id}`}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      <div className="relative">
        <SmartImage
          src={collection.images[0]}
          alt={collection.name}
          seed={collection.id}
          ratio="aspect-[3/4]"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        {collection.featured && (
          <span className="badge-featured absolute left-3 top-3">
            <Sparkles size={12} /> Featured
          </span>
        )}
        <span className="chip absolute right-3 top-3 bg-ivory/90 text-maroon backdrop-blur-sm">
          {collection.type}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-ink group-hover:text-maroon">
          {collection.name}
        </h3>
        <p className="mt-1 text-sm text-ink-soft">{collection.tagline}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-wider text-gold-600">
          Price on enquiry →
        </p>
      </div>
    </Link>
  )
}
