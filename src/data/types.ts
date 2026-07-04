export type VendorStatus = 'approved' | 'pending' | 'rejected'

export type CategorySlug =
  | 'photography'
  | 'catering'
  | 'decor'
  | 'makeup'
  | 'venues'
  | 'music'

export interface ServicePackage {
  id: string
  name: string
  price: number // in INR
  description: string
  features: string[]
}

export interface Vendor {
  id: string
  name: string
  category: CategorySlug
  location: string
  startingPrice: number // in INR
  rating: number // 0–5
  reviews: number
  featured: boolean
  status: VendorStatus
  tagline: string
  description: string
  images: string[]
  packages: ServicePackage[]
  // The demo vendor account maps to this vendor via ownerEmail
  ownerEmail?: string
}

export interface Category {
  slug: CategorySlug
  name: string
  blurb: string
  image: string
}

export type CollectionType = 'Bridal' | 'Necklaces' | 'Earrings' | 'Bangles'

export interface JewelleryPiece {
  id: string
  name: string
  detail: string
}

export interface Collection {
  id: string
  name: string
  type: CollectionType
  featured: boolean
  tagline: string
  description: string
  images: string[]
  pieces: JewelleryPiece[]
}

export type EnquiryStatus = 'new' | 'contacted' | 'closed'

export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  eventDate: string
  message: string
  // What the enquiry is about
  targetType: 'vendor' | 'collection'
  targetId: string
  targetName: string
  status: EnquiryStatus
  createdAt: string // ISO date
}
