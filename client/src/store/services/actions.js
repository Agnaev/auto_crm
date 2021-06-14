import ServicesService from '@/services/ServicesService'
import ActionTypes from './action-types'
import MutationTypes from './mutation-types'

const Actions = {
  [ActionTypes.FETCH_SERVICES_LIST]: async ({ commit }) => {
    const list = await ServicesService.getServicesList()
    commit(MutationTypes.SET_SERVICES_LIST, list)
    return list
  },
  [ActionTypes.REMOVE_SERVICE]: async ({ dispatch }, { _id }) => {
    await ServicesService.deleteService({ _id })
    await dispatch(ActionTypes.FETCH_SERVICES_LIST)
  },
  [ActionTypes.CREATE_SERVICE]: async ({ dispatch }, { name, description, price, timeInHours }) => {
    await ServicesService.createService({
      name,
      description,
      price,
      timeInHours
    })
    await dispatch(ActionTypes.FETCH_SERVICES_LIST)
  },
  [ActionTypes.UPDATE_SERVICE_INFO]: async ({ dispatch }, { _id, name, description, price, timeInHours }) => {
    await ServicesService.updateService({
      _id,
      name,
      description,
      price,
      timeInHours
    })
    await dispatch(ActionTypes.FETCH_SERVICES_LIST)
  },
  [ActionTypes.FETCH_MY_SERVICE_RECORDS]: async ({ commit }) => {
    const list = await ServicesService.getMyServices()
    commit(MutationTypes.SET_MY_SERVICE_RECORDS_LIST, list)
    return list
  },
  [ActionTypes.GET_MECHANIC_SCHEDULE]: async ({ commit }, options) => {
    const schedule = await ServicesService.getMasterSchedule({ masterId: options?.masterId })
    commit(MutationTypes.SET_MECHANIC_SCHEDULE, schedule)
    return schedule
  },
  [ActionTypes.GET_SCHEDULE_BY_MECHANIC]: async ({ commit }, options) => {
    const schedule = await ServicesService.getScheduleByMechanic({ masterId: options?.masterId })
    commit(MutationTypes.SET_MECHANIC_SCHEDULE, schedule)
    return schedule
  },
  [ActionTypes.CHANGE_SERVICE_STATE]: async ({ dispatch }, { clientId, masterId, state, serviceId, date, time }) => {
    await ServicesService.changeServiceState({ clientId, masterId, state, serviceId, date, time })
    await dispatch(ActionTypes.GET_MECHANIC_SCHEDULE, { masterId })
  }
}

export default Actions
