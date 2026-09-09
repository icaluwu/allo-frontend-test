// Author: Teuku Vaickal Rizki Irdian (IcalUwU) — https://icaluwu.site
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Rocket, RocketCreatePayload } from '@/types/rocket'

const ROCKETS_ENDPOINT =
  'https://lldev.thespacedevs.com/2.2.0/config/launcher/?manufacturer__name=SpaceX&mode=detailed&limit=20'

interface LauncherManufacturer {
  country_code?: string | null
}

interface LauncherApiRecord {
  id: number
  full_name?: string | null
  description?: string | null
  manufacturer?: LauncherManufacturer | null
  // The API serializes cost as a string (e.g. "7000000") or null.
  launch_cost?: number | string | null
  maiden_flight?: string | null
  image_url?: string | null
  active?: boolean | null
}

interface LaunchersApiResponse {
  results?: LauncherApiRecord[]
}

function toLaunchCost (value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null
  const cost = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(cost) ? cost : null
}

function mapLauncher (launcher: LauncherApiRecord): Rocket {
  return {
    id: String(launcher.id),
    full_name: launcher.full_name ?? '',
    description: launcher.description ?? '',
    launch_cost: toLaunchCost(launcher.launch_cost),
    country: launcher.manufacturer?.country_code ?? null,
    maiden_flight: launcher.maiden_flight ?? null,
    image_url: launcher.image_url ?? null,
    active: launcher.active ?? null,
  }
}

export const useRocketStore = defineStore('rockets', () => {
  const rockets = ref<Rocket[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  let fetchInFlight = false
  let hasFetched = false

  async function fetchRockets (): Promise<void> {
    // Anonymous calls are rate-limited, so fetch at most once per page load.
    // Filtering and detail lookups run client-side against rockets.value.
    if (hasFetched || fetchInFlight) return
    fetchInFlight = true
    loading.value = true
    error.value = null
    try {
      const response = await fetch(ROCKETS_ENDPOINT)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const data = (await response.json()) as LaunchersApiResponse
      rockets.value = (data.results ?? []).map(mapLauncher)
      hasFetched = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unable to load rockets.'
    } finally {
      loading.value = false
      fetchInFlight = false
    }
  }

  function addRocket (payload: RocketCreatePayload): Rocket {
    const rocket: Rocket = {
      id: `local-${Date.now().toString(36)}`,
      full_name: payload.fullName,
      description: payload.description,
      launch_cost: payload.launchCost,
      country: payload.country || null,
      maiden_flight: payload.maidenFlight ? new Date(payload.maidenFlight).toISOString() : null,
      image_url: payload.imageUrl || null,
      active: payload.active,
    }
    rockets.value = [rocket, ...rockets.value]
    return rocket
  }

  function getById (id: string): Rocket | undefined {
    return rockets.value.find(rocket => rocket.id === id)
  }

  return {
    rockets,
    loading,
    error,
    fetchRockets,
    addRocket,
    getById,
  }
})
