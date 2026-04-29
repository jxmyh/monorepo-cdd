# Monorepo Project

基于 pnpm workspace 的 monorepo 项目，包含完整的团队开发规范和质量保障体系。

> **重要提示**: 本项目强制使用 pnpm 作为包管理工具。请勿使用 npm 或 yarn 安装依赖。

## 📋 目录

- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [团队规范](#-团队规范)
- [开发工作流](#-开发工作流)
- [代码质量](#-代码质量)
- [分支管理](#-分支管理)
- [包说明](#-包说明)
- [常用命令](#-常用命令)

---

## 🚀 快速开始

### 1. 环境要求

- Node.js >= 18
- pnpm >= 8
- Git
- VSCode（推荐）

### 2. 安装依赖

```bash
pnpm install
```

> **注意**: 项目配置了 `preinstall` 脚本，如果使用 npm 或 yarn 安装依赖将会失败。

### 3. 配置 VSCode

**安装推荐插件：**

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 运行 `Extensions: Show Recommended Extensions`
3. 点击安装所有推荐的插件

**主要功能：**

- ✅ 保存时自动格式化
- ✅ 保存时自动修复 ESLint 问题
- ✅ Vue/TypeScript 智能提示
- ✅ Vant/UnoCSS 代码片段

### 4. 启动开发

```bash
# 启动所有应用
pnpm dev

# 或单独启动某个应用
cd apps/web-app && pnpm dev
```

---

## 📁 项目结构

```
monorepo/
├── apps/                  # 应用目录
│   └── web-app/          # Vue 3 Web 应用
├── config/               # 配置包目录
│   ├── vite-config/     # 共享 Vite 配置
│   ├── tsconfig/        # 共享 TypeScript 配置
│   └── eslint-config/   # 共享 ESLint 配置
├── packages/             # 业务包目录
│   ├── ui/              # UI 组件库
│   ├── utils/           # 工具函数库
│   └── vue-hooks/       # Vue Hooks 库
├── cli/                  # CLI 命令行工具
├── scripts/              # 自动化脚本
├── .husky/               # Git Hooks
├── .vscode/              # VSCode 配置
├── package.json          # 根配置
├── pnpm-workspace.yaml   # pnpm workspace
├── eslint.config.js      # ESLint 配置
├── commitlint.config.js  # Commitlint 配置
└── .prettierrc           # Prettier 配置
```

---

## 📖 团队规范

### 代码规范

#### ESLint + Prettier

- 自动代码格式化和修复
- 保存时自动执行
- Commit 前自动检查

#### TypeScript

- 严格的类型检查
- 构建前自动验证
- 避免使用 `any` 类型

### Git 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>
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

**示例：**

```bash
✅ git commit -m "feat(user): 添加用户登录功能"
✅ git commit -m "fix(auth): 修复 token 过期问题"
❌ git commit -m "update"
❌ git commit -m "fix bug"
```

### 分支命名规范 ⭐

**强制格式：** `<一级目录>_<可能二级>_<可能三级>_v<版本号>_<开发人员>`

**规则：**

- ✅ 使用下划线 `_` 分隔
- ✅ 全部小写
- ✅ 必须包含版本号（vX.Y.Z）
- ✅ 必须包含开发人员姓名

**示例：**

```bash
✅ apps_web-app_v1.0.0_zhangsan
✅ packages_ui_v2.1.0_lisi
✅ config_vite-config_v1.0.0_wangwu
✅ feature_user-login_v1.0.0_zhaoliu

❌ feature-user-login-v1.0.0-zhangsan  # 使用了连字符
❌ apps_web-app_zhangsan               # 缺少版本号
❌ apps_web-app_v1.0.0                 # 缺少开发人员
```

**自动化检查：**

- 创建分支时：自动提示（警告）
- 推送前：强制检查（必须通过）
- 跳过检查：`SKIP_BRANCH_CHECK=true git push`（不推荐）

---

## 🔄 开发工作流

### 日常开发流程

```bash
# 1. 从 develop 创建功能分支
git checkout develop
git pull
git checkout -b apps_web-app_v1.0.0_zhangsan

# 2. 开发和提交
git add .
git commit -m "feat: add feature"  # 自动检查代码格式

# 3. 推送（自动检查分支名称）
git push origin apps_web-app_v1.0.0_zhangsan

# 4. 创建 Pull Request
# 5. Code Review
# 6. 合并到 develop
```

### Commit 流程

```bash
git add .
git commit -m "feat: ..."
  ↓
Pre-commit Hook
  ├─ ESLint 检查并修复
  └─ Prettier 格式化
  ↓
Commit-msg Hook
  └─ 验证提交信息格式
  ↓
✅ Commit 成功（2-5秒）
```

### Push 流程

```bash
git push
  ↓
Pre-push Hook
  └─ 检查分支命名规范
  ↓
✅ 符合规范 → 推送成功
❌ 不符合 → 拒绝推送
```

---

## 💎 代码质量

### 自动化检查

| 时机          | 检查内容            | 严格程度           |
| ------------- | ------------------- | ------------------ |
| **保存时**    | ESLint + Prettier   | 自动修复           |
| **Commit 时** | 代码格式检查        | 强制（不运行测试） |
| **Push 前**   | 分支命名规范        | 强制               |
| **构建时**    | ESLint + TypeScript | 强制               |

### 为什么不 Commit 时运行测试？

- ⚡ **速度优先** - 测试可能很慢，影响开发体验
- 🎯 **职责分离** - Commit 关注代码质量，CI/CD 关注功能正确性
- 📦 **频繁提交** - 鼓励小步提交，不被测试阻塞

**测试应该在哪里运行？**

- 本地手动：`pnpm test`
- CI/CD 自动：推送后自动运行
- 发布前：完整测试套件

---

## 🌿 分支管理

### 分支策略

采用 Git Flow 简化版：

```
main (生产环境)
  ↑
release/* (发布分支)
  ↑
develop (开发环境)
  ↑
feature/* (功能分支)
  ↑
hotfix/* (紧急修复)
```

### 特殊分支

以下分支不需要遵循命名规范：

- `main` / `master` - 生产环境
- `develop` / `dev` - 开发环境

### 版本管理规范

遵循 [Semantic Versioning](https://semver.org/)：

- **主版本号 (X)**: 不兼容的 API 修改
- **次版本号 (Y)**: 向下兼容的功能性新增
- **修订号 (Z)**: 向下兼容的问题修正

```bash
v1.0.0  # 初始版本
v1.0.1  # Bug 修复
v1.1.0  # 新增功能
v2.0.0  # 重大变更
```

---

## 📦 包说明

### 应用层

#### @monorepo/web-app

Vue 3 + Vite + Vant + UnoCSS Web 应用

### 配置层

#### @monorepo/vite-config

共享的 Vite 配置包，提供统一的构建配置。

#### @monorepo/tsconfig

共享的 TypeScript 配置包，提供多种预设配置。

#### @monorepo/eslint-config

共享的 ESLint 配置包，基于 `@antfu/eslint-config` v3。

### 业务层

#### @monorepo/ui

UI 组件库，包含可复用的 Vue 组件。

#### @monorepo/utils

工具函数库，包含常用的工具函数。

#### @monorepo/vue-hooks

Vue 3 Composition API Hooks 库。

### 工具层

#### @monorepo/cli

CLI 命令行工具，基于 Commander.js 构建。

---

## 🛠️ 常用命令

### 开发

```bash
pnpm dev              # 启动开发服务器
pnpm build            # 构建生产版本
pnpm preview          # 预览生产构建
```

### 代码质量

```bash
pnpm lint             # 检查代码
pnpm lint:fix         # 自动修复
```

### 测试

```bash
pnpm test             # 运行测试
pnpm test:watch       # 监听模式
pnpm test:coverage    # 覆盖率报告
```

### Git

```bash
git add .                      # 添加文件
git commit -m "msg"            # 提交（自动检查）
git push                       # 推送（自动检查分支名）
SKIP_BRANCH_CHECK=true git push # 跳过分支检查（不推荐）
```

### 依赖管理

```bash
pnpm install          # 安装依赖
pnpm add <pkg>        # 添加依赖
pnpm remove <pkg>     # 移除依赖
pnpm update           # 更新依赖
pnpm audit            # 安全检查
```

---

## 🔧 高级配置

### 添加新包

```bash
mkdir packages/new-package
cd packages/new-package
pnpm init
```

确保在 `package.json` 中设置正确的包名（如 `@monorepo/new-package`）。

### Workspace 依赖

```json
{
  "dependencies": {
    "@monorepo/utils": "workspace:*"
  }
}
```

### 为什么使用 pnpm？

1. **更快的安装速度** - 使用硬链接和符号链接
2. **磁盘空间效率** - 全局存储包，多项目共享
3. **严格的依赖管理** - 防止幽灵依赖
4. **原生 Workspace 支持** - 出色的 monorepo 支持
5. **一致性** - 确保所有开发者使用相同工具

---

## 📚 详细文档

以下文档提供更详细的信息：

- **[TEAM_GUIDELINES.md](./TEAM_GUIDELINES.md)** - 完整团队开发规范（885行）
- **[QUICK_START.md](./QUICK_START.md)** - 快速开始指南（424行）
- **[BRANCH_NAMING_GUIDE.md](./BRANCH_NAMING_GUIDE.md)** - 分支命名快速参考（154行）
- **[CHECKLIST.md](./CHECKLIST.md)** - 开发检查清单（234行）
- **[apps/web-app/README.md](./apps/web-app/README.md)** - Web App 详细指南（915行）

---

## ❓ 常见问题

### Q: Commit 太慢怎么办？

A: Commit 时只运行代码格式检查（ESLint + Prettier），不运行测试。通常 2-5 秒完成。

### Q: 如何跳过分支命名检查？

A: `SKIP_BRANCH_CHECK=true git push`（仅在紧急情况下使用）

### Q: 分支命名错误如何修正？

A:

```bash
git branch -m old-name apps_web-app_v1.0.0_zhangsan
git push origin --delete old-name
git push origin apps_web-app_v1.0.0_zhangsan
```

### Q: ESLint 报错如何处理？

A:

```bash
pnpm lint:fix  # 自动修复
```

---

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支（遵循命名规范）
3. 提交更改（遵循提交规范）
4. 推送到分支
5. 创建 Pull Request
6. Code Review
7. 合并到主分支

---

## 📄 License

ISC

---

**最后更新**: 2024-01-01  
**维护者**: 开发团队
