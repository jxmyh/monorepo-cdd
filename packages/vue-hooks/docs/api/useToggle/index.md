# useToggle

布尔值切换 Hook，提供切换、设置等功能。

## 类型定义

### UseToggleReturn

```typescript
interface UseToggleReturn {
  /** 当前布尔值 */
  value: Ref<boolean>
  /** 切换值 */
  toggle: () => void
  /** 设置为 true */
  setTrue: () => void
  /** 设置为 false */
  setFalse: () => void
}
```

## 用法

### 基础用法

```vue
<script setup lang="ts">
import { useToggle } from '@monorepo/vue-hooks'

const { value, toggle } = useToggle()
</script>

<template>
  <div>
    <p>Value: {{ value }}</p>
    <button @click="toggle">Toggle</button>
  </div>
</template>
```

### 自定义初始值

```vue
<script setup lang="ts">
import { useToggle } from '@monorepo/vue-hooks'

const { value, toggle, setTrue, setFalse } = useToggle(true)
</script>

<template>
  <div>
    <p>Value: {{ value }}</p>
    <button @click="toggle">Toggle</button>
    <button @click="setTrue">Set True</button>
    <button @click="setFalse">Set False</button>
  </div>
</template>
```

## API

### 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `initialValue` | `boolean` | `false` | 初始值 |

### 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| `value` | `Ref<boolean>` | 当前布尔值 |
| `toggle` | `() => void` | 切换值（true ↔ false） |
| `setTrue` | `() => void` | 设置为 true |
| `setFalse` | `() => void` | 设置为 false |

## 特性

- ✅ **响应式** - 基于 Vue 3 ref，完全响应式
- ✅ **类型安全** - 完整的 TypeScript 类型支持
- ✅ **简单易用** - 一行代码即可使用
- ✅ **灵活控制** - 提供多种操作方式

## 示例

### 控制显示/隐藏

```vue
<script setup lang="ts">
import { useToggle } from '@monorepo/vue-hooks'

const { value: isVisible, toggle } = useToggle(false)
</script>

<template>
  <div>
    <button @click="toggle">
      {{ isVisible ? 'Hide' : 'Show' }}
    </button>
    
    <div v-if="isVisible">
      <p>This content is visible!</p>
    </div>
  </div>
</template>
```

### 深色模式切换

```vue
<script setup lang="ts">
import { useToggle } from '@monorepo/vue-hooks'
import { watchEffect } from 'vue'

const { value: isDark, toggle } = useToggle(false)

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<template>
  <div>
    <button @click="toggle">
      {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
    </button>
  </div>
</template>
```

## 源码

[查看源码](https://github.com/your-repo/monorepo/tree/main/packages/vue-hooks/src/useToggle/index.ts)
