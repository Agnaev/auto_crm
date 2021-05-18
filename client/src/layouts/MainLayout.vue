<template>
  <div class="main-layout">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
export default {
  name: 'MainLayout',
  components: {
    AppHeader
  }
}
</script>

<style scoped>
.main-layout {}
</style>
