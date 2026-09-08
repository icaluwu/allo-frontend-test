export type RocketStatusFilter = 'all' | 'active' | 'inactive'

export interface Rocket {
  id: string
  name: string
  description: string
  cost_per_launch: number | null
  country: string | null
  first_flight: string | null
  flickr_images?: string[]
  active: boolean | null
}

export interface RocketCreatePayload {
  name: string
  description: string
  imageUrl: string
  costPerLaunch: number | null
  country: string
  firstFlight: string
  active: boolean
}
