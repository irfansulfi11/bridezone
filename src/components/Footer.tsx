import { Link } from 'react-router-dom'
import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import Brand from './Brand'
import { GoldRule } from './SectionHeading'

export default function Footer() {
  return (
    <footer className="mt-24 bg-maroon-900 text-ivory/80">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Brand tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">
            Kerala’s wedding atelier — photographers, caterers, decor, venues and heirloom
            jewellery, curated in one place.
          </p>
          <GoldRule />
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold-200">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/vendors" className="hover:text-gold-200">Browse vendors</Link></li>
            <li><Link to="/plan" className="hover:text-gold-200">Plan my wedding</Link></li>
            <li><Link to="/collections" className="hover:text-gold-200">Jewellery collections</Link></li>
            <li><Link to="/login" className="hover:text-gold-200">Vendor / admin login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold-200">Categories</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/vendors?category=photography" className="hover:text-gold-200">Photography</Link></li>
            <li><Link to="/vendors?category=catering" className="hover:text-gold-200">Catering</Link></li>
            <li><Link to="/vendors?category=decor" className="hover:text-gold-200">Decor</Link></li>
            <li><Link to="/vendors?category=venues" className="hover:text-gold-200">Venues</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold-200">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-300" />
              <span>MG Road, Kochi, Kerala 682016</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-gold-300" />
              <a href="tel:+914841234567" className="hover:text-gold-200">+91 484 123 4567</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-gold-300" />
              <a href="mailto:hello@bridezone.demo" className="hover:text-gold-200">hello@bridezone.demo</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Instagram size={16} className="shrink-0 text-gold-300" />
              <span>@bridezone.weddings</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-ivory/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Bridezone Wedding Atelier. Demo experience.</p>
          <p className="italic">A front-end demo · no real bookings are processed.</p>
        </div>
      </div>
    </footer>
  )
}
