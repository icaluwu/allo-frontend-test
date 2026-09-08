<template>
  <v-card
    class="error-card px-6 py-12 text-center"
    elevation="0"
  >
    <v-icon
      class="mb-4"
      color="error"
      size="72"
    >
      mdi-alert-circle
    </v-icon>
    <h2 class="text-h5 mb-2">
      Couldn't load rockets
    </h2>
    <p class="error-card__message text-body-1 mb-6">
      {{ message }}
    </p>
    <v-btn
      color="primary"
      prepend-icon="mdi-refresh"
      @click="emit('retry')"
    >
      Retry
    </v-btn>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  message: string
}>()

const emit = defineEmits<{
  (e: 'retry'): void
}>()
</script>

<style lang="scss" scoped>
  .error-card {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
  }

  .error-card__message {
    color: rgba(230, 237, 243, 0.7);
  }
</style>
