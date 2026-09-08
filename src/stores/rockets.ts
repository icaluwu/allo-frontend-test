// Author: Teuku Vaickal Rizki Irdian (IcalUwU) — https://icaluwu.site
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Rocket, RocketCreatePayload } from '@/types/rocket'

const ROCKETS_ENDPOINT = 'https://api.spacexdata.com/v4/rockets'

export const useRocketStore = defineStore('rockets', () => {
  const rockets = ref<Rocket[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  let fetchInFlight = false

  async function fetchRockets (): Promise<void> {
    if (fetchInFlight) return
    fetchInFlight = true
    loading.value = true
    error.value = null
    try {
      const response = await fetch(ROCKETS_ENDPOINT)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const data = (await response.json()) as Rocket[]
      rockets.value = data
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
      name: payload.name,
      description: payload.description,
      cost_per_launch: payload.costPerLaunch,
      country: payload.country || null,
      first_flight: payload.firstFlight ? new Date(payload.firstFlight).toISOString() : null,
      flickr_images: payload.imageUrl ? [payload.imageUrl] : [],
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
