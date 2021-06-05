import MutationTypes from './mutation-types.js'

const Mutations = {
  [MutationTypes.SET_ORDERS_LIST] (state, list) {
    state.ordersList = list
  },
  [MutationTypes.SET_ALL_ORDERS_LIST] (state, list) {
    state.allOrders = list.reduce((res, item) => {
      if (!(item.state in res)) {
        res[item.state] = []
      }
      res[item.state].push(item)
      return res
    }, {})
  }
}

export default Mutations
