# 安全分支创建指南

## 🎯 功能说明

使用 `pnpm branch` 命令可以**强制验证**分支名称规范，不符合规范的分支**无法创建**。

---

## 📝 使用方法

### 基本用法

```bash
# 创建并切换到新分支（推荐）
pnpm branch -b <branch-name>

# 从指定起点创建分支
pnpm branch -b <branch-name> <start-point>
```

### 示例

#### ✅ 正确的用法

```bash
# 创建符合规范的分支
pnpm branch -b apps_web-app_v1.0.0_zhangsan

# 输出：
# 🔍 验证分支名称: apps_web-app_v1.0.0_zhangsan
# ✅ 分支名称符合规范 ✅
# 📌 执行: git checkout -b apps_web-app_v1.0.0_zhangsan
# Switched to a new branch 'apps_web-app_v1.0.0_zhangsan'
# ✅ 分支创建成功！
```

#### ❌ 错误的用法

```bash
# 尝试创建不符合规范的分支
pnpm branch -b test_wrong_name

# 输出：
# 🔍 验证分支名称: test_wrong_name
# ❌ 分支名称不符合规范：
#   ❌ 缺少版本号（格式：v1.0.0）
# 🚫 分支创建被拒绝！请先修正分支名称。
# （分支不会被创建）
```

---

## 🔧 分支命名规范

**格式：** `<一级目录>_<可能二级>_<可能三级>_v<版本号>_<开发人员>`

**规则：**

- ✅ 使用下划线 `_` 分隔各部分
- ✅ 全部小写字母
- ✅ 必须包含语义化版本号（vX.Y.Z）
- ✅ 必须包含开发人员姓名（拼音或英文名）
- ✅ 允许在目录名中使用连字符 `-`

**正确示例：**

```
✅ apps_web-app_v1.0.0_zhangsan
✅ packages_ui_v2.1.0_lisi
✅ config_vite-config_v1.0.0_wangwu
✅ feature_user-login_v1.0.0_zhaoliu
✅ hotfix_login-bug_v1.0.1_chenqi
```

**错误示例：**

```
❌ test_branch           # 缺少版本号和开发人员
❌ feature-v1.0.0-user   # 使用了连字符而非下划线
❌ apps_test_V1.0.0_user # 版本号有大写字母
❌ apps_test_v1.0.0      # 缺少开发人员姓名
```

---

## ⚙️ 跳过检查（不推荐）

仅在紧急情况下使用：

### Windows PowerShell

```powershell
$env:SKIP_BRANCH_CHECK="true"; pnpm branch -b temp-branch
```

### Linux/macOS

```bash
SKIP_BRANCH_CHECK=true pnpm branch -b temp-branch
```

---

## 🆚 与原生 Git 命令对比

### 传统方式（无验证）

```bash
# 可以直接创建任何名称的分支
git checkout -b any-name-you-want

# ⚠️ 没有验证，可能创建不符合规范的分支
```

### 安全方式（强制验证）⭐

```bash
# 必须先通过验证才能创建
pnpm branch -b apps_feature_v1.0.0_user

# ✅ 自动验证分支名称
# ✅ 不符合规范则拒绝创建
# ✅ 提供详细的错误提示和修正建议
```

---

## 🔄 VSCode 图形界面怎么办？

VSCode 图形界面仍然使用原生的 `git checkout -b`，会触发 post-checkout hook 进行**警告提示**，但不会阻止创建。

**推荐做法：**

1. **优先使用命令行** `pnpm branch -b` 创建分支
2. 如果使用 VSCode 图形界面，注意查看终端输出的警告信息
3. 如果创建了不符合规范的分支，立即删除并重新创建

---

## 💡 最佳实践

### 1. 养成使用 `pnpm branch` 的习惯

```bash
# ❌ 避免
git checkout -b my-feature

# ✅ 推荐
pnpm branch -b apps_feature_v1.0.0_username
```

### 2. 在团队中推广

在团队文档中明确说明：

- 必须使用 `pnpm branch` 命令创建分支
- 禁止直接使用 `git checkout -b`
- Code Review 时检查分支名称

### 3. 设置别名（可选）

在 `.bashrc` 或 `.zshrc` 中添加：

```bash
# Linux/macOS
alias gcb='pnpm branch -b'
```

Windows PowerShell Profile:

```powershell
# $PROFILE 文件中
function gcb {
    pnpm branch -b $args
}
```

然后可以这样使用：

```bash
gcb apps_feature_v1.0.0_user
```

---

## 🔍 故障排除

### Q1: 提示 "command not found: pnpm"

**解决方案：** 确保已安装 pnpm

```bash
npm install -g pnpm
```

---

### Q2: 提示脚本执行失败

**解决方案：** 检查 Node.js 版本

```bash
node --version
# 应该 >= 14
```

---

### Q3: 想临时使用原生 Git 命令

**方案：** 设置环境变量跳过检查

```bash
# Windows PowerShell
$env:SKIP_BRANCH_CHECK="true"; git checkout -b temp-branch

# Linux/macOS
SKIP_BRANCH_CHECK=true git checkout -b temp-branch
```

---

## 📊 工作流程对比

### 传统流程（无强制验证）

```
开发者 → git checkout -b any-name
         ↓
     分支创建成功（可能不符合规范）
         ↓
     开发、提交、推送
         ↓
     CI/CD 或 Code Review 时发现
         ↓
     需要删除分支重新创建 😫
```

### 新流程（强制验证）⭐

```
开发者 → pnpm branch -b name
         ↓
     验证分支名称
         ↓
    ┌────┴────┐
    │ 符合规范？│
    └────┬────┘
       Yes│     No
          │      ↓
          │   ❌ 拒绝创建
          │   显示错误信息
          │   提供修正建议
          │      ↓
          │   修正后重试
          ↓
     ✅ 创建成功
          ↓
     开发、提交、推送
          ↓
     一切顺利 😊
```

---

## ✨ 优势总结

### 对开发者

✅ **即时反馈** - 创建时就知道是否正确  
✅ **防止错误** - 不符合规范的分支无法创建  
✅ **学习友好** - 提供详细的示例和建议

### 对团队

✅ **统一规范** - 所有分支都符合命名规则  
✅ **减少返工** - 避免后期修改分支名  
✅ **易于管理** - 清晰的分支结构

### 对项目

✅ **自动化** - 无需人工检查分支名  
✅ **可靠性** - 机器验证，不会遗漏  
✅ **可追溯** - 分支名包含版本和负责人

---

## 📖 相关文档

- [BRANCH_NAMING_GUIDE.md](./BRANCH_NAMING_GUIDE.md) - 分支命名详细规范
- [TEAM_GUIDELINES.md](./TEAM_GUIDELINES.md) - 完整团队开发规范
- [README.md](./README.md) - 项目主文档

---

**最后更新**: 2024-01-01  
**状态**: ✅ 已启用并测试通过
