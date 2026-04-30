# useCounter

计数器 Hook，提供增加、减少、重置等功能。

## 类型定义

### UseCounterOptions

```typescript
interface UseCounterOptions {
  /** 初始值，默认为 0 */
  initialValue?: number
  /** 最小值，默认为 -Infinity */
  min?: number
  /** 最大值，默认为 Infinity */
  max?: number
  /** 步长，默认为 1 */
  step?: number
}
```

### UseCounterReturn

```typescript
interface UseCounterReturn {
  /** 当前计数值 */
  count: Ref<number>
  /** 增加计数 */
  increment: () => void
  /** 减少计数 */
  decrement: () => void
  /** 重置为初始值 */
  reset: () => void
  /** 设置为指定值 */
  set: (value: number) => void
  /** 是否达到最小值 */
  isMin: Ref<boolean>
  /** 是否达到最大值 */
  isMax: Ref<boolean>
}
```

## 用法

### 基础用法

```vue
<script setup lang="ts">
import { useCounter } from '@monorepo/vue-hooks'

const { count, increment, decrement } = useCounter()
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>
```

### 自定义配置

```vue
<script setup lang="ts">
import { useCounter } from '@monorepo/vue-hooks'

const { count, increment, decrement, reset, set, isMin, isMax } = useCounter({
  initialValue: 10,
  min: 0,
  max: 100,
  step: 5,
})
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Min: {{ isMin }}</p>
    <p>Max: {{ isMax }}</p>

    <button :disabled="isMax" @click="increment">+5</button>
    <button :disabled="isMin" @click="decrement">-5</button>
    <button @click="reset">Reset</button>
    <button @click="set(50)">Set to 50</button>
  </div>
</template>
```

## API

### 参数

| 参数                   | 类型                | 默认值      | 说明     |
| ---------------------- | ------------------- | ----------- | -------- |
| `options`              | `UseCounterOptions` | `{}`        | 配置选项 |
| `options.initialValue` | `number`            | `0`         | 初始值   |
| `options.min`          | `number`            | `-Infinity` | 最小值   |
| `options.max`          | `number`            | `Infinity`  | 最大值   |
| `options.step`         | `number`            | `1`         | 步长     |

### 返回值

| 属性        | 类型                      | 说明                            |
| ----------- | ------------------------- | ------------------------------- |
| `count`     | `Ref<number>`             | 当前计数值                      |
| `increment` | `() => void`              | 增加计数（受 max 限制）         |
| `decrement` | `() => void`              | 减少计数（受 min 限制）         |
| `reset`     | `() => void`              | 重置为初始值                    |
| `set`       | `(value: number) => void` | 设置为指定值（受 min/max 限制） |
| `isMin`     | `Ref<boolean>`            | 是否达到最小值                  |
| `isMax`     | `Ref<boolean>`            | 是否达到最大值                  |

## 特性

- ✅ **边界检查** - 自动限制在 min 和 max 范围内
- ✅ **响应式** - 基于 Vue 3 ref，完全响应式
- ✅ **类型安全** - 完整的 TypeScript 类型支持
- ✅ **灵活配置** - 支持自定义初始值、范围、步长
- ✅ **状态查询** - 提供 isMin/isMax 计算属性

## 注意事项

::: warning 注意

- 如果 `min > max`，会在控制台输出警告
- `initialValue` 会自动被限制在 `[min, max]` 范围内
- `increment` 和 `decrement` 不会超出边界
  :::

## 示例

### 带步长的计数器

```vue
<script setup lang="ts">
import { useCounter } from '@monorepo/vue-hooks'

const { count, increment, decrement } = useCounter({
  initialValue: 0,
  step: 10,
})
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+10</button>
    <button @click="decrement">-10</button>
  </div>
</template>
```

### 受限范围的计数器

```vue
<script setup lang="ts">
import { useCounter } from '@monorepo/vue-hooks'

const { count, increment, decrement, isMin, isMax } = useCounter({
  min: 0,
  max: 10,
})
</script>

<template>
  <div>
    <p>Count: {{ count }} / 10</p>
    <progress :value="count" max="10" />
    <button :disabled="isMax" @click="increment">+</button>
    <button :disabled="isMin" @click="decrement">-</button>
  </div>
</template>
```

## 源码

[查看源码](https://github.com/your-repo/monorepo/tree/main/packages/vue-hooks/src/useCounter/index.ts)
