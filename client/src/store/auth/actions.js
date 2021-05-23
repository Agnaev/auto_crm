import ActionTypes from './action-types'
import MutationTypes from './mutation-types'
import authService from '@/services/AuthService'
import LocalStorageService from '@/services/LocalStorageService'
import { deepClone } from '@/helpers/deepClone'

const actions = {
  [ActionTypes.LOGIN]: async ({ commit }, { email, password }) => {
    const authData = await authService.authUser({
      email,
      password
    })
    commit(MutationTypes.SET_USER_DATA, deepClone(authData.user))
    LocalStorageService.token = authData.accessToken
    LocalStorageService.refreshToken = authData.refreshToken
    LocalStorageService.userData = JSON.stringify(authData.user)
  },
  [ActionTypes.LOGOUT]: async ({ commit }) => {
    try {
      await authService.logout()
    } finally {
      LocalStorageService.clear()
      commit(MutationTypes.SET_USER_DATA, null)
    }
  },
  [ActionTypes.SIGNUP]: async (_, { email, password }) => {
    return await authService.signup({
      email,
      password
    })
  }
}

export default actions
