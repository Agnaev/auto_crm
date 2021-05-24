<template>
  <div class="shopping-cart">
    <client-shopping-cart />
  </div>
</template>

<script>
import ClientShoppingCart from '@/components/shopping-cart/ClientShoppingCart.vue'
export default {
  name: 'ShoppingCart',
  components: {
    ClientShoppingCart
  }
}
</script>

<style scoped>

</style>
