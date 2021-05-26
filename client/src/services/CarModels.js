import AxiosClient from './AxiosClient'
const baseUrl = process.env.VUE_APP_API_HOST

class CarModels extends AxiosClient {
  filterModelNames ({ name }) {
    let url = '/car-models'
    if (name) {
      url += '?name=' + name
    }
    return this.instance.get(url)
  }
}

export default new CarModels(baseUrl)
