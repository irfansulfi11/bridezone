import { Link } from 'react-router-dom'
import { CalendarDays, MapPin } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import SmartImage from '../components/SmartImage'
import { SectionHead } from '../components/Rail'
import { REAL_WEDDINGS } from '../data/wmg'

export default function RealWeddings() {
  usePageTitle('Real Wedding Stories')
  const [lead, ...rest] = REAL_WEDDINGS

  return (
    <div className="animate-fade-in">
      <section className="bg-maroon-900 text-ivory">
        <div className="container-page py-12">
          <p className="eyebrow !text-gold-300">Real Weddings</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ivory sm:text-4xl">
            Real Wedding Stories
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-ivory/75">
            Told by the couples themselves — the venues they picked, the vendors they loved and the
            details worth stealing.
          </p>
        </div>
      </section>

      {/* Lead story */}
      <section className="bg-white">
        <div className="container-page py-12">
          <div className="card group grid overflow-hidden lg:grid-cols-2">
            <SmartImage
              src={lead.image}
              alt={lead.couple}
              seed={lead.id}
              ratio="aspect-[4/3] lg:aspect-auto lg:h-full"
              imgClassName="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="eyebrow">Featured story</span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                {lead.couple}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{lead.headline}</p>
              <p className="mt-5 flex flex-wrap items-center gap-4 text-sm text-ink-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-gold-600" /> {lead.city}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-gold-600" /> {lead.date}
                </span>
              </p>
              <Link to="/vendors" className="btn-primary mt-7 self-start">
                See the vendor list
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-ivory">
        <div className="container-page py-12">
          <SectionHead title="More real weddings" href="/blog" linkLabel="Read the blog" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((w) => (
              <article key={w.id} className="card card-hover group flex flex-col overflow-hidden">
                <SmartImage
                  src={w.image}
                  alt={w.couple}
                  seed={w.id}
                  ratio="aspect-[4/3]"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold text-ink group-hover:text-maroon">
                    {w.couple}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {w.headline}
                  </p>
                  <p className="mt-4 flex items-center gap-2 border-t border-maroon/10 pt-4 text-xs text-ink-muted">
                    <MapPin size={13} className="text-gold-600" />
                    {w.city}
                    <span className="opacity-40">·</span>
                    {w.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Submit CTA */}
      <section className="bg-maroon-800 text-ivory">
        <div className="container-page flex flex-col items-center gap-5 py-14 text-center">
          <h2 className="font-display text-2xl font-semibold text-ivory sm:text-3xl">
            Got married recently?
          </h2>
          <p className="max-w-xl text-sm text-ivory/80">
            Submit your wedding and we&rsquo;ll feature your story, your photographs and every vendor
            who made the day happen.
          </p>
          <Link to="/plan" className="btn-gold">
            Submit your wedding
          </Link>
        </div>
      </section>
    </div>
  )
}
