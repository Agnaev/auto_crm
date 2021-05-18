import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/views/Home.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'Abount',
        component: () => import('../views/About.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (store.getters.isUserAuth || to.name === 'Login') {
    return next()
  }
  next({
    name: 'Login',
    query: {
      redirect: to.fullPath
    }
  })
})

export default router
