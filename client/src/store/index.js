import { createStore, createLogger } from 'vuex'
import auth from './auth/index.js'
import users from './users/index.js'
import services from './services'
import store from './store'
import shoppingCart from './shopping-cart'
import carModels from './car-models'
import registerForService from './register-for-service'
import OrdersService from './orders'

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export default window.store = createStore({
  plugins,
  strict: debug,
  modules: {
    auth,
    users,
    services,
    store,
    shoppingCart,
    carModels,
    registerForService,
    OrdersService
  }
})
