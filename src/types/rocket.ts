export type RocketStatusFilter = 'all' | 'active' | 'inactive'

export interface Rocket {
  id: string
  full_name: string
  description: string
  launch_cost: number | null
  country: string | null
  maiden_flight: string | null
  image_url: string | null
  active: boolean | null
}

export interface RocketCreatePayload {
  fullName: string
  description: string
  imageUrl: string
  launchCost: number | null
  country: string
  maidenFlight: string
  active: boolean
}
