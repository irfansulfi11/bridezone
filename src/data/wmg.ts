// Content model for the WedMeGood-style marketplace homepage & section pages.
// Everything here is demo copy — no backend. Structure mirrors the reference
// site's information architecture so the layout components stay dumb.

import { unsplash, PHOTOS } from '../lib/images'

/* ------------------------------------------------------------------ cities */

export interface CityGroup {
  region: string
  cities: string[]
}

export const CITY_GROUPS: CityGroup[] = [
  {
    region: 'Popular',
    cities: ['Kochi', 'Trivandrum', 'Calicut', 'Thrissur', 'Bangalore', 'Chennai'],
  },
  {
    region: 'Kerala',
    cities: ['Kochi', 'Trivandrum', 'Kollam', 'Calicut', 'Thrissur', 'Kottayam', 'Alappuzha', 'Kannur', 'Palakkad', 'Munnar'],
  },
  {
    region: 'South India',
    cities: ['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore', 'Madurai', 'Mysore', 'Mangalore', 'Vijayawada'],
  },
  {
    region: 'Rest of India',
    cities: ['Delhi NCR', 'Mumbai', 'Pune', 'Jaipur', 'Goa', 'Ahmedabad', 'Kolkata', 'Chandigarh', 'Lucknow', 'Udaipur'],
  },
  {
    region: 'International',
    cities: ['Dubai', 'Abu Dhabi', 'Singapore', 'Bangkok', 'Colombo', 'Muscat', 'Doha', 'London'],
  },
]

/** Flat, de-duplicated list used by the hero search select. */
export const ALL_CITIES: string[] = Array.from(
  new Set(CITY_GROUPS.flatMap((g) => g.cities)),
).sort()

export const TOP_CITIES = CITY_GROUPS[0].cities

/* --------------------------------------------------- popular venue searches */

export interface VenueSearchGroup {
  title: string
  cities: string[]
  href: string
}

export const VENUE_SEARCHES: VenueSearchGroup[] = [
  { title: '4 Star & Above Hotels', cities: ['Kochi', 'Trivandrum', 'Bangalore'], href: '/venues?type=4-star-hotels' },
  { title: 'Banquet Halls', cities: ['Kochi', 'Calicut', 'Chennai'], href: '/venues?type=banquet-halls' },
  { title: 'Marriage Garden / Lawns', cities: ['Thrissur', 'Kottayam', 'Bangalore'], href: '/venues?type=lawns' },
  { title: 'Wedding Resorts', cities: ['Munnar', 'Alappuzha', 'Goa'], href: '/venues?type=resorts' },
  { title: 'Kalyana Mandapams', cities: ['Thrissur', 'Palakkad', 'Madurai'], href: '/venues?type=mandapams' },
  { title: 'Destination Wedding Venues', cities: ['Goa', 'Udaipur', 'Dubai'], href: '/venues?type=destination' },
]

/* -------------------------------------------------------- inhouse services */

export interface InhouseService {
  id: string
  name: string
  blurb: string
  image: string
  href: string
}

export const INHOUSE_SERVICES: InhouseService[] = [
  {
    id: 'bridezone-at-home',
    name: 'Bridezone At Home',
    blurb: 'Family makeup services, at your doorstep',
    image: unsplash(PHOTOS.makeup[0], 640, 480),
    href: '/plan?service=at-home',
  },
  {
    id: 'genie',
    name: 'Genie Services',
    blurb: 'Plan your dream wedding in your budget',
    image: unsplash(PHOTOS.decor[0], 640, 480),
    href: '/plan?service=genie',
  },
  {
    id: 'venue-booking',
    name: 'Venue Booking Service',
    blurb: 'Best price guaranteed',
    image: unsplash(PHOTOS.venue[0], 640, 480),
    href: '/venues',
  },
]

/* ---------------------------------------------------- popular searches row */

export interface PopularSearch {
  label: string
  image: string
  href: string
}

export const POPULAR_SEARCHES: PopularSearch[] = [
  { label: 'Bridal Wear', image: unsplash(PHOTOS.bride[0], 320, 320), href: '/collections' },
  { label: 'Bridal Makeup Artists', image: unsplash(PHOTOS.makeup[1], 320, 320), href: '/vendors?category=makeup' },
  { label: 'Photographers', image: unsplash(PHOTOS.couple[0], 320, 320), href: '/vendors?category=photography' },
  { label: 'Invitations', image: unsplash(PHOTOS.invite[0], 320, 320), href: '/e-invites' },
  { label: 'Catering Services', image: unsplash(PHOTOS.food[0], 320, 320), href: '/vendors?category=catering' },
  { label: 'Wedding Venues', image: unsplash(PHOTOS.venue[1], 320, 320), href: '/venues' },
  { label: 'Mehendi Artists', image: unsplash(PHOTOS.mehndi[0], 320, 320), href: '/vendors?category=makeup' },
  { label: 'Wedding Planners', image: unsplash(PHOTOS.decor[1], 320, 320), href: '/vendors?category=decor' },
]

/** Text links under the hero search bar. */
export const HERO_LINKS = [
  { label: 'Wedding Photographers in Kerala', href: '/vendors?category=photography' },
  { label: 'Bridal Makeup Artists in Kochi', href: '/vendors?category=makeup&city=Kochi' },
  { label: 'Wedding Cards in India', href: '/e-invites' },
  { label: 'Wedding Venues in Kerala', href: '/venues' },
]

/* ------------------------------------------------------- wedding categories */

export interface CategoryGroup {
  /** lucide-react icon name resolved by the component */
  icon: string
  title: string
  href: string
  items: { label: string; href: string }[]
}

const v = (q: string) => `/vendors?category=${q}`

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    icon: 'Building2',
    title: 'Venues',
    href: '/venues',
    items: [
      { label: 'Banquet Halls', href: '/venues?type=banquet-halls' },
      { label: 'Marriage Garden / Lawns', href: '/venues?type=lawns' },
      { label: 'Wedding Resorts', href: '/venues?type=resorts' },
      { label: 'Small Function / Party Halls', href: '/venues?type=party-halls' },
      { label: 'Destination Wedding Venues', href: '/venues?type=destination' },
      { label: 'Kalyana Mandapams', href: '/venues?type=mandapams' },
      { label: '4 Star & Above Hotels', href: '/venues?type=4-star-hotels' },
      { label: '5 Star Luxury Hotels', href: '/venues?type=5-star-hotels' },
      { label: 'Wedding Farmhouses', href: '/venues?type=farmhouses' },
    ],
  },
  {
    icon: 'Camera',
    title: 'Photographers',
    href: v('photography'),
    items: [
      { label: 'Wedding Photographers', href: v('photography') },
      { label: 'Cinematographers', href: v('photography') },
      { label: 'Pre Wedding Shoot', href: v('photography') },
    ],
  },
  {
    icon: 'Brush',
    title: 'Makeup',
    href: v('makeup'),
    items: [
      { label: 'Bridal Makeup Artists', href: v('makeup') },
      { label: 'Family Makeup', href: v('makeup') },
      { label: 'Hair Stylists', href: v('makeup') },
    ],
  },
  {
    icon: 'Flower2',
    title: 'Planning & Decor',
    href: v('decor'),
    items: [
      { label: 'Wedding Planners', href: v('decor') },
      { label: 'Decorators', href: v('decor') },
      { label: 'Florists', href: v('decor') },
    ],
  },
  {
    icon: 'Shirt',
    title: 'Bridal Wear',
    href: '/collections',
    items: [
      { label: 'Bridal Lehenga', href: '/collections' },
      { label: 'Kanjeevaram Sarees', href: '/collections' },
      { label: 'Trousseau Packing', href: '/collections' },
    ],
  },
  {
    icon: 'Gem',
    title: 'Jewellery & Accessories',
    href: '/collections',
    items: [
      { label: 'Bridal Jewellery', href: '/collections' },
      { label: 'Necklaces', href: '/collections?type=Necklaces' },
      { label: 'Earrings', href: '/collections?type=Earrings' },
      { label: 'Bangles', href: '/collections?type=Bangles' },
    ],
  },
  {
    icon: 'UtensilsCrossed',
    title: 'Food',
    href: v('catering'),
    items: [
      { label: 'Catering Services', href: v('catering') },
      { label: 'Sadhya Specialists', href: v('catering') },
      { label: 'Wedding Cakes', href: v('catering') },
    ],
  },
  {
    icon: 'Music',
    title: 'Music & Dance',
    href: v('music'),
    items: [
      { label: 'Wedding DJs', href: v('music') },
      { label: 'Live Bands', href: v('music') },
      { label: 'Chenda Melam', href: v('music') },
      { label: 'Choreographers', href: v('music') },
    ],
  },
  {
    icon: 'Mail',
    title: 'Invites & Gifts',
    href: '/e-invites',
    items: [
      { label: 'Wedding Cards', href: '/e-invites' },
      { label: 'Invitation Videos', href: '/e-invites' },
      { label: 'Wedding Favors', href: '/e-invites' },
    ],
  },
  {
    icon: 'Hand',
    title: 'Mehndi',
    href: v('makeup'),
    items: [{ label: 'Mehendi Artists', href: v('makeup') }],
  },
  {
    icon: 'Video',
    title: 'Virtual Planning',
    href: '/plan',
    items: [{ label: 'Virtual planning', href: '/plan' }],
  },
  {
    icon: 'Plane',
    title: 'Honeymoon',
    href: '/plan?service=honeymoon',
    items: [
      { label: 'Honeymoon Packages', href: '/plan?service=honeymoon' },
      { label: 'Destination Guides', href: '/plan?service=honeymoon' },
    ],
  },
]

/* ---------------------------------------------------------- real weddings */

export interface RealWedding {
  id: string
  couple: string
  headline: string
  date: string
  city: string
  image: string
}

export const REAL_WEDDINGS: RealWedding[] = [
  {
    id: 'sanjana-davin',
    couple: 'Sanjana & Davin',
    headline:
      'A backwater wedding with the dreamiest seaside views and bridal fashion just as stunning!',
    date: '05 October 2025',
    city: 'Alappuzha',
    image: unsplash(PHOTOS.couple[0], 800, 600),
  },
  {
    id: 'sabiya-adnan',
    couple: 'Sabiya & Adnan',
    headline: 'This dreamy nikah featured forest picnic vows and the cutest hand-painted details!',
    date: '24 July 2026',
    city: 'Munnar',
    image: unsplash(PHOTOS.couple[1], 800, 600),
  },
  {
    id: 'raveen-sunny',
    couple: 'Raveen & Sunny',
    headline: 'A temple-town celebration wrapped in kasavu, jasmine and gold.',
    date: '22 July 2026',
    city: 'Thrissur',
    image: unsplash(PHOTOS.couple[2], 800, 600),
  },
  {
    id: 'meera-arjun',
    couple: 'Meera & Arjun',
    headline: 'Sunset vows on a Kovalam cliff, followed by the liveliest sangeet of the season.',
    date: '18 June 2026',
    city: 'Trivandrum',
    image: unsplash(PHOTOS.couple[3], 800, 600),
  },
  {
    id: 'nikita-rahul',
    couple: 'Nikita & Rahul',
    headline: 'An intimate houseboat mehendi that turned into a three-day backwater festival.',
    date: '02 May 2026',
    city: 'Kumarakom',
    image: unsplash(PHOTOS.couple[4], 800, 600),
  },
]

/* ----------------------------------------------------------------- blogs */

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'sister-of-the-bride',
    title: 'Sister Of The Bride Style: Meet Tisha',
    excerpt:
      "Tisha wasn't about to be the sister of the bride in just another rotation of lehengas. She took her wedding wardrobe just as seriously as the ceremonies themselves.",
    date: '24 Jul, 2026',
    category: 'Fashion',
    image: unsplash(PHOTOS.bride[0], 800, 600),
  },
  {
    id: 'forest-picnic-nikah',
    title: 'This Dreamy Nikah Featured Forest Picnic Vows & The Cutest Details!',
    excerpt:
      "There's something so refreshing about weddings that feel deeply personal, and Sabiya & Adnan's Munnar nikah was exactly that — every celebration beautifully brought to life.",
    date: '23 Jul, 2026',
    category: 'Real Weddings',
    image: unsplash(PHOTOS.decor[2], 800, 600),
  },
  {
    id: 'newest-luxury-venues',
    title: 'The Newest Luxury Wedding Venues In Kerala Every Couple Needs On Their Radar',
    excerpt:
      "Kerala's luxury wedding scene keeps getting better. Every year brings a new crop of breathtaking properties — from heritage palaces to chic backwater retreats.",
    date: '23 Jul, 2026',
    category: 'Venues',
    image: unsplash(PHOTOS.venue[2], 800, 600),
  },
  {
    id: 'sadhya-menu-guide',
    title: 'How To Plan A Sadhya Menu Your Guests Will Talk About For Years',
    excerpt:
      'Twenty-six items on a banana leaf, served in a very particular order. Here is how the best caterers in Kerala build a wedding sadhya from scratch.',
    date: '21 Jul, 2026',
    category: 'Food',
    image: unsplash(PHOTOS.food[1], 800, 600),
  },
  {
    id: 'kasavu-modern-bride',
    title: 'Kasavu, Reimagined: 12 Ways Modern Brides Are Wearing The Classic',
    excerpt:
      'The off-white-and-gold weave is having a moment. From draped capes to corset blouses, here are the styles trending this season.',
    date: '19 Jul, 2026',
    category: 'Fashion',
    image: unsplash(PHOTOS.bride[1], 800, 600),
  },
  {
    id: 'budget-breakdown',
    title: 'A Real Budget Breakdown Of A ₹25 Lakh Kerala Wedding',
    excerpt:
      'Line by line, where the money actually went — venue, catering, photography, decor — from a couple who kept every receipt.',
    date: '16 Jul, 2026',
    category: 'Planning',
    image: unsplash(PHOTOS.decor[3], 800, 600),
  },
]

/* --------------------------------------------------------------- gallery */

export interface GalleryTile {
  label: string
  image: string
  href: string
}

export const GALLERY_TILES: GalleryTile[] = [
  { label: 'Bridal Lehenga', image: unsplash(PHOTOS.bride[2], 500, 640), href: '/photos?album=bridal-lehenga' },
  { label: 'Outfits', image: unsplash(PHOTOS.groom[0], 500, 640), href: '/photos?album=outfits' },
  { label: 'Blouse Designs', image: unsplash(PHOTOS.bride[3], 500, 640), href: '/photos?album=blouse-designs' },
  { label: 'Wedding Sarees', image: unsplash(PHOTOS.bride[4], 500, 640), href: '/photos?album=wedding-sarees' },
  { label: 'Mehndi Designs', image: unsplash(PHOTOS.mehndi[1], 500, 640), href: '/photos?album=mehndi-designs' },
  { label: 'Wedding Decor', image: unsplash(PHOTOS.decor[0], 500, 640), href: '/photos?album=wedding-decor' },
]

/* --------------------------------------------------------- photo albums */

export interface PhotoAlbum {
  slug: string
  title: string
  count: number
  image: string
}

export const PHOTO_ALBUMS: PhotoAlbum[] = [
  { slug: 'bridal-lehenga', title: 'Bridal Lehenga', count: 1284, image: unsplash(PHOTOS.bride[0], 600, 450) },
  { slug: 'wedding-sarees', title: 'Wedding Sarees', count: 962, image: unsplash(PHOTOS.bride[1], 600, 450) },
  { slug: 'blouse-designs', title: 'Blouse Designs', count: 741, image: unsplash(PHOTOS.bride[2], 600, 450) },
  { slug: 'mehndi-designs', title: 'Mehndi Designs', count: 1103, image: unsplash(PHOTOS.mehndi[0], 600, 450) },
  { slug: 'wedding-jewellery', title: 'Wedding Jewellery', count: 856, image: unsplash(PHOTOS.jewellery[0], 600, 450) },
  { slug: 'bridal-makeup-hair', title: 'Bridal Makeup & Hair', count: 690, image: unsplash(PHOTOS.makeup[0], 600, 450) },
  { slug: 'wedding-decor', title: 'Wedding Decor', count: 1470, image: unsplash(PHOTOS.decor[0], 600, 450) },
  { slug: 'wedding-photography', title: 'Wedding Photography', count: 2310, image: unsplash(PHOTOS.couple[0], 600, 450) },
  { slug: 'groom-wear', title: 'Groom Wear', count: 512, image: unsplash(PHOTOS.groom[1], 600, 450) },
  { slug: 'invitations-favors', title: 'Invitations & Favors', count: 388, image: unsplash(PHOTOS.invite[0], 600, 450) },
  { slug: 'outfits', title: 'Outfits', count: 604, image: unsplash(PHOTOS.groom[2], 600, 450) },
  { slug: 'wedding-accessories', title: 'Wedding Accessories', count: 297, image: unsplash(PHOTOS.jewellery[1], 600, 450) },
]

/* ---------------------------------------------------------- venue types */

export interface VenueType {
  slug: string
  title: string
  blurb: string
  image: string
  from: number
}

export const VENUE_TYPES: VenueType[] = [
  { slug: 'banquet-halls', title: 'Banquet Halls', blurb: 'Air-conditioned halls for 200–800 guests', image: unsplash(PHOTOS.venue[0], 700, 500), from: 45000 },
  { slug: 'lawns', title: 'Marriage Garden / Lawns', blurb: 'Open-air lawns for evening receptions', image: unsplash(PHOTOS.venue[1], 700, 500), from: 60000 },
  { slug: 'resorts', title: 'Wedding Resorts', blurb: 'Stay-and-celebrate backwater properties', image: unsplash(PHOTOS.venue[2], 700, 500), from: 150000 },
  { slug: 'party-halls', title: 'Small Function / Party Halls', blurb: 'Intimate halls for under 150 guests', image: unsplash(PHOTOS.venue[3], 700, 500), from: 20000 },
  { slug: 'destination', title: 'Destination Wedding Venues', blurb: 'Goa, Udaipur, Dubai and beyond', image: unsplash(PHOTOS.decor[1], 700, 500), from: 400000 },
  { slug: 'mandapams', title: 'Kalyana Mandapams', blurb: 'Traditional temple-town mandapams', image: unsplash(PHOTOS.decor[2], 700, 500), from: 30000 },
  { slug: '4-star-hotels', title: '4 Star & Above Hotels', blurb: 'Full-service hotels with in-house catering', image: unsplash(PHOTOS.venue[0], 700, 500), from: 200000 },
  { slug: '5-star-hotels', title: '5 Star Luxury Hotels', blurb: 'Landmark luxury addresses', image: unsplash(PHOTOS.venue[1], 700, 500), from: 500000 },
  { slug: 'farmhouses', title: 'Wedding Farmhouses', blurb: 'Rustic estates with plenty of room', image: unsplash(PHOTOS.decor[3], 700, 500), from: 90000 },
]

/* -------------------------------------------------------------- e-invites */

export interface InviteTemplate {
  id: string
  name: string
  style: string
  image: string
}

export const INVITE_TEMPLATES: InviteTemplate[] = [
  { id: 'kasavu-gold', name: 'Kasavu Gold', style: 'Traditional', image: unsplash(PHOTOS.invite[0], 500, 700) },
  { id: 'temple-arch', name: 'Temple Arch', style: 'Traditional', image: unsplash(PHOTOS.invite[1], 500, 700) },
  { id: 'minimal-ivory', name: 'Minimal Ivory', style: 'Modern', image: unsplash(PHOTOS.invite[2], 500, 700) },
  { id: 'floral-script', name: 'Floral Script', style: 'Floral', image: unsplash(PHOTOS.invite[3], 500, 700) },
  { id: 'monogram-maroon', name: 'Monogram Maroon', style: 'Modern', image: unsplash(PHOTOS.jewellery[2], 500, 700) },
  { id: 'backwater-blue', name: 'Backwater Blue', style: 'Destination', image: unsplash(PHOTOS.venue[2], 500, 700) },
]

/* ----------------------------------------------------------------- footer */

export interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Start Planning',
    links: [
      { label: 'Search By Vendor', href: '/vendors' },
      { label: 'Search By City', href: '/vendors' },
      { label: 'Download Our App', href: '/plan' },
      { label: 'Top Rated Vendors', href: '/vendors?sort=rating' },
      { label: 'Destination Wedding', href: '/venues?type=destination' },
    ],
  },
  {
    title: 'Wedding Ideas',
    links: [
      { label: 'Wedding Blog', href: '/blog' },
      { label: 'Wedding Inspiration Gallery', href: '/photos' },
      { label: 'Real Weddings', href: '/real-weddings' },
      { label: 'Submit Wedding', href: '/real-weddings' },
    ],
  },
  {
    title: 'Photo Gallery',
    links: [
      { label: 'Bridal Wear', href: '/photos?album=bridal-lehenga' },
      { label: 'Wedding Jewellery', href: '/photos?album=wedding-jewellery' },
      { label: 'Bridal Makeup & Hair', href: '/photos?album=bridal-makeup-hair' },
      { label: 'Wedding Decor', href: '/photos?album=wedding-decor' },
      { label: 'Wedding Photography', href: '/photos?album=wedding-photography' },
      { label: 'Groom Wear', href: '/photos?album=groom-wear' },
      { label: 'Invitations & Favors', href: '/photos?album=invitations-favors' },
      { label: 'Wedding Accessories', href: '/photos?album=wedding-accessories' },
      { label: 'Mehendi Designs', href: '/photos?album=mehndi-designs' },
    ],
  },
  {
    title: 'Home',
    links: [
      { label: 'About Bridezone', href: '/plan' },
      { label: 'Careers', href: '/plan' },
      { label: 'Contact Us', href: '/plan' },
      { label: 'Site Map', href: '/' },
      { label: 'Terms & Conditions', href: '/plan' },
      { label: 'Privacy Policy', href: '/plan' },
      { label: 'Cancellation Policy', href: '/plan' },
    ],
  },
  {
    title: 'Wedding Invitation Maker',
    links: [
      { label: 'Wedding Card Designs', href: '/e-invites' },
      { label: 'Save the Date Templates', href: '/e-invites' },
      { label: 'Invitation Video Templates', href: '/e-invites' },
    ],
  },
]

export const CONTACT = {
  vendors: { email: 'vendors@bridezone.demo', phone: '0484-6812346' },
  users: { email: 'info@bridezone.demo', phone: '0484-6812345' },
  address:
    '4th Floor, Marine Square, Shanmugham Road, Marine Drive, Ernakulam, Kochi, Kerala, India, 682031',
}
