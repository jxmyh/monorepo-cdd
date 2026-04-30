<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-blue-600">首页</h1>

      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4">欢迎使用多页面应用</h2>
        <p class="text-gray-600 mb-4">
          这是一个使用 vite-plugin-virtual-mpa 构建的多页面应用示例。
        </p>

        <div class="flex gap-4 mb-4">
          <button
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            @click="count++"
          >
            计数: {{ count }}
          </button>

          <a
            href="/about.html"
            class="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition inline-block"
          >
            前往关于页面
          </a>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold mb-2">✨ 特性</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>多页面独立入口</li>
            <li>代码分割优化</li>
            <li>共享依赖缓存</li>
            <li>独立的路由系统</li>
          </ul>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold mb-2">📦 技术栈</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Vue 3 + TypeScript</li>
            <li>Vite 构建工具</li>
            <li>UnoCSS 原子化 CSS</li>
            <li>Vant UI 组件库</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面特定样式 */
</style>
