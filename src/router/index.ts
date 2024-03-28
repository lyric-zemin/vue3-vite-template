import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

// https://router.vuejs.org/zh/guide/
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => setupLayouts(routes),
})

export default router
