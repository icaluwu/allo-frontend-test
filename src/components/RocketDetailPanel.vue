<template>
  <v-card
    class="rocket-detail-panel"
    elevation="0"
  >
    <v-img
      :src="imageSrc"
      :alt="rocket.name"
      cover
      height="360"
      @error="imageSrc = FALLBACK_ROCKET_IMAGE"
    />
    <v-card-item>
      <div class="d-flex align-center flex-wrap ga-3">
        <v-card-title class="text-h4">
          {{ rocket.name }}
        </v-card-title>
        <v-chip
          :color="rocket.active ? 'success' : 'grey-darken-1'"
          size="small"
        >
          {{ rocket.active ? 'Active' : 'Inactive' }}
        </v-chip>
      </div>
      <v-card-text class="rocket-detail-panel__description">
        {{ rocket.description?.trim() || 'No description available.' }}
      </v-card-text>
    </v-card-item>

    <v-divider />

    <v-card-text class="pa-4 pt-6">
      <v-row dense>
        <v-col
          cols="12"
          sm="4"
        >
          <div class="detail-label">
            Cost per launch
          </div>
          <div class="text-h6">
            {{ formatCurrency(rocket.cost_per_launch) }}
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <div class="detail-label">
            Country
          </div>
          <div class="text-h6">
            {{ rocket.country?.trim() || '—' }}
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <div class="detail-label">
            First flight
          </div>
          <div class="text-h6">
            {{ formatFirstFlight(rocket.first_flight) }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FALLBACK_ROCKET_IMAGE, formatCurrency, formatFirstFlight, rocketImage } from '@/utils/format'
import type { Rocket } from '@/types/rocket'

const props = defineProps<{
  rocket: Rocket
}>()

const imageSrc = ref(rocketImage(props.rocket))
</script>

<style lang="scss" scoped>
  .rocket-detail-panel {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    overflow: hidden;
  }

  .rocket-detail-panel__description {
    color: rgba(230, 237, 243, 0.78);
    line-height: 1.7;
    white-space: pre-line;
  }

  .detail-label {
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 4px;
  }
</style>
