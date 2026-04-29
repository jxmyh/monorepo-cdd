# 分支命名规范快速参考

## 📋 分支命名格式

```
<一级目录>_<可能二级>_<可能三级>_v<版本号>_<开发人员>
```

## ✅ 正确示例

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
❌ feature-user-login-v1.0.0-zhangsan  # 使用了连字符而非下划线
❌ apps_web-app_zhangsan               # 缺少版本号
❌ apps_web-app_v1.0.0                 # 缺少开发人员
❌ Apps_Web-App_v1.0.0_zhangsan        # 包含大写字母
❌ feature_login                       # 格式完全错误
❌ zhangsan_v1.0.0                     # 缺少目录信息
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

| 规则     | 说明               | 示例                       |
| -------- | ------------------ | -------------------------- |
| 分隔符   | 使用下划线 `_`     | `apps_web-app`             |
| 大小写   | 全部小写           | `zhangsan` 而非 `ZhangSan` |
| 版本号   | 必须包含 vX.Y.Z    | `v1.0.0`, `v2.1.3`         |
| 开发人员 | 必须包含姓名       | `zhangsan`, `lisi`         |
| 连字符   | 允许在目录名中使用 | `web-app`, `user-profile`  |

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
- [.husky/pre-push](./.husky/pre-push) - Git Hook 配置

---

**提示**: 将此文档保存为书签，方便随时查阅！🔖
