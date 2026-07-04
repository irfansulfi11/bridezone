import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2, X } from 'lucide-react'
import { useStore } from '../store/StoreContext'

interface EnquiryModalProps {
  open: boolean
  onClose: () => void
  targetType: 'vendor' | 'collection'
  targetId: string
  targetName: string
}

interface FormState {
  name: string
  email: string
  phone: string
  eventDate: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', phone: '', eventDate: '', message: '' }

type Errors = Partial<Record<keyof FormState, string>>

function validate(f: FormState): Errors {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Please enter your name.'
  if (!f.email.trim()) e.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (!f.phone.trim()) e.phone = 'Please enter a phone number.'
  else if (f.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number.'
  if (!f.message.trim()) e.message = 'Tell us a little about your event.'
  return e
}

export default function EnquiryModal({ open, onClose, targetType, targetId, targetName }: EnquiryModalProps) {
  const { addEnquiry } = useStore()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  // Reset whenever the modal opens for a new target.
  useEffect(() => {
    if (open) {
      setForm(EMPTY)
      setErrors({})
      setStatus('idle')
    }
  }, [open, targetId])

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('submitting')
    // Simulate a brief round-trip, then commit to local state (no backend).
    setTimeout(() => {
      addEnquiry({ ...form, targetType, targetId, targetName })
      setStatus('success')
    }, 650)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-4 animate-fade"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-t-3xl bg-ivory shadow-lift sm:rounded-3xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-ink-soft hover:bg-maroon/10 hover:text-maroon"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center px-8 py-14 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold-600">
              <CheckCircle2 size={38} />
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold text-maroon">Enquiry sent!</h3>
            <p className="mt-2 max-w-sm text-sm text-ink-soft">
              Thank you, {form.name.split(' ')[0]}. Your enquiry for <strong>{targetName}</strong> has
              been received. Our concierge will reach out shortly.
            </p>
            <p className="mt-4 rounded-lg bg-maroon/5 px-4 py-2 text-xs text-ink-muted">
              Demo note: this enquiry now appears in the admin inbox.
            </p>
            <button onClick={onClose} className="btn-primary mt-6 w-full">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-h-[88vh] overflow-y-auto px-6 py-7 sm:px-8">
            <p className="eyebrow">Send an enquiry</p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{targetName}</h3>
            <p className="mt-1 text-sm text-ink-soft">
              Share a few details and we’ll connect you directly.
            </p>

            <div className="mt-6 space-y-4">
              <Field label="Full name" error={errors.name}>
                <input className="field" value={form.name} onChange={set('name')} placeholder="Your name" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" error={errors.email}>
                  <input className="field" value={form.email} onChange={set('email')} placeholder="you@email.com" />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input className="field" value={form.phone} onChange={set('phone')} placeholder="+91 …" />
                </Field>
              </div>
              <Field label="Event date (optional)">
                <input type="date" className="field" value={form.eventDate} onChange={set('eventDate')} />
              </Field>
              <Field label="Message" error={errors.message}>
                <textarea
                  className="field min-h-[96px] resize-y"
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Tell us about your wedding — dates, guest count, what you're looking for…"
                />
              </Field>
            </div>

            <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-6 w-full">
              {status === 'submitting' ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending…
                </>
              ) : (
                'Send enquiry'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-maroon-600">{error}</span>}
    </label>
  )
}
