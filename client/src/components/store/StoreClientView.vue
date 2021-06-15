<template>
  <div class="client-list products-list">
    <store-card
      v-for="item in data"
      :key="item"
      :header="item.name"
      :description="item.description"
      :price="item.price"
      :id="item._id"
      class="store-card"
      :in-shopping-cart="!!indexedShoppingCart?.[item._id]"
      @add-to-cart="addItemHandler(item)"
    ></store-card>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/shopping-cart/action-types'
import StoreCard from '@/components/Card'

export default {
  name: 'StoreClientView',
  components: {
    StoreCard
  },
  setup () {
    const store = useStore()
    const indexedShoppingCart = computed(() => store.getters.getIndexedShoppingCart)
    const data = computed(() => store.getters.getProductsList)

    onMounted(
      () => {
        store.dispatch(ActionTypes.FETCH_SHOPPING_CART)
      }
    )

    function addItemHandler (item) {
      store.dispatch(
        ActionTypes.ADD_PRODUCT_TO_SHOPPING_CART,
        {
          productId: item._id
        }
      )
    }

    return {
      addItemHandler,
      indexedShoppingCart,
      data
    }
  }
}
</script>

<style scoped>
.products-list {}
</style>
