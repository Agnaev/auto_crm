import MutationTypes from './mutation-types'

const Mutations = {
  [MutationTypes.SET_USERS_LIST] (state, users) {
    state.usersList = users
  }
}

export default Mutations
