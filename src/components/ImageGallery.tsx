import { useState } from 'react'
import SmartImage from './SmartImage'

// Simple gallery: large active image + thumbnail strip.
export default function ImageGallery({
  images,
  alt,
  seed,
}: {
  images: string[]
  alt: string
  seed: string
}) {
  const [active, setActive] = useState(0)
  const list = images.length ? images : ['']

  return (
    <div>
      <SmartImage
        src={list[active]}
        alt={`${alt} — photo ${active + 1}`}
        seed={`${seed}-${active}`}
        ratio="aspect-[4/3]"
        className="rounded-2xl shadow-card"
        eager
      />
      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
          {list.slice(0, 5).map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`overflow-hidden rounded-lg ring-2 transition ${
                i === active ? 'ring-gold' : 'ring-transparent hover:ring-maroon/20'
              }`}
              aria-label={`View photo ${i + 1}`}
            >
              <SmartImage src={img} alt={`${alt} thumbnail ${i + 1}`} seed={`${seed}-${i}`} ratio="aspect-square" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
