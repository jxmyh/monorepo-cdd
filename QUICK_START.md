# 团队规范化快速开始指南

## 🎯 已完成的规范化配置

### ✅ 1. 代码质量保障

#### ESLint + Prettier

- **配置文件**: `eslint.config.js`
- **自动修复**: 保存时自动执行
- **构建检查**: `pnpm build` 前自动运行

**使用方式：**

```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix
```

#### TypeScript 类型检查

- **工具**: vue-tsc
- **配置**: `tsconfig.json`
- **执行**: 构建前自动检查

```bash
# 单独运行类型检查
pnpm type-check
```

---

### ✅ 2. Git 提交规范

#### Commitlint + Husky

- **配置文件**: `commitlint.config.js`
- **Git Hooks**: `.husky/` 目录
- **自动检查**: 提交时自动验证

**提交格式：**

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
git commit -m "feat(user): 添加用户登录功能"
git commit -m "fix(auth): 修复 token 过期问题"
git commit -m "docs(readme): 更新安装说明"
```

---

### ✅ 3. 提交前自动检查

#### Lint-staged

- **配置位置**: `package.json` 中的 `lint-staged` 字段
- **触发时机**: `git commit` 前自动执行
- **检查范围**: 仅检查暂存的文件

**配置内容：**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

**工作流程：**

```bash
git add .
git commit -m "feat: add feature"
# ↓ 自动执行：
# 1. eslint --fix (修复 JS/TS/Vue 文件)
# 2. prettier --write (格式化所有文件)
# 3. commitlint (检查提交信息)
# ↓ 全部通过后才会提交
```

---

### ✅ 4. VSCode 开发环境

#### 推荐扩展

已在 `.vscode/extensions.json` 中配置：

**必装扩展：**

- Vue - Official (Volar) - Vue 3 语言支持
- ESLint - 代码检查
- fishku.vant-snippets - Vant 代码片段
- unocss.unocss - UnoCSS 智能提示

**安装方式：**

1. 按 `Ctrl+Shift+P`
2. 输入 "Extensions: Show Recommended Extensions"
3. 点击 "Install All"
4. **重启 VSCode**

#### 编辑器配置

已在 `.vscode/settings.json` 中配置：

- 保存时自动格式化
- 保存时自动修复 ESLint 错误
- TypeScript 工作区版本
- Vue 服务器配置

---

### ✅ 5. 项目结构规范

#### Monorepo 结构

```
monorepo/
├── apps/              # 应用
│   └── web-app/      # Web 应用
├── packages/         # 共享包
│   ├── ui/          # UI 组件
│   ├── utils/       # 工具函数
│   └── vue-hooks/   # Vue Hooks
├── config/           # 配置包
│   ├── vite-config/
│   ├── tsconfig/
│   └── eslint-config/
├── cli/              # CLI 工具
├── .husky/           # Git Hooks
├── .vscode/          # VSCode 配置
└── TEAM_GUIDELINES.md # 团队规范文档
```

#### 文件命名规范

- **组件**: `PascalCase.vue` (UserProfile.vue)
- **Composables**: `use<PascalCase>.ts` (useUser.ts)
- **Stores**: `use<PascalCase>Store.ts` (useUserStore.ts)
- **Types**: `PascalCase.ts` (User.ts)
- **Utils**: `camelCase.ts` (formatDate.ts)

---

### ✅ 6. 分支管理规范 ⭐ 新增

#### 分支命名格式

**强制格式：** `<一级目录>_<可能二级>_<可能三级>_v<版本号>_<开发人员>`

**示例：**

```bash
apps_web-app_v1.0.0_zhangsan
packages_ui_v2.1.0_lisi
config_vite-config_v1.0.0_wangwu
feature_user-login_v1.0.0_zhaoliu
```

#### 自动化检查

项目已配置自动检查分支命名规范：

- **创建分支时** - `git checkout -b` 后自动提示（警告）
- **推送前** - `git push` 时强制检查（必须通过）
- **手动检查** - `node scripts/check-branch-name.js`

**Commit 时的检查：**

- ✅ 只进行代码格式检查（ESLint + Prettier）
- ❌ 不运行测试（避免耗时过长）

跳过检查（不推荐）：`SKIP_BRANCH_CHECK=true git push`

**详细文档：** [TEAM_GUIDELINES.md - 分支管理规范](./TEAM_GUIDELINES.md#-分支管理规范)

---

### ✅ 6. 开发工具与特性

#### JSX/TSX 支持

项目完全支持在 Vue 3 中使用 JSX/TSX 语法：

**使用方式：**

```tsx
/** @jsxImportSource vue */
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    
    return () => (
      <div>
        <h1>计数: {count.value}</h1>
        <button onClick={() => count.value++}>增加</button>
      </div>
    )
  },
})
```

**注意事项：**
- 文件顶部必须添加 `/** @jsxImportSource vue */` 注释
- 使用 `.tsx` 或 `.jsx` 扩展名
- TypeScript 类型检查正常工作
- 支持所有 Vue 3 特性

**详细文档：** [TEAM_GUIDELINES.md - JSX/TSX 规范](./TEAM_GUIDELINES.md)

#### VueUse 自动引入

VueUse composables 已配置自动引入，无需手动 import：

**使用示例：**

```vue
<script setup>
// 直接使用，无需 import
const { x, y } = useMouse()
const { width, height } = useWindowSize()
const isDark = useDark()
</script>

<template>
  <div>
    <p>鼠标位置: {{ x }}, {{ y }}</p>
    <p>窗口大小: {{ width }} x {{ height }}</p>
  </div>
</template>
```

**支持的库：**
- ✅ `@vueuse/core` - 核心 composables
- ✅ `vue` - Vue API
- ✅ `vue-router` - 路由 API
- ✅ `pinia` - 状态管理

**类型定义：** 自动生成到 `types/auto-imports.d.ts`

#### Vant UI 组件库

Vant 4.x 已配置按需引入：

```vue
<script setup>
// 自动引入，无需手动 import
const onClick = () => {
  showToast('点击了按钮')
}
</script>

<template>
  <van-button type="primary" @click="onClick">按钮</van-button>
</template>
```

---

### ✅ 7. 文档规范

#### 完整文档体系

- **TEAM_GUIDELINES.md** - 团队开发规范（885行）
- **apps/web-app/README.md** - Web App 使用指南（915行）
- 每个包都有独立的 README.md

#### 文档内容覆盖

- ✅ 代码规范
- ✅ Git 提交规范
- ✅ 分支管理
- ✅ 项目结构
- ✅ 开发流程
- ✅ Code Review
- ✅ 性能优化
- ✅ 安全规范
- ✅ 故障排除

---

## 🚀 快速开始

### 1. 初始化项目

```bash
# 克隆项目
git clone <repository-url>
cd monorepo

# 安装依赖
pnpm install

# 初始化 Husky（如果还没有）
pnpm exec husky init
```

### 2. 配置 VSCode

```bash
# 安装推荐扩展
# Ctrl+Shift+P → "Extensions: Show Recommended Extensions" → Install All

# 重启 VSCode
```

### 3. 开始开发

```bash
# 创建功能分支
git checkout develop
git checkout -b feature/my-feature

# 启动开发服务器
pnpm dev

# 开发完成后提交
git add .
git commit -m "feat: add my feature"

# 推送并创建 PR
git push origin feature/my-feature
```

---

## 📋 日常开发检查清单

### 提交前

- [ ] 运行 `pnpm lint:fix` 修复代码问题
- [ ] 运行 `pnpm type-check` 检查类型
- [ ] 运行 `pnpm build` 确保构建成功
- [ ] 编写清晰的 commit message
- [ ] 更新相关文档（如有需要）

### Code Review

- [ ] 代码是否清晰易读？
- [ ] 是否遵循项目规范？
- [ ] 是否有适当的测试？
- [ ] 是否有性能问题？
- [ ] 是否有安全隐患？

### 合并前

- [ ] CI/CD 检查通过
- [ ] 至少 1 人 Review 通过
- [ ] 所有评论已解决
- [ ] 冲突已解决

---

## 🔧 常用命令速查

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
pnpm type-check       # 类型检查
```

### Git

```bash
git status            # 查看状态
git add .             # 添加所有文件
git commit -m "msg"   # 提交（会自动检查）
git push              # 推送
```

### 依赖管理

```bash
pnpm install          # 安装依赖
pnpm add <pkg>        # 添加依赖
pnpm remove <pkg>     # 移除依赖
pnpm update           # 更新依赖
pnpm audit            # 检查安全漏洞
```

---

## ⚠️ 常见问题

### Q1: Commit 被拒绝怎么办？

**原因**: 提交信息不符合规范

**解决**:

```bash
# 查看错误信息，按要求修改
git commit --amend -m "feat(scope): correct message"
```

### Q2: Lint-staged 检查失败？

**原因**: 代码有 ESLint 错误或格式化问题

**解决**:

```bash
# 自动修复
pnpm lint:fix

# 重新添加并提交
git add .
git commit -m "feat: ..."
```

### Q3: 如何跳过 Husky 检查？

**不推荐**，但紧急情况下：

```bash
git commit -m "msg" --no-verify
```

### Q4: VSCode 扩展不工作？

**解决**:

1. 确认扩展已安装
2. 重启 VSCode
3. 重新加载窗口: `Ctrl+Shift+P` → "Developer: Reload Window"

---

## 📚 学习资源

### 必读文档

- [TEAM_GUIDELINES.md](./TEAM_GUIDELINES.md) - 完整团队规范
- [apps/web-app/README.md](./apps/web-app/README.md) - Web App 指南

### 外部资源

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [ESLint 规则](https://eslint.org/docs/rules/)

---

## 🎯 下一步行动

### 对于新成员

1. ✅ 阅读 TEAM_GUIDELINES.md
2. ✅ 安装 VSCode 推荐扩展
3. ✅ 熟悉项目结构
4. ✅ 尝试创建一个简单的功能分支
5. ✅ 提交第一个符合规范的 commit

### 对于团队

1. ✅ 定期 Review 规范执行情况
2. ✅ 收集团队反馈，持续改进
3. ✅ 组织内部分享，统一认知
4. ✅ 更新文档，保持同步

---

## 💡 最佳实践提醒

### Do's ✅

- ✅ 写清晰的 commit message
- ✅ 及时更新文档
- ✅ 进行 Code Review
- ✅ 编写单元测试
- ✅ 处理边界情况
- ✅ 使用 TypeScript 类型

### Don'ts ❌

- ❌ 不要使用 `any` 类型
- ❌ 不要硬编码敏感信息
- ❌ 不要提交调试代码
- ❌ 不要忽略 ESLint 错误
- ❌ 不要写超大的组件
- ❌ 不要忘记清理资源

---

**记住**: 规范的目的是提高团队协作效率和代码质量，而不是束缚创造力。在遵循规范的基础上，欢迎提出改进建议！🚀

**最后更新**: 2024-01-01  
**维护者**: 开发团队
