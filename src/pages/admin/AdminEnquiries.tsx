import { useState } from 'react'
import { Calendar, Mail, Phone } from 'lucide-react'
import { useStore } from '../../store/StoreContext'
import { formatDate } from '../../lib/format'
import type { EnquiryStatus } from '../../data/types'

const STATUSES: EnquiryStatus[] = ['new', 'contacted', 'closed']

const CHIP: Record<EnquiryStatus, string> = {
  new: 'bg-gold/15 text-gold-700',
  contacted: 'bg-maroon/10 text-maroon',
  closed: 'bg-ink/5 text-ink-muted',
}

export default function AdminEnquiries() {
  const { enquiries, setEnquiryStatus } = useStore()
  const [filter, setFilter] = useState<EnquiryStatus | 'all'>('all')

  const list = filter === 'all' ? enquiries : enquiries.filter((e) => e.status === filter)

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Enquiries inbox</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Seeded enquiries plus anything submitted live during the demo. Toggle the status as you work
        each lead.
      </p>

      {/* Filter tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {(['all', ...STATUSES] as const).map((f) => {
          const count = f === 'all' ? enquiries.length : enquiries.filter((e) => e.status === f).length
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip border px-3.5 py-1.5 capitalize transition ${
                filter === f ? 'border-maroon bg-maroon text-ivory' : 'border-maroon/15 text-ink-soft'
              }`}
            >
              {f} ({count})
            </button>
          )
        })}
      </div>

      <div className="mt-6 space-y-3">
        {list.length === 0 && (
          <div className="rounded-2xl border border-dashed border-maroon/20 bg-white/50 p-10 text-center text-sm text-ink-muted">
            No {filter === 'all' ? '' : filter} enquiries.
          </div>
        )}
        {list.map((e) => (
          <div key={e.id} className="rounded-2xl border border-maroon/10 bg-white p-5 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ink">{e.name}</p>
                  <span className={`chip capitalize ${CHIP[e.status]}`}>{e.status}</span>
                </div>
                <p className="mt-0.5 text-sm text-maroon">
                  Re: {e.targetName}{' '}
                  <span className="text-ink-muted">· {e.targetType}</span>
                </p>
              </div>
              <p className="text-xs text-ink-muted">{formatDate(e.createdAt)}</p>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink-soft">“{e.message}”</p>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5">
                <Mail size={13} /> {e.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={13} /> {e.phone}
              </span>
              {e.eventDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> {formatDate(e.eventDate)}
                </span>
              )}
            </div>

            {/* Status toggle */}
            <div className="mt-4 flex items-center gap-2 border-t border-maroon/10 pt-4">
              <span className="text-xs font-medium text-ink-muted">Set status:</span>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setEnquiryStatus(e.id, s)}
                  className={`chip capitalize transition ${
                    e.status === s
                      ? 'bg-maroon text-ivory'
                      : 'border border-maroon/15 text-ink-soft hover:border-maroon/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
