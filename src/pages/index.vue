<template>
  <v-container
    fluid
    class="rocket-list"
  >
    <div class="rocket-list__header">
      <div class="d-flex align-center flex-wrap ga-3">
        <div>
          <h1 class="text-h3 font-weight-bold mb-1">
            SpaceX Rockets
          </h1>
          <p class="text-body-1 rocket-list__subtitle">
            Browse the fleet, filter by status, or add a rocket of your own.
          </p>
        </div>
        <v-spacer />
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="addDialogOpen = true"
        >
          Add Rocket
        </v-btn>
      </div>

      <div class="mt-5">
        <RocketFilterBar
          v-model:search="searchText"
          v-model:status="statusFilter"
        />
      </div>
    </div>

    <div class="rocket-list__body">
      <LoadingState v-if="listStatus === 'loading'" />
      <ErrorState
        v-else-if="listStatus === 'error'"
        :message="rocketStore.error ?? 'Unknown error.'"
        @retry="rocketStore.fetchRockets()"
      />
      <template v-else>
        <v-row v-if="filteredRockets.length > 0">
          <v-col
            v-for="rocket in filteredRockets"
            :key="rocket.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <RocketCard :rocket="rocket" />
          </v-col>
        </v-row>
        <v-card
          v-else
          class="no-results py-12 text-center"
          elevation="0"
        >
          <v-icon
            class="mb-3"
            color="grey-darken-1"
            size="56"
          >
            mdi-telescope
          </v-icon>
          <div class="text-h6">
            No rockets found
          </div>
          <div class="text-body-2 mt-1">
            Try a different search or status filter.
          </div>
        </v-card>
      </template>
    </div>

    <AddRocketDialog
      v-model="addDialogOpen"
      @add="rocketStore.addRocket"
    />

    <AppFooter />
  </v-container>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRocketStore } from '@/stores/rockets'
import type { RocketStatusFilter } from '@/types/rocket'

const rocketStore = useRocketStore()

const searchText = ref('')
const statusFilter = ref<RocketStatusFilter>('all')
const addDialogOpen = ref(false)

onMounted(() => {
  rocketStore.fetchRockets()
})

const listStatus = computed<'loading' | 'error' | 'success'>(() => {
  if (rocketStore.loading) return 'loading'
  if (rocketStore.error) return 'error'
  return 'success'
})

const filteredRockets = computed(() => {
  const query = searchText.value.trim().toLowerCase()

  return rocketStore.rockets.filter(rocket => {
    const matchesSearch = query === '' || rocket.name.toLowerCase().includes(query)
    const matchesStatus =
      statusFilter.value === 'all' ||
      (statusFilter.value === 'active' && rocket.active === true) ||
      (statusFilter.value === 'inactive' && rocket.active === false)

    return matchesSearch && matchesStatus
  })
})
</script>

<style lang="scss" scoped>
  .rocket-list__subtitle {
    color: #94a3b8;
  }

  .no-results {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
  }
</style>
