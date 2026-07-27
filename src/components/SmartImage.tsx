import { useState } from 'react'
import { picsum } from '../lib/images'

interface SmartImageProps {
  src: string
  alt: string
  /** aspect-ratio utility applied to the frame, e.g. "aspect-[4/3]" */
  ratio?: string
  className?: string
  imgClassName?: string
  /** stable seed for deterministic fallback image / gradient */
  seed?: string
  eager?: boolean
}

// On-brand gradient palette used when no network image can load
// (e.g. in an offline sandbox). Deterministic per seed → the grid looks
// varied but cohesive rather than showing broken-image icons.
const GRADIENTS = [
  ['#6b2d8f', '#2a1533'], // royal purple → aubergine
  ['#a45ecf', '#582674'], // light purple
  ['#8a3fb5', '#2a1533'], // purple → deep
  ['#e9a6c4', '#94305c'], // blush → plum
  ['#3a2b45', '#1a0d20'], // neutral aubergine
  ['#cd5c8f', '#582674'], // rose-plum → purple
]

function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

export default function SmartImage({
  src,
  alt,
  ratio = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  seed,
  eager = false,
}: SmartImageProps) {
  // stage 0: primary src · stage 1: picsum fallback · stage 2: gradient
  const [stage, setStage] = useState(0)
  const key = seed ?? alt ?? src
  const [g1, g2] = GRADIENTS[hash(key) % GRADIENTS.length]

  const currentSrc = stage === 0 ? src : picsum(key, 900, 700)

  return (
    <div
      className={`img-frame ${ratio} ${className}`}
      style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
    >
      {stage < 2 && (
        <img
          src={currentSrc}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={imgClassName}
          onError={() => setStage((s) => s + 1)}
        />
      )}
      {stage >= 2 && (
        // Elegant placeholder: faint diamond motif + label
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ivory/85">
          <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 3 L24 12 L16 29 L8 12 Z" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
            <path d="M8 12 H24 M16 3 L12 12 M16 3 L20 12" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
          </svg>
          <span className="px-3 text-center font-serif text-sm italic tracking-wide opacity-80">
            {alt}
          </span>
        </div>
      )}
    </div>
  )
}
