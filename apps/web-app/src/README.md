# 项目目录结构说明

## 📁 目录结构

```
apps/web-app/
├── public/              # 公共资源 (不会被 Vite 处理)
│   └── favicon.ico      # 网站图标
├── src/
│   ├── assets/          # 静态资源 (图片、字体等,会被 Vite 处理)
│   ├── components/      # 公共组件
│   │   ├── common/      # 通用组件
│   │   ├── layout/      # 布局组件
│   │   └── features/    # 功能组件
│   ├── composables/     # 组合式函数 (可复用的逻辑)
│   ├── layouts/         # 布局组件 (页面级布局)
│   ├── pages/           # 页面组件 (路由页面)
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 状态管理
│   ├── styles/          # 全局样式
│   │   └── index.css    # 样式入口
│   ├── utils/           # 工具函数
│   ├── App.vue          # 根组件
│   └── main.ts          # 应用入口
├── types/               # TypeScript 类型声明 (自动生成)
│   ├── auto-imports.d.ts
│   └── components.d.ts
└── 配置文件...
```

## 📝 各目录用途

### `public/`

- 存放不会被 Vite 处理的静态资源
- 直接复制到 dist 目录
- 例如: `favicon.ico`, `robots.txt`

### `src/assets/`

- 存放需要被 Vite 处理的资源
- 会被优化、压缩、添加哈希
- 例如: 图片、SVG、字体文件

### `src/components/`

- Vue 组件
- 建议按功能模块组织
- 自动导入支持 (通过 unplugin-vue-components)

### `src/composables/`

- 可复用的组合式函数
- 封装业务逻辑
- 例如: `useAuth`, `useFetch`

### `src/layouts/`

- 页面布局组件
- 例如: `DefaultLayout`, `AdminLayout`

### `src/pages/`

- 路由页面组件
- 与 vue-router 配合使用
- 文件名对应路由路径

### `src/router/`

- Vue Router 配置
- 路由定义和守卫

### `src/stores/`

- Pinia 状态管理
- 全局状态存储

### `src/styles/`

- 全局样式文件
- CSS/SCSS/Less 入口

### `src/utils/`

- 纯工具函数
- 不依赖 Vue 的工具方法
- 例如: 日期格式化、数据验证

### `types/`

- 自动生成的类型声明
- 不要手动修改
- 由 unplugin-auto-import 和 unplugin-vue-components 生成

## 🚀 使用建议

1. **组件命名**: 使用 PascalCase (如 `UserProfile.vue`)
2. **文件组织**: 相关组件放在同一目录下
3. **导入路径**: 使用相对路径或配置别名
4. **类型安全**: 充分利用 TypeScript 类型检查

## 🔧 配置说明

- **自动导入**: Vue API、VueUse、Vant 组件自动导入
- **类型声明**: 自动生成在 `types/` 目录
- **样式方案**: UnoCSS (原子化 CSS) + 自定义全局样式
