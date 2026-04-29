# Pre-commit Hook 修复说明

## ❌ 问题描述

执行 `git commit` 时仍然运行了 `pnpm test`，导致提交速度很慢。

## 🔍 问题原因

`.husky/pre-commit` 文件的内容被错误地设置为：

```bash
pnpm test
```

这会导致每次 commit 时都运行所有测试，严重影响开发效率。

## ✅ 解决方案

已将 `.husky/pre-commit` 修改为正确的配置：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 提交前运行 lint-staged（只检查代码格式，不运行测试）
npx lint-staged
```

## 📋 当前配置

### Pre-commit Hook

**文件：** `.husky/pre-commit`

**功能：**

- ✅ 运行 lint-staged
- ✅ 只检查代码格式（ESLint + Prettier）
- ❌ **不运行测试**

### Lint-staged 配置

**文件：** `package.json`

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": [
      "eslint --fix", // 代码质量检查并自动修复
      "prettier --write" // 代码格式化
    ],
    "*.{json,md}": [
      "prettier --write" // 格式化 JSON 和 Markdown
    ]
  }
}
```

## 🚀 现在的行为

### Commit 时

```bash
$ git add .
$ git commit -m "feat: add feature"

# ↓ 自动执行：
# 1. eslint --fix (检查并修复 JS/TS/Vue 文件)
# 2. prettier --write (格式化所有文件)
# ✅ 不会运行测试，快速完成

[branch-name abc123] feat: add feature
 2 files changed, 50 insertions(+)
```

### 测试应该在哪里运行？

1. **本地手动测试**

   ```bash
   pnpm test
   ```

2. **CI/CD 自动测试**
   - 推送到远程后自动运行
   - Pull Request 时自动运行

3. **构建前测试**
   ```bash
   pnpm build  # 如果配置了构建前测试
   ```

## 💡 最佳实践

### 开发流程

```bash
# 1. 编写代码和测试
# ...

# 2. 本地运行测试（可选，建议在关键节点运行）
pnpm test

# 3. 提交代码（只检查格式，快速）
git add .
git commit -m "feat: add feature"

# 4. 推送代码（触发 CI/CD 测试）
git push

# 5. 查看 CI/CD 测试结果
# 在 GitHub/GitLab 等平台查看
```

### 何时运行测试？

| 时机       | 是否运行测试 | 说明                     |
| ---------- | ------------ | ------------------------ |
| 本地开发中 | 可选         | 根据需要使用 `pnpm test` |
| Commit 时  | ❌ 不运行    | 只检查代码格式           |
| Push 前    | ❌ 不运行    | 只检查分支名称           |
| CI/CD      | ✅ 运行      | 自动化测试套件           |
| 发布前     | ✅ 运行      | 完整测试 + 构建          |

## 🔧 如果需要临时运行测试

```bash
# 方法 1: 手动运行
pnpm test

# 方法 2: 在 commit 前运行
pnpm test && git commit -m "feat: ..."

# 方法 3: 使用 pre-push hook（如果配置了）
# 在 .husky/pre-push 中添加测试命令
```

## ⚠️ 注意事项

1. **不要修改 pre-commit hook 来运行测试**
   - 会严重降低提交速度
   - 违背了快速反馈的原则

2. **依赖 CI/CD 进行完整测试**
   - 更可靠
   - 环境一致
   - 不阻塞本地开发

3. **本地测试仍很重要**
   - 在关键功能完成后运行
   - 修复 bug 后运行相关测试
   - 推送前确保核心功能正常

## 📊 性能对比

### 修复前

```bash
$ git commit -m "feat: ..."
Running tests... (可能需要 30-60 秒)
❌ 很慢，影响开发体验
```

### 修复后

```bash
$ git commit -m "feat: ..."
Linting and formatting... (通常 1-5 秒)
✅ 快速，不打断开发流程
```

## ✨ 总结

✅ **Pre-commit hook 已修复** - 不再运行测试  
✅ **Commit 速度提升** - 从几十秒降到几秒  
✅ **开发体验改善** - 快速反馈，流畅开发  
✅ **测试仍有保障** - 通过 CI/CD 和本地手动运行

---

**修复时间**: 2024-01-01  
**相关文件**: `.husky/pre-commit`, `package.json`
