import MutationTypes from './mutation-types'

const Mutations = {
  [MutationTypes.SET_PRODUCTS_LIST] (state, list) {
    state.productsList = list
  }
}

export default Mutations
