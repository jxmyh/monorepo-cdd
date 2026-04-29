# Monorepo 开发指南

## 直接引用源码（无需打包）

本项目配置为在开发时直接引用 workspace 包的源代码，无需先执行 build。

### 配置说明

#### 1. Package.json 配置

每个 workspace 包（如 `@monorepo/utils`、`@monorepo/ui`）的 `package.json` 都指向源文件：

```json
{
  "main": "./src/index.ts",
  "module": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./src/index.ts",
      "require": "./src/index.ts"
    }
  }
}
```

这样在其他包中引用时，会直接加载 TypeScript 源文件。

#### 2. Vite 配置

共享的 `@monorepo/vite-config` 包自动配置了以下优化：

- **optimizeDeps.include**: 预构建 `@monorepo/*` 包
- **ssr.noExternal**: SSR 模式下也不外部化这些包

这确保了 Vite 能够正确处理 TypeScript 源文件。

### 使用示例

在 `apps/web-app` 中可以直接导入：

```typescript
import { useCounter } from '@monorepo/utils'
import { Button } from '@monorepo/ui'
```

**无需先执行 `pnpm build`**，修改 `packages/utils` 或 `packages/ui` 的源代码后，Web 应用会自动热更新。

### 工作流程

```mermaid
graph LR
    A[修改 packages/utils 源码] --> B[Vite 检测到变化]
    B --> C[自动重新编译]
    C --> D[HMR 热更新]
    D --> E[浏览器自动刷新]
```

### 生产构建

虽然开发时不需要打包，但在发布到生产环境前，仍然需要构建所有包：

```bash
# 构建所有包
pnpm build

# 或者单独构建某个包
cd packages/utils && pnpm build
```

生产构建会生成优化的 JavaScript 文件和类型声明文件。

### 优势

✅ **开发体验更好**：修改代码后立即生效，无需手动构建  
✅ **调试更方便**：可以直接调试 TypeScript 源码  
✅ **工作流更简单**：减少构建步骤，提高开发效率  
✅ **类型安全**：完整的 TypeScript 类型支持  

### 注意事项

⚠️ 确保在 `apps/*/vite.config.ts` 中使用 `createViteConfig()` 创建配置  
⚠️ 如果需要自定义 optimizeDeps，可以在 custom 配置中添加  
⚠️ 发布到 npm 前需要执行 build 生成 dist 文件  

### 自定义配置示例

如果需要在 web-app 中添加额外的优化依赖：

```typescript
import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  custom: {
    optimizeDeps: {
      include: [
        'some-other-package', // 添加其他需要预构建的包
      ],
    },
  },
})
```
