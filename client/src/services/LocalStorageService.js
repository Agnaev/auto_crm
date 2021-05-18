class LocalStorageService {
  set token (token) {
    localStorage.setItem('token', token)
  }

  get token () {
    return localStorage.getItem('token')
  }

  set refreshToken (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken)
  }

  get refreshToken () {
    return localStorage.getItem('refreshToken')
  }

  clear () {
    localStorage.clear()
  }
}

export default new LocalStorageService()
