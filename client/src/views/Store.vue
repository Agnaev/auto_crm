<template>
  <div class="container">
    <store-card
      v-for="item in data"
      :key="item"
      :header="item.header"
      :description="item.description"
      :id="item.header"
      @add-to-cart="addItemHandler(item)"
    ></store-card>
  </div>
</template>

<script>
import StoreCard from '../components/store/card'
export default {
  name: 'Store',
  components: {
    StoreCard
  },
  setup () {
    const data = [
      {
        header: 'header',
        description: 'description'
      }
    ]
    function addItemHandler (item) {
      console.log(item)
    }
    return {
      data,
      addItemHandler
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  grid-column-gap: 20px;

  margin: 20px 20px;
}
</style>
