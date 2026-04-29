# @monorepo/vite-config

共享的 Vite 配置包，用于 monorepo 项目中的所有子项目。

## 安装

在需要使用的项目中添加依赖：

```bash
pnpm add -D @monorepo/vite-config
```

## 使用方法

### 1. Vue 应用配置

对于 Vue 3 应用（如 `apps/web-app`）：

```typescript
import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  // 可以添加自定义配置
  custom: {
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
})
```

### 2. 启用 Vant UI 组件库（按需引入）

```typescript
import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  vant: true, // ⭐ 启用 Vant 按需引入
  unocss: true, // ⭐ 启用 UnoCSS
  custom: {
    // 自定义配置
  },
})
```

**特性：**

- ✅ 自动按需引入 Vant 组件
- ✅ 自动生成类型声明
- ✅ 支持 Vue、Vue Router、Pinia 的自动导入
- ✅ 集成 UnoCSS 原子化 CSS

**使用示例：**

```vue
<script setup lang="ts">
// 无需手动导入，自动识别
const count = ref(0)
</script>

<template>
  <!-- Vant 组件自动按需引入 -->
  <van-button type="primary">按钮</van-button>

  <!-- UnoCSS 原子类 -->
  <div class="flex items-center justify-center p-4">Hello World</div>
</template>
```

### 3. 启用 UnoCSS（单独使用）

```typescript
import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  unocss: true, // 只启用 UnoCSS
})
```

**注意：** 需要在项目根目录创建 `uno.config.ts` 配置文件。

### 4. 启用 Vue JSX/TSX 支持

```typescript
import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  jsx: true, // ⭐ 启用 JSX/TSX 支持
})
```

**特性：**

- ✅ 支持在 `.tsx` 和 `.jsx` 文件中使用 Vue 组件
- ✅ 支持 JSX 语法糖
- ✅ 完整的 TypeScript 类型支持

**使用示例：**

```tsx
// App.tsx
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)

    return () => (
      <div>
        <h1>Count: {count.value}</h1>
        <button onClick={() => count.value++}>Increment</button>
      </div>
    )
  },
})
```

### 5. 组合使用多个功能

```typescript
import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  jsx: true, // JSX/TSX 支持
  vant: true, // Vant 按需引入
  unocss: true, // UnoCSS
  custom: {
    // 自定义配置
  },
})
```

### 6. 库模式配置

对于需要构建为库的包（如 `packages/ui` 和 `packages/utils`）：

```typescript
import { createViteConfig } from '@monorepo/vite-config'
import { resolve } from 'node:path'

export default createViteConfig({
  lib: true,
  entry: resolve(__dirname, 'src/index.ts'),
  name: 'MyLibrary',
  external: ['vue'], // 可选，默认为 ['vue']
  // 可以添加自定义配置
  custom: {
    // 自定义配置
  },
})
```

### 7. 使用快捷函数

也可以使用快捷函数创建库配置：

```typescript
import { createLibConfig } from '@monorepo/vite-config'
import { resolve } from 'node:path'

export default createLibConfig(resolve(__dirname, 'src/index.ts'), 'MyLibrary')
```

## API

### `createViteConfig(options)`

创建 Vite 配置的主函数。

**参数：**

- `options.lib` (boolean): 是否为库模式构建，默认为 `false`
- `options.entry` (string): 库的入口文件路径（仅在 lib 模式下使用）
- `options.name` (string): 库的名称（仅在 lib 模式下使用）
- `options.external` (string[]): 外部依赖数组，默认为 `['vue']`
- `options.dts` (boolean): 是否生成类型声明文件，默认为 `true`
- `options.custom` (UserConfig): 自定义配置，会与默认配置合并
- `options.vant` (boolean): 是否启用 Vant UI 组件库（按需引入），默认为 `false`
- `options.unocss` (boolean): 是否启用 UnoCSS 原子化 CSS，默认为 `false`
- `options.jsx` (boolean): 是否启用 Vue JSX/TSX 支持，默认为 `false`

**返回：**

- `UserConfig`: Vite 用户配置对象

### `defaultConfig`

默认的 Vite 配置（用于应用），等同于 `createViteConfig()`。

### `createLibConfig(entry, name, external?)`

创建库配置的快捷函数。

**参数：**

- `entry` (string): 入口文件路径
- `name` (string): 库名称
- `external` (string[]): 外部依赖数组，可选，默认为 `['vue']`

**返回：**

- `UserConfig`: Vite 用户配置对象

## 特性

- ✅ 自动配置 Vue 3 插件
- ✅ 库模式下自动生成 TypeScript 声明文件
- ✅ 支持自定义配置覆盖
- ✅ 统一的构建配置
- ✅ 减少重复代码
- ✅ **Vant 4.x 按需引入** - 自动识别并引入使用的组件
- ✅ **UnoCSS 集成** - 原子化 CSS 引擎，极速开发体验
- ✅ **自动导入** - Vue、Vue Router、Pinia API 自动导入
- ✅ **JSX/TSX 支持** - 完整的 Vue JSX/TSX 开发体验

## 示例项目

- `apps/web-app`: Vue 3 应用
- `packages/ui`: UI 组件库
- `packages/utils`: 工具函数库

查看这些项目的 `vite.config.ts` 文件以了解实际使用方式。
