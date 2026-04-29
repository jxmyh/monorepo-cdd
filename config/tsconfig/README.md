# @monorepo/tsconfig

共享的 TypeScript 配置包，用于 monorepo 项目中的所有子项目。

## 安装

在需要使用的项目中添加依赖：

```bash
pnpm add -D @monorepo/tsconfig
```

## 可用的配置

### 1. base.json

基础 TypeScript 配置，包含通用的编译器选项。

**适用场景**：所有 TypeScript 项目的基础配置

**使用方式**：
```json
{
  "extends": "@monorepo/tsconfig/base.json"
}
```

### 2. vue-library.json

Vue 库配置，适用于 Vue 组件库和工具库。

**特性**：
- 支持 `.ts` 和 `.vue` 文件
- 包含 DOM 类型定义
- 启用 JSX 支持（用于 Vue SFC）

**适用场景**：`packages/ui`, `packages/utils` 等 Vue 相关的库

**使用方式**：
```json
{
  "extends": "@monorepo/tsconfig/vue-library.json"
}
```

### 3. vue-app.json

Vue 应用配置，适用于 Vue 3 应用程序。

**特性**：
- 支持 `.ts`, `.tsx` 和 `.vue` 文件
- 包含完整的 DOM 类型定义
- 启用严格的未使用变量检查
- 启用 `useDefineForClassFields`

**适用场景**：`apps/web-app` 等 Vue 应用

**使用方式**：
```json
{
  "extends": "@monorepo/tsconfig/vue-app.json"
}
```

### 4. node-library.json

Node.js 库配置，适用于 Node.js 项目。

**特性**：
- 使用 CommonJS 模块系统
- 配置输出目录 (`dist`)
- 配置源目录 (`src`)
- 生成声明文件和源映射

**适用场景**：`cli` 等 Node.js 工具

**使用方式**：
```json
{
  "extends": "@monorepo/tsconfig/node-library.json"
}
```

## 自定义配置

如果需要添加或覆盖某些配置选项，可以在项目中添加 `compilerOptions`：

```json
{
  "extends": "@monorepo/tsconfig/vue-library.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 示例项目

### packages/utils

```json
{
  "extends": "@monorepo/tsconfig/vue-library.json",
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

### packages/ui

```json
{
  "extends": "@monorepo/tsconfig/vue-library.json",
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

### apps/web-app

```json
{
  "extends": "@monorepo/tsconfig/vue-app.json",
  "compilerOptions": {
    "baseUrl": "."
  },
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### cli

```json
{
  "extends": "@monorepo/tsconfig/node-library.json",
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

## 优势

✅ **统一配置**：所有项目使用相同的 TypeScript 配置标准  
✅ **易于维护**：修改一处，所有项目自动更新  
✅ **减少重复**：避免在每个项目中重复相同的配置  
✅ **类型安全**：完整的 TypeScript 类型支持和检查  
✅ **灵活扩展**：支持在项目中添加自定义配置  

## 注意事项

⚠️ 确保在每个项目的 `package.json` 中添加 `@monorepo/tsconfig` 依赖  
⚠️ 如果需要特殊的编译器选项，可以在项目中通过 `compilerOptions` 覆盖  
⚠️ 对于需要特殊配置的项目，可以创建新的配置文件并导出  
