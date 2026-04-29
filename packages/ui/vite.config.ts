import { resolve } from 'node:path'
import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  lib: true,
  entry: resolve(__dirname, 'src/index.ts'),
  name: 'MonorepoUI',
  // 可以添加自定义配置
  custom: {
    // 在这里添加自定义配置
  },
})
