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
      :in-shopping-cart="!!indexedShoppingCart?.[item._id]"
      @add-to-cart="addItemToCart(item)"
    ></store-card>
    <make-an-appointment-dialog
      :visible="visible"
      v-if="visible"
      :service="popupData"
      @close="visible = false"
    ></make-an-appointment-dialog>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/shopping-cart/action-types'
import StoreCard from '@/components/Card'
import MakeAnAppointmentDialog from './MakeAnAppointment'

export default {
  name: 'ClientView',
  components: {
    StoreCard,
    MakeAnAppointmentDialog
  },
  setup () {
    const store = useStore()
    const data = computed(() => store.getters.getServicesList)
    const indexedShoppingCart = computed(() => store.getters.getIndexedShoppingCart)
    const visible = ref(false)
    const popupData = ref(null)

    function addItemToCart (item) {
      visible.value = true
      popupData.value = item
    }

    onMounted(
      () => {
        store.dispatch(ActionTypes.FETCH_SHOPPING_CART)
      }
    )

    return {
      addItemToCart,
      data,
      indexedShoppingCart,
      visible,
      popupData
    }
  }
}
</script>

<style scoped lang="scss">
.services-list {}
</style>
