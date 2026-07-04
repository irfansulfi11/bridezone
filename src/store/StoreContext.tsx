import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type {
  Category,
  Collection,
  Enquiry,
  EnquiryStatus,
  ServicePackage,
  Vendor,
  VendorStatus,
} from '../data/types'
import { vendors as seedVendors } from '../data/vendors'
import { collections as seedCollections } from '../data/collections'
import { seedEnquiries } from '../data/enquiries'
import { categories as seedCategories } from '../data/categories'

// New enquiries submitted through the modal during the demo.
export interface NewEnquiryInput {
  name: string
  email: string
  phone: string
  eventDate: string
  message: string
  targetType: 'vendor' | 'collection'
  targetId: string
  targetName: string
}

interface StoreValue {
  vendors: Vendor[]
  collections: Collection[]
  enquiries: Enquiry[]
  categories: Category[]

  // Derived: only approved vendors are visible on public pages.
  approvedVendors: Vendor[]

  // Vendor actions
  setVendorStatus: (id: string, status: VendorStatus) => void
  updateVendorPackages: (id: string, packages: ServicePackage[]) => void

  // Collection actions
  toggleCollectionFeatured: (id: string) => void

  // Enquiry actions
  addEnquiry: (input: NewEnquiryInput) => Enquiry
  setEnquiryStatus: (id: string, status: EnquiryStatus) => void

  // Category actions
  addCategory: (name: string) => void
  removeCategory: (slug: string) => void
}

const StoreContext = createContext<StoreValue | null>(null)

let enquiryCounter = 2000

export function StoreProvider({ children }: { children: ReactNode }) {
  const [vendors, setVendors] = useState<Vendor[]>(() => seedVendors)
  const [collections, setCollections] = useState<Collection[]>(() => seedCollections)
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => seedEnquiries)
  const [categories, setCategories] = useState<Category[]>(() => seedCategories)

  const setVendorStatus = (id: string, status: VendorStatus) =>
    setVendors((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)))

  const updateVendorPackages = (id: string, packages: ServicePackage[]) =>
    setVendors((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              packages,
              startingPrice: packages.length
                ? Math.min(...packages.map((p) => p.price))
                : v.startingPrice,
            }
          : v,
      ),
    )

  const toggleCollectionFeatured = (id: string) =>
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c)),
    )

  const addEnquiry = (input: NewEnquiryInput): Enquiry => {
    const enquiry: Enquiry = {
      id: `enq-${++enquiryCounter}`,
      ...input,
      status: 'new',
      createdAt: new Date().toISOString(),
    }
    setEnquiries((prev) => [enquiry, ...prev])
    return enquiry
  }

  const setEnquiryStatus = (id: string, status: EnquiryStatus) =>
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)))

  const addCategory = (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    const slug = trimmed
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setCategories((prev) =>
      prev.some((c) => c.slug === slug)
        ? prev
        : [
            ...prev,
            {
              slug: slug as Category['slug'],
              name: trimmed,
              blurb: 'Custom category',
              image: '',
            },
          ],
    )
  }

  const removeCategory = (slug: string) =>
    setCategories((prev) => prev.filter((c) => c.slug !== slug))

  const value = useMemo<StoreValue>(
    () => ({
      vendors,
      collections,
      enquiries,
      categories,
      approvedVendors: vendors.filter((v) => v.status === 'approved'),
      setVendorStatus,
      updateVendorPackages,
      toggleCollectionFeatured,
      addEnquiry,
      setEnquiryStatus,
      addCategory,
      removeCategory,
    }),
    [vendors, collections, enquiries, categories],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
