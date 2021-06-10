import MutationTypes from './mutation-types'

const Mutations = {
  [MutationTypes.SET_USERS_LIST] (state, users) {
    state.usersList = users
  },
  [MutationTypes.SET_MECHANICS_LIST] (state, mechanics) {
    state.mechanicsList = mechanics
  },
  [MutationTypes.SET_CURRENT_USER_INFO] (state, userInfo) {
    state.currentUserInfo = userInfo
  }
}

export default Mutations
