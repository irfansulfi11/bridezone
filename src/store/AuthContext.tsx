import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Role = 'admin' | 'vendor'

export interface DemoUser {
  email: string
  name: string
  role: Role
}

// Hardcoded demo accounts — this is a front-end-only demo (no real auth).
interface Account extends DemoUser {
  password: string
}

const ACCOUNTS: Account[] = [
  { email: 'admin@demo.com', password: 'admin123', name: 'Admin', role: 'admin' },
  { email: 'vendor@demo.com', password: 'vendor123', name: 'Lens & Light Studios', role: 'vendor' },
]

const STORAGE_KEY = 'bridezone.auth'

interface AuthValue {
  user: DemoUser | null
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string }
  logout: () => void
}

const AuthContext = createContext<AuthValue | null>(null)

function loadUser(): DemoUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as DemoUser
    // Only trust known demo emails.
    return ACCOUNTS.some((a) => a.email === parsed.email) ? parsed : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => loadUser())

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login: AuthValue['login'] = (email, password) => {
    const match = ACCOUNTS.find(
      (a) => a.email === email.trim().toLowerCase() && a.password === password,
    )
    if (!match) return { ok: false, error: 'Invalid email or password.' }
    const { password: _pw, ...safe } = match
    void _pw
    setUser(safe)
    return { ok: true }
  }

  const logout = () => setUser(null)

  const value = useMemo<AuthValue>(() => ({ user, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
