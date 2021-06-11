<template>
  <div class="main-layout">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'MainLayout',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style scoped>
.main-layout {}
</style>
