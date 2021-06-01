import servicesService from '../../services/ServicesService.js'
import ActionTypes from './action-types'
import MutationTypes from './mutationTypes'
import ServiceActionTypes from '../services/action-types'

const Actions = {
  async [ActionTypes.GET_DAYS_LIST_BY_SERVICE] ({ commit }, { mechanicId, serviceId }) {
    const data = await servicesService.getMechanicSchedule({ mechanicId, serviceId })
    commit(MutationTypes.SET_DAYS_LIST, data)
    return data
  },
  async [ActionTypes.REGISTER_FOR_SERVICE] (_, { time, date, serviceId, mechanicId }) {
    await servicesService.registerForService({ time, date, serviceId, mechanicId })
  },
  async [ActionTypes.CANCEL_REGISTRATION_FOR_SERVICE] ({ dispatch }, { date, time, mechanicId }) {
    await servicesService.cancelRegistration({ date, time, mechanicId })
    await dispatch(ServiceActionTypes.FETCH_MY_SERVICE_RECORDS)
  }
}

export default Actions
