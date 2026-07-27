import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  Apple,
  Check,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Twitter,
  Youtube,
} from 'lucide-react'
import Brand from './Brand'
import { CONTACT, FOOTER_COLUMNS } from '../data/wmg'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="mt-20">
      {/* ------------------------------------------------ SEO / about block */}
      <section className="border-t border-maroon/10 bg-ivory-100">
        <div className="container-page py-12">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Bridezone &mdash; Your Personal Wedding Planner
          </h2>
          <h3 className="mt-3 text-base font-semibold text-maroon">Plan your wedding with us</h3>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-ink-soft">
            Bridezone is an Indian wedding planning website and app where you can find the best
            wedding vendors, with prices and reviews at the click of a button. Whether you are
            looking to hire wedding planners in Kerala, or looking for the top photographers, or
            just some ideas and inspiration for your wedding &mdash; Bridezone can help you solve
            your wedding planning woes through its unique features. With a checklist, detailed
            vendor list, inspiration gallery and blog, you won&rsquo;t need to spend hours planning
            a wedding anymore.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- contact strip */}
      <section className="bg-maroon-900 text-ivory/80">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="font-display text-lg font-semibold text-ivory">
              Contact us to get the best deals
            </h3>

            <div className="mt-6 grid gap-8 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-200">
                  For Vendors
                </p>
                <a
                  href={`mailto:${CONTACT.vendors.email}`}
                  className="mt-3 flex items-center gap-2 text-sm hover:text-gold-200"
                >
                  <Mail size={15} className="shrink-0 text-gold-300" />
                  {CONTACT.vendors.email}
                </a>
                <a
                  href={`tel:${CONTACT.vendors.phone}`}
                  className="mt-2 flex items-center gap-2 text-sm hover:text-gold-200"
                >
                  <Phone size={15} className="shrink-0 text-gold-300" />
                  {CONTACT.vendors.phone}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-200">
                  For Users
                </p>
                <a
                  href={`mailto:${CONTACT.users.email}`}
                  className="mt-3 flex items-center gap-2 text-sm hover:text-gold-200"
                >
                  <Mail size={15} className="shrink-0 text-gold-300" />
                  {CONTACT.users.email}
                </a>
                <a
                  href={`tel:${CONTACT.users.phone}`}
                  className="mt-2 flex items-center gap-2 text-sm hover:text-gold-200"
                >
                  <Phone size={15} className="shrink-0 text-gold-300" />
                  {CONTACT.users.phone}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-200">
                  Registered Address
                </p>
                <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-gold-300" />
                  {CONTACT.address}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="font-display text-lg font-semibold text-ivory">Get latest blog alerts</h3>

            {subscribed ? (
              <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ivory/10 px-4 py-3 text-sm text-gold-200">
                <Check size={16} /> You&rsquo;re on the list. Look out for our next edit.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-ivory/20 bg-ivory/10 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/45 focus:border-gold/60 focus:outline-none"
                />
                <button type="submit" className="btn-gold shrink-0 !px-6 !py-2.5">
                  Submit
                </button>
              </form>
            )}

            <Link
              to="/login"
              className="mt-5 inline-flex rounded-full border border-gold/50 px-5 py-2.5 text-sm font-medium text-gold-200 transition-colors hover:bg-gold hover:text-ink"
            >
              Register as a Vendor
            </Link>

            <div className="mt-7 flex flex-wrap items-center gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-200">
                  Follow us on
                </p>
                <div className="mt-2.5 flex items-center gap-3">
                  {[
                    { Icon: Facebook, label: 'Facebook' },
                    { Icon: Twitter, label: 'Twitter' },
                    { Icon: Instagram, label: 'Instagram' },
                    { Icon: Youtube, label: 'Youtube' },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      onClick={(e) => e.preventDefault()}
                      className="grid h-9 w-9 place-items-center rounded-full bg-ivory/10 text-ivory/80 transition-colors hover:bg-gold hover:text-ink"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-200">
                  Get the app
                </p>
                <div className="mt-2.5 flex gap-2">
                  <StoreBadge Icon={Apple} top="Download on the" bottom="App Store" />
                  <StoreBadge Icon={PlayCircle} top="Get it on" bottom="Google Play" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ link columns */}
      <section className="bg-maroon-950 text-ivory/70">
        <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-gold-200">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="transition-colors hover:text-gold-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-ivory/10">
          <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-ivory/50 sm:flex-row">
            <Brand tone="light" />
            <p>© {new Date().getFullYear()} Bridezone. A front-end demo — no real bookings.</p>
            <p className="flex gap-3">
              <Link to="/plan" className="hover:text-gold-200">Terms &amp; Conditions</Link>
              <span className="opacity-40">|</span>
              <Link to="/plan" className="hover:text-gold-200">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </section>
    </footer>
  )
}

function StoreBadge({
  Icon,
  top,
  bottom,
}: {
  Icon: typeof Apple
  top: string
  bottom: string
}) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="flex items-center gap-2 rounded-lg border border-ivory/20 px-3 py-1.5 transition-colors hover:border-gold/60"
    >
      <Icon size={20} className="text-ivory/80" />
      <span className="leading-tight">
        <span className="block text-[9px] uppercase tracking-wider text-ivory/50">{top}</span>
        <span className="block text-xs font-semibold text-ivory">{bottom}</span>
      </span>
    </a>
  )
}
