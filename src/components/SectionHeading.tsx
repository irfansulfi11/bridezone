import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

// Signature detail: a thin gold rule/ornament under every section heading.
export function GoldRule({ align = 'left' }: { align?: 'left' | 'center' }) {
  return (
    <span
      className={`mt-4 flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}
      aria-hidden="true"
    >
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
    </span>
  )
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
      <div className={align === 'center' ? 'flex justify-center' : ''}>
        <GoldRule align={align} />
      </div>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-ink-soft ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
