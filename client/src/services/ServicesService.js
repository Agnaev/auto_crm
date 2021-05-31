import AxiosClient from './AxiosClient'
const baseURL = process.env.VUE_APP_API_HOST

class ServicesService extends AxiosClient {
  getServicesList () {
    return this.instance.get('/services')
  }

  updateService ({ _id, name, description, price, timeInHours }) {
    return this.instance.put('/services', {
      name,
      description,
      price,
      _id,
      timeInHours
    })
  }

  deleteService ({ _id }) {
    return this.instance.delete('/services?_id=' + _id)
  }

  createService ({ name, description, price, timeInHours }) {
    return this.instance.post('/services', {
      name,
      description,
      price,
      timeInHours
    })
  }

  getMechanicSchedule ({ mechanicId, serviceId }) {
    const params = new URLSearchParams([
      ['mechanicId', mechanicId],
      ['serviceId', serviceId]
    ])
    return this.instance.get('/register-service/month?' + params.toString())
  }

  registerForService ({ mechanicId, serviceId, time, date }) {
    return this.instance.post('/register-service', {
      mechanicId,
      serviceId,
      time,
      date
    })
  }
}

export default new ServicesService(baseURL)
