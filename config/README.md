# @monorepo/config

Monorepo 共享配置包集合，包含 Vite、TypeScript 和 ESLint 配置。

## 📦 包含的配置包

### 1. [@monorepo/vite-config](./vite-config/)

共享 Vite 配置，支持应用模式和库模式。

**特性：**

- ✅ 自动配置 Vue 3 支持
- ✅ 支持库模式构建（带 DTS）
- ✅ 自动优化 workspace 包
- ✅ 可自定义扩展

**使用示例：**

```typescript
import { createViteConfig } from "@monorepo/vite-config";

export default createViteConfig({
  lib: false, // true for library mode
  custom: {
    // 自定义配置
  },
});
```

### 2. [@monorepo/tsconfig](./tsconfig/)

共享 TypeScript 配置，提供多种预设。

**可用配置：**

- `base.json` - 基础配置
- `vue-app.json` - Vue 应用配置
- `vue-library.json` - Vue 库配置
- `node-library.json` - Node.js 库配置

**使用示例：**

```json
{
  "extends": "@monorepo/tsconfig/vue-app.json"
}
```

### 3. [@monorepo/eslint-config](./eslint-config/)

共享 ESLint 配置，基于 @antfu/eslint-config v3。

**特性：**

- ✅ 支持 Vue 3 和 TypeScript
- ✅ Flat Config 格式（ESLint v9）
- ✅ 可自定义规则和忽略文件
- ✅ 保存时自动修复

**使用示例：**

```javascript
import createConfig from "@monorepo/eslint-config";

export default createConfig({
  vue: true,
  typescript: true,
  rules: {
    // 自定义规则
  },
});
```

## 🚀 快速开始

### 安装依赖

在根目录运行：

```bash
pnpm install
```

### 使用配置

在各个项目中继承这些配置：

**Vite:**

```typescript
// vite.config.ts
import { createViteConfig } from "@monorepo/vite-config";

export default createViteConfig({
  /* options */
});
```

**TypeScript:**

```json
// tsconfig.json
{
  "extends": "@monorepo/tsconfig/vue-app.json"
}
```

**ESLint:**

```javascript
// eslint.config.js
import createConfig from "@monorepo/eslint-config";

export default createConfig({
  /* options */
});
```

## 📁 目录结构

```
config/                  # 一级目录
├── vite-config/       # Vite 配置包
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── README.md
├── tsconfig/          # TypeScript 配置包
│   ├── base.json
│   ├── vue-app.json
│   ├── vue-library.json
│   ├── node-library.json
│   ├── package.json
│   └── README.md
└── eslint-config/     # ESLint 配置包
    ├── index.js
    ├── package.json
    └── README.md
```

## 💡 设计理念

### 1. 函数式配置

所有配置包都采用函数导出模式，允许各项目自定义配置：

```typescript
// 而不是固定的配置对象
export default function createConfig(options) {
  return mergeConfigs(baseConfig, options.custom);
}
```

### 2. 零配置起步

提供合理的默认值，新项目可以直接使用：

```typescript
// 最小配置即可工作
export default createViteConfig();
```

### 3. 灵活扩展

通过 `custom` 选项覆盖任何配置：

```typescript
export default createViteConfig({
  custom: {
    server: { port: 3000 },
    plugins: [myPlugin()],
  },
});
```

## 🎯 优势

✅ **统一管理** - 所有配置集中在一个地方  
✅ **易于维护** - 修改一处，所有项目生效  
✅ **类型安全** - 完整的 TypeScript 支持  
✅ **文档完善** - 每个包都有详细文档  
✅ **最佳实践** - 经过验证的配置方案

## 📚 相关文档

- [Vite Config README](./vite-config/README.md)
- [TSConfig README](./tsconfig/README.md)
- [ESLint Config README](./eslint-config/README.md)

## 🔄 更新配置

当需要更新共享配置时：

1. 修改 `config/*/` 下的配置文件
2. 在各项目中重新安装依赖：`pnpm install`
3. 测试各个项目是否正常工作

## ✨ 示例项目

查看使用这些配置的项目：

- **Web App**: `apps/web-app/`
- **UI Library**: `packages/ui/`
- **Utils Library**: `packages/utils/`
- **Vue Hooks**: `packages/vue-hooks/`
- **CLI Tool**: `cli/`
