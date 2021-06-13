<template>
  <div class="main-layout">
    <div class="main-layout__content">
      <app-header />
      <router-view />
    </div>
    <app-footer class="main-layout__footer"/>
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

<style scoped lang="scss">
.main-layout {

}
</style>
