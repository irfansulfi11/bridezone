import { useEffect } from 'react'

// Per-route document title.
export function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} · Bridezone` : 'Bridezone · Wedding Services'
    return () => {
      document.title = previous
    }
  }, [title])
}
