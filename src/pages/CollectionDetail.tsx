import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Gem } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import { useStore } from '../store/StoreContext'
import { GoldRule } from '../components/SectionHeading'
import ImageGallery from '../components/ImageGallery'
import EnquiryModal from '../components/EnquiryModal'
import { NotFound } from './Placeholder'

export default function CollectionDetail() {
  const { id } = useParams()
  const { collections } = useStore()
  const collection = collections.find((c) => c.id === id)
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  usePageTitle(collection ? collection.name : 'Collection')

  if (!collection) return <NotFound />

  return (
    <div className="container-page py-10 animate-fade-in">
      <Link to="/collections" className="btn-ghost mb-6 !px-3 text-sm">
        <ArrowLeft size={16} /> Back to collections
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <ImageGallery images={collection.images} alt={collection.name} seed={collection.id} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip bg-maroon/5 text-maroon">{collection.type}</span>
            {collection.featured && <span className="badge-featured">Featured</span>}
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {collection.name}
          </h1>
          <GoldRule />
          <p className="mt-4 italic text-gold-700">{collection.tagline}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{collection.description}</p>

          <div className="mt-7">
            <h2 className="font-display text-lg font-semibold text-ink">Pieces in this collection</h2>
            <ul className="mt-4 divide-y divide-maroon/10 rounded-2xl border border-maroon/10 bg-white shadow-card">
              {collection.pieces.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/10 text-gold-600">
                      <Gem size={15} />
                    </span>
                    <div>
                      <p className="font-medium text-ink">{p.name}</p>
                      <p className="text-xs text-ink-muted">{p.detail}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-gold-600">
                    Price on enquiry
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={() => setEnquiryOpen(true)} className="btn-primary mt-7 w-full sm:w-auto">
            Enquire about this collection
          </button>
        </div>
      </div>

      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        targetType="collection"
        targetId={collection.id}
        targetName={collection.name}
      />
    </div>
  )
}
