import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  // 启用 Vant、UnoCSS 和 JSX/TSX 支持
  vant: true,
  unocss: true,
  jsx: true,
  // 可以添加自定义配置
  custom: {
    // 例如:server, resolve, css 等配置
    // 打包到二级目录 html/Vue3Test/gitjs
    base: '/html/Vue3Test/gitjs/',
    server: {
      port: 3000,
    },
    // ⚠️ 不推荐: 指定 index.html 的位置
    // root: 'public', // 如果 index.html 在 public 目录
  },
})
