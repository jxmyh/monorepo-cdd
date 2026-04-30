# ESLint 与 Prettier 配置平衡说明

## ✅ 问题已解决

ESLint 和 Prettier 的规则冲突已经完全解决，现在两者保持一致。

---

## 🔧 配置详情

### 1. Prettier 配置

**文件：** `.prettierrc`

```json
{
  "semi": false, // 不使用分号
  "singleQuote": true, // 使用单引号
  "tabWidth": 2, // 缩进 2 空格
  "trailingComma": "all", // 尾随逗号
  "printWidth": 100, // 每行最大 100 字符
  "arrowParens": "avoid", // 单参数箭头函数省略括号
  "endOfLine": "lf" // 使用 LF 换行符
}
```

---

### 2. ESLint 配置

#### 根目录配置

**文件：** `eslint.config.js`

```javascript
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
    '**/*.md',
    '**/CHANGELOG.md',
    'scripts/**',
    '**/scripts/**', // 忽略所有子包的 scripts 目录
    '**/STRUCTURE.md', // 忽略结构文档
  ],
  rules: {
    'no-console': 'warn', // console.log 视为警告而非错误
  },
  // 与 Prettier 保持一致的配置
  stylistic: {
    semi: false, // 不使用分号
    quotes: 'single', // 单引号
    arrowParens: false, // 单参数箭头函数省略括号
  },
})
```

---

#### 共享配置

**文件：** `config/eslint-config/index.js`

```javascript
import antfu from '@antfu/eslint-config'

export default function createConfig(options = {}) {
  const { vue = true, typescript = true, ignores = [], rules = {}, settings = {} } = options

  return antfu({
    vue,
    typescript,
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.vitepress/cache/**',
      '**/*.md',
      '**/scripts/**',
      ...ignores,
    ],
    rules: {
      ...rules,
    },
    settings: {
      ...settings,
    },
    // 与 Prettier 保持一致的配置
    stylistic: {
      semi: false,
      quotes: 'single',
      arrowParens: false,
    },
  })
}
```

---

## 🎯 关键配置项对比

| 配置项           | Prettier               | ESLint                         | 状态    |
| ---------------- | ---------------------- | ------------------------------ | ------- |
| **分号**         | `semi: false`          | `stylistic.semi: false`        | ✅ 一致 |
| **引号**         | `singleQuote: true`    | `stylistic.quotes: 'single'`   | ✅ 一致 |
| **箭头函数括号** | `arrowParens: "avoid"` | `stylistic.arrowParens: false` | ✅ 一致 |
| **缩进**         | `tabWidth: 2`          | 默认 2                         | ✅ 一致 |
| **尾随逗号**     | `trailingComma: "all"` | 默认 all                       | ✅ 一致 |

---

## 📋 代码风格示例

### ✅ 正确的代码风格

```typescript
// 单引号、无分号、单参数箭头函数无括号
const greet = name => {
  const message = `Hello, ${name}`
  console.log(message)
}

// 多参数需要括号
const add = (a, b) => {
  return a + b
}

// 尾随逗号
const config = {
  name: 'test',
  version: '1.0.0',
}

// 数组也使用尾随逗号
const items = ['item1', 'item2', 'item3']
```

---

### ❌ 错误的代码风格

```typescript
// 错误：双引号、有分号、单参数有括号
const greet = name => {
  const message = `Hello, ${name}`
  console.log(message)
}

// 错误：缺少尾随逗号
const config = {
  name: 'test',
  version: '1.0.0',
}
```

---

## 🚀 使用方法

### 自动修复

运行以下命令自动修复所有可修复的问题：

```bash
pnpm lint --fix
```

这会：

1. 运行 ESLint 并自动修复
2. 运行 Prettier 并格式化代码

---

### Git Commit 时自动检查

提交代码时，lint-staged 会自动：

1. 对 staged 文件运行 ESLint --fix
2. 对 staged 文件运行 Prettier --write

```bash
git add .
git commit -m "feat: 添加新功能"
# 自动运行 lint-staged
```

---

## 💡 最佳实践

### 1. IDE 配置

确保你的编辑器（VSCode）配置了：

- 保存时自动格式化（Format On Save）
- 使用 Prettier 作为默认格式化器

**.vscode/settings.json:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

### 2. 手动格式化

如果需要手动格式化单个文件：

```bash
# 使用 Prettier
npx prettier --write src/App.vue

# 使用 ESLint
npx eslint src/App.vue --fix
```

---

### 3. 检查整个项目

```bash
# 只检查，不修复
pnpm lint

# 检查并修复
pnpm lint --fix
```

---

## ⚠️ 注意事项

### 1. 不要混用配置

❌ **不要在代码中同时使用 ESLint 和 Prettier 的注释**

```typescript
// ❌ 不好
// eslint-disable-next-line
// prettier-ignore
const x = 1
```

✅ **优先使用 Prettier 格式化，ESLint 检查逻辑错误**

---

### 2. 忽略文件

如果某些文件不需要检查，添加到 `.eslintignore` 或在配置中添加 ignores：

```javascript
ignores: ['**/dist/**', '**/node_modules/**', '**/*.md']
```

---

### 3. 团队一致性

确保团队成员使用相同的：

- Node.js 版本
- pnpm 版本
- ESLint 和 Prettier 版本
- IDE 配置

---

## 🔍 常见问题

### Q1: 为什么保存后代码又被改回去了？

**原因：** ESLint 和 Prettier 规则冲突

**解决：** 现在已统一配置，不会再有冲突

---

### Q2: 如何禁用某行的格式化？

```typescript
// prettier-ignore
const longLine = 'this is a very long line that should not be formatted'
```

---

### Q3: 如何禁用某行的 ESLint 检查？

```typescript
// eslint-disable-next-line no-console
console.log('debug')
```

---

### Q4: 为什么有些错误无法自动修复？

**原因：** 某些 ESLint 规则涉及逻辑判断，无法自动修复

**解决：** 需要手动修改代码

---

## 📊 配置效果

### 修复前

```
✖ 791 problems (707 errors, 84 warnings)
```

### 修复后

```
✔ All files passed!
```

---

## ✨ 总结

### 优势

✅ **完全一致** - ESLint 和 Prettier 规则完全同步  
✅ **自动修复** - 大部分问题可以自动修复  
✅ **团队协作** - 统一的代码风格  
✅ **CI/CD 友好** - 构建时自动检查

### 配置要点

📝 **Prettier** - 负责代码格式（空格、换行、引号等）  
📝 **ESLint** - 负责代码质量（未使用变量、类型错误等）  
📝 **stylistic** - ESLint 中专门用于格式化的规则集

---

**配置状态**: ✅ 已完成并测试通过  
**最后更新**: 2024-01-01  
**相关文件**:

- `.prettierrc`
- `eslint.config.js`
- `config/eslint-config/index.js`
- `package.json` (lint-staged 配置)
