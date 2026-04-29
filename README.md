# Monorepo Project

基于 pnpm workspace 的 monorepo 项目结构。

> **重要提示**: 本项目强制使用 pnpm 作为包管理工具。请勿使用 npm 或 yarn 安装依赖。

## 项目结构

```
monorepo/
├── apps/                  # 应用目录
│   └── web-app/          # Vue 3 Web 应用
├── config/               # 配置包目录（一级目录）
│   ├── vite-config/     # 共享 Vite 配置
│   ├── tsconfig/        # 共享 TypeScript 配置
│   └── eslint-config/   # 共享 ESLint 配置
├── packages/             # 业务包目录
│   ├── ui/              # UI 组件库
│   ├── utils/           # 工具函数库
│   └── vue-hooks/       # Vue Hooks 库
├── cli/                 # CLI 命令行工具
├── .vscode/             # VSCode 配置
│   ├── settings.json    # 编辑器设置
│   ├── extensions.json  # 推荐插件
│   ├── tasks.json       # 任务配置
│   └── launch.json      # 调试配置
├── package.json         # 根配置文件
├── pnpm-workspace.yaml  # pnpm workspace 配置
├── .npmrc              # pnpm 配置
└── .gitignore
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

> **注意**: 项目配置了 `preinstall` 脚本，如果使用 npm 或 yarn 安装依赖将会失败。

### 2. 配置 VSCode（推荐）

本项目包含完整的 VSCode 配置，提供最佳的开发体验。

**安装推荐插件：**

1. 打开命令面板 (`Ctrl+Shift+P`)
2. 运行 `Extensions: Show Recommended Extensions`
3. 点击安装所有推荐的插件

**主要功能：**

- ✅ 保存时自动格式化
- ✅ 保存时自动修复 ESLint 问题
- ✅ 统一的代码风格
- ✅ 预配置的任务和调试

详见 [.vscode/README.md](.vscode/README.md)

### 开发

```bash
# 启动所有应用的开发服务器
pnpm dev

# 或者单独启动某个应用
cd apps/web-app && pnpm dev
```

### 构建

```bash
# 构建所有项目
pnpm build

# 或者单独构建某个包
cd packages/ui && pnpm build
cd packages/utils && pnpm build
cd cli && pnpm build
```

### 测试 CLI

```bash
cd cli && pnpm start hello --name "World"
cd cli && pnpm start info
cd cli && pnpm start build
```

## 包说明

### @monorepo/web-app

Vue 3 + Vite Web 应用，使用了 `@monorepo/ui` 和 `@monorepo/utils` 包。

### @monorepo/ui

UI 组件库，包含可复用的 Vue 组件（Button、Card 等）。

### @monorepo/utils

工具函数库，包含常用的工具函数（日期格式化、防抖、节流等）。

### @monorepo/vue-hooks

Vue 3 Composition API Hooks 库，提供可复用的组合式函数（如 useCounter）。

### @monorepo/cli

CLI 命令行工具，基于 Commander.js 构建。

### @monorepo/vite-config

共享的 Vite 配置包，提供统一的构建配置。所有需要使用 Vite 的项目都应该继承此包的配置。

### @monorepo/tsconfig

共享的 TypeScript 配置包，提供多种预设配置（Vue 应用、Vue 库、Node.js 库等）。所有项目都应该继承此包的配置以减少重复。

### @monorepo/eslint-config

共享的 ESLint 配置包，基于 `@antfu/eslint-config` v3 和 ESLint v9。提供统一的代码风格规范，支持 Vue 3 和 TypeScript。

## 添加新包

在 `packages/` 目录下创建新的包：

```bash
mkdir packages/new-package
cd packages/new-package
pnpm init
```

确保在 `package.json` 中设置正确的包名（如 `@monorepo/new-package`）。

## Workspace 依赖

在 monorepo 中使用 workspace 协议引用本地包：

```json
{
  "dependencies": {
    "@monorepo/utils": "workspace:*"
  }
}
```

## 为什么使用 pnpm？

本项目强制使用 pnpm 作为包管理工具，原因如下：

1. **更快的安装速度**: pnpm 使用硬链接和符号链接，避免重复复制文件。
2. **磁盘空间效率**: 全局存储包，多个项目共享同一份副本。
3. **严格的依赖管理**: 防止幽灵依赖（phantom dependencies）问题。
4. **原生 Workspace 支持**: 对 monorepo 结构有出色的支持。
5. **一致性**: 确保所有开发者使用相同的包管理工具，避免兼容性问题。
