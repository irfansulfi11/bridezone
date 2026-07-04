import type { Category } from './types'
import { unsplash, PHOTOS } from '../lib/images'

export const categories: Category[] = [
  {
    slug: 'photography',
    name: 'Photography',
    blurb: 'Candid & cinematic storytellers',
    image: unsplash(PHOTOS.couple[0], 700, 560),
  },
  {
    slug: 'catering',
    name: 'Catering',
    blurb: 'Sadhya feasts & live counters',
    image: unsplash(PHOTOS.food[0], 700, 560),
  },
  {
    slug: 'decor',
    name: 'Decor',
    blurb: 'Mandaps, florals & lighting',
    image: unsplash(PHOTOS.decor[0], 700, 560),
  },
  {
    slug: 'makeup',
    name: 'Makeup',
    blurb: 'Bridal artistry & hair',
    image: unsplash(PHOTOS.makeup[0], 700, 560),
  },
  {
    slug: 'venues',
    name: 'Venues',
    blurb: 'Halls, resorts & backwaters',
    image: unsplash(PHOTOS.venue[0], 700, 560),
  },
  {
    slug: 'music',
    name: 'Music',
    blurb: 'Live bands, DJs & chenda melam',
    image: unsplash(PHOTOS.music[0], 700, 560),
  },
]

export const categoryName = (slug: string): string =>
  categories.find((c) => c.slug === slug)?.name ?? slug

export const LOCATIONS = ['Kochi', 'Trivandrum', 'Kollam', 'Calicut'] as const
