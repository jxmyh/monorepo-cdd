<script setup lang="ts">
import { Card } from '@monorepo/ui'
import { useCounter, useToggle } from '@monorepo/vue-hooks'

// 传入自定义配置：初始值10，最小值0，最大值100
const { count, increment, decrement, reset, isMin, isMax } = useCounter({
  initialValue: 10,
  min: 0,
  max: 100,
  step: 1,
})
const { value: booleanValue, toggle: booleanValueToggle } = useToggle()
// console.log('booleanValue')
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-blue-600">Vue 3 + JSX/TSX 示例</h1>

      <!-- 原有示例 -->
      <div class="mb-8">
        <van-button type="primary" block color="red" plain icon="plus" round>
          Primary Button
        </van-button>
        <Card title="计数器示例" :content="`当前值: ${count}`" />
        <p class="text-blue text-20 font-bold">Count: {{ count }}</p>
        <p>Min Reached: {{ isMin }}</p>
        <p>Max Reached: {{ isMax }}</p>
        <button :disabled="isMax" @click="increment">Increment</button>
        <button :disabled="isMin" @click="decrement">Decrement</button>
        <button @click="reset">Reset</button>
      </div>

      <div class="mb-8">
        <p>Value: {{ booleanValue }}</p>
        <button @click="booleanValueToggle">Toggle</button>
      </div>

      <!-- JSX 和 TSX 示例 -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <JsxExample />
        <TsxExample />
      </div>

      <!-- VueUse 自动引入示例 -->
      <VueUseExample />
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #42b983;
}
</style>
