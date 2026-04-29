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
  <div class="c-cyan p-3">
    <van-button type="primary" block color="red" plain icon="plus" round>
      Primary Button
    </van-button>
    <Card title="计数器示例" :content="`当前值: ${count}`" />
    <h1 class="text-3xl font-bold underline">
      Welcome to Monorepo Web App
    </h1>
    <p class="text-blue text-20 font-bold">
      Count: {{ count }}
    </p>
    <p>Min Reached: {{ isMin }}</p>
    <p>Max Reached: {{ isMax }}</p>
    <button :disabled="isMax" @click="increment">
      Increment
    </button>
    <button :disabled="isMin" @click="decrement">
      Decrement
    </button>
    <button @click="reset">
      Reset
    </button>
  </div>
  <div>
    <p>Value: {{ booleanValue }}</p>
    <button @click="booleanValueToggle">
      Toggle
    </button>
  </div>
</template>

<style scoped>
h1 {
  color: #42b983;
}
</style>
