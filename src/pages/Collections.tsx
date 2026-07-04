import { useMemo, useState } from 'react'
import { usePageTitle } from '../lib/usePageTitle'
import { useStore } from '../store/StoreContext'
import type { CollectionType } from '../data/types'
import SectionHeading from '../components/SectionHeading'
import CollectionCard from '../components/CollectionCard'

const TYPES: (CollectionType | 'All')[] = ['All', 'Bridal', 'Necklaces', 'Earrings', 'Bangles']

export default function Collections() {
  usePageTitle('Jewellery Collections')
  const { collections } = useStore()
  const [type, setType] = useState<CollectionType | 'All'>('All')

  const list = useMemo(() => {
    const filtered = type === 'All' ? collections : collections.filter((c) => c.type === type)
    return [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured))
  }, [collections, type])

  return (
    <div className="container-page py-12 animate-fade-in">
      <SectionHeading
        eyebrow="The Jewellery Atelier"
        title="Heirloom collections for the bride"
        subtitle="Temple gold, uncut-diamond polki, meenakari and pearl — crafted to be worn and remembered."
        align="center"
      />

      {/* Type filter */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`chip border px-4 py-2 transition ${
              type === t
                ? 'border-maroon bg-maroon text-ivory'
                : 'border-maroon/20 text-ink-soft hover:border-maroon/40'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </div>
    </div>
  )
}
