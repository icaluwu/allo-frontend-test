<template>
  <div>
    <v-progress-linear
      class="mb-8"
      color="primary"
      indeterminate
    />
    <v-row>
      <v-col
        v-for="index in 6"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="loading-card"
          elevation="0"
        >
          <v-skeleton-loader
            height="200"
            type="image"
          />
          <v-card-item>
            <v-skeleton-loader type="heading" />
            <v-skeleton-loader
              class="mt-3"
              type="text"
            />
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
  .loading-card {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    overflow: hidden;
  }
</style>
