declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

/**
 * 修复 vue-router/auto 类型丢失的问题
 */
declare module 'vue-router/auto' { }
