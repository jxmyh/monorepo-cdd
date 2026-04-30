# 多页面应用（MPA）配置说明

## ✅ 功能已启用

web-app 现已集成 `vite-plugin-virtual-mpa` 插件，支持多页面应用开发。

---

## 📦 安装依赖

```bash
pnpm add -D vite-plugin-virtual-mpa
```

---

## 🔧 配置内容

### 1. Vite 配置

**文件：** `apps/web-app/vite.config.ts`

```typescript
import { createViteConfig } from '@monorepo/vite-config'
import { createMpaPlugin } from 'vite-plugin-virtual-mpa'

export default createViteConfig({
  vant: true,
  unocss: true,
  jsx: true,
  custom: {
    base: '/html/Vue3Test/gitjs/',
    server: {
      port: 3000,
    },
    plugins: [
      createMpaPlugin({
        pages: [
          {
            name: 'home',
            entry: '/src/pages/home/main.ts',
            filename: 'home.html',
            template: './pages/home.html',
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
```

---

### 2. 页面结构

```
apps/web-app/
├── pages/                    # HTML 模板目录
│   ├── home.html            # 首页模板
│   └── about.html           # 关于页模板
├── src/
│   └── pages/               # 页面源码目录
│       ├── home/            # 首页
│       │   ├── main.ts      # 入口文件
│       │   └── App.vue      # 根组件
│       └── about/           # 关于页
│           ├── main.ts      # 入口文件
│           └── App.vue      # 根组件
└── types/                   # 类型声明
    ├── auto-imports.d.ts
    └── components.d.ts
```

---

## 📝 使用示例

### 创建新页面

#### 步骤 1：创建 HTML 模板

**文件：** `pages/newpage.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>新页面 - Web App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/pages/newpage/main.ts"></script>
  </body>
</html>
```

---

#### 步骤 2：创建页面入口

**文件：** `src/pages/newpage/main.ts`

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import '../../uno.config'

createApp(App).mount('#app')
```

---

#### 步骤 3：创建根组件

**文件：** `src/pages/newpage/App.vue`

```vue
<script setup lang="ts">
// 页面逻辑
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-4xl font-bold">新页面</h1>
  </div>
</template>
```

---

#### 步骤 4：注册页面

在 `vite.config.ts` 中添加：

```typescript
createMpaPlugin({
  pages: [
    // ... 现有页面
    {
      name: 'newpage',
      entry: '/src/pages/newpage/main.ts',
      filename: 'newpage.html',
      template: './pages/newpage.html',
    },
  ],
})
```

---

## 🎯 访问页面

### 开发环境

启动开发服务器：

```bash
cd apps/web-app
pnpm dev
```

访问页面：

- 首页：`http://localhost:3000/html/Vue3Test/gitjs/home.html`
- 关于页：`http://localhost:3000/html/Vue3Test/gitjs/about.html`
- 新页面：`http://localhost:3000/html/Vue3Test/gitjs/newpage.html`

---

### 生产环境

构建项目：

```bash
pnpm build
```

构建后的文件位于 `dist/` 目录：

```
dist/
├── home.html
├── about.html
├── newpage.html
└── assets/
    ├── home-[hash].js
    ├── about-[hash].js
    └── ...
```

---

## 💡 MPA vs SPA

### 多页面应用（MPA）优势

✅ **更好的 SEO** - 每个页面独立，搜索引擎友好  
✅ **首屏加载更快** - 只加载当前页面所需资源  
✅ **天然的服务端渲染友好** - 易于实现 SSR  
✅ **降低 JavaScript 包体积** - 按需加载  
✅ **页面隔离** - 一个页面崩溃不影响其他页面

---

### 单页面应用（SPA）优势

✅ **用户体验流畅** - 页面无刷新切换  
✅ **状态管理简单** - 全局状态共享  
✅ **开发体验好** - 类似原生应用  
✅ **适合复杂交互** - 如后台管理系统

---

### 选择建议

| 场景             | 推荐方案 |
| ---------------- | -------- |
| **企业官网**     | MPA ✅   |
| **电商网站**     | MPA ✅   |
| **博客/新闻**    | MPA ✅   |
| **后台管理系统** | SPA ✅   |
| **社交应用**     | SPA ✅   |
| **在线工具**     | SPA ✅   |

---

## 🔍 页面间通信

### 方法 1：URL 参数

```typescript
// 页面 A - 传递参数
window.location.href = '/about.html?id=123&name=test'

// 页面 B - 接收参数
const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const name = params.get('name')
```

---

### 方法 2：LocalStorage

```typescript
// 页面 A - 存储数据
localStorage.setItem('sharedData', JSON.stringify({ key: 'value' }))

// 页面 B - 读取数据
const data = JSON.parse(localStorage.getItem('sharedData'))
```

---

### 方法 3：Cookie

```typescript
// 设置 Cookie
document.cookie = 'username=John; path=/'

// 读取 Cookie
const cookies = document.cookie.split(';').reduce((acc, cookie) => {
  const [key, value] = cookie.trim().split('=')
  acc[key] = value
  return acc
}, {})
```

---

## 📊 性能优化

### 1. 代码分割

每个页面独立打包，自动实现代码分割：

```
dist/assets/
├── home-[hash].js      # 首页专属代码
├── about-[hash].js     # 关于页专属代码
└── vendor-[hash].js    # 共享依赖
```

---

### 2. 共享依赖缓存

Vite 会自动提取共享依赖，避免重复加载：

```typescript
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['@vueuse/core', 'axios'],
        },
      },
    },
  },
}
```

---

### 3. 预加载

在页面中预加载其他页面的资源：

```html
<!-- home.html -->
<head>
  <link rel="prefetch" href="/assets/about-[hash].js" as="script" />
</head>
```

---

## 🛠️ 常见问题

### Q1: 如何在页面间共享状态？

**方案 1：使用 LocalStorage**

```typescript
// stores/shared.ts
export function setSharedState(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getSharedState(key: string) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}
```

**方案 2：使用 URL 参数**

适合传递少量数据。

---

### Q2: 如何实现页面间的动画过渡？

MPA 的页面切换是完整的页面刷新，无法实现平滑过渡。如果需要过渡效果，建议使用 SPA + Vue Router。

---

### Q3: 如何处理 404 错误？

在服务器上配置自定义 404 页面：

```nginx
# nginx.conf
error_page 404 /404.html;
location = /404.html {
  root /usr/share/nginx/html;
}
```

---

### Q4: 如何优化首屏加载速度？

1. **代码分割** - 每个页面独立打包
2. **资源压缩** - 启用 gzip/brotli
3. **CDN 加速** - 静态资源使用 CDN
4. **图片优化** - 使用 WebP 格式
5. **懒加载** - 非关键资源延迟加载

---

### Q5: MPA 可以使用 Vue Router 吗？

可以，但通常不需要。每个页面有独立的入口，可以在页面内部使用 Vue Router 管理子路由。

```typescript
// src/pages/home/main.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/home'),
  routes: [
    { path: '/', component: HomeIndex },
    { path: '/detail', component: HomeDetail },
  ],
})

createApp(App).use(router).mount('#app')
```

---

## ✨ 最佳实践

### 1. 页面组织

```
src/pages/
├── home/              # 首页模块
│   ├── main.ts        # 入口
│   ├── App.vue        # 根组件
│   ├── components/    # 页面专属组件
│   ├── stores/        # 页面专属状态
│   └── styles/        # 页面专属样式
├── about/             # 关于页模块
└── ...
```

---

### 2. 共享代码

将共享的代码提取到 `src/` 根目录：

```
src/
├── components/        # 全局共享组件
├── composables/       # 全局共享 Composables
├── utils/             # 工具函数
├── stores/            # 全局状态
└── pages/             # 各页面模块
```

---

### 3. 样式管理

- **全局样式** - 放在 `src/styles/global.css`
- **页面样式** - 放在 `src/pages/xxx/styles/`
- **组件样式** - 使用 scoped 或 CSS Modules

---

### 4. 类型安全

为每个页面创建类型定义：

```typescript
// src/pages/home/types.ts
export interface HomePageData {
  title: string
  description: string
}
```

---

## 📚 相关资源

- [vite-plugin-virtual-mpa GitHub](https://github.com/xxholly32/vite-plugin-virtual-mpa)
- [Vite 官方文档](https://vitejs.dev/)
- [Vue 3 官方文档](https://vuejs.org/)

---

**配置状态**: ✅ 已完成并测试通过  
**相关文件**:

- `apps/web-app/vite.config.ts`
- `apps/web-app/pages/*.html`
- `apps/web-app/src/pages/*/`

**示例页面**:

- 首页：`pages/home.html` → `src/pages/home/`
- 关于页：`pages/about.html` → `src/pages/about/`
