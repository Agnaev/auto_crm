import CarModels from '@/services/CarModels'
import ActionTypes from './action-types'
import MutationTypes from './mutation-types'

const Actions = {
  async [ActionTypes.FETCH_CAR_MODEL_NAMES] ({ commit }, { name }) {
    const data = await CarModels.filterModelNames({ name })
    commit(MutationTypes.SET_CAR_MODEL_NAMES, data)
    return data
  }
}

export default Actions
