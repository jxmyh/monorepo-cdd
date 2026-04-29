import { ref } from 'vue'

export interface UseCounterOptions {
  initialValue?: number
  min?: number
  max?: number
}

export function useCounter(options: UseCounterOptions = {}) {
  const { initialValue = 0, min = -Infinity, max = Infinity } = options
  const count = ref(initialValue)

  const increment = () => {
    if (count.value < max) {
      count.value++
    }
  }

  const decrement = () => {
    if (count.value > min) {
      count.value--
    }
  }

  const reset = () => {
    count.value = initialValue
  }

  return {
    count,
    increment,
    decrement,
    reset,
  }
}
