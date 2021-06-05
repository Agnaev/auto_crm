import AxiosClient from './AxiosClient'

const baseURL = process.env.VUE_APP_API_HOST

class OrdersService extends AxiosClient {
  createOrder ({ shoppingCartId }) {
    return this.instance.post('/orders', {
      shoppingCartId
    })
  }

  getOrdersList () {
    return this.instance.get('/orders')
  }

  getAllOrdersList () {
    return this.instance.get('/orders/all')
  }

  changeOrderState ({ orderId, status }) {
    return this.instance.put('/orders/state', {
      orderId,
      status
    })
  }

  rejectOrder ({ orderId }) {
    return this.changeOrderState({ orderId, status: 'canceled' })
  }

  acceptOrder ({ orderId }) {
    return this.changeOrderState({ orderId, status: 'in_process' })
  }

  finishOrder ({ orderId }) {
    return this.changeOrderState({ orderId, status: 'finished' })
  }

  processedOrder ({ orderId }) {
    return this.changeOrderState({ orderId, status: 'processed' })
  }
}

export default new OrdersService(baseURL)
