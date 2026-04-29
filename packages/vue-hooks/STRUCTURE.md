# Vue Hooks 包结构说明

## 📁 目录结构

```
packages/vue-hooks/
├── src/                    # 源代码目录
│   ├── index.ts           # 主入口文件，导出所有 hooks
│   └── useCounter/        # 每个 hook 独立目录
│       ├── index.ts       # hook 实现
│       └── index.md       # hook API 文档（用于 VitePress）
├── docs/                  # VitePress 文档目录
│   ├── .vitepress/
│   │   └── config.ts      # VitePress 配置
│   ├── index.md           # 文档首页
│   └── api/               # API 文档目录
│       ├── index.md       # API 索引页
│       └── useCounter/    # 自动同步的 hook 文档
│           └── index.md
├── scripts/
│   └── sync-docs.js       # 文档同步脚本
├── package.json
├── vite.config.ts
├── tsconfig.json
└── eslint.config.js
```

## 🎯 设计理念

### 1. Hook 目录结构

每个 hook 都有独立的目录，包含：

- `index.ts` - hook 的实现代码
- `index.md` - hook 的 API 文档

**示例：**

```
src/useCounter/
├── index.ts    # useCounter 实现
└── index.md    # useCounter 文档
```

### 2. 自动导出

`src/index.ts` 会自动导出所有 hooks：

```typescript
export { useCounter } from "./useCounter";
export type { UseCounterOptions, UseCounterReturn } from "./useCounter";
// 添加新 hook 时，在这里添加导出
```

### 3. 文档同步

使用 `scripts/sync-docs.js` 脚本自动将 `src/use*/index.md` 同步到 `docs/api/use*/index.md`。

**工作流程：**

```
src/useCounter/index.md  →  docs/api/useCounter/index.md
src/useToggle/index.md   →  docs/api/useToggle/index.md
...
```

### 4. VitePress 自动生成侧边栏

`docs/.vitepress/config.ts` 会：

1. 扫描 `src/` 目录下所有 `use*` 目录
2. 自动生成侧边栏菜单
3. 无需手动维护菜单配置

## 🚀 使用流程

### 添加新的 Hook

#### 步骤 1：创建 hook 目录

```bash
mkdir src/useToggle
```

#### 步骤 2：实现 hook

创建 `src/useToggle/index.ts`：

```typescript
import { ref } from "vue";

export function useToggle(initialValue = false) {
  const value = ref(initialValue);

  const toggle = () => {
    value.value = !value.value;
  };

  return {
    value,
    toggle,
  };
}
```

#### 步骤 3：编写文档

创建 `src/useToggle/index.md`：

````markdown
# useToggle

布尔值切换 Hook。

## 用法

```vue
<script setup>
import { useToggle } from "@monorepo/vue-hooks";

const { value, toggle } = useToggle();
</script>
```
````

## API

...

````

#### 步骤 4：更新导出

在 `src/index.ts` 中添加：

```typescript
export { useCounter } from './useCounter'
export { useToggle } from './useToggle'  // 新增
````

#### 步骤 5：同步文档并启动

```bash
pnpm docs:dev
```

脚本会自动：

1. 同步文档到 `docs/api/useToggle/index.md`
2. 更新侧边栏菜单
3. 启动 VitePress 开发服务器

## 📝 常用命令

```bash
# 开发模式（构建库）
pnpm dev

# 构建库
pnpm build

# 启动文档网站（自动同步文档）
pnpm docs:dev

# 构建文档网站
pnpm docs:build

# 预览文档网站
pnpm docs:preview

# 手动同步文档
pnpm docs:sync

# 代码检查
pnpm lint
pnpm lint:fix
```

## ✨ 特性

### 1. 单一数据源

- Hook 实现和文档都在 `src/useXxx/` 目录下
- 修改一处，处处生效
- 避免文档和代码不同步

### 2. 自动化

- ✅ 自动扫描 hooks
- ✅ 自动同步文档
- ✅ 自动生成侧边栏
- ✅ 零配置添加新 hook

### 3. 可扩展

轻松添加新 hook，只需：

1. 创建目录
2. 编写代码
3. 编写文档
4. 更新导出

### 4. VitePress 集成

- 支持 Markdown 增强语法
- 支持 Vue 组件
- 支持 TypeScript 类型展示
- 响应式设计

## 📖 文档规范

### Markdown 结构

每个 hook 的 `index.md` 应包含：

```markdown
# Hook 名称

简短描述。

## 类型定义

TypeScript 类型定义。

## 用法

基础用法和高级用法的示例。

## API

### 参数

参数表格。

### 返回值

返回值表格。

## 特性

功能特点列表。

## 注意事项

警告和提示。

## 示例

更多实际示例。

## 源码

链接到 GitHub 源码。
```

### 代码示例

使用正确的语言标记：

````markdown
```vue
<script setup lang="ts">
// Vue 示例
</script>
```

```typescript
// TypeScript 示例
```

```bash
# 命令行示例
```
````

### VitePress 特殊语法

```markdown
::: tip 提示
这是一个提示信息
:::

::: warning 注意
这是一个警告信息
:::

::: danger 危险
这是一个危险信息
:::
```

## 🔧 配置说明

### VitePress 配置

`docs/.vitepress/config.ts`：

```typescript
export default defineConfig({
  title: '@monorepo/vue-hooks',
  description: 'Vue 3 Composition API Hooks 文档',

  themeConfig: {
    // 导航栏
    nav: [...],

    // 侧边栏（自动生成）
    sidebar: {
      '/api/': [
        {
          text: 'Hooks',
          items: getHooksSidebar(),  // 自动扫描
        },
      ],
    },

    // 社交链接
    socialLinks: [...],

    // 页脚
    footer: {...},
  },
})
```

### 同步脚本

`scripts/sync-docs.js`：

```javascript
// 1. 扫描 src 目录下所有 use* 目录
// 2. 检查每个目录下是否有 index.md
// 3. 复制到 docs/api/use*/index.md
// 4. 输出同步结果
```

## 🎨 最佳实践

1. **命名规范**
   - 所有 hook 以 `use` 开头
   - 使用 PascalCase 命名目录
   - 例如：`useCounter`, `useToggle`, `useLocalStorage`

2. **文档优先**
   - 先写文档，再写代码
   - 确保文档清晰易懂
   - 提供足够的示例

3. **类型完整**
   - 为所有参数和返回值定义类型
   - 使用 JSDoc 注释
   - 导出类型定义

4. **示例丰富**
   - 基础用法示例
   - 高级用法示例
   - 实际场景示例

5. **保持一致性**
   - 所有 hook 遵循相同的结构
   - 文档格式统一
   - 代码风格一致

## 🐛 故障排除

### 问题 1：文档没有同步

**解决方案：**

```bash
# 手动运行同步脚本
pnpm docs:sync

# 检查 src/useXxx/index.md 是否存在
ls src/useCounter/index.md
```

### 问题 2：侧边栏没有更新

**解决方案：**

```bash
# 重启 VitePress 服务器
# Ctrl+C 停止，然后重新运行
pnpm docs:dev
```

### 问题 3：TypeScript 错误

**解决方案：**

```bash
# 重新安装依赖
pnpm install

# 清除缓存
rm -rf node_modules/.vite
```

## 📚 相关资源

- [VitePress 官方文档](https://vitepress.dev/)
- [Vue 3 Composition API](https://cn.vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript 文档](https://www.typescriptlang.org/)
