<template>
  <h1 v-if="$props.header" class="header">{{ $props.header }}</h1>
  <div class="client-list" v-if="orders.length">
    <el-card
      v-for="order in orders"
      :key="order._id"
      @click="cardClick(order)"
    >
      <template #header>
        {{ order.user.username }}
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
      <div class="btns-container">
        <template v-if="order.state === 'created'">
          <el-button @click="reject(order._id)" type="danger">Отклонить заказ</el-button>
          <el-button @click="accept(order._id)" type="success">Принять заказ</el-button>
        </template>
        <template v-else-if="order.state === 'in_process'">
          <el-button type="success" @click="finishOrder(order._id)">Завершить</el-button>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import ActionTypes from '@/store/orders/action-types'

export default {
  name: 'OrdersGrid',
  props: {
    orders: {
      type: Array,
      required: true
    },
    header: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['card-click'],
  setup (_, { emit }) {
    const store = useStore()

    const cardClick = order => emit('card-click', order)

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
      accept,
      reject,
      finishOrder
    }
  }
}
</script>

<style scoped lang="scss">
.btns-container {
  padding: 20px
}
.products {
  &__item {
    margin: 10px;
    font-size: 20px;
  }
}
.header {
  padding-top: 20px
}
</style>
