import AxiosClient from './AxiosClient'
const baseURL = process.env.VUE_APP_API_HOST

class StoreService extends AxiosClient {
  getProductsList () {
    return this.instance.get('/store')
  }

  createProduct ({ name, description, price }) {
    return this.instance.post('/store', {
      name,
      description,
      price
    })
  }

  updateProduct ({ _id, name, description, price }) {
    return this.instance.put('/store', {
      _id,
      name,
      description,
      price
    })
  }

  deleteProduct ({ _id }) {
    return this.instance.delete('/store?_id' + _id)
  }
}

export default new StoreService(baseURL)
