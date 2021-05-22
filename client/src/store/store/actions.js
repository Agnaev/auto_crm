import StoreService from '@/services/StoreService'
import ActionTypes from './action-types'
import MutationTypes from './mutation-types'

const Actions = {
  async [ActionTypes.FETCH_PRODUCTS_LIST] ({ commit }) {
    const products = await StoreService.getProductsList()
    commit(MutationTypes.SET_PRODUCTS_LIST, products)
    return products
  },
  async [ActionTypes.CREATE_PRODUCT] ({ dispatch }, { name, description, price }) {
    await StoreService.createProduct({ name, description, price })
    await dispatch(ActionTypes.FETCH_PRODUCTS_LIST)
  },
  async [ActionTypes.UPDATE_PRODUCT] ({ dispatch }, { _id, name, description, price }) {
    await StoreService.updateProduct({ _id, name, description, price })
    await dispatch(ActionTypes.FETCH_PRODUCTS_LIST)
  },
  async [ActionTypes.DELETE_PRODUCT] ({ dispatch }, { _id }) {
    await StoreService.deleteProduct({ _id })
    await dispatch(ActionTypes.FETCH_PRODUCTS_LIST)
  }
}

export default Actions
