<template>
  <div class="d-flex flex-column flex-lg-row ga-3">
    <v-text-field
      v-model="search"
      class="rocket-filter-bar__search"
      clearable
      density="comfortable"
      hide-details
      placeholder="Search rockets by name..."
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
    />
    <v-select
      v-model="status"
      :items="statusOptions"
      class="rocket-filter-bar__status"
      density="comfortable"
      hide-details
      label="Status"
      variant="outlined"
    />
  </div>
</template>

<script lang="ts" setup>
import type { RocketStatusFilter } from '@/types/rocket'

const search = defineModel<string>('search')
const status = defineModel<RocketStatusFilter>('status')

const statusOptions: ReadonlyArray<{ title: string, value: RocketStatusFilter }> = [
  { title: 'All', value: 'all' },
  { title: 'Active', value: 'active' },
  { title: 'Inactive', value: 'inactive' },
]
</script>

<style lang="scss" scoped>
  .rocket-filter-bar__search {
    flex: 1 1 280px;
    max-width: 420px;
  }

  .rocket-filter-bar__status {
    flex: 0 1 220px;
  }
</style>
