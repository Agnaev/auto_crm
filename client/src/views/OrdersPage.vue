<template>
  <orders-admin-view
    v-if="role === 'admin' || role === 'manager' || role === 'mechanic'"
  ></orders-admin-view>
  <user-orders-grid
    v-else
  ></user-orders-grid>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import OrdersAdminView from '@/components/order/OrdersAdminView'
import UserOrdersGrid from '@/components/order/UserOrdersGrid'

export default {
  name: 'OrdersPage',
  components: {
    OrdersAdminView,
    UserOrdersGrid
  },
  setup () {
    const store = useStore()
    const role = computed(() => store.getters.getUserData?.role)
    return {
      role
    }
  }
}
</script>

<style scoped lang="scss">

</style>
