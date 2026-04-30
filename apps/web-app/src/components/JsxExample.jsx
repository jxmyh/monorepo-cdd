import { defineComponent, ref } from 'vue'

/**
 * JSX 示例组件
 * 展示如何在 Vue 3 中使用 JSX 语法
 */
export default defineComponent({
  name: 'JsxExample',

  setup() {
    const count = ref(0)
    const message = ref('Hello from JSX!')

    const increment = () => {
      count.value++
    }

    const decrement = () => {
      count.value--
    }

    // JSX 渲染函数
    return () => (
      <div class="jsx-example">
        <h2 class="text-2xl font-bold mb-4 text-blue-600">JSX 示例组件</h2>

        <div class="bg-white rounded-lg shadow-md p-6 mb-4">
          <p class="text-lg mb-4">{message.value}</p>

          <div class="flex items-center gap-4 mb-4">
            <button
              onClick={decrement}
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              -
            </button>

            <span class="text-3xl font-bold text-gray-800">{count.value}</span>

            <button
              onClick={increment}
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              +
            </button>
          </div>

          <div class="text-sm text-gray-600">
            <p>
              当前计数:
              {count.value}
            </p>
            <p>
              状态:
              {count.value > 0 ? '正数' : count.value < 0 ? '负数' : '零'}
            </p>
          </div>
        </div>

        <div class="bg-gray-50 rounded p-4 text-sm">
          <h3 class="font-semibold mb-2">JSX 特性：</h3>
          <ul class="list-disc list-inside space-y-1 text-gray-700">
            <li>
              使用 JavaScript 表达式:
              {'{count.value}'}
            </li>
            <li>
              条件渲染:
              {'{condition ? true : false}'}
            </li>
            <li>事件处理: onClick, onChange 等</li>
            <li>类名绑定: class="..."</li>
            <li>支持所有 Vue 指令的等价写法</li>
          </ul>
        </div>
      </div>
    )
  },
})
