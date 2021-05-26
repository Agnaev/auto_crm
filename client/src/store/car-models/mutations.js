import MutationTypes from './mutation-types'

const Mutations = {
  [MutationTypes.SET_CAR_MODEL_NAMES] (state, list) {
    state.carModels = list
  }
}

export default Mutations
