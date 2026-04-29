# 分支命名规范配置完成总结

## ✅ 已完成的配置

### 1. 分支命名检查脚本

**文件：** [scripts/check-branch-name.js](./scripts/check-branch-name.js)

**功能：**

- ✅ 验证分支名称是否符合规范
- ✅ 提供详细的错误信息
- ✅ 显示正确的示例
- ✅ 支持跳过检查（环境变量）

**命名格式：**

```
<一级目录>_<可能二级>_<可能三级>_v<版本号>_<开发人员>
```

### 2. Git Hook 配置

**文件：** [.husky/pre-push](./.husky/pre-push)

**触发时机：** `git push` 时自动执行

**工作流程：**

```bash
git push
  ↓
pre-push hook
  ↓
node scripts/check-branch-name.js
  ↓
验证通过 → 推送成功
验证失败 → 推送被拒绝，显示错误信息
```

### 3. 文档体系

#### 核心文档

- **[BRANCH_NAMING_GUIDE.md](./BRANCH_NAMING_GUIDE.md)** - 快速参考指南 ⭐
- **[TEAM_GUIDELINES.md](./TEAM_GUIDELINES.md)** - 完整规范（已更新）
- **[QUICK_START.md](./QUICK_START.md)** - 快速开始（已更新）
- **[README.md](./README.md)** - 项目说明（已更新）

#### 文档内容覆盖

- ✅ 命名格式说明
- ✅ 大量正确/错误示例
- ✅ 自动化检查方法
- ✅ 常见问题解答
- ✅ 最佳实践建议

---

## 📋 命名规则详解

### 格式要求

```
<一级目录>_<可能二级>_<可能三级>_v<版本号>_<开发人员>
```

### 规则说明

| 规则     | 说明               | 示例                      |
| -------- | ------------------ | ------------------------- |
| 分隔符   | 使用下划线 `_`     | `apps_web-app`            |
| 大小写   | 全部小写           | `zhangsan`                |
| 版本号   | 必须包含 vX.Y.Z    | `v1.0.0`                  |
| 开发人员 | 必须包含姓名       | `zhangsan`, `lisi`        |
| 连字符   | 允许在目录名中使用 | `web-app`, `user-profile` |

### 特殊分支

以下分支不需要遵循上述格式：

- `main` / `master` - 生产环境
- `develop` / `dev` - 开发环境
- `release/*` - 发布分支（建议也遵循）

---

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

---

## ❌ 错误示例

```bash
❌ feature-user-login-v1.0.0-zhangsan  # 使用了连字符而非下划线
❌ apps_web-app_zhangsan               # 缺少版本号
❌ apps_web-app_v1.0.0                 # 缺少开发人员
❌ Apps_Web-App_v1.0.0_zhangsan        # 包含大写字母
❌ feature_login                       # 格式完全错误
❌ zhang-san_v1.0.0                    # 缺少目录信息
```

---

## 🔧 使用方法

### 自动检查

```bash
# git push 时自动触发
git push

# 如果分支名称不符合规范，推送会被拒绝
# 并显示详细的错误信息和修正建议
```

### 手动检查

```bash
# 运行检查脚本
node scripts/check-branch-name.js

# 输出示例：
# 🔍 检查分支名称: apps_web-app_v1.0.0_zhangsan
# ✅ 分支名称符合规范
```

### 跳过检查（不推荐）

```bash
# 仅在紧急情况下使用
SKIP_BRANCH_CHECK=true git push

# 之后应该尽快修正分支名称
git branch -m wrong-name correct_name_v1.0.0_user
```

---

## 💡 最佳实践

### 1. 版本号管理

遵循 [Semantic Versioning](https://semver.org/) 规范：

```bash
v1.0.0  # 初始版本
v1.0.1  # Bug 修复
v1.1.0  # 新增功能
v2.0.0  # 重大变更
```

### 2. 开发人员命名

- **拼音**: `zhangsan`, `lisi`, `wangwu`
- **英文名**: `john`, `mary`, `david`
- **保持一致性**: 团队统一使用一种方式

### 3. 目录层级

```bash
# 一级目录
apps_web-app_v1.0.0_zhangsan

# 二级目录
apps_web-app_feature-login_v1.0.0_zhangsan

# 三级目录
apps_web-app_feature-login_form_v1.0.0_zhangsan
```

### 4. 多人协作

```bash
# 方案 1: 每个人创建自己的分支
apps_web-app_v1.0.0_zhangsan
apps_web-app_v1.0.0_lisi

# 方案 2: 使用统一的分支，通过 commit 区分
apps_web-app_v1.0.0_team
```

---

## 🔍 故障排除

### Q1: 忘记添加版本号怎么办？

```bash
# 重命名当前分支
git branch -m old-branch-name apps_web-app_v1.0.0_zhangsan

# 如果已经推送到远程
git push origin --delete old-branch-name
git push origin apps_web-app_v1.0.0_zhangsan
```

### Q2: 检查脚本不工作？

```bash
# 确认文件存在
ls -la scripts/check-branch-name.js

# 确认 .husky/pre-push 存在
ls -la .husky/pre-push

# 重新初始化 Husky
pnpm exec husky init
```

### Q3: 如何修改已有的不规范分支？

```bash
# 1. 重命名本地分支
git branch -m old-name new_name_v1.0.0_user

# 2. 删除远程旧分支
git push origin --delete old-name

# 3. 推送新分支
git push origin new_name_v1.0.0_user

# 4. 设置上游分支
git push --set-upstream origin new_name_v1.0.0_user
```

### Q4: 临时需要跳过检查？

```bash
# 设置环境变量
SKIP_BRANCH_CHECK=true git push

# 或在 Windows PowerShell 中
$env:SKIP_BRANCH_CHECK="true"; git push
```

---

## 📊 实施效果

### 优势

✅ **统一管理** - 所有分支名称格式一致  
✅ **易于识别** - 从分支名即可知道所属模块、版本和负责人  
✅ **自动化检查** - 推送前自动验证，防止不规范分支  
✅ **详细提示** - 错误时提供清晰的修正建议  
✅ **灵活性** - 支持跳过检查（紧急情况）

### 团队协作改进

🤝 **责任明确** - 每个分支都有明确的负责人  
🤝 **版本清晰** - 版本号一目了然  
🤝 **模块区分** - 快速定位分支所属模块  
🤝 **减少冲突** - 规范的命名减少分支冲突

---

## 🎯 下一步行动

### 立即执行

1. ✅ 阅读 [BRANCH_NAMING_GUIDE.md](./BRANCH_NAMING_GUIDE.md)
2. ✅ 测试分支命名检查：`node scripts/check-branch-name.js`
3. ✅ 尝试创建符合规范的分支

### 本周内

1. 👥 团队培训：讲解新的分支命名规范
2. 🔄 迁移现有分支：将不规范分支重命名
3. 📝 收集团队反馈

### 持续优化

1. 📊 监控执行情况
2. 🔧 根据反馈调整规则
3. 📈 评估规范效果

---

## 📚 相关资源

### 文档

- [BRANCH_NAMING_GUIDE.md](./BRANCH_NAMING_GUIDE.md) - 快速参考
- [TEAM_GUIDELINES.md](./TEAM_GUIDELINES.md) - 完整规范
- [scripts/check-branch-name.js](./scripts/check-branch-name.js) - 检查脚本

### 外部资源

- [Semantic Versioning](https://semver.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Husky Documentation](https://typicode.github.io/husky/)

---

## ✨ 总结

分支命名规范的实施将为团队带来：

✅ **更高的可维护性** - 清晰的分支结构  
✅ **更好的协作效率** - 明确的責任归属  
✅ **更强的规范性** - 自动化的质量保障  
✅ **更少的混乱** - 统一的命名标准

**让我们共同遵守分支命名规范，打造高效的团队协作流程！** 🎉

---

**配置完成时间**: 2024-01-01  
**维护者**: 开发团队
