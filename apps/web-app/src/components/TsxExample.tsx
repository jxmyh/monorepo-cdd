/** @jsxImportSource vue */
import { computed, defineComponent, ref } from 'vue'

// TypeScript 接口定义
interface TodoItem {
  id: number
  text: string
  completed: boolean
}

/**
 * TSX 示例组件
 * 展示如何在 Vue 3 中使用 TSX 语法和 TypeScript 类型
 */
export default defineComponent({
  name: 'TsxExample',

  setup() {
    const newTodo = ref('')
    const todos = ref<TodoItem[]>([
      { id: 1, text: '学习 Vue 3', completed: true },
      { id: 2, text: '学习 TSX', completed: false },
      { id: 3, text: '构建项目', completed: false },
    ])
    const style = 'a:{color:red}'
    // 计算属性
    const completedCount = computed(() => {
      return todos.value.filter(todo => todo.completed).length
    })

    const totalCount = computed(() => todos.value.length)

    const progress = computed(() => {
      if (totalCount.value === 0) {
        return 0
      }
      return Math.round((completedCount.value / totalCount.value) * 100)
    })

    // 添加待办事项
    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          id: Date.now(),
          text: newTodo.value.trim(),
          completed: false,
        })
        newTodo.value = ''
      }
    }

    // 切换完成状态
    const toggleTodo = (id: number) => {
      const todo = todos.value.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }

    // 删除待办事项
    const deleteTodo = (id: number) => {
      const index = todos.value.findIndex(t => t.id === id)
      if (index > -1) {
        todos.value.splice(index, 1)
      }
    }

    // 处理键盘事件
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        addTodo()
      }
    }

    // TSX 渲染函数
    return () => (
      <div class="tsx-example" style={style}>
        <h2 class="text-2xl font-bold mb-4 text-purple-600">TSX 示例组件</h2>

        <div class="bg-white rounded-lg shadow-md p-6 mb-4">
          {/* 输入框 */}
          <div class="flex gap-2 mb-4">
            <input
              value={newTodo.value}
              onKeydown={handleKeydown}
              onInput={(e: Event) => (newTodo.value = (e.target as HTMLInputElement).value)}
              type="text"
              placeholder="添加新的待办事项..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addTodo}
              class="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            >
              添加
            </button>
          </div>

          {/* 进度条 */}
          <div class="mb-4">
            <div class="flex justify-between text-sm text-gray-600 mb-1">
              <span>
                进度:
                {progress.value}%
              </span>
              <span>
                {completedCount.value}/{totalCount.value}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${progress.value}%` }}
              />
            </div>
          </div>

          {/* 待办列表 */}
          <ul class="space-y-2">
            {todos.value.map(todo => (
              <li
                key={todo.id}
                class={`flex items-center gap-3 p-3 rounded transition ${
                  todo.completed ? 'bg-green-50' : 'bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  class="w-5 h-5 cursor-pointer"
                />

                <span
                  class={`flex-1 ${
                    todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  class="px-3 py-1 text-red-500 hover:bg-red-50 rounded transition"
                >
                  删除
                </button>
              </li>
            ))}
          </ul>

          {/* 空状态 */}
          {todos.value.length === 0 && (
            <div class="text-center py-8 text-gray-500">
              <p>暂无待办事项</p>
              <p class="text-sm mt-2">添加一些任务开始吧！</p>
            </div>
          )}
        </div>

        <div class="bg-gray-50 rounded p-4 text-sm">
          <h3 class="font-semibold mb-2">TSX 特性：</h3>
          <ul class="list-disc list-inside space-y-1 text-gray-700">
            <li>TypeScript 类型支持</li><li>接口定义和类型检查</li>
            <li>泛型使用（如 ref&lt;TodoItem[]&gt;）</li>
            <li>完整的 IDE 智能提示</li>
            <li>编译时类型错误检测</li>
          </ul>
        </div>
      </div>
    )
  },
})
