import MutationTypes from './mutation-types'

const Mutations = {
  [MutationTypes.SET_SERVICES_LIST]: (state, services) => {
    state.servicesList = services
  }
}

export default Mutations
