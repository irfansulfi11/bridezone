import type { Vendor } from '../data/types'

// The cheapest package price (a full-service total) — used for budget filtering
// and the planning-assistant match, since a caterer's per-plate startingPrice
// isn't comparable to a photographer's package price.
export const cheapestPackage = (v: Vendor): number =>
  v.packages.length ? Math.min(...v.packages.map((p) => p.price)) : v.startingPrice

export interface BudgetBand {
  id: string
  label: string
  min: number
  max: number
}

export const BUDGET_BANDS: BudgetBand[] = [
  { id: 'any', label: 'Any budget', min: 0, max: Infinity },
  { id: 'u50', label: 'Under ₹50K', min: 0, max: 50000 },
  { id: '50-100', label: '₹50K – ₹1L', min: 50000, max: 100000 },
  { id: '100-200', label: '₹1L – ₹2L', min: 100000, max: 200000 },
  { id: '200+', label: 'Above ₹2L', min: 200000, max: Infinity },
]

export const inBudgetBand = (v: Vendor, band: BudgetBand): boolean => {
  const price = cheapestPackage(v)
  return price >= band.min && price <= band.max
}
