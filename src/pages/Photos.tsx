import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Bookmark, Camera } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import SmartImage from '../components/SmartImage'
import { SectionHead } from '../components/Rail'
import { PHOTO_ALBUMS } from '../data/wmg'
import { PHOTOS, unsplash } from '../lib/images'

// Flatten the curated pools into a masonry-ish inspiration feed.
const FEED = Object.entries(PHOTOS).flatMap(([theme, ids]) =>
  ids.map((id, i) => ({
    id: `${theme}-${i}`,
    theme,
    src: unsplash(id, 600, i % 3 === 0 ? 800 : 480),
    tall: i % 3 === 0,
  })),
)

export default function Photos() {
  usePageTitle('Wedding Inspiration Gallery')
  const [params, setParams] = useSearchParams()
  const album = params.get('album') ?? ''
  const selected = PHOTO_ALBUMS.find((a) => a.slug === album)

  const setAlbum = (slug: string) => {
    const next = new URLSearchParams()
    if (slug) next.set('album', slug)
    setParams(next, { replace: true })
  }

  // Deterministic slice per album so each one looks distinct.
  const feed = useMemo(() => {
    if (!selected) return FEED
    const offset = PHOTO_ALBUMS.findIndex((a) => a.slug === album)
    return [...FEED.slice(offset * 2), ...FEED.slice(0, offset * 2)]
  }, [album, selected])

  return (
    <div className="animate-fade-in">
      <section className="bg-maroon-900 text-ivory">
        <div className="container-page py-12">
          <p className="eyebrow !text-gold-300">Photos</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ivory sm:text-4xl">
            {selected ? selected.title : 'Wedding Inspiration Gallery'}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-ivory/75">
            {selected
              ? `${selected.count.toLocaleString('en-IN')} photos shortlisted by real couples.`
              : 'Bridal wear, jewellery, decor, mehndi and more — save what you love to your shortlist.'}
          </p>
        </div>
      </section>

      {/* Album chips */}
      <section className="border-b border-maroon/10 bg-white">
        <div className="container-page flex gap-2 overflow-x-auto py-4 scrollbar-none">
          <button
            onClick={() => setAlbum('')}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
              !album
                ? 'border-maroon bg-maroon text-ivory'
                : 'border-maroon/20 text-ink-soft hover:border-maroon/50 hover:text-maroon'
            }`}
          >
            All photos
          </button>
          {PHOTO_ALBUMS.map((a) => (
            <button
              key={a.slug}
              onClick={() => setAlbum(a.slug)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                album === a.slug
                  ? 'border-maroon bg-maroon text-ivory'
                  : 'border-maroon/20 text-ink-soft hover:border-maroon/50 hover:text-maroon'
              }`}
            >
              {a.title}
            </button>
          ))}
        </div>
      </section>

      {/* Album tiles */}
      {!selected && (
        <section className="bg-ivory">
          <div className="container-page py-12">
            <SectionHead title="Browse by album" />
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {PHOTO_ALBUMS.map((a) => (
                <button
                  key={a.slug}
                  onClick={() => setAlbum(a.slug)}
                  className="group relative overflow-hidden rounded-xl text-left"
                >
                  <SmartImage
                    src={a.image}
                    alt={a.title}
                    seed={a.slug}
                    ratio="aspect-[4/3]"
                    imgClassName="transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-maroon-950/85 via-maroon-950/15 to-transparent" />
                  <span className="absolute inset-x-4 bottom-3">
                    <span className="block font-display text-base font-semibold text-ivory">
                      {a.title}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-ivory/70">
                      <Camera size={12} /> {a.count.toLocaleString('en-IN')} photos
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Masonry feed */}
      <section className="bg-white">
        <div className="container-page py-12">
          <SectionHead title={selected ? `${selected.title} photos` : 'Latest from the gallery'} />
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
            {feed.map((p) => (
              <figure key={p.id} className="group relative break-inside-avoid overflow-hidden rounded-xl">
                <SmartImage
                  src={p.src}
                  alt={`${p.theme} inspiration`}
                  seed={p.id}
                  ratio={p.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-maroon-950/0 transition-colors group-hover:bg-maroon-950/25" />
                <button
                  aria-label="Save to shortlist"
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-maroon opacity-0 shadow-sm transition-opacity hover:bg-maroon hover:text-ivory group-hover:opacity-100"
                >
                  <Bookmark size={16} />
                </button>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
