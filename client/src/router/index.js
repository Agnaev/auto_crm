import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/views/Home.vue'
import store from '@/store'

const routes = [
  new Route('/', 'MainLayout', MainLayout, [
    new Route('', 'Home', Home),
    new Route('/users', 'Users', () => import('@/views/Users.vue')),
    new Route('/orders', 'OrdersPage', () => import('@/views/OrdersPage.vue')),
    new Route('/store', 'Store', () => import('@/views/Store.vue')),
    new Route('/services', 'Service', () => import('@/views/Services.vue'))
  ]),
  new Route('/login', 'Login', () => import('@/views/Login.vue'))
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isUserAuth && to.name === 'Login') {
    return next()
  } else if (store.getters.isUserAuth && to.name === 'Login') {
    return next({
      name: from.name
    })
  } else if (store.getters.isUserAuth && to.name !== 'Login') {
    return next()
  }
  next({
    name: 'Login',
    query: {
      redirect: to.fullPath
    }
  })
})

function Route (path, name, component, children) {
  this.path = path
  this.name = name
  this.component = component
  this.children = children
}

export default router
