import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle'
import SmartImage from '../components/SmartImage'
import { SectionHead } from '../components/Rail'
import { BLOG_POSTS } from '../data/wmg'

const CATEGORIES = ['All', ...Array.from(new Set(BLOG_POSTS.map((b) => b.category)))]

export default function Blog() {
  usePageTitle('Wedding Blog')
  const [active, setActive] = useState('All')

  const posts = useMemo(
    () => (active === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((b) => b.category === active)),
    [active],
  )
  const [lead, ...rest] = posts

  return (
    <div className="animate-fade-in">
      <section className="bg-maroon-900 text-ivory">
        <div className="container-page py-12">
          <p className="eyebrow !text-gold-300">Blog</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ivory sm:text-4xl">
            The Bridezone Wedding Blog
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-ivory/75">
            Trends, real budgets, vendor advice and the outfit edits our editors are saving.
          </p>
        </div>
      </section>

      <section className="border-b border-maroon/10 bg-white">
        <div className="container-page flex gap-2 overflow-x-auto py-4 scrollbar-none">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === c
                  ? 'border-maroon bg-maroon text-ivory'
                  : 'border-maroon/20 text-ink-soft hover:border-maroon/50 hover:text-maroon'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-page py-12">
          {lead && (
            <article className="card group mb-10 grid overflow-hidden lg:grid-cols-2">
              <SmartImage
                src={lead.image}
                alt={lead.title}
                seed={lead.id}
                ratio="aspect-[16/10] lg:aspect-auto lg:h-full"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="eyebrow">{lead.category}</span>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                  {lead.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">{lead.excerpt}</p>
                <p className="mt-5 text-xs text-ink-muted">{lead.date}</p>
                <Link to="/blog" className="btn-primary mt-7 self-start">
                  Read the story
                </Link>
              </div>
            </article>
          )}

          <SectionHead title="Latest posts" subtitle={`${posts.length} article${posts.length === 1 ? '' : 's'}`} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((b) => (
              <article key={b.id} className="card card-hover group flex flex-col overflow-hidden">
                <SmartImage
                  src={b.image}
                  alt={b.title}
                  seed={b.id}
                  ratio="aspect-[16/10]"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-5">
                  <span className="eyebrow">{b.category}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink group-hover:text-maroon">
                    {b.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {b.excerpt}
                  </p>
                  <p className="mt-4 border-t border-maroon/10 pt-4 text-xs text-ink-muted">{b.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
