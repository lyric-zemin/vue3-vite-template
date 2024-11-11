export {}

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'default' | 'empty'
  }
}
