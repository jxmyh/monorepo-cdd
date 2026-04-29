import { ref, computed, type Ref } from "vue";

/**
 * useCounter 配置选项
 */
export interface UseCounterOptions {
  /** 初始值，默认为 0 */
  initialValue?: number;
  /** 最小值，默认为 -Infinity */
  min?: number;
  /** 最大值，默认为 Infinity */
  max?: number;
  /** 步长，默认为 1 */
  step?: number;
}

/**
 * useCounter 返回值
 */
export interface UseCounterReturn {
  /** 当前计数值 */
  count: Ref<number>;
  /** 增加计数 */
  increment: () => void;
  /** 减少计数 */
  decrement: () => void;
  /** 重置为初始值 */
  reset: () => void;
  /** 设置为指定值 */
  set: (value: number) => void;
  /** 是否达到最小值 */
  isMin: Ref<boolean>;
  /** 是否达到最大值 */
  isMax: Ref<boolean>;
}

/**
 * 计数器 Hook
 *
 * @param options - 配置选项
 * @returns 计数器相关的方法和状态
 *
 * @example
 * ```ts
 * // 基础用法
 * const { count, increment, decrement } = useCounter()
 *
 * // 自定义配置
 * const { count, increment, decrement, reset } = useCounter({
 *   initialValue: 10,
 *   min: 0,
 *   max: 100,
 *   step: 5
 * })
 * ```
 */
export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const {
    initialValue = 0,
    min = -Infinity,
    max = Infinity,
    step = 1,
  } = options;

  // 验证配置
  if (min > max) {
    console.warn("[useCounter] min should not be greater than max");
  }

  // 确保初始值在范围内
  const clampedInitial = Math.min(Math.max(initialValue, min), max);
  const count = ref(clampedInitial);

  /**
   * 增加计数
   * 如果达到最大值则不再增加
   */
  const increment = () => {
    count.value = Math.min(count.value + step, max);
  };

  /**
   * 减少计数
   * 如果达到最小值则不再减少
   */
  const decrement = () => {
    count.value = Math.max(count.value - step, min);
  };

  /**
   * 重置为初始值
   */
  const reset = () => {
    count.value = clampedInitial;
  };

  /**
   * 设置为指定值（会在 min 和 max 之间限制）
   * @param value - 要设置的值
   */
  const set = (value: number) => {
    count.value = Math.min(Math.max(value, min), max);
  };

  /**
   * 是否达到最小值
   */
  const isMin = computed(() => count.value <= min);

  /**
   * 是否达到最大值
   */
  const isMax = computed(() => count.value >= max);

  return {
    count,
    increment,
    decrement,
    reset,
    set,
    isMin,
    isMax,
  };
}
