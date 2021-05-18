import MutationTypes from './mutation-types.js'

const mutations = {
  [MutationTypes.SET_USER_DATA] (state, user) {
    state.userData = user
  }
}

export default mutations
