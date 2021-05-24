import ShoppingCartService from '@/services/ShoppingCartService'
import ActionTypes from './action-types'
import StoreActionTypes from '@/store/store/action-types'
import ServicesActionTypes from '@/store/services/action-types'
import MutationTypes from './mutation-types'
import { deepClone } from '@/helpers/deepClone.js'

const Actions = {
  async [ActionTypes.FETCH_SHOPPING_CART] ({ dispatch, commit, getters }) {
    const data = await ShoppingCartService.getShoppingCart()
    if (!getters.getIndexedProductsList?.length) {
      await dispatch(StoreActionTypes.FETCH_PRODUCTS_LIST)
    }
    if (!getters.getIndexedServicesList?.length) {
      await dispatch(ServicesActionTypes.FETCH_SERVICES_LIST)
    }
    if (data?.products) {
      const productsMap = getters.getIndexedProductsList
      const servicesMap = getters.getIndexedServicesList
      data.products = data.products.map(x => {
        const result = {
          count: x.count
        }
        if (x.productId in servicesMap) {
          return Object.assign(result, {
            ...deepClone(servicesMap[x.productId]),
            type: 'service'
          })
        } else if (x.productId in productsMap) {
          return Object.assign(result, {
            ...deepClone(productsMap[x.productId]),
            type: 'product'
          })
        }
      })
    }
    commit(MutationTypes.SET_SHOPPING_CART, data)
  },
  async [ActionTypes.ADD_PRODUCT_TO_SHOPPING_CART] ({ dispatch }, { productId }) {
    await ShoppingCartService.addProductToCart({ productId })
    await dispatch(ActionTypes.FETCH_SHOPPING_CART)
  },
  async [ActionTypes.REMOVE_PRODUCT_FROM_SHOPPING_CART] ({ dispatch }, { productId }) {
    await ShoppingCartService.deleteProductFromCart({ productId })
    await dispatch(ActionTypes.FETCH_SHOPPING_CART)
  }
}

export default Actions
