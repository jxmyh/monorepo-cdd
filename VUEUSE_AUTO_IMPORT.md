# VueUse 自动引入配置说明

## ✅ 功能已启用

vite-config 现已支持 **VueUse** 的自动引入，无需手动 import 即可使用所有 VueUse composables。

---

## 🔧 配置内容

### 1. vite-config 配置

**文件：** `config/vite-config/src/index.ts`

在 Vant 模式下自动启用 VueUse 自动引入：

```typescript
AutoImport({
  imports: [
    'vue',
    'vue-router',
    'pinia',
    '@vueuse/core', // ← 自动引入 VueUse
    {
      axios: [['default', 'axios']],
    },
  ],
  dts: './types/auto-imports.d.ts',
})
```

---

### 2. 安装依赖

```bash
pnpm add @vueuse/core
```

---

## 📝 使用示例

### ✅ 自动引入 - 无需手动 import

```vue
<script setup lang="ts">
// ❌ 不需要这样写
// import { useMouse, useDark, useLocalStorage } from '@vueuse/core'

// ✅ 直接使用即可
const { x, y } = useMouse()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const message = useLocalStorage('message', 'Hello')
</script>
```

---

### 完整示例组件

**文件：** `apps/web-app/src/components/VueUseExample.vue`

```vue
<script setup lang="ts">
// VueUse 自动引入 - 无需手动 import
const { x, y } = useMouse()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const message = useLocalStorage('message', 'Hello VueUse!')
</script>

<template>
  <div class="p-6">
    <h2>VueUse 自动引入示例</h2>

    <!-- 鼠标位置 -->
    <div>
      <h3>鼠标位置</h3>
      <p>X: {{ x }}, Y: {{ y }}</p>
    </div>

    <!-- 暗黑模式 -->
    <div>
      <h3>暗黑模式</h3>
      <p>当前模式: {{ isDark ? '🌙 暗黑' : '☀️ 明亮' }}</p>
      <button @click="toggleDark()">切换模式</button>
    </div>

    <!-- 本地存储 -->
    <div>
      <h3>本地存储</h3>
      <input v-model="message" type="text" />
      <p>消息已保存到 localStorage</p>
    </div>
  </div>
</template>
```

---

## 🎯 可用的 VueUse APIs

VueUse 提供了 **200+** composables，以下是一些常用的：

### 🖱️ 传感器（Sensors）

```typescript
// 鼠标追踪
const { x, y } = useMouse()

// 窗口尺寸
const { width, height } = useWindowSize()

// 滚动位置
const { x, y } = useScroll()

// 设备方向
const { angle } = useDeviceOrientation()
```

---

### 🌗 状态（State）

```typescript
// 本地存储
const store = useLocalStorage('key', 'value')

// 会话存储
const store = useSessionStorage('key', 'value')

// 响应式对象
const obj = useStorage('key', { count: 0 })

// 剪贴板
const { text, copy } = useClipboard()
```

---

### 🌓 外观（Appearance）

```typescript
// 暗黑模式
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 颜色方案
const colorScheme = usePreferredColorScheme()
```

---

### ⏱️ 工具（Utilities）

```typescript
// 防抖函数
const debouncedFn = useDebounceFn(() => {
  console.log('debounced')
}, 500)

// 节流函数
const throttledFn = useThrottleFn(() => {
  console.log('throttled')
}, 500)

// 定时器
const { pause, resume, reset } = useTimeoutFn(() => {
  console.log('timeout')
}, 1000)

// 计数器
const { count, inc, dec } = useCounter(0)
```

---

### 🌐 浏览器（Browser）

```typescript
// 网络状态
const { isOnline } = useNetwork()

// 电池状态
const { charging, level } = useBattery()

// 页面可见性
const isVisible = useDocumentVisibility()

// 全屏模式
const { isFullscreen, toggle } = useFullscreen()
```

---

### 📡 网络（Network）

```typescript
// Fetch 请求
const { data, error } = useFetch('https://api.example.com')

// WebSocket
const { data, send } = useWebSocket('wss://example.com')
```

---

## 💡 最佳实践

### 1. 类型安全

VueUse 提供完整的 TypeScript 支持：

```typescript
// ✅ 完整的类型推断
const { x, y } = useMouse()
// x 和 y 的类型是 Ref<number>

const isDark = useDark()
// isDark 的类型是 Ref<boolean>
```

---

### 2. 按需使用

只导入你需要的 composables，避免不必要的开销：

```typescript
// ❌ 不好 - 导入所有
import * as VueUse from '@vueuse/core'

// ✅ 好 - 自动引入，按需使用
const { x, y } = useMouse()
const isDark = useDark()
```

---

### 3. 组合使用

可以组合多个 composables 创建更强大的功能：

```typescript
// 结合鼠标位置和窗口尺寸
const { x, y } = useMouse()
const { width, height } = useWindowSize()

// 计算鼠标是否在某个区域
const isInArea = computed(() => {
  return x.value > 0 && x.value < width.value / 2
})
```

---

### 4. 清理资源

某些 composables 会自动清理，但要注意：

```typescript
// useEventListener 会自动清理事件监听器
const { stop } = useEventListener(window, 'resize', handler)

// 手动停止
stop()
```

---

## 🔍 常见问题

### Q1: 为什么 IDE 没有提示？

**解决方案：**

确保生成了类型声明文件：

```bash
pnpm dev
# 会自动生成 types/auto-imports.d.ts
```

重启 IDE 以加载新的类型定义。

---

### Q2: 如何查看可用的 APIs？

**官方文档：** https://vueuse.org/

或者查看自动生成的类型文件：

```
apps/web-app/types/auto-imports.d.ts
```

---

### Q3: 可以自定义自动引入吗？

可以！在 vite.config.ts 中添加：

```typescript
export default createViteConfig({
  vant: true,
  custom: {
    plugins: [
      AutoImport({
        imports: [
          '@vueuse/core',
          // 添加其他库
          'your-library',
        ],
      }),
    ],
  },
})
```

---

### Q4: 性能有影响吗？

**几乎没有！**

- 自动引入只在开发时生效
- 生产构建时会进行 tree-shaking
- 只打包实际使用的 composables

---

### Q5: 与手动 import 有什么区别？

| 特性         | 自动引入      | 手动 import    |
| ------------ | ------------- | -------------- |
| **代码简洁** | ✅ 更简洁     | ❌ 需要 import |
| **类型支持** | ✅ 完整       | ✅ 完整        |
| **IDE 提示** | ✅ 有         | ✅ 有          |
| **学习成本** | ⚠️ 需了解 API | ✅ 明确来源    |
| **团队协作** | ⚠️ 需文档     | ✅ 清晰        |

**建议：**

- 小项目或熟悉 VueUse 的团队 → 自动引入
- 大项目或新手团队 → 手动 import 更清晰

---

## 📊 配置效果

### 使用前

```vue
<script setup lang="ts">
import { useMouse, useDark, useToggle, useLocalStorage } from '@vueuse/core'

const { x, y } = useMouse()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const message = useLocalStorage('message', 'Hello')
</script>
```

### 使用后

```vue
<script setup lang="ts">
// 无需 import，直接使用！
const { x, y } = useMouse()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const message = useLocalStorage('message', 'Hello')
</script>
```

---

## ✨ 总结

### 优势

✅ **代码简洁** - 无需手动 import  
✅ **类型安全** - 完整的 TypeScript 支持  
✅ **开发效率** - 更快的编码速度  
✅ **按需打包** - 生产环境 tree-shaking

### 注意事项

⚠️ **需要文档** - 团队成员需要了解 VueUse APIs  
⚠️ **IDE 配置** - 确保类型声明文件已生成  
⚠️ **命名冲突** - 注意不要与局部变量冲突

---

**配置状态**: ✅ 已完成并测试通过  
**相关文件**:

- `config/vite-config/src/index.ts`
- `apps/web-app/src/components/VueUseExample.vue`
- `apps/web-app/types/auto-imports.d.ts` (自动生成)

**在线文档**: https://vueuse.org/
