# 快速开始 - 添加新 Hook

## 🎯 零配置添加 Hook

现在添加新的 Hook **超级简单**，只需要 3 个文件！

### 步骤 1：创建目录结构

```bash
mkdir src/useMyHook
touch src/useMyHook/index.ts    # Hook 实现
touch src/useMyHook/index.md    # Hook 文档
touch src/useMyHook/index.test.ts  # 单元测试 ⭐
```

### 步骤 2：编写代码

`src/useMyHook/index.ts`:

```typescript
import { ref, type Ref } from "vue";

export interface UseMyHookReturn {
  value: Ref<string>;
  update: (newValue: string) => void;
}

export function useMyHook(initialValue = ""): UseMyHookReturn {
  const value = ref(initialValue);

  const update = (newValue: string) => {
    value.value = newValue;
  };

  return { value, update };
}
```

### 步骤 3：编写文档

`src/useMyHook/index.md`:

```markdown
# useMyHook

简短描述。

## 用法

\`\`\`vue

<script setup>
import { useMyHook } from '@monorepo/vue-hooks'
const { value, update } = useMyHook()
</script>

\`\`\`

## API

...
```

### 完成！✅

**不需要做任何其他事情！**

- ❌ 不需要修改 `src/index.ts`
- ❌ 不需要手动导出
- ❌ 不需要配置 VitePress

运行以下命令即可：

```bash
# 构建（自动生成导出）
pnpm build

# 或启动文档（自动同步 + 生成导出）
pnpm docs:dev
```

## 🤖 自动化流程

```
创建 src/useMyHook/
  ├── index.ts    ← 你编写
  └── index.md    ← 你编写
       ↓
运行 pnpm build 或 pnpm docs:dev
       ↓
自动生成 src/index.ts:
  export { useMyHook } from './useMyHook'
  export type * from './useMyHook'
       ↓
自动同步到 docs/api/useMyHook/index.md
       ↓
自动更新 VitePress 侧边栏
       ↓
完成！✨
```

## 📋 检查清单

添加新 Hook 时，确保：

- [ ] 创建了 `src/useXxx/` 目录（必须以 `use` 开头）
- [ ] 添加了 `index.ts`（Hook 实现）
- [ ] 添加了 `index.md`（Hook 文档）
- [ ] 导出了类型定义（在 index.ts 中）
- [ ] 运行了 `pnpm build` 或 `pnpm docs:dev`

## 🔍 验证

```bash
# 1. 查看生成的导出
cat src/index.ts

# 2. 构建测试
pnpm build

# 3. 查看文档
pnpm docs:dev
```

## 💡 提示

- Hook 目录名必须以 `use` 开头（PascalCase）
- 每个 Hook 必须有 `index.ts` 和 `index.md`
- 导出是自动的，不要手动编辑 `src/index.ts`
- 如果需要重新生成，运行 `pnpm generate`

## 🎉 示例

看看现有的 Hook：

- [useCounter](../src/useCounter/) - 计数器
- [useToggle](../src/useToggle/) - 布尔切换

复制它们的结构，快速创建你的 Hook！
