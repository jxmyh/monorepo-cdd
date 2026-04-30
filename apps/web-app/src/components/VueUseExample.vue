<script setup lang="ts">
// ✅ VueUse 自动引入 - 无需手动 import
// useMouse, useDark, useLocalStorage 等都可以直接使用
// 注意: 如果自动导入不生效,可以手动导入
import { useDraggable } from '@vueuse/core'

const { x: mx, y: my } = useMouse()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const message = useLocalStorage('message', 'Hello VueUse!')
const el = useTemplateRef<HTMLElement>('el')
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
</script>

<template>
  <div ref="el" :style="style" style="position: fixed">Drag me! I am at {{ x }}, {{ y }}</div>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">VueUse 自动引入示例</h2>

    <div class="space-y-4">
      <!-- 鼠标位置 -->
      <div class="card">
        <h3 class="text-lg font-semibold mb-2">鼠标位置</h3>
        <p>X: {{ mx }}, Y: {{ my }}</p>
      </div>

      <!-- 暗黑模式 -->
      <div class="card">
        <h3 class="text-lg font-semibold mb-2">暗黑模式</h3>
        <p>当前模式: {{ isDark ? '🌙 暗黑' : '☀️ 明亮' }}</p>
        <button class="btn-primary mt-2" @click="toggleDark()">切换模式</button>
      </div>

      <!-- 本地存储 -->
      <div class="card">
        <h3 class="text-lg font-semibold mb-2">本地存储</h3>
        <input v-model="message" type="text" class="border p-2 rounded w-full" />
        <p class="mt-2 text-sm text-gray-600">消息已保存到 localStorage，刷新页面后仍然保留</p>
      </div>
    </div>

    <div class="mt-6 p-4 bg-blue-50 rounded">
      <h3 class="font-semibold mb-2">✅ 自动引入的 VueUse API</h3>
      <ul class="list-disc list-inside space-y-1 text-sm">
        <li>useMouse - 追踪鼠标位置</li>
        <li>useDark - 暗黑模式检测</li>
        <li>useToggle - 布尔值切换</li>
        <li>useLocalStorage - 本地存储</li>
        <li>useWindowSize - 窗口尺寸</li>
        <li>useDebounceFn - 防抖函数</li>
        <li>... 以及 200+ 其他 composables</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow p-4;
}

.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition;
}
</style>
