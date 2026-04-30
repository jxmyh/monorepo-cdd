# 分支命名与管理完整指南

## 📋 目录

- [分支命名格式](#-分支命名格式)
- [正确示例](#-正确示例)
- [错误示例](#-错误示例)
- [自动检查机制](#-自动检查机制)
- [使用方法](#-使用方法)
- [规则说明](#-规则说明)
- [特殊分支](#-特殊分支)
- [最佳实践](#-最佳实践)
- [常见问题](#-常见问题)
- [故障排除](#-故障排除)

---

## 📋 分支命名格式

```
<模块名>_<可能二级>_<可能三级>_v<版本号>_<开发人员>
```

## ✅ 正确示例

### 驼峰命名（推荐用于插件/模块）

```bash
mpaPlugin_v1.0.0_jxmyh
uiComponent_v2.1.0_zhangsan
vueHook_v1.0.0_lisi
```

### 应用分支

```bash
apps_web-app_v1.0.0_zhangsan
apps_mobile-app_v2.1.0_lisi
apps_web-admin_v1.0.0_wangwu
```

### 包分支

```bash
packages_ui_v1.0.0_zhaoliu
packages_utils_v1.2.0_chenqi
packages_vue-hooks_v2.0.0_liumeng
packages_ui_components_v1.0.0_zhangsan
```

### 配置分支

```bash
config_vite-config_v1.0.0_wangwu
config_tsconfig_v1.1.0_lisi
config_eslint-config_v2.0.0_zhaoliu
```

### 功能/修复分支

```bash
feature_user-profile_v1.0.0_zhangsan
feature_payment-integration_v1.0.0_lisi
hotfix_login-error_v1.0.1_wangwu
bugfix_memory-leak_v1.0.2_chenqi
critical_security-fix_v1.0.3_liumeng
```

## ❌ 错误示例

```bash
❌ feature-user-login-v1.0.0-zhangsan  # 使用了连字符而非下划线分隔主要部分
❌ apps_web-app_zhangsan               # 缺少版本号
❌ apps_web-app_v1.0.0                 # 缺少开发人员
❌ feature_login                       # 格式完全错误
❌ zhangsan_v1.0.0                     # 缺少模块信息
```

## 🔍 检查方法

### 自动检查

```bash
# git push 时自动触发
git push

# 手动检查
node scripts/check-branch-name.js
```

### 跳过检查（不推荐）

```bash
SKIP_BRANCH_CHECK=true git push
```

## 📝 规则说明

| 规则     | 说明                                                         | 示例                             |
| -------- | ------------------------------------------------------------ | -------------------------------- |
| 分隔符   | 使用下划线 `_` 分隔主要部分                                  | `mpaPlugin_v1.0.0_jxmyh`         |
| 大小写   | 支持驼峰命名（camelCase/PascalCase），但建议尽量使用小写     | `mpaPlugin` 或 `web-app`         |
| 版本号   | 必须包含 vX.Y.Z                                              | `v1.0.0`, `v2.1.3`               |
| 开发人员 | 必须包含姓名                                                 | `jxmyh`, `zhangsan`, `lisi`      |
| 连字符   | 允许在模块名中使用，用于分隔单词                             | `web-app`, `user-profile`        |

> ⚠️ **注意**：虽然支持大写字母，但建议使用小写以提高跨平台兼容性和 Git 命令的一致性。

## 🎯 特殊分支

以下分支不需要遵循上述格式：

- `main` / `master` - 生产环境
- `develop` / `dev` - 开发环境
- `release/*` - 发布分支（建议也遵循规范）

## 💡 最佳实践

### 1. 版本号管理

```bash
v1.0.0  # 初始版本
v1.0.1  # Bug 修复
v1.1.0  # 新增功能
v2.0.0  # 重大变更
```

### 2. 开发人员命名

- 使用拼音：`zhangsan`, `lisi`, `wangwu`
- 或使用英文名：`john`, `mary`, `david`
- 保持一致性，团队统一

### 3. 目录层级

```bash
# 一级目录
apps_web-app_v1.0.0_zhangsan

# 二级目录
apps_web-app_feature-login_v1.0.0_zhangsan

# 三级目录
apps_web-app_feature-login_form_v1.0.0_zhangsan
```

## 🔧 常见问题

### Q1: 忘记添加版本号怎么办？

```bash
# 重命名分支
git branch -m old-branch-name apps_web-app_v1.0.0_zhangsan
```

### Q2: 多人协作同一个功能？

```bash
# 每个人创建自己的分支
apps_web-app_v1.0.0_zhangsan
apps_web-app_v1.0.0_lisi

# 或者使用统一的分支，通过 commit 区分
apps_web-app_v1.0.0_team
```

### Q3: 版本号如何确定？

- 新功能：增加次版本号 (v1.0.0 → v1.1.0)
- Bug 修复：增加修订号 (v1.0.0 → v1.0.1)
- 重大变更：增加主版本号 (v1.0.0 → v2.0.0)

### Q4: 可以临时跳过检查吗？

```bash
# 仅在紧急情况下使用
SKIP_BRANCH_CHECK=true git push

# 之后应该尽快修正分支名称
git branch -m wrong-name correct_name_v1.0.0_user
```

## 📚 相关文档

- [TEAM_GUIDELINES.md](./TEAM_GUIDELINES.md) - 完整团队规范
- [scripts/check-branch-name.js](./scripts/check-branch-name.js) - 检查脚本
- [.husky/post-checkout](./.husky/post-checkout) - Git Hook 配置

---

## 🔍 自动检查机制

### 工作原理

项目实现了**三层检查**机制，确保分支名称符合规范：

#### 1️⃣ 创建分支时（警告）

```bash
git checkout -b branch-name
  ↓
post-checkout hook
  ↓
检查分支名称
  ↓
✅ 符合 → 显示成功消息
❌ 不符合 → 显示警告（但不阻止）
```

**目的：** 即时反馈，帮助开发者养成好习惯

**检测逻辑：**
1. 检测到分支切换（`git checkout -b`）
2. 获取当前分支名
3. 跳过特殊分支（main/master/develop/dev）
4. 检查 reflog 记录数（<=2 表示新分支）
5. 运行分支名称检查脚本

#### 2️⃣ 推送前（强制）

```bash
git push
  ↓
pre-push hook
  ↓
检查分支名称
  ↓
✅ 符合 → 允许推送
❌ 不符合 → 拒绝推送
```

**目的：** 最终保障，确保远程仓库的分支都符合规范

#### 3️⃣ 手动检查

```bash
# 随时验证当前分支名称
node scripts/check-branch-name.js
```

---

## 📝 使用方法

### 基本用法

```bash
# 创建并切换到新分支
git checkout -b <branch-name>

# 从指定起点创建分支
git checkout -b <branch-name> <start-point>
```

### 示例

#### ✅ 正确的用法

```bash
# 创建符合规范的分支
git checkout -b mpaPlugin_v1.0.0_jxmyh

# 输出：
# 🔍 检查新分支名称: mpaPlugin_v1.0.0_jxmyh
# ✅ 分支名称符合规范 ✅
```

#### ❌ 错误的用法

```bash
# 创建不符合规范的分支
git checkout -b test_wrong_name

# 输出：
# 🔍 检查新分支名称: test_wrong_name
# ❌ 分支名称不符合规范：
#   ❌ 缺少版本号（格式：v1.0.0）
#   ❌ 缺少开发人员姓名
#
# 💡 修正建议：
#   建议格式：test_wrong_name_v1.0.0_<你的名字>
#   例如：test_wrong_name_v1.0.0_zhangsan
```

**结果：** ⚠️ 显示警告，但分支仍然创建（不阻止）

### 安全分支创建命令

使用 `pnpm branch` 命令可以**强制验证**分支名称规范：

```bash
# 创建并切换到新分支（推荐）
pnpm branch -b <branch-name>

# 从指定起点创建分支
pnpm branch -b <branch-name> <start-point>
```

**特点：**
- ✅ 创建前验证，不符合规范无法创建
- ✅ 提供详细的错误信息和修正建议
- ✅ 比 git checkout -b 更安全

---

## ⚙️ 配置选项

### 跳过检查（不推荐）

```bash
# 临时跳过
SKIP_BRANCH_CHECK=true git checkout -b temp-branch

# 或在 Windows PowerShell 中
$env:SKIP_BRANCH_CHECK="true"; git checkout -b temp-branch
```

### 修改检查阈值

如果想调整“新分支”的判断标准，修改 `.husky/post-checkout`：

```bash
# 当前：reflog 记录 <= 2 视为新分支
if [ "$REFLOG_COUNT" -le 2 ]; then

# 可以调整为其他值，如 <= 3
if [ "$REFLOG_COUNT" -le 3 ]; then
```

---

## 🔧 故障排除

### Q1: 创建分支时没有检查？

**可能原因：**

1. Hook 文件没有执行权限
2. 是特殊分支（main/master/develop/dev）
3. 分支已经存在（不是新创建）

**解决方案：**

```bash
# 检查权限
ls -la .husky/post-checkout

# 添加执行权限（如果需要）
chmod +x .husky/post-checkout

# 确认不是特殊分支
git branch  # 查看当前分支
```

### Q2: VSCode 图形界面创建分支未检测？

**原因：** 可能存在残留的环境变量

**解决方案：**

```powershell
# Windows PowerShell - 清除环境变量
Remove-Item Env:\SKIP_BRANCH_CHECK

# 检查是否已清除
echo $env:SKIP_BRANCH_CHECK  # 应该为空
```

### Q3: 每次切换分支都检查？

**原因：** reflog 判断可能不准确

**解决方案：**
调整阈值或改用其他检测方法

### Q4: 想完全禁用创建时检查？

**方案 1：** 删除或注释掉 post-checkout hook

```bash
# 重命名文件（禁用）
mv .husky/post-checkout .husky/post-checkout.bak
```

**方案 2：** 设置环境变量

```bash
# 在 .bashrc 或 .zshrc 中添加
export SKIP_BRANCH_CHECK=true
```

---

## 📈 效果对比

### 改进前

```bash
$ git checkout -b wrong-name
Switched to a new branch 'wrong-name'
# ❌ 没有任何提示

$ git push
# ❌ 推送时才被发现，需要重新创建分支
```

### 改进后

```bash
$ git checkout -b wrong-name
Switched to a new branch 'wrong-name'

🔍 检查新分支名称: wrong-name
❌ 分支名称不符合规范：
  ❌ 缺少版本号
  ❌ 缺少开发人员姓名

💡 建议：wrong_name_v1.0.0_user
# ✅ 立即发现问题，可以马上修正

$ git checkout -b correct_name_v1.0.0_user
Switched to a new branch 'correct_name_v1.0.0_user'
✅ 分支名称符合规范 ✅
# ✅ 即时正面反馈
```

---

## ✨ 总结

### 优势

✅ **即时反馈** - 创建时就知道是否正确  
✅ **友好提示** - 显示错误原因和修正建议  
✅ **不阻塞流程** - 警告而非阻止，给予灵活性  
✅ **双重保障** - 创建时警告 + 推送时强制  
✅ **易于学习** - 帮助团队快速掌握规范

### 工作流程

```
创建分支 → 即时检查（警告）→ 开发 → 提交 → 推送前检查（强制）
   ↓                                              ↓
 提醒修正                                    必须正确才能推送
```

---

**提示**: 将此文档保存为书签，方便随时查阅！🔖
