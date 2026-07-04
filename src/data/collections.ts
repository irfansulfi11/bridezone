import type { Collection } from './types'
import { unsplash, PHOTOS } from '../lib/images'

// Jewellery collections — the brand's signature showcase. 2 marked Featured.
export const collections: Collection[] = [
  {
    id: 'kasavu-bridal',
    name: 'Kasavu Bridal Set',
    type: 'Bridal',
    featured: true,
    tagline: 'Temple-gold bridal ensemble',
    description:
      'A complete temple-jewellery bridal set inspired by Kerala’s Kasavu tradition — layered lakshmi haaram, matching jhumkas, waist belt and bangles in 22-karat gold.',
    images: [unsplash(PHOTOS.jewellery[0]), unsplash(PHOTOS.jewellery[1]), unsplash(PHOTOS.jewellery[2])],
    pieces: [
      { id: 'kb-1', name: 'Lakshmi Long Haaram', detail: '22kt · temple motif' },
      { id: 'kb-2', name: 'Short Mango Necklace', detail: '22kt · antique finish' },
      { id: 'kb-3', name: 'Temple Jhumkas', detail: 'With pearl drops' },
      { id: 'kb-4', name: 'Oddiyanam (Waist Belt)', detail: 'Adjustable · temple work' },
      { id: 'kb-5', name: 'Bridal Bangle Stack', detail: 'Set of 8' },
    ],
  },
  {
    id: 'royal-polki',
    name: 'Royal Polki Suite',
    type: 'Bridal',
    featured: true,
    tagline: 'Uncut-diamond statement suite',
    description:
      'A regal uncut-diamond (polki) suite set in gold with emerald drops — a statement choker, long rani haar and chandbali earrings for the reception.',
    images: [unsplash(PHOTOS.jewellery[3]), unsplash(PHOTOS.jewellery[4]), unsplash(PHOTOS.jewellery[5])],
    pieces: [
      { id: 'rp-1', name: 'Polki Choker', detail: 'Uncut diamonds · emerald drops' },
      { id: 'rp-2', name: 'Rani Haar', detail: 'Layered polki' },
      { id: 'rp-3', name: 'Chandbali Earrings', detail: 'With pearl lattice' },
      { id: 'rp-4', name: 'Maang Tikka', detail: 'Matching polki' },
    ],
  },
  {
    id: 'nakshatra-necklaces',
    name: 'Nakshatra Necklaces',
    type: 'Necklaces',
    featured: false,
    tagline: 'Everyday-to-festive gold necklaces',
    description: 'A versatile line of gold necklaces — from a delicate daily chain to a festive kasu mala.',
    images: [unsplash(PHOTOS.jewellery[1]), unsplash(PHOTOS.jewellery[2]), unsplash(PHOTOS.jewellery[0])],
    pieces: [
      { id: 'nn-1', name: 'Kasu Mala', detail: '22kt · coin motif' },
      { id: 'nn-2', name: 'Layered Beads Chain', detail: '22kt' },
      { id: 'nn-3', name: 'Pendant Chain', detail: 'With CZ pendant' },
      { id: 'nn-4', name: 'Choker Necklace', detail: 'Antique finish' },
    ],
  },
  {
    id: 'meenakari-earrings',
    name: 'Meenakari Earrings',
    type: 'Earrings',
    featured: false,
    tagline: 'Enamel-work jhumkas & studs',
    description: 'Hand-painted meenakari enamel earrings in jewel tones, from featherlight studs to grand jhumkas.',
    images: [unsplash(PHOTOS.jewellery[2]), unsplash(PHOTOS.jewellery[5]), unsplash(PHOTOS.jewellery[1])],
    pieces: [
      { id: 'me-1', name: 'Peacock Jhumkas', detail: 'Meenakari · pearl drops' },
      { id: 'me-2', name: 'Enamel Studs', detail: 'Ruby & green' },
      { id: 'me-3', name: 'Chandbali', detail: 'Meenakari reverse' },
      { id: 'me-4', name: 'Ear Chains', detail: 'For heavier looks' },
    ],
  },
  {
    id: 'heritage-bangles',
    name: 'Heritage Bangles',
    type: 'Bangles',
    featured: false,
    tagline: 'Temple & antique bangle stacks',
    description: 'Classic broad kada and thin stackable bangles with temple and nakshi work.',
    images: [unsplash(PHOTOS.jewellery[4]), unsplash(PHOTOS.jewellery[0]), unsplash(PHOTOS.jewellery[3])],
    pieces: [
      { id: 'hb-1', name: 'Broad Temple Kada', detail: 'Pair · lakshmi motif' },
      { id: 'hb-2', name: 'Nakshi Bangles', detail: 'Set of 4' },
      { id: 'hb-3', name: 'Thin Stackables', detail: 'Set of 12' },
      { id: 'hb-4', name: 'Ruby Bangles', detail: 'With CZ' },
    ],
  },
  {
    id: 'pearl-grace',
    name: 'Pearl Grace',
    type: 'Necklaces',
    featured: false,
    tagline: 'South-sea pearl & gold',
    description: 'Understated luxury — south-sea pearls strung with gold and ruby accents for the muhurtham.',
    images: [unsplash(PHOTOS.jewellery[5]), unsplash(PHOTOS.jewellery[3]), unsplash(PHOTOS.jewellery[4])],
    pieces: [
      { id: 'pg-1', name: 'Double-Strand Pearls', detail: 'South-sea · gold clasp' },
      { id: 'pg-2', name: 'Pearl Drop Earrings', detail: 'With ruby' },
      { id: 'pg-3', name: 'Pearl Bracelet', detail: 'Adjustable' },
    ],
  },
  {
    id: 'lotus-studs',
    name: 'Lotus Studs',
    type: 'Earrings',
    featured: false,
    tagline: 'Dainty everyday studs',
    description: 'A dainty everyday collection of lotus and floral gold studs — perfect for engagement and pre-wedding functions.',
    images: [unsplash(PHOTOS.jewellery[0]), unsplash(PHOTOS.jewellery[4]), unsplash(PHOTOS.jewellery[2])],
    pieces: [
      { id: 'ls-1', name: 'Lotus Studs', detail: '22kt · petite' },
      { id: 'ls-2', name: 'Floral Studs', detail: 'With CZ' },
      { id: 'ls-3', name: 'Jhumka Studs', detail: 'Small drops' },
    ],
  },
  {
    id: 'antique-kada',
    name: 'Antique Kada',
    type: 'Bangles',
    featured: false,
    tagline: 'Statement antique-finish kadas',
    description: 'Bold antique-finish kadas with nakshi and temple detailing for a striking bridal wrist.',
    images: [unsplash(PHOTOS.jewellery[3]), unsplash(PHOTOS.jewellery[1]), unsplash(PHOTOS.jewellery[5])],
    pieces: [
      { id: 'ak-1', name: 'Broad Antique Kada', detail: 'Pair · nakshi work' },
      { id: 'ak-2', name: 'Temple Kada', detail: 'Single statement' },
      { id: 'ak-3', name: 'Studded Kada', detail: 'With CZ & ruby' },
    ],
  },
]

export const findCollection = (id: string): Collection | undefined =>
  collections.find((c) => c.id === id)
