import AxiosClient from './AxiosClient.js'

const baseURL = process.env.VUE_APP_API_HOST

class AuthService extends AxiosClient {
  authUser ({ email, password }) {
    return this.instance.post('/auth/login', {
      email,
      password
    })
  }

  refreshUserToken (refresh) {
    return this.instance.post('/auth/refresh', { refresh })
  }

  signup ({ email, password }) {
    return this.instance.post('/auth/signup', {
      email,
      password
    })
  }
}

export default new AuthService(baseURL)
