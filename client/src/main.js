import { createApp } from 'vue'
import ElementPlus, { locale } from 'element-plus'
import lang from 'element-plus/lib/locale/lang/ru'

import App from './App.vue'
import router from './router'
import store from './store'

import 'element-plus/lib/theme-chalk/index.css'
import './assets/styles/styles.scss'

locale(lang)

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
