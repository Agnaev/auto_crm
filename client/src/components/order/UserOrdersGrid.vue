<template>
  <article>
    <h1 class="header">{{ $props.header }}</h1>
    <div class="client-list" v-if="$props.orders?.length">
      <el-card
        v-for="order in $props.orders"
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
        <el-divider />
        Общая сумма {{ getOrderSum(order) }}
      </el-card>
    </div>
    <el-empty v-else />
  </article>
</template>

<script>
export default {
  name: 'UserOrdersGrid',
  props: {
    header: {
      type: String,
      required: false,
      default: ''
    },
    orders: {
      type: Array,
      required: true
    }
  },
  setup () {
    function getOrderSum (order) {
      return order.products.reduce((res, item) => res + item.count * item.price, 0)
    }

    return {
      getOrderSum
    }
  }
}
</script>

<style scoped>
.header {
  padding-top: 20px
}
</style>
