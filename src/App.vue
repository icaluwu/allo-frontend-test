<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>

<style>
  .v-application {
    background-image:
      radial-gradient(1100px 520px at 85% -10%, rgba(255, 180, 84, 0.07), transparent 60%),
      radial-gradient(900px 480px at 8% 112%, rgba(56, 189, 248, 0.05), transparent 60%);
    background-attachment: fixed;
  }
</style>
