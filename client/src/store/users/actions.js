import UsersService from '@/services/UsersService'
import ActionTypes from './action-types'
import MutationTypes from './mutation-types'

const Actions = {
  async [ActionTypes.GET_USERS_LIST] ({ commit }) {
    const data = await UsersService.getUsersList()
    commit(MutationTypes.SET_USERS_LIST, data)
    return data
  },
  async [ActionTypes.REMOVE_USER] ({ dispatch }, { _id }) {
    await UsersService.removeUser(_id)
    await dispatch(ActionTypes.GET_USERS_LIST)
  },
  async [ActionTypes.UPDATE_USER_INFO] ({ dispatch }, { _id, email, username, role }) {
    await UsersService.updateUserInfo({ _id, email, username, role })
    await dispatch(ActionTypes.GET_USERS_LIST)
  },
  async [ActionTypes.FETCH_MECHANICS_LIST] ({ commit }) {
    const mechanics = await UsersService.getMechanicsList()
    commit(MutationTypes.SET_MECHANICS_LIST, mechanics)
    return mechanics
  }
}

export default Actions
