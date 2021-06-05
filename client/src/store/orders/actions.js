import ActionTypes from './action-types'
import ShoppingCartActionTypes from '../shopping-cart/action-types'
import MutationTypes from './mutation-types'
import OrdersService from '@/services/OrdersService'

const Actions = {
  [ActionTypes.CREATE_ORDER]: async ({ dispatch }, { shoppingCartId }) => {
    await OrdersService.createOrder({ shoppingCartId })
    await dispatch(ShoppingCartActionTypes.FETCH_SHOPPING_CART)
  },
  [ActionTypes.GET_ORDERS_LIST]: async ({ commit }) => {
    const orders = await OrdersService.getOrdersList()
    commit(MutationTypes.SET_ORDERS_LIST, orders)
    return orders
  },
  [ActionTypes.GET_ALL_ORDERS]: async ({ commit }) => {
    const allOrders = await OrdersService.getAllOrdersList()
    commit(MutationTypes.SET_ALL_ORDERS_LIST, allOrders)
    return allOrders
  },
  async [ActionTypes.REJECT_ORDER] ({ dispatch }, { orderId }) {
    await OrdersService.rejectOrder({ orderId })
    await dispatch(ActionTypes.GET_ALL_ORDERS)
  },
  async [ActionTypes.ACCEPT_ORDER] ({ dispatch }, { orderId }) {
    await OrdersService.acceptOrder({ orderId })
    await dispatch(ActionTypes.GET_ALL_ORDERS)
  },
  async [ActionTypes.FINISH_ORDER] ({ dispatch }, { orderId }) {
    await OrdersService.finishOrder({ orderId })
    await dispatch(ActionTypes.GET_ALL_ORDERS)
  }
}

export default Actions
