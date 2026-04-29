<script setup lang="ts">
interface Props {
  title?: string
  content?: string
}

defineProps<Props>()
</script>

<template>
  <div class="card">
    <div v-if="title" class="card-header">
      <h3>{{ title }}</h3>
    </div>
    <div v-if="content" class="card-body">
      {{ content }}
    </div>
    <div v-else class="card-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
}

.card-body {
  padding: 16px;
}
</style>
