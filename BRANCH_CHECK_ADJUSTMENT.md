# 分支检查配置调整说明

## 📋 调整内容

### 1. Commit 时只做代码格式检查 ✅

**之前的配置：**

- lint-staged 已配置为只检查代码格式（ESLint + Prettier）
- 不包含测试运行

**当前配置：**

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

**优势：**

- ⚡ 快速反馈，不阻塞开发流程
- ✅ 确保代码风格一致
- ❌ 不运行测试（避免耗时过长）
- 🎯 专注代码质量问题

---

### 2. 创建分支时进行规范检查 ⭐ 新增

**新增功能：**

- 在 `git checkout -b` 创建新分支后自动检查
- 提供友好的警告提示（不阻止分支创建）
- 显示正确的命名示例和修正建议

**实现方式：**

- 脚本：[scripts/check-branch-on-create.js](./scripts/check-branch-on-create.js)
- Hook：[.husky/post-checkout](./.husky/post-checkout)

**工作流程：**

```bash
git checkout -b apps_web-app_v1.0.0_zhangsan
  ↓
post-checkout hook 触发
  ↓
检测到是新分支创建
  ↓
运行 check-branch-on-create.js
  ↓
✅ 符合规范 → 显示成功消息
❌ 不符合规范 → 显示警告和修正建议（但不阻止）
```

---

## 🔍 检查时机对比

| 时机           | 检查类型                      | 严格程度 | 是否阻止  |
| -------------- | ----------------------------- | -------- | --------- |
| **创建分支时** | 分支命名规范                  | 警告     | ❌ 不阻止 |
| **Commit 时**  | 代码格式（ESLint + Prettier） | 强制     | ✅ 阻止   |
| **推送前**     | 分支命名规范                  | 强制     | ✅ 阻止   |

---

## 📝 使用示例

### 场景 1：创建符合规范的分支

```bash
$ git checkout -b apps_web-app_v1.0.0_zhangsan

🔍 检查新分支名称: apps_web-app_v1.0.0_zhangsan
✅ 分支名称符合规范 ✅

Switched to a new branch 'apps_web-app_v1.0.0_zhangsan'
```

### 场景 2：创建不符合规范的分支

```bash
$ git checkout -b feature-login

🔍 检查新分支名称: feature-login

❌ 分支名称不符合规范：
  ❌ 缺少版本号（格式：v1.0.0）
  ❌ 缺少开发人员姓名
  ❌ 应使用下划线分隔各部分

📋 正确的分支命名示例：
  ✅ apps_web-app_v1.0.0_zhangsan
  ✅ packages_ui_v2.1.0_lisi
  ✅ config_vite-config_v1.0.0_wangwu

💡 修正建议：
  建议格式：feature_login_v1.0.0_<你的名字>
  例如：feature_login_v1.0.0_zhangsan

⚠️  提示：
  如需跳过检查，设置环境变量：SKIP_BRANCH_CHECK=true

Switched to a new branch 'feature-login'
# ⚠️ 注意：分支仍然创建了，只是给出了警告
```

### 场景 3：Commit 时只做格式检查

```bash
$ git add .
$ git commit -m "feat: add login feature"

# ↓ 自动执行：
# 1. eslint --fix (检查并修复代码)
# 2. prettier --write (格式化代码)
# ✅ 不会运行测试

[feature-login abc123] feat: add login feature
 2 files changed, 50 insertions(+)
```

### 场景 4：推送时强制检查

```bash
$ git push origin feature-login

🔍 检查分支名称: feature-login

❌ 分支名称不符合规范：
  ❌ 缺少版本号（格式：v1.0.0）
  ❌ 缺少开发人员姓名

📋 分支命名示例：
  ✅ apps_web-app_v1.0.0_zhangsan
  ✅ packages_ui_v2.1.0_lisi

error: failed to push some refs to 'origin'
# ❌ 推送被拒绝，必须修正分支名称
```

---

## 🔧 配置说明

### 文件清单

#### 1. Commit 格式检查

- **配置文件**: `package.json` 中的 `lint-staged` 字段
- **Hook**: `.husky/pre-commit`
- **功能**: ESLint + Prettier 自动检查和修复

#### 2. 分支创建时检查（新增）

- **脚本**: `scripts/check-branch-on-create.js`
- **Hook**: `.husky/post-checkout`
- **功能**: 检测新分支创建，给出警告提示

#### 3. 推送前检查（已有）

- **脚本**: `scripts/check-branch-name.js`
- **Hook**: `.husky/pre-push`
- **功能**: 强制验证分支名称，不符合则拒绝推送

---

## 💡 最佳实践

### 推荐的开发流程

```bash
# 1. 创建分支（会自动检查并提示）
git checkout -b apps_web-app_v1.0.0_zhangsan

# 2. 开发和提交（只检查代码格式，快速）
git add .
git commit -m "feat: add feature"

# 3. 推送前（强制检查分支名称）
git push origin apps_web-app_v1.0.0_zhangsan
```

### 如果忘记遵循规范

```bash
# 情况 1: 创建分支时收到警告，但继续使用了
# 解决：重命名分支
git branch -m old-name apps_web-app_v1.0.0_zhangsan

# 情况 2: 推送时被拒绝
# 解决：先重命名，再推送
git branch -m old-name apps_web-app_v1.0.0_zhangsan
git push origin apps_web-app_v1.0.0_zhangsan
```

### 紧急情况跳过检查

```bash
# 跳过分支创建时的检查
SKIP_BRANCH_CHECK=true git checkout -b temp-branch

# 跳过推送前的检查
SKIP_BRANCH_CHECK=true git push origin temp-branch

# ⚠️ 仅在紧急情况下使用！
```

---

## 🎯 设计理念

### 为什么创建分支时不强制阻止？

**原因：**

1. **友好提示** - 给开发者学习和适应的时间
2. **灵活性** - 允许特殊情况下的临时分支
3. **最终保障** - 推送时仍会强制检查

**好处：**

- ✅ 不会打断开发流程
- ✅ 提供及时的反馈和建议
- ✅ 培养良好的命名习惯
- ✅ 推送时仍有最终把关

### 为什么 Commit 时不运行测试？

**原因：**

1. **速度优先** - 测试可能很慢，影响开发体验
2. **职责分离** - Commit 关注代码质量，CI/CD 关注功能正确性
3. **频繁提交** - 鼓励小步提交，不被测试阻塞

**替代方案：**

- 本地运行测试：`pnpm test`
- CI/CD 自动测试：推送后自动运行
- 发布前测试：构建流程中包含完整测试

---

## 📊 效果对比

### 调整前

```bash
# Commit 时
git commit -m "feat: ..."
  ↓
lint-staged (ESLint + Prettier)
  ↓
可能运行测试（如果配置了）❌ 耗时
  ↓
commitlint
  ↓
完成

# 创建分支时
git checkout -b wrong-name
  ↓
无任何提示 ❌ 容易犯错
  ↓
完成

# 推送时
git push
  ↓
检查分支名称
  ↓
通过/拒绝
```

### 调整后

```bash
# Commit 时
git commit -m "feat: ..."
  ↓
lint-staged (ESLint + Prettier) ✅ 快速
  ↓
commitlint
  ↓
完成

# 创建分支时
git checkout -b wrong-name
  ↓
自动检查并提示 ⭐ 新增
  ↓
显示错误和修正建议
  ↓
完成（但给出警告）

# 推送时
git push
  ↓
检查分支名称
  ↓
通过/拒绝
```

---

## 🚀 立即体验

### 测试分支创建检查

```bash
# 1. 尝试创建不符合规范的分支
git checkout -b test-wrong-name

# 应该看到警告提示

# 2. 尝试创建符合规范的分支
git checkout -b apps_test_v1.0.0_user

# 应该看到成功消息

# 3. 切换回主分支
git checkout main
```

### 测试 Commit 格式检查

```bash
# 1. 修改一个文件
echo "// test" >> test.js

# 2. 添加并提交
git add test.js
git commit -m "test: format check"

# 应该只看到 ESLint 和 Prettier 的检查
# 不会看到测试运行
```

---

## 📚 相关文档

- [TEAM_GUIDELINES.md](./TEAM_GUIDELINES.md) - 完整团队规范
- [BRANCH_NAMING_GUIDE.md](./BRANCH_NAMING_GUIDE.md) - 分支命名快速参考
- [scripts/check-branch-on-create.js](./scripts/check-branch-on-create.js) - 分支创建检查脚本
- [scripts/check-branch-name.js](./scripts/check-branch-name.js) - 推送前检查脚本
- [.husky/post-checkout](./.husky/post-checkout) - 分支创建 Hook
- [.husky/pre-push](./.husky/pre-push) - 推送前 Hook

---

## ✨ 总结

通过本次调整：

✅ **Commit 更高效** - 只做代码格式检查，不运行测试  
✅ **分支更规范** - 创建时即时提示，推送时强制检查  
✅ **体验更友好** - 警告而非阻止，给予学习空间  
✅ **流程更清晰** - 不同阶段有不同检查重点

**让规范化成为习惯，而不是负担！** 🎉

---

**调整时间**: 2024-01-01  
**维护者**: 开发团队
