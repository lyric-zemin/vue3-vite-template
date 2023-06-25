import { createApp } from 'vue'
import store from './stores'

import '@unocss/reset/tailwind-compat.css'

import router from './router'
import App from './App.vue'

import 'virtual:uno.css'
import './styles/main.scss'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
