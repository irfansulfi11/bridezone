import { Link } from 'react-router-dom'
import { ClipboardCheck, Gem, Inbox, Store, TrendingUp } from 'lucide-react'
import { useStore } from '../../store/StoreContext'
import { formatDate } from '../../lib/format'

export default function AdminDashboard() {
  const { vendors, collections, enquiries } = useStore()

  const pending = vendors.filter((v) => v.status === 'pending').length
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length

  const stats = [
    { label: 'Total vendors', value: vendors.length, icon: Store, to: '/admin/approvals', hint: `${vendors.filter((v) => v.status === 'approved').length} approved` },
    { label: 'Pending approvals', value: pending, icon: ClipboardCheck, to: '/admin/approvals', hint: pending ? 'Needs review' : 'All clear', accent: pending > 0 },
    { label: 'Total enquiries', value: enquiries.length, icon: Inbox, to: '/admin/enquiries', hint: `${newEnquiries} new` },
    { label: 'Collections', value: collections.length, icon: Gem, to: '/admin/collections', hint: `${collections.filter((c) => c.featured).length} featured` },
  ]

  const recent = [...enquiries]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 5)

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-soft">A live snapshot of your marketplace.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="card card-hover p-5"
          >
            <div className="flex items-center justify-between">
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ${
                  s.accent ? 'bg-gold/15 text-gold-700' : 'bg-maroon/5 text-maroon'
                }`}
              >
                <s.icon size={19} />
              </span>
              {s.accent && s.value > 0 && (
                <span className="chip bg-gold/15 text-gold-700">Action needed</span>
              )}
            </div>
            <p className="mt-4 font-display text-3xl font-semibold text-ink">{s.value}</p>
            <p className="text-sm font-medium text-ink-soft">{s.label}</p>
            <p className="mt-1 text-xs text-ink-muted">{s.hint}</p>
          </Link>
        ))}
      </div>

      {/* Recent enquiries */}
      <div className="mt-8 rounded-2xl border border-maroon/10 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <TrendingUp size={18} className="text-maroon" /> Recent enquiries
          </h2>
          <Link to="/admin/enquiries" className="text-sm text-maroon-600 hover:text-maroon-800">
            View all →
          </Link>
        </div>
        <div className="mt-4 divide-y divide-maroon/10">
          {recent.map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{e.name}</p>
                <p className="truncate text-sm text-ink-muted">→ {e.targetName}</p>
              </div>
              <div className="shrink-0 text-right">
                <StatusDot status={e.status} />
                <p className="mt-1 text-xs text-ink-muted">{formatDate(e.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: 'bg-gold/15 text-gold-700',
    contacted: 'bg-maroon/10 text-maroon',
    closed: 'bg-ink/5 text-ink-muted',
  }
  return <span className={`chip capitalize ${map[status] ?? ''}`}>{status}</span>
}
