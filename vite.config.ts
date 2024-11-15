import { resolve } from 'node:path'
import { cwd } from 'node:process'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Images from 'unplugin-vue-auto-img/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Pages from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd()) as ImportMetaEnv

  return {
    resolve: {
      alias: {
        '~/': `${resolve(__dirname, 'src')}/`,
        '#/': `${resolve(__dirname, 'src')}/types/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/styles/_element.scss" as *;',
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      // https://github.com/posva/unplugin-vue-router
      Pages({
        exclude: ['**/components/*.vue'],
        dts: 'src/types/typed-router.d.ts',
      }),

      // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
      Vue(),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', '@vueuse/core', 'pinia', VueRouterAutoImports],
        dirs: ['src/composables'],
        dts: 'src/types/auto-imports.d.ts',
        vueTemplate: true,
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: 'src/types/components.d.ts',
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),

      // https://github.com/lyric-zemin/unplugin-vue-auto-img#unplugin-vue-auto-img
      Images({ dts: 'src/types/images.d.ts' }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
    ],
  }
})
