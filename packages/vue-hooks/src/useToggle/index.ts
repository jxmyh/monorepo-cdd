import { ref, type Ref } from 'vue'

/**
 * useToggle 返回值
 */
export interface UseToggleReturn {
  /** 当前布尔值 */
  value: Ref<boolean>
  /** 切换值 */
  toggle: () => void
  /** 设置为 true */
  setTrue: () => void
  /** 设置为 false */
  setFalse: () => void
}

/**
 * 布尔值切换 Hook
 *
 * @param initialValue - 初始值，默认为 false
 * @returns 切换相关的方法和状态
 *
 * @example
 * ```ts
 * // 基础用法
 * const { value, toggle } = useToggle()
 *
 * // 自定义初始值
 * const { value, toggle, setTrue, setFalse } = useToggle(true)
 * ```
 */
export function useToggle(initialValue = false): UseToggleReturn {
  const value = ref(initialValue)

  /**
   * 切换布尔值
   */
  const toggle = () => {
    value.value = !value.value
  }

  /**
   * 设置为 true
   */
  const setTrue = () => {
    value.value = true
  }

  /**
   * 设置为 false
   */
  const setFalse = () => {
    value.value = false
  }

  return {
    value,
    toggle,
    setTrue,
    setFalse,
  }
}
