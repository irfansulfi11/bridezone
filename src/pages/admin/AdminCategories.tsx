import { useState } from 'react'
import { Plus, Tag, Trash2 } from 'lucide-react'
import { useStore } from '../../store/StoreContext'

export default function AdminCategories() {
  const { categories, vendors, addCategory, removeCategory } = useStore()
  const [name, setName] = useState('')

  const countFor = (slug: string) => vendors.filter((v) => v.category === slug).length

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    addCategory(name)
    setName('')
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Categories</h1>
      <p className="mt-1 text-sm text-ink-soft">Manage the service categories vendors can list under.</p>

      <form onSubmit={submit} className="mt-6 flex gap-2">
        <input
          className="field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a category (e.g. Mehndi, Invitations)…"
        />
        <button type="submit" disabled={!name.trim()} className="btn-primary shrink-0">
          <Plus size={16} /> Add
        </button>
      </form>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {categories.map((c) => {
          const count = countFor(c.slug)
          return (
            <div
              key={c.slug}
              className="flex items-center justify-between gap-3 rounded-2xl border border-maroon/10 bg-white p-4 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-maroon/5 text-maroon">
                  <Tag size={17} />
                </span>
                <div>
                  <p className="font-medium text-ink">{c.name}</p>
                  <p className="text-xs text-ink-muted">
                    {count} vendor{count !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeCategory(c.slug)}
                className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition hover:bg-maroon/10 hover:text-maroon"
                aria-label={`Remove ${c.name}`}
                title="Remove category"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )
        })}
      </div>
      <p className="mt-4 text-xs text-ink-muted">
        Demo note: changes live in state only and reset on refresh.
      </p>
    </div>
  )
}
