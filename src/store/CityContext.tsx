import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'bridezone.city'
const DEFAULT_CITY = 'Kochi'

interface CityValue {
  city: string
  setCity: (c: string) => void
}

const CityContext = createContext<CityValue | null>(null)

/** Selected city drives the header pill and pre-fills search forms. */
export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_CITY
    } catch {
      return DEFAULT_CITY
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, city)
    } catch {
      /* private mode — selection just won't persist */
    }
  }, [city])

  const value = useMemo(() => ({ city, setCity }), [city])
  return <CityContext.Provider value={value}>{children}</CityContext.Provider>
}

export function useCity(): CityValue {
  const ctx = useContext(CityContext)
  if (!ctx) throw new Error('useCity must be used inside <CityProvider>')
  return ctx
}
