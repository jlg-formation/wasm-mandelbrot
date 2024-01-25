<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderLayout from './components/layout/HeaderLayout.vue'
import FooterLayout from './components/layout/FooterLayout.vue'
</script>

<template>
  <div class="app">
    <HeaderLayout />
    <RouterView />
    <FooterLayout />
  </div>
</template>

<style scoped lang="scss">
div.app {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  justify-content: space-between;
}
</style>
