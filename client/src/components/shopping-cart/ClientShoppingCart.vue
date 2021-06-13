<template>
  <div class="shopping-cart">
    <el-table
      border
      :data="productsList"
    >
<!--      <el-table-column prop="_id" label="Идентификатор" >-->
<!--        <template #default="scope">-->
<!--          {{ scope.row._id }} <el-tag :type="scope.row.type === 'service' ? 'warning' : 'info'">-->
<!--          {{ scope.row.type === 'service' ? 'Услуга' : 'Товар' }}-->
<!--        </el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="Название">
        <template #default="scope">
          <span v-if="scope.row.type === 'product'">
            {{ scope.row.count }} x
          </span>
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Описание" />
      <el-table-column prop="price" label="Цена" >
        <template #header>
          <h3>
            Цена
            <span v-if="amount">
            {{ amount }} ₽
          </span>
          </h3>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="scope">
          <div v-if="scope.row.type === 'product'">
            <el-button @click="incProduct(scope.row._id)">+</el-button>
            <el-button @click="decrementProduct(scope.row._id)">-</el-button>
          </div>
          <el-popconfirm
            title="Вы действительно хотите удалить эту позицию из корзины?"
            @confirm="decrementProduct(scope.row._id)"
          >
            <template #reference>
              <el-button type="danger">Удалить</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" @click="makeOrder" :disabled="isShoppingCartEmpty">
      Заказать
    </el-button>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/shopping-cart/action-types'
import OrderActionTypes from '@/store/orders/action-types'

export default {
  name: 'ClientShoppingCart',
  setup () {
    const store = useStore()
    const shoppingCart = computed({
      get: () => store.getters.getUserShoppingCart
    })
    const productsList = computed(
      () => shoppingCart.value.products
    )
    const isShoppingCartEmpty = computed(() => shoppingCart.value.length === 0)

    onMounted(
      () => {
        store.dispatch(ActionTypes.FETCH_SHOPPING_CART)
      }
    )

    function incProduct (productId) {
      store.dispatch(
        ActionTypes.ADD_PRODUCT_TO_SHOPPING_CART,
        {
          productId
        }
      )
    }

    function decrementProduct (productId) {
      store.dispatch(
        ActionTypes.REMOVE_PRODUCT_FROM_SHOPPING_CART,
        {
          productId
        }
      )
    }

    function makeOrder () {
      const shoppingCartId = shoppingCart.value._id
      store.dispatch(
        OrderActionTypes.CREATE_ORDER,
        { shoppingCartId }
      )
    }

    const amount = computed(() => store
      .getters
      .getUserShoppingCart
      ?.products
      ?.reduce(
        (sum, product) => sum + (product.price * product.count), 0)
    )

    return {
      productsList,
      isShoppingCartEmpty,
      incProduct,
      decrementProduct,
      makeOrder,
      amount
    }
  }
}
</script>

<style scoped>
.shopping-cart {
  margin: 20px
}
</style>
