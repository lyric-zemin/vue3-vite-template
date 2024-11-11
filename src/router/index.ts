import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

// https://router.vuejs.org/zh/guide/
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

export default router

if (import.meta.hot)
  handleHotUpdate(router)
