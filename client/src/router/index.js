import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/views/Home.vue'
import store from '@/store'

const routes = [
  new Route('/', 'MainLayout', MainLayout, [
    new Route('', 'Home', Home),
    new Route('/users', 'Users', () => import('@/views/Users.vue')),
    new Route('/shopping-cart', 'ShoppingCart', () => import('@/views/ShoppingCart.vue')),
    new Route('/orders', 'OrdersPage', () => import('@/views/OrdersPage.vue')),
    new Route('/store', 'Store', () => import('@/views/Store.vue')),
    new Route('/services', 'Service', () => import('@/views/Services.vue')),
    new Route('/profile', 'UserProfile', () => import('@/views/UserProfile.vue'))
  ]),
  new Route('/login', 'Login', () => import('@/views/AuthPage.vue'))
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.isUserAuth
  const { role } = store.getters.getUserData ?? {}
  switch (true) {
    case isAuth && to.name !== 'Login':
    case !isAuth && to.name === 'Login':
      return next()
    case isAuth && to.name === 'Login':
      return next({
        name: from.name
      })
    case isAuth && role !== 'admin' && to.name === 'Users':
      return next({
        name: 'Home'
      })
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
