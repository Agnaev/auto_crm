<template>
  <user-orders-grid
    header="Новые заказы"
    :orders="createdOrders"
  />
  <user-orders-grid
    header="Принятые заказы"
    :orders="inProcess"
  />
  <user-orders-grid
    header="Завершенные заказы"
    :orders="canceledOrdersList"
  />
  <user-orders-grid
    header="Отклоненные заказы"
    v-if="canceledOrdersList.length"
    :orders="canceledOrders"
  />
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import UserOrdersGrid from './UserOrdersGrid.vue'
import ActionTypes from '@/store/orders/action-types'
import { deepClone } from '@/helpers/deepClone'

export default {
  name: 'UserOrders',
  components: {
    UserOrdersGrid
  },
  setup () {
    const store = useStore()
    const ordersList = computed(() => store.getters.getOrdersList)
    const groupedOrdersList = computed(() => groupBy(ordersList.value, 'state'))
    const canceledOrdersList = computed(() => groupedOrdersList.value?.canceled ?? [])
    const inProcess = computed(() => groupedOrdersList.value?.in_process ?? [])
    const createdOrders = computed(() => groupedOrdersList.value?.created ?? [])
    const canceledOrders = computed(() => groupedOrdersList.value?.canceled ?? [])

    function groupBy (array, field) {
      return array?.reduce((res, item) => {
        if (!(item[field] in res)) {
          res[item[field]] = []
        }
        res[item[field]].push(deepClone(item))
        return res
      }, {})
    }

    onMounted(() => {
      store.dispatch(ActionTypes.GET_ORDERS_LIST)
    })

    return {
      ordersList,
      canceledOrdersList,
      inProcess,
      createdOrders,
      canceledOrders
    }
  }
}
</script>

<style scoped>

</style>
