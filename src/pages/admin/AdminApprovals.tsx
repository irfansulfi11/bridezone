import { Check, MapPin, X } from 'lucide-react'
import { useStore } from '../../store/StoreContext'
import { categoryName } from '../../data/categories'
import { formatINR } from '../../lib/format'
import type { VendorStatus } from '../../data/types'

const STATUS_STYLES: Record<VendorStatus, string> = {
  approved: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
  pending: 'bg-gold/15 text-gold-700 ring-1 ring-gold/30',
  rejected: 'bg-maroon/10 text-maroon ring-1 ring-maroon/20',
}

export default function AdminApprovals() {
  const { vendors, setVendorStatus } = useStore()

  const pending = vendors.filter((v) => v.status === 'pending').length

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Vendor approvals</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Approved vendors appear on the public directory instantly. Pending ones stay hidden.
          </p>
        </div>
        <span className="chip bg-gold/15 text-gold-700">{pending} pending</span>
      </div>

      {/* Table (desktop) */}
      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-maroon/10 bg-white shadow-card md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-maroon/10 bg-maroon/[0.03] text-left text-xs uppercase tracking-wider text-ink-muted">
              <th className="px-5 py-3 font-semibold">Vendor</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Location</th>
              <th className="px-5 py-3 font-semibold">From</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-maroon/10">
            {vendors.map((v) => (
              <tr key={v.id} className="transition hover:bg-maroon/[0.02]">
                <td className="px-5 py-3.5 font-medium text-ink">{v.name}</td>
                <td className="px-5 py-3.5 text-ink-soft">{categoryName(v.category)}</td>
                <td className="px-5 py-3.5 text-ink-soft">{v.location}</td>
                <td className="px-5 py-3.5 text-ink-soft">{formatINR(v.startingPrice)}</td>
                <td className="px-5 py-3.5">
                  <span className={`chip capitalize ${STATUS_STYLES[v.status]}`}>{v.status}</span>
                </td>
                <td className="px-5 py-3.5">
                  <Actions status={v.status} onApprove={() => setVendorStatus(v.id, 'approved')} onReject={() => setVendorStatus(v.id, 'rejected')} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <div className="mt-6 space-y-3 md:hidden">
        {vendors.map((v) => (
          <div key={v.id} className="rounded-2xl border border-maroon/10 bg-white p-4 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink">{v.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
                  <MapPin size={12} /> {v.location} · {categoryName(v.category)}
                </p>
              </div>
              <span className={`chip capitalize ${STATUS_STYLES[v.status]}`}>{v.status}</span>
            </div>
            <div className="mt-3">
              <Actions status={v.status} onApprove={() => setVendorStatus(v.id, 'approved')} onReject={() => setVendorStatus(v.id, 'rejected')} full />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Actions({
  status,
  onApprove,
  onReject,
  full = false,
}: {
  status: VendorStatus
  onApprove: () => void
  onReject: () => void
  full?: boolean
}) {
  return (
    <div className={`flex items-center gap-2 ${full ? '' : 'justify-end'}`}>
      <button
        onClick={onApprove}
        disabled={status === 'approved'}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
          status === 'approved'
            ? 'cursor-default bg-green-50 text-green-700'
            : 'bg-green-600 text-white hover:bg-green-700'
        } ${full ? 'flex-1 justify-center' : ''}`}
      >
        <Check size={14} /> Approve
      </button>
      <button
        onClick={onReject}
        disabled={status === 'rejected'}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
          status === 'rejected'
            ? 'cursor-default bg-maroon/10 text-maroon'
            : 'border border-maroon/30 text-maroon hover:bg-maroon hover:text-ivory'
        } ${full ? 'flex-1 justify-center' : ''}`}
      >
        <X size={14} /> Reject
      </button>
    </div>
  )
}
