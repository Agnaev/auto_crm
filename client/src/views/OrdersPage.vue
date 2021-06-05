<template>
  <el-empty v-if="isEmpty" description="Заказов пока нет" />
  <orders-grid
    v-if="orders?.created?.length"
    :orders="orders?.created ?? []"
    header="Новые заказы"
  />
  <orders-grid
    v-if="orders?.in_process?.length"
    :orders="orders?.in_process ?? []"
    header="Обрабатываются"
  />
  <orders-grid
    v-if="orders?.finished?.length"
    :orders="orders?.finished ?? []"
    header="Завершенные заказы"
  />
  <orders-grid
    v-if="orders?.canceled?.length"
    :orders="orders.canceled"
    header="Отклоненные заказы"
  />
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/orders/action-types'
import OrdersGrid from '@/components/order/OrdersGrid'

export default {
  name: 'OrdersPage',
  components: {
    OrdersGrid
  },
  setup () {
    const store = useStore()
    const orders = computed(() => store.getters.getAllOrders)
    const isEmpty = computed(() =>
      orders.value.created?.length === 0 &&
      orders.value.in_process?.length === 0 &&
      orders.value.finished?.length === 0
    )

    function cardClick (order) {
      console.log('card click', order)
    }

    onMounted(() => {
      store.dispatch(ActionTypes.GET_ALL_ORDERS)
    })

    function changeOrderState (Action, orderId) {
      store.dispatch(Action, { orderId })
    }
    function accept (orderId) {
      changeOrderState(ActionTypes.ACCEPT_ORDER, orderId)
    }

    function reject (orderId) {
      changeOrderState(ActionTypes.REJECT_ORDER, orderId)
    }

    function finishOrder (orderId) {
      changeOrderState(ActionTypes.FINISH_ORDER, orderId)
    }

    return {
      cardClick,
      orders,
      accept,
      reject,
      finishOrder,
      isEmpty
    }
  }
}
</script>

<style scoped lang="scss">

</style>
