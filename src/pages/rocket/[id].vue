<template>
  <v-container
    fluid
    class="rocket-detail"
  >
    <div class="rocket-detail__topbar">
      <v-btn
        color="primary"
        prepend-icon="mdi-arrow-left"
        variant="text"
        @click="router.back()"
      >
        Back to rockets
      </v-btn>
    </div>

    <LoadingState v-if="panelStatus === 'loading'" />
    <ErrorState
      v-else-if="panelStatus === 'error'"
      :message="rocketStore.error ?? 'Unknown error.'"
      @retry="rocketStore.fetchRockets()"
    />
    <RocketDetailPanel
      v-else-if="rocket"
      :rocket="rocket"
    />
    <v-card
      v-else
      class="not-found py-16 text-center"
      elevation="0"
    >
      <v-icon
        class="mb-4"
        color="grey-darken-1"
        size="72"
      >
        mdi-rocket-launch-outline
      </v-icon>
      <h2 class="text-h5 mb-2">
        Rocket not found
      </h2>
      <p class="text-body-1 mb-6">
        No rocket with id “{{ rocketId }}” exists in this session.
      </p>
      <v-btn
        color="primary"
        prepend-icon="mdi-arrow-left"
        @click="router.push('/')"
      >
        Back to rockets
      </v-btn>
    </v-card>

    <AppFooter />
  </v-container>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteParams } from 'vue-router'
import { useRocketStore } from '@/stores/rockets'

const route = useRoute()
const router = useRouter()
const rocketStore = useRocketStore()

const rocketId = computed(() => {
  const params = route.params as RouteParams<'/rocket/[id]'>
  return String(params.id ?? '')
})
const rocket = computed(() => rocketStore.getById(rocketId.value))

onMounted(() => {
  if (rocketStore.rockets.length === 0) {
    rocketStore.fetchRockets()
  }
})

const panelStatus = computed<'loading' | 'error' | 'success'>(() => {
  if (rocketStore.loading) return 'loading'
  if (rocketStore.error) return 'error'
  return 'success'
})
</script>

<style lang="scss" scoped>
  .not-found {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
  }
</style>
