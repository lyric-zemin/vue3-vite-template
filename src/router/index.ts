import type { RouteRecordRaw } from 'vue-router/auto'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

function recursiveLayouts(route: RouteRecordRaw): RouteRecordRaw {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i])

    return route
  }

  return setupLayouts([route])[0]
}

// https://router.vuejs.org/zh/guide/
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes(routes) {
    return routes.map((route) => {
      // For each route, pass it to recursiveLayouts, which will apply layouts properly
      // (without duplicating or accidentally double-wrapping components).

      return recursiveLayouts(route)
    })
  },
})

export default router
