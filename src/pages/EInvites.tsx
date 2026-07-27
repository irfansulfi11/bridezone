import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Palette, Send, Share2 } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import SmartImage from '../components/SmartImage'
import { SectionHead } from '../components/Rail'
import { INVITE_TEMPLATES } from '../data/wmg'

const STYLES = ['All', ...Array.from(new Set(INVITE_TEMPLATES.map((t) => t.style)))]

const STEPS = [
  { Icon: Palette, title: 'Pick a design', copy: 'Traditional kasavu, modern monogram or floral script.' },
  { Icon: Check, title: 'Add your details', copy: 'Names, muhurtham timings, venue map and dress code.' },
  { Icon: Share2, title: 'Share instantly', copy: 'One link for WhatsApp, one video for the family group.' },
]

export default function EInvites() {
  usePageTitle('Wedding Invitation Maker')
  const [style, setStyle] = useState('All')

  const templates = useMemo(
    () => (style === 'All' ? INVITE_TEMPLATES : INVITE_TEMPLATES.filter((t) => t.style === style)),
    [style],
  )

  return (
    <div className="animate-fade-in">
      <section className="bg-maroon-900 text-ivory">
        <div className="container-page py-12">
          <p className="eyebrow !text-gold-300">E-Invites</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ivory sm:text-4xl">
            Wedding Invitation Maker
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-ivory/75">
            Design a free digital wedding card, save-the-date or invitation video in minutes — then
            share one link with everyone.
          </p>
          <Link to="/plan" className="btn-gold mt-6">
            <Send size={16} /> Start designing
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="container-page py-12">
          <SectionHead title="How it works" />
          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map(({ Icon, title, copy }, i) => (
              <div key={title} className="rounded-xl bg-ivory p-6 ring-1 ring-maroon/10">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-maroon text-ivory">
                  <Icon size={19} />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-gold-600">
                  Step {i + 1}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="bg-ivory">
        <div className="container-page py-12">
          <SectionHead title="Card designs" subtitle="Free to customise, no watermark" />

          <div className="mb-7 flex gap-2 overflow-x-auto scrollbar-none">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  style === s
                    ? 'border-maroon bg-maroon text-ivory'
                    : 'border-maroon/20 text-ink-soft hover:border-maroon/50 hover:text-maroon'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {templates.map((t) => (
              <div key={t.id} className="group">
                <div className="relative overflow-hidden rounded-xl shadow-card ring-1 ring-maroon/10">
                  <SmartImage
                    src={t.image}
                    alt={t.name}
                    seed={t.id}
                    ratio="aspect-[5/7]"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-maroon-950/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-full bg-gold px-4 py-2 text-xs font-semibold text-ink">
                      Customise
                    </span>
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-ink">{t.name}</p>
                <p className="text-xs text-ink-muted">{t.style}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
