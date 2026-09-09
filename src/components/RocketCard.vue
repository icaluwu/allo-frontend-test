<template>
  <v-card
    class="rocket-card h-100"
    elevation="0"
    @click="goToDetail"
  >
    <v-img
      :src="imageSrc"
      :alt="rocket.full_name"
      cover
      height="200"
      @error="imageSrc = FALLBACK_ROCKET_IMAGE"
    />
    <v-card-item>
      <v-card-title>
        <span class="text-h6">{{ rocket.full_name }}</span>
      </v-card-title>
      <v-card-subtitle class="rocket-card__description">
        {{ description }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-actions class="pa-3 pt-0">
      <v-chip
        :color="rocket.active ? 'success' : 'grey-darken-1'"
        size="x-small"
      >
        {{ rocket.active ? 'Active' : 'Inactive' }}
      </v-chip>
      <v-spacer />
      <v-icon
        color="primary"
        size="small"
      >
        mdi-arrow-right
      </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { FALLBACK_ROCKET_IMAGE, rocketImage, truncateDescription } from '@/utils/format'
import type { Rocket } from '@/types/rocket'

const props = defineProps<{
  rocket: Rocket
}>()

const router = useRouter()

const imageSrc = ref(rocketImage(props.rocket))

const description = computed(() => {
  const raw = props.rocket.description?.trim()
  return raw ? truncateDescription(raw) : '—'
})

function goToDetail () {
  router.push(`/rocket/${props.rocket.id}`)
}
</script>

<style lang="scss" scoped>
  .rocket-card {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      border-color: rgba(255, 180, 84, 0.45);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
    }
  }

  .rocket-card__description {
    min-height: 3.6em;
  }
</style>
