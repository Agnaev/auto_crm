import AxiosClient from './AxiosClient'
const baseUrl = process.env.VUE_APP_API_HOST

class ShoppingCartService extends AxiosClient {
  getShoppingCart () {
    return this.instance.get('/shopping-cart')
  }

  addProductToCart ({ productId }) {
    return this.instance.post('/shopping-cart', {
      productId
    })
  }

  deleteProductFromCart ({ productId }) {
    return this.instance.delete('/shopping-cart?productId=' + productId)
  }
}

export default new ShoppingCartService(baseUrl)
