import { createStore, createLogger } from 'vuex'
import auth from './auth/index.js'
import users from './users/index.js'
import services from './services'
import store from './store'

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export default window.store = createStore({
  plugins,
  strict: debug,
  modules: {
    auth,
    users,
    services,
    store
  }
})
