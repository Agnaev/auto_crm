import ActionTypes from './action-types'
import MutationTypes from './mutation-types'
import authService from '@/services/authService'
import LocalStorageService from '@/services/LocalStorageService'

const actions = {
  [ActionTypes.LOGIN]: async ({ commit }, { email, password }) => {
    const authData = await authService.authUser({
      email,
      password
    })
    commit(MutationTypes.SET_USER_DATA, authData.data)
    LocalStorageService.token = authData.token
    LocalStorageService.refreshToken = authData.refreshToken
  },
  [ActionTypes.LOGOUT]: async ({ commit }) => {
    LocalStorageService.clear()
    commit(MutationTypes.SET_USER_DATA, null)
  },
  [ActionTypes.SIGNUP]: async (_, { email, password }) => {
    return await authService.signup({
      email,
      password
    })
  }
}

export default actions
