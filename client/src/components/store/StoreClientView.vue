<template>
  <div class="client-list products-list">
    <store-card
      v-for="item in data"
      :key="item"
      :header="item.name"
      :description="item.description"
      :id="item._id"
      class="store-card"
      @add-to-cart="addItemHandler(item)"
    ></store-card>
  </div>
</template>

<script>
import StoreCard from '@/components/Card'
export default {
  name: 'StoreClientView',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  components: {
    StoreCard
  },
  setup () {
    function addItemHandler (item) {
      console.log('add item handler', item)
    }

    return {
      addItemHandler
    }
  }
}
</script>

<style scoped>
.products-list {}
</style>
