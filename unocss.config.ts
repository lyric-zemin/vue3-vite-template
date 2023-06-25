import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// https://unocss.dev/config/
export default defineConfig({
  theme: {
    colors: {
      primary: 'var(--el-color-primary)',
    },
  },
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({ scale: 1.2, warn: true }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
