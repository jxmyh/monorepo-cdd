# @monorepo/vue-hooks

Vue 3 Composition API hooks 集合，为 monorepo 项目提供可复用的组合式函数。

## 安装

```bash
pnpm add @monorepo/vue-hooks
```

## 可用的 Hooks

### useCounter

计数器 Hook，提供增加、减少、重置等功能。

#### 类型定义

```typescript
interface UseCounterOptions {
  initialValue?: number; // 初始值，默认 0
  min?: number; // 最小值，默认 -Infinity
  max?: number; // 最大值，默认 Infinity
  step?: number; // 步长，默认 1
}

interface UseCounterReturn {
  count: Ref<number>; // 当前计数值
  increment: () => void; // 增加
  decrement: () => void; // 减少
  reset: () => void; // 重置
  set: (value: number) => void; // 设置值
  isMin: Ref<boolean>; // 是否达到最小值
  isMax: Ref<boolean>; // 是否达到最大值
}
```

#### 基础用法

```vue
<script setup lang="ts">
import { useCounter } from "@monorepo/vue-hooks";

const { count, increment, decrement } = useCounter();
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>
```

#### 自定义配置

```vue
<script setup lang="ts">
import { useCounter } from "@monorepo/vue-hooks";

const { count, increment, decrement, reset, set, isMin, isMax } = useCounter({
  initialValue: 10,
  min: 0,
  max: 100,
  step: 5,
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Min: {{ isMin }}</p>
    <p>Max: {{ isMax }}</p>

    <button @click="increment" :disabled="isMax">+5</button>
    <button @click="decrement" :disabled="isMin">-5</button>
    <button @click="reset">Reset</button>
    <button @click="set(50)">Set to 50</button>
  </div>
</template>
```

#### API

**参数：**

| 参数           | 类型     | 默认值      | 说明   |
| -------------- | -------- | ----------- | ------ |
| `initialValue` | `number` | `0`         | 初始值 |
| `min`          | `number` | `-Infinity` | 最小值 |
| `max`          | `number` | `Infinity`  | 最大值 |
| `step`         | `number` | `1`         | 步长   |

**返回值：**

| 属性        | 类型                      | 说明                            |
| ----------- | ------------------------- | ------------------------------- |
| `count`     | `Ref<number>`             | 当前计数值                      |
| `increment` | `() => void`              | 增加计数（受 max 限制）         |
| `decrement` | `() => void`              | 减少计数（受 min 限制）         |
| `reset`     | `() => void`              | 重置为初始值                    |
| `set`       | `(value: number) => void` | 设置为指定值（受 min/max 限制） |
| `isMin`     | `Ref<boolean>`            | 是否达到最小值                  |
| `isMax`     | `Ref<boolean>`            | 是否达到最大值                  |

#### 特性

✅ **边界检查** - 自动限制在 min 和 max 范围内  
✅ **响应式** - 基于 Vue 3 ref，完全响应式  
✅ **类型安全** - 完整的 TypeScript 类型支持  
✅ **灵活配置** - 支持自定义初始值、范围、步长  
✅ **状态查询** - 提供 isMin/isMax 计算属性

#### 注意事项

⚠️ 如果 `min > max`，会在控制台输出警告  
⚠️ `initialValue` 会自动被限制在 `[min, max]` 范围内  
⚠️ `increment` 和 `decrement` 不会超出边界

## 添加新的 Hook

在 `src/` 目录下创建新的 hook 文件，例如 `useToggle.ts`：

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

然后在 `src/index.ts` 中导出：

```typescript
export { useCounter } from "./useCounter";
export { useToggle } from "./useToggle";
```

## 开发

```bash
# 开发模式（构建库）
pnpm dev

# 构建库
pnpm build

# 运行测试
pnpm test              # 监听模式
pnpm test:run          # 单次执行
pnpm test:coverage     # 覆盖率报告

# 启动文档网站
pnpm docs:dev

# 构建文档网站
pnpm docs:build

# 预览文档网站
pnpm docs:preview

# 代码检查
pnpm lint
pnpm lint:fix
```

**📚 测试指南：** [TESTING.md](./TESTING.md)

## 文档

本项目使用 VitePress 生成文档网站。

**🚀 快速开始：** [QUICKSTART.md](./QUICKSTART.md) - 3 步添加新 Hook

**目录结构：**

```
src/
└── useCounter/        # 每个 hook 独立目录
    ├── index.ts       # hook 实现
    └── index.md       # hook API 文档

docs/
└── api/
    └── useCounter/    # 自动同步的文档
        └── index.md
```

**添加新 Hook：**

1. 在 `src/` 下创建 `useXxx/` 目录
2. 添加 `index.ts`（实现）和 `index.md`（文档）
3. 在 `src/index.ts` 中导出
4. 运行 `pnpm docs:dev` 查看文档

详见 [STRUCTURE.md](./STRUCTURE.md)

## 最佳实践

1. **命名规范** - 所有 hooks 以 `use` 开头
2. **类型定义** - 为参数和返回值定义清晰的类型
3. **文档注释** - 使用 JSDoc 注释说明功能和用法
4. **示例代码** - 提供实际使用的示例
5. **边界处理** - 处理好边界情况和错误输入

## License

ISC
