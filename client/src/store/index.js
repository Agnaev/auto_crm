import { createStore, createLogger } from 'vuex'
import auth from './auth/index.js'

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export default createStore({
  plugins,
  strict: debug,
  modules: {
    auth
  }
})
