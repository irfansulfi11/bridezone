import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, KeyRound, Loader2, Shield, Store } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'
import { useAuth } from '../store/AuthContext'
import Brand from '../components/Brand'
import { GoldRule } from '../components/SectionHeading'

const DEMO = [
  { role: 'Admin', email: 'admin@demo.com', password: 'admin123', icon: Shield },
  { role: 'Vendor', email: 'vendor@demo.com', password: 'vendor123', icon: Store },
]

export default function Login() {
  usePageTitle('Login')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const redirectFor = (role: 'admin' | 'vendor') =>
    role === 'admin' ? '/admin' : '/dashboard'

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    setTimeout(() => {
      const res = login(email, password)
      if (!res.ok) {
        setError(res.error)
        setBusy(false)
        return
      }
      const role = email.trim().toLowerCase() === 'admin@demo.com' ? 'admin' : 'vendor'
      const from = (location.state as { from?: string } | null)?.from
      navigate(from ?? redirectFor(role), { replace: true })
    }, 450)
  }

  const fill = (d: (typeof DEMO)[number]) => {
    setEmail(d.email)
    setPassword(d.password)
    setError('')
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-ivory">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-maroon/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <header className="container-page flex items-center justify-between py-5">
        <Brand />
        <Link to="/" className="btn-ghost !px-3 text-sm">
          <ArrowLeft size={16} /> Back to site
        </Link>
      </header>

      <div className="container-page flex flex-1 items-center justify-center py-8">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-maroon/10 bg-white p-8 shadow-lift animate-fade-in">
            <div className="text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-maroon text-gold">
                <KeyRound size={22} />
              </span>
              <h1 className="mt-4 font-display text-2xl font-semibold text-ink">Welcome back</h1>
              <div className="flex justify-center">
                <GoldRule align="center" />
              </div>
              <p className="mt-3 text-sm text-ink-soft">Sign in to your Bridezone account.</p>
            </div>

            <form onSubmit={submit} className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">Email</span>
                <input
                  className="field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@demo.com"
                  autoComplete="username"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">Password</span>
                <input
                  className="field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </label>

              {error && (
                <p className="rounded-lg bg-maroon/5 px-3 py-2 text-sm text-maroon-600">{error}</p>
              )}

              <button type="submit" disabled={busy} className="btn-primary w-full">
                {busy ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Signing in…
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </div>

          {/* Demo credentials helper */}
          <div className="mt-5 rounded-2xl border border-gold/30 bg-gold/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-700">
              Demo accounts — tap to fill
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {DEMO.map((d) => (
                <button
                  key={d.email}
                  onClick={() => fill(d)}
                  className="flex items-center gap-3 rounded-xl border border-maroon/10 bg-white px-4 py-3 text-left transition hover:border-maroon/30 hover:shadow-card"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-maroon/5 text-maroon">
                    <d.icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{d.role}</span>
                    <span className="block truncate text-xs text-ink-muted">{d.email}</span>
                    <span className="block text-xs text-ink-muted">{d.password}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
