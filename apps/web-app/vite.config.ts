import { createViteConfig } from '@monorepo/vite-config'
import { createMpaPlugin } from 'vite-plugin-virtual-mpa'

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
    plugins: [
      createMpaPlugin({
        pages: [
          {
            name: 'home',
            entry: '/src/pages/home/main.ts', // 入口文件
            filename: 'home.html', // 输出文件名
            template: './pages/home.html', // HTML 模板
          },
          {
            name: 'about',
            entry: '/src/pages/about/main.ts',
            filename: 'about.html',
            template: './pages/about.html',
          },
        ],
      }),
    ],
  },
})
