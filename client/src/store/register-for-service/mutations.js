import MutationTypes from './mutationTypes'

const Mutations = {
  [MutationTypes.SET_DAYS_LIST] (state, list) {
    state.daysList = list
  }
}

export default Mutations
