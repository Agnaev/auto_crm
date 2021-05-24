import MutationTypes from './mutation-types'
import { indexer } from '@/helpers/indexer'

const Mutations = {
  [MutationTypes.SET_PRODUCTS_LIST] (state, list) {
    state.productsList = list
    state.indexedProductsList = indexer(state.productsList)
  },
  [MutationTypes.INDEXING_PRODUCTS_LIST] (state) {
    state.indexedProductsList = indexer(state.productsList)
  }
}

export default Mutations
