import { resolve } from 'node:path'
import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  lib: true,
  entry: resolve(__dirname, 'src/index.ts'),
  name: 'MonorepoVueHooks',
  custom: {
    // 可以在这里添加自定义配置
  },
})
