<template>
  <div class="client-list services-list">
    <store-card
      v-for="item in data"
      :key="item._id"
      :header="item.name"
      :description="item.description"
      :id="item._id"
      class="services-list__item"
      btnText="Записаться"
      @add-item-to-cart="addItemToCart(item)"
    ></store-card>
  </div>
</template>

<script>
import {} from 'vue'
import {} from 'vuex'
import StoreCard from '@/components/Card'
export default {
  name: 'ClientView',
  components: {
    StoreCard
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup () {
    function addItemToCart (item) {
      console.log('add service to cart', item)
    }

    return {
      addItemToCart
    }
  }
}
</script>

<style scoped lang="scss">
.services-list {}
</style>
