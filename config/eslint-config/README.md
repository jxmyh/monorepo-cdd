# @monorepo/eslint-config

共享的 ESLint 配置包，基于 `@antfu/eslint-config` v3，用于 monorepo 项目中的所有子项目。

## 特性

- ✅ 基于 [@antfu/eslint-config](https://github.com/antfu/eslint-config) v3
- ✅ 支持 ESLint v9 Flat Config
- ✅ 自动配置 Vue 3 和 TypeScript
- ✅ 统一的代码风格规范
- ✅ 支持自定义配置扩展

## 安装

在需要使用的项目中添加依赖：

```bash
pnpm add -D @monorepo/eslint-config eslint
```

## 使用方法

### 1. 基础配置

在项目根目录创建 `eslint.config.js`：

```javascript
import createConfig from '@monorepo/eslint-config'

export default createConfig()
```

### 2. 自定义配置

```javascript
import createConfig from '@monorepo/eslint-config'

export default createConfig({
  // 是否启用 Vue 支持（默认: true）
  vue: true,
  
  // 是否启用 TypeScript 支持（默认: true）
  typescript: true,
  
  // 添加忽略的文件或目录
  ignores: [
    '**/generated/**',
    '**/*.test.ts',
  ],
  
  // 自定义 ESLint 规则
  rules: {
    'no-console': 'warn',
    'semi': ['error', 'never'],
  },
  
  // 自定义设置
  settings: {
    // ...
  },
})
```

### 3. 纯 JavaScript 项目

如果不使用 Vue 或 TypeScript：

```javascript
import createConfig from '@monorepo/eslint-config'

export default createConfig({
  vue: false,
  typescript: false,
})
```

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `vue` | boolean | `true` | 是否启用 Vue 3 支持 |
| `typescript` | boolean | `true` | 是否启用 TypeScript 支持 |
| `ignores` | string[] | `[]` | 额外忽略的文件模式 |
| `rules` | object | `{}` | 自定义 ESLint 规则 |
| `settings` | object | `{}` | 自定义设置 |

## 示例项目

### packages/ui

```javascript
import createConfig from '@monorepo/eslint-config'

export default createConfig({
  vue: true,
  typescript: true,
  rules: {
    // UI 库特定的规则
    'vue/multi-word-component-names': 'off',
  },
})
```

### packages/utils

```javascript
import createConfig from '@monorepo/eslint-config'

export default createConfig({
  vue: false,
  typescript: true,
})
```

### apps/web-app

```javascript
import createConfig from '@monorepo/eslint-config'

export default createConfig({
  vue: true,
  typescript: true,
  ignores: [
    '**/dist/**',
    '**/.vitepress/**',
  ],
})
```

### cli

```javascript
import createConfig from '@monorepo/eslint-config'

export default createConfig({
  vue: false,
  typescript: true,
  rules: {
    'no-console': 'off', // CLI 工具允许 console
  },
})
```

## 运行 Lint

在项目中添加 scripts：

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

然后运行：

```bash
pnpm lint      # 检查代码
pnpm lint:fix  # 自动修复问题
```

## 优势

✅ **统一标准**：所有项目使用相同的 ESLint 配置  
✅ **易于维护**：修改一处，所有项目自动更新  
✅ **最新技术**：使用 ESLint v9 和最新的 @antfu/eslint-config  
✅ **灵活扩展**：支持在项目中添加自定义规则和配置  
✅ **零配置启动**：开箱即用，无需复杂配置  

## 注意事项

⚠️ 确保使用 ESLint v9 或更高版本  
⚠️ 每个项目都需要创建 `eslint.config.js` 文件  
⚠️ 如果需要特殊的规则，可以在项目中通过 `rules` 选项覆盖  
⚠️ IDE 可能需要重启以识别新的 Flat Config 格式  

## 迁移指南

如果从旧版 ESLint 配置迁移：

1. 删除 `.eslintrc.*` 文件
2. 创建 `eslint.config.js`
3. 使用 `createConfig()` 函数
4. 更新 IDE 设置以支持 Flat Config

更多信息请参考 [@antfu/eslint-config 文档](https://github.com/antfu/eslint-config)。
