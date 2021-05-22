import AxiosClient from './AxiosClient'
const baseURL = process.env.VUE_APP_API_HOST

class ServicesService extends AxiosClient {
  getServicesList () {
    return this.instance.get('/services')
  }

  updateService ({ _id, name, description, price }) {
    return this.instance.put('/services', {
      name,
      description,
      price,
      _id
    })
  }

  deleteService ({ _id }) {
    return this.instance.delete('/services?_id=' + _id)
  }

  createService ({ name, description, price }) {
    return this.instance.post('/services', {
      name,
      description,
      price
    })
  }
}

export default new ServicesService(baseURL)
