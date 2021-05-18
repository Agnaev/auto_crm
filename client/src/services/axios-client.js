import axios from 'axios'
import LocalStorageService from './LocalStorageService'
const authURL = process.env.VUE_APP_API_HOST

class AxiosClient {
  constructor (baseURL) {
    this.instance = axios.create({
      baseURL
    })
    this.refreshRequest = null
    this.refreshToken = LocalStorageService.refreshToken

    this.initResponseInterceptors()
    this.initRequestInterceptors()
  }

  initResponseInterceptors = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleResponseError
    )
  }

  initRequestInterceptors = () => {
    this.instance.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError
    )
  }

  handleResponse = ({ data }) => data

  handleRequest = config => {
    const accessToken = LocalStorageService.token
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
    return config
  }

  handleResponseError = async error => {
    const { retry } = error.config
    if (!this.refreshToken || error.response?.status !== 401 || retry) {
      throw error
    }
    if (!this.refreshRequest) {
      this.refreshRequest = this.instance.post(
        authURL + '/auth/refresh', {
          refresh: this.refreshToken
        }
      )
    }
    const data = await this.refreshRequest
    this.refreshRequest = null
    LocalStorageService.token = data.accessToken
    LocalStorageService.refreshToken = data.refreshToken
    this.refreshToken = data.refreshToken
    const newConfig = {
      ...error.config,
      retry: true
    }
    return this.instance(newConfig)
  }

  handleRequestError = error => Promise.reject(error)
}

export default AxiosClient
