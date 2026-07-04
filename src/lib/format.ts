// Indian-style currency + number formatting.

export const formatINR = (amount: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

// Compact form for headings/reasons, e.g. ₹2L, ₹1.5L, ₹80K, ₹3L
export const formatINRShort = (amount: number): string => {
  if (amount >= 10000000) return `₹${trim(amount / 10000000)}Cr`
  if (amount >= 100000) return `₹${trim(amount / 100000)}L`
  if (amount >= 1000) return `₹${trim(amount / 1000)}K`
  return `₹${amount}`
}

const trim = (n: number): string =>
  n % 1 === 0 ? String(n) : n.toFixed(1)

export const formatDate = (iso: string): string => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
