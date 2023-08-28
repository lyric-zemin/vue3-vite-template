import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '#/': `${path.resolve(__dirname, 'src')}/types/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "~/styles/_element.scss" as *;',
      },
    },
  },
  plugins: [
    // https://github.com/posva/unplugin-vue-router
    Pages({ exclude: ['**/components/*.vue'], dts: 'src/types/typed-router.d.ts', routeBlockLang: 'yaml' }),

    // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
    Vue(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', '@vueuse/core', VueRouterAutoImports],
      dirs: ['./src/composables'],
      dts: 'src/types/auto-imports.d.ts',
      vueTemplate: true,
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: 'src/types/components.d.ts',
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools(),
  ],
})
