import { Link } from 'react-router-dom'
import { Sparkles, Star } from 'lucide-react'
import { useStore } from '../../store/StoreContext'
import SmartImage from '../../components/SmartImage'

export default function AdminCollections() {
  const { collections, toggleCollectionFeatured } = useStore()
  const featuredCount = collections.filter((c) => c.featured).length

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Jewellery collections</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Toggle “Featured” to control which collections lead the public showcase and home teaser.
          </p>
        </div>
        <span className="chip bg-gold/15 text-gold-700">{featuredCount} featured</span>
      </div>

      <div className="mt-6 space-y-3">
        {collections.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-4 rounded-2xl border border-maroon/10 bg-white p-3 shadow-card"
          >
            <div className="h-16 w-16 shrink-0">
              <SmartImage src={c.images[0]} alt={c.name} seed={c.id} ratio="aspect-square" className="rounded-xl" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium text-ink">{c.name}</p>
                {c.featured && (
                  <span className="badge-featured">
                    <Sparkles size={11} /> Featured
                  </span>
                )}
              </div>
              <p className="truncate text-xs text-ink-muted">
                {c.type} · <Link to={`/collections/${c.id}`} className="text-maroon-600 hover:underline">view public page</Link>
              </p>
            </div>
            <button
              onClick={() => toggleCollectionFeatured(c.id)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition ${
                c.featured
                  ? 'bg-gold text-ink hover:bg-gold-600 hover:text-ivory'
                  : 'border border-maroon/20 text-ink-soft hover:border-maroon/40'
              }`}
            >
              <Star size={14} className={c.featured ? 'fill-ink' : ''} />
              {c.featured ? 'Featured' : 'Make featured'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
