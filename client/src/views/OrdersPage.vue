<template>
  <orders-admin-view
    v-if="role === 'admin' || role === 'manager' || role === 'mechanic'"
  ></orders-admin-view>
  <user-orders
    v-else
  ></user-orders>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import OrdersAdminView from '@/components/order/OrdersAdminView'
import UserOrders from '@/components/order/UserOrders'

export default {
  name: 'OrdersPage',
  components: {
    OrdersAdminView,
    UserOrders
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
