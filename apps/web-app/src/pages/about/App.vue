<script setup lang="ts">
const { x, y } = useMouse()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-green-600">
        关于页面
      </h1>

      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4">
          项目信息
        </h2>
        <p class="text-gray-600 mb-4">
          这是一个多页面应用（MPA）示例，每个页面都有独立的入口和构建配置。
        </p>

        <div class="mb-4">
          <a
            href="/home.html"
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition inline-block"
          >
            返回首页
          </a>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold mb-2">
            🎯 MPA 优势
          </h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>页面独立加载，首屏更快</li>
            <li>更好的 SEO 支持</li>
            <li>天然的服务端渲染友好</li>
            <li>降低 JavaScript 包体积</li>
          </ul>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold mb-2">
            🔧 技术特性
          </h3>
          <div class="space-y-2 text-gray-700">
            <p>鼠标位置: X={{ x }}, Y={{ y }}</p>
            <p>使用 VueUse 自动引入功能</p>
            <p>支持 TypeScript 类型检查</p>
          </div>
        </div>
      </div>

      <div class="mt-6 bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-semibold mb-4">
          📚 页面列表
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <a href="/home.html" class="p-4 border rounded hover:bg-blue-50 transition">
            <div class="font-semibold">首页</div>
            <div class="text-sm text-gray-600">home.html</div>
          </a>
          <a href="/about.html" class="p-4 border rounded bg-green-50 border-green-500">
            <div class="font-semibold">关于</div>
            <div class="text-sm text-gray-600">about.html</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面特定样式 */
</style>
