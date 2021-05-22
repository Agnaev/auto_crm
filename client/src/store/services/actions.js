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
  [ActionTypes.CREATE_SERVICE]: async ({ dispatch }, { name, description, price }) => {
    await ServicesService.createService({ name, description, price })
    await dispatch(ActionTypes.FETCH_SERVICES_LIST)
  },
  [ActionTypes.UPDATE_SERVICE_INFO]: async ({ dispatch }, { _id, name, description, price }) => {
    await ServicesService.updateService({ _id, name, description, price })
    await dispatch(ActionTypes.FETCH_SERVICES_LIST)
  }
}

export default Actions
