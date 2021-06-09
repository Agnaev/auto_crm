<template>
  <h1 class="header">Завершенные заказы</h1>
  <div class="client-list">
    <el-card
      v-for="order in ordersList"
      :key="order._id"
    >
      <template #header>
        {{ order._id }}
      </template>
      <ul class="products">
        <li
          v-for="product in order.products"
          :key="product._id"
          class="products__item"
        >
          {{ product.count }} x {{ product.name }}
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/orders/action-types'

export default {
  name: 'UserOrdersGrid',
  setup () {
    const store = useStore()
    const ordersList = computed(() => store.getters.getOrdersList)

    onMounted(() => {
      store.dispatch(ActionTypes.GET_ORDERS_LIST)
    })

    return {
      ordersList
    }
  }
}
</script>

<style scoped>
.header {
  padding-top: 20px
}
</style>
