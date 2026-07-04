import { Star } from 'lucide-react'

export default function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <Star size={15} className="fill-gold text-gold" />
      <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
      {reviews !== undefined && <span className="text-ink-muted">({reviews})</span>}
    </span>
  )
}
