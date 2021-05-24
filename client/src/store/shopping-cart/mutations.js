import MutationTypes from './mutation-types'
import { indexer } from '@/helpers/indexer'

const Mutations = {
  [MutationTypes.SET_SHOPPING_CART] (state, cart) {
    state.shoppingCart = cart
    state.indexedShoppingCart = indexer(cart.products)
  }
}

export default Mutations
