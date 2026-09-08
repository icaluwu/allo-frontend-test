import type { Rocket } from '@/types/rocket'

export const FALLBACK_ROCKET_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480" viewBox="0 0 800 480">'
  + '<rect width="800" height="480" fill="#0e1420"/>'
  + '<circle cx="400" cy="200" r="92" fill="#182130"/>'
  + '<text x="400" y="245" font-size="110" text-anchor="middle">🚀</text>'
  + '<text x="400" y="360" font-size="28" text-anchor="middle" fill="#64748b" font-family="sans-serif">No image available</text>'
  + '</svg>'
)}`

export function rocketImage (rocket: Rocket): string {
  return rocket.flickr_images?.[0] || FALLBACK_ROCKET_IMAGE
}

export function truncateDescription (description: string, maxLength = 120): string {
  const trimmed = description.trim()
  if (trimmed.length <= maxLength) return trimmed
  return `${trimmed.slice(0, maxLength).trimEnd()}...`
}

export function formatCurrency (value: number | null): string {
  if (value === null || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatFirstFlight (isoDate: string | null): string {
  if (!isoDate) return '—'
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
