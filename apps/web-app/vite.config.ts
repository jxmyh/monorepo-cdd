import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  // 启用 Vant、UnoCSS 和 JSX/TSX 支持
  vant: true,
  unocss: true,
  jsx: true,
  // 可以添加自定义配置
  custom: {
    // 例如:server, resolve, css 等配置
    server: {
      port: 3000,
    },
  },
})
