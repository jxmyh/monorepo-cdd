# Husky Git Hooks

本目录包含 Git hooks 配置，用于自动化代码质量检查。

## 📁 文件说明

### pre-commit

提交前执行的 hook，运行 lint-staged 检查暂存的文件。

**功能：**

- 自动修复 ESLint 问题
- 自动格式化代码
- 确保提交的代码符合规范

### commit-msg

提交信息验证 hook，运行 commitlint 检查提交消息格式。

**功能：**

- 验证 commit message 是否符合 Conventional Commits 规范
- 确保提交信息的类型、格式正确

## 🔧 工作原理

```bash
git add .
git commit -m "feat: add new feature"
# ↓ 触发流程：
# 1. pre-commit hook → lint-staged 检查并修复代码
# 2. commit-msg hook → commitlint 验证提交信息
# ↓ 全部通过后才会提交成功
```

## ⚙️ 配置位置

- **lint-staged**: 根目录 `package.json` 中的 `lint-staged` 字段
- **commitlint**: 根目录 `commitlint.config.js`

## 🚫 跳过 Hooks（不推荐）

仅在紧急情况下使用：

```bash
# 跳过所有 hooks
git commit --no-verify -m "urgent fix"

# 或简写
git commit -n -m "urgent fix"
```

**注意**: 这会绕过所有代码质量检查，可能导致不符合规范的代码进入仓库。

## 📝 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具
- `ci`: CI/CD
- `build`: 构建系统
- `revert`: 回退

**示例：**

```bash
✅ git commit -m "feat(user): 添加用户登录功能"
✅ git commit -m "fix(auth): 修复 token 过期问题"
❌ git commit -m "update"
❌ git commit -m "fix bug"
```

## 🔍 故障排除

### 问题 1: Hook 没有执行

**解决方案：**

```bash
# 确认 .husky 目录存在
ls -la .husky/

# 确认文件有执行权限
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg

# 重新初始化
pnpm exec husky init
```

### 问题 2: lint-staged 检查失败

**解决方案：**

```bash
# 查看具体错误
pnpm lint

# 自动修复
pnpm lint:fix

# 重新添加并提交
git add .
git commit -m "feat: ..."
```

### 问题 3: commitlint 验证失败

**解决方案：**

```bash
# 查看错误信息，按要求修改提交消息
git commit --amend -m "feat(scope): correct message format"
```

## 📚 相关资源

- [Husky 官方文档](https://typicode.github.io/husky/)
- [lint-staged 文档](https://github.com/lint-staged/lint-staged)
- [Commitlint 文档](https://commitlint.js.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**提示**: Git hooks 是保证代码质量的重要工具，请不要随意禁用它们！
