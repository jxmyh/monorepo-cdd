# @monorepo/vue-hooks

Vue 3 Composition API Hooks 集合，为 monorepo 项目提供可复用的组合式函数。

## 特性

- 🎯 **类型安全** - 完整的 TypeScript 支持
- 📦 **开箱即用** - 无需额外配置
- 🔄 **响应式** - 基于 Vue 3 Composition API
- 📚 **文档完善** - 每个 Hook 都有详细文档和示例

## 快速开始

### 安装

```bash
pnpm add @monorepo/vue-hooks
```

### 使用

```vue
<script setup lang="ts">
import { useCounter } from "@monorepo/vue-hooks";

const { count, increment, decrement } = useCounter({
  initialValue: 0,
  min: 0,
  max: 100,
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>
```

## 可用的 Hooks

- [useCounter](/api/useCounter/) - 计数器 Hook

## 开发

```bash
# 启动文档网站
pnpm docs:dev

# 构建文档网站
pnpm docs:build

# 预览文档网站
pnpm docs:preview
```

## License

ISC
