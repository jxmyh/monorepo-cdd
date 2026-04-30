/** @jsxImportSource vue */
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TestFormat',
  setup() {
    const count = ref(0)
    const style = 'color:red;font-size:12px'

    return () => (
      <div class="test">
        <h1>标题</h1>
        <p style={style}>段落</p>
        <button onClick={() => count.value++}>计数:{count.value}</button>
      </div>
    )
  },
})
