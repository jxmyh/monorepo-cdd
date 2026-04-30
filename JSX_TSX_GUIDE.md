# JSX/TSX 支持配置说明

## ✅ 功能已启用

项目现已支持在 Vue 3 中使用 JSX 和 TSX 语法进行组件开发。

---

## 🔧 配置内容

### 1. Vite 配置

**文件：** `apps/web-app/vite.config.ts`

```typescript
import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  // 启用 Vant、UnoCSS 和 JSX/TSX 支持
  vant: true,
  unocss: true,
  jsx: true, // ← 启用 JSX/TSX
  // ...
})
```

### 2. TypeScript 配置

**文件：** `config/tsconfig/vue-app.json`

已包含 JSX 支持：

```json
{
  "compilerOptions": {
    "jsx": "preserve"
    // ...
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### 3. JSX 类型声明

**文件：** `apps/web-app/src/jsx.d.ts`

```typescript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

export {}
```

---

## 📝 使用示例

### JSX 示例

**文件：** `apps/web-app/src/components/JsxExample.jsx`

```jsx
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'JsxExample',

  setup() {
    const count = ref(0)

    return () => (
      <div>
        <h2>JSX 示例</h2>
        <p>Count: {count.value}</p>
        <button onClick={() => count.value++}>+</button>
      </div>
    )
  },
})
```

**特点：**

- ✅ 使用 `.jsx` 扩展名
- ✅ JavaScript 语法
- ✅ 无需类型定义
- ✅ 适合快速原型开发

---

### TSX 示例

**文件：** `apps/web-app/src/components/TsxExample.tsx`

```tsx
import { computed, defineComponent, ref } from 'vue'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

export default defineComponent({
  name: 'TsxExample',

  setup() {
    const todos = ref<TodoItem[]>([])

    return () => (
      <div>
        <h2>TSX 示例</h2>
        <ul>
          {todos.value.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    )
  },
})
```

**特点：**

- ✅ 使用 `.tsx` 扩展名
- ✅ TypeScript 语法
- ✅ 完整的类型支持
- ✅ IDE 智能提示
- ✅ 编译时类型检查

---

## 🎯 在 Vue SFC 中使用

可以在 `.vue` 文件中导入和使用 JSX/TSX 组件：

```vue
<script setup lang="ts">
import JsxExample from './components/JsxExample.jsx'
import TsxExample from './components/TsxExample.tsx'
</script>

<template>
  <div>
    <JsxExample />
    <TsxExample />
  </div>
</template>
```

---

## 💡 JSX/TSX vs Vue SFC

### 何时使用 JSX/TSX？

✅ **适合场景：**

- 动态渲染逻辑复杂
- 需要大量 JavaScript 表达式
- 函数式组件
- 高阶组件（HOC）
- 渲染函数优化

❌ **不适合场景：**

- 简单的静态模板
- 需要 CSS scoped
- 团队不熟悉 JSX
- 需要 Vue 指令（v-if, v-for 等）

### 对比示例

#### Vue SFC（推荐用于大多数情况）

```vue
<template>
  <div>
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps(['title', 'items'])
</script>
```

#### JSX/TSX（适合复杂逻辑）

```tsx
export default defineComponent({
  props: ['title', 'items'],

  setup(props) {
    return () => (
      <div>
        <h2>{props.title}</h2>
        <ul>
          {props.items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    )
  },
})
```

---

## 🔍 常见问题

### Q1: JSX 和 TSX 有什么区别？

**JSX (.jsx):**

- JavaScript + JSX
- 无类型检查
- 更灵活

**TSX (.tsx):**

- TypeScript + JSX
- 有类型检查
- 更好的 IDE 支持

---

### Q2: 为什么需要 jsx.d.ts？

TypeScript 需要知道 JSX 命名空间的定义，否则会报错：

```
JSX 元素隐式具有类型 "any"
```

`jsx.d.ts` 提供了这些类型定义。

---

### Q3: 可以使用 React 的 JSX 语法吗？

可以！Vue 3 的 JSX 插件支持与 React 类似的语法：

```tsx
// React 风格
<div className="test" onClick={handler}>

// Vue 风格（也支持）
<div class="test" onClick={handler}>
```

---

### Q4: 性能有差异吗？

JSX/TSX 和 Vue SFC 在运行时性能基本相同，因为它们都会被编译成渲染函数。

**主要差异：**

- 开发体验不同
- 类型支持不同
- 代码组织方式不同

---

### Q5: 如何迁移现有组件？

**不建议完全迁移！** 建议：

1. **新组件** - 根据需求选择 SFC 或 JSX/TSX
2. **现有组件** - 保持 SFC，除非有特殊需求
3. **混合使用** - 可以在项目中同时使用

---

## 📚 最佳实践

### 1. 保持一致性

在一个组件中不要混用多种语法：

```tsx
// ❌ 不好
export default {
  template: `<div>...</div>`, // 字符串模板
  render() {
    // 渲染函数
    return <div>...</div> // JSX
  },
}

// ✅ 好
export default defineComponent({
  setup() {
    return () => <div>...</div>
  },
})
```

---

### 2. 使用 TypeScript

优先使用 `.tsx` 而非 `.jsx`：

```tsx
// ✅ 推荐：有类型支持
interface Props {
  name: string
  age: number
}

// ❌ 不推荐：无类型
const props = { name: '', age: 0 }
```

---

### 3. 提取复杂逻辑

将复杂的渲染逻辑提取为函数：

```tsx
setup() {
  const renderList = () => {
    return items.value.map(item => (
      <li key={item.id}>{item.name}</li>
    ))
  }

  return () => (
    <ul>{renderList()}</ul>
  )
}
```

---

### 4. 使用片段（Fragment）

```tsx
// ✅ 多个根元素
return () => (
  <>
    <Header />
    <Content />
    <Footer />
  </>
)
```

---

## 🎓 学习资源

- [Vue 3 JSX 官方文档](https://github.com/vuejs/babel-plugin-jsx)
- [Vue 3 Render Functions](https://vuejs.org/guide/extras/render-function.html)
- [TypeScript JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)

---

## ✨ 总结

### 优势

✅ **灵活性** - 完全的 JavaScript/TypeScript 控制  
✅ **类型安全** - TSX 提供完整的类型检查  
✅ **复用性** - 更容易提取和复用逻辑  
✅ **性能** - 与 SFC 相同的运行时性能

### 注意事项

⚠️ **学习曲线** - 需要熟悉 JSX 语法  
⚠️ **工具链** - 需要正确配置 Vite 和 TypeScript  
⚠️ **团队协作** - 确保团队成员都了解 JSX/TSX

---

**配置状态**: ✅ 已完成并测试通过  
**相关文件**:

- `apps/web-app/vite.config.ts`
- `apps/web-app/src/components/JsxExample.jsx`
- `apps/web-app/src/components/TsxExample.tsx`
- `apps/web-app/src/jsx.d.ts`
