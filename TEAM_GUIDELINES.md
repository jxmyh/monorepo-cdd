# 团队开发规范

本项目的完整开发规范和最佳实践指南。

## 📋 目录

- [代码规范](#-代码规范)
- [Git 提交规范](#-git-提交规范)
- [分支管理](#-分支管理)
- [项目结构](#-项目结构)
- [开发流程](#-开发流程)
- [Code Review](#-code-review)
- [文档规范](#-文档规范)
- [性能优化](#-性能优化)
- [安全规范](#-安全规范)

---

## 💻 代码规范

### 1. ESLint + Prettier

项目已配置自动化的代码检查和格式化。

**配置位置：**

- `eslint.config.js` - ESLint 规则
- `.prettierrc` - Prettier 配置（如有）
- `.vscode/settings.json` - VSCode 编辑器配置

**使用方式：**

```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix
```

**VSCode 配置：**

- 安装推荐扩展
- 保存时自动格式化和修复
- 实时显示错误

### 2. TypeScript 规范

#### 类型定义

```typescript
// ✅ 好的做法：明确的类型定义
interface User {
  id: number
  name: string
  email: string
  age?: number // 可选属性
}

// ❌ 避免：使用 any
const user: any = {}
```

#### 函数签名

```typescript
// ✅ 好的做法：明确的参数和返回值类型
function getUserById(id: number): Promise<User> {
  // ...
}

// ❌ 避免：缺少类型注解
function getUserById(id) {
  // ...
}
```

#### 泛型使用

```typescript
// ✅ 好的做法：合理使用泛型
function createResponse<T>(data: T, code: number = 200) {
  return { code, data }
}

// 使用
const response = createResponse<User>({ id: 1, name: 'John' })
```

### 3. Vue 组件规范

#### 组件命名

```typescript
// ✅ PascalCase 文件名
MyComponent.vue
UserProfile.vue

// ✅ kebab-case 使用时
<my-component />
<user-profile />
```

#### Script Setup

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Props 定义
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})

// Emits 定义
interface Emits {
  (e: 'update', value: string): void
  (e: 'change', id: number): void
}

const emit = defineEmits<Emits>()

// 响应式数据
const visible = ref(false)

// 计算属性
const doubleCount = computed(() => props.count * 2)

// 方法
function handleClose() {
  visible.value = false
  emit('update', 'closed')
}
</script>
```

#### 模板规范

```vue
<template>
  <!-- ✅ 使用语义化标签 -->
  <article>
    <header>
      <h1>{{ title }}</h1>
    </header>

    <!-- ✅ 使用 v-bind 简写 -->
    <MyComponent :title="title" :count="doubleCount" />

    <!-- ✅ 列表渲染必须有 key -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </article>
</template>
```

### 4. Vant 组件规范

#### 按需引入

```vue
<script setup lang="ts">
// ✅ 无需手动导入，自动按需引入
</script>

<template>
  <van-button type="primary">按钮</van-button>
  <van-cell title="单元格" />
</template>
```

#### 使用代码片段

在 `.vue` 文件中输入：

- `vbutton` + Tab → van-button
- `vform` + Tab → van-form
- `vfield` + Tab → van-field

### 5. UnoCSS 规范

#### 类名组织

```vue
<template>
  <!-- ✅ 按功能分组 -->
  <div
    class="
    flex items-center justify-center  <!-- 布局 -->
    p-4 m-2                          <!-- 间距 -->
    bg-white rounded-lg shadow       <!-- 外观 -->
    text-gray-800 font-bold          <!-- 文本 -->
  "
  >
    Content
  </div>
</template>
```

#### 使用 Shortcuts

```vue
<template>
  <!-- ✅ 使用预定义的 shortcuts -->
  <div class="flex-center h-screen">Centered content</div>

  <div class="card">Card content</div>
</template>
```

---

## 📝 Git 提交规范

### 1. Commit Message 格式

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 2. Type 类型

| Type       | 说明      | 示例                           |
| ---------- | --------- | ------------------------------ |
| `feat`     | 新功能    | `feat(user): 添加用户登录功能` |
| `fix`      | 修复 bug  | `fix(auth): 修复登录验证问题`  |
| `docs`     | 文档变更  | `docs(readme): 更新安装说明`   |
| `style`    | 代码格式  | `style(eslint): 格式化代码`    |
| `refactor` | 重构      | `refactor(api): 重构 API 调用` |
| `perf`     | 性能优化  | `perf(render): 优化渲染性能`   |
| `test`     | 测试相关  | `test(user): 添加单元测试`     |
| `chore`    | 构建/工具 | `chore(deps): 更新依赖`        |
| `ci`       | CI/CD     | `ci(github): 配置自动化部署`   |
| `build`    | 构建系统  | `build(vite): 升级 Vite 版本`  |
| `revert`   | 回退      | `revert: 回退上一个提交`       |

### 3. 提交示例

```bash
# ✅ 好的提交信息
git commit -m "feat(user): 添加用户个人资料页面"
git commit -m "fix(auth): 修复 token 过期处理逻辑"
git commit -m "docs(readme): 更新 API 文档"
git commit -m "refactor(api): 简化 HTTP 请求封装"

# ❌ 不好的提交信息
git commit -m "update"
git commit -m "fix bug"
git commit -m "wip"
```

### 4. 自动检查

项目已配置 Husky + Commitlint，提交时会自动检查：

```bash
# 安装 Husky
pnpm exec husky install

# 提交时会检查
git commit -m "invalid message"  # ❌ 会被拒绝
git commit -m "feat: add feature"  # ✅ 通过
```

---

## 🌿 分支管理规范

### 1. 分支命名格式 ⭐

**强制格式：** `<模块名>_<可能二级>_<可能三级>_v<版本号>_<开发人员>`

**规则说明：**

- ✅ 使用下划线 `_` 分隔各部分
- ✅ 支持驼峰命名（camelCase/PascalCase），如 `mpaPlugin`
- ✅ 也支持小写+连字符，如 `web-app`
- ✅ 必须包含语义化版本号（vX.Y.Z）
- ✅ 必须包含开发人员姓名（拼音或英文名）
- ✅ 允许在模块名中使用连字符 `-`

> ⚠️ **建议**：虽然支持大写字母，但建议使用小写以提高跨平台兼容性和 Git 命令的一致性。

### 2. 分支命名示例

#### 驼峰命名（推荐用于插件/模块）

```bash
# 使用驼峰命名的模块
mpaPlugin_v1.0.0_jxmyh
uiComponent_v2.1.0_zhangsan
vueHook_v1.0.0_lisi
tsConfig_v1.0.0_wangwu
```

#### 应用分支

```bash
# apps 目录下的一级应用
apps_web-app_v1.0.0_zhangsan
apps_mobile-app_v2.1.0_lisi

# 带二级目录
apps_web-app_feature-login_v1.0.0_wangwu
```

#### 包分支

```bash
# packages 目录下的包
packages_ui_v1.0.0_zhaoliu
packages_utils_v1.2.0_chenqi
packages_vue-hooks_v2.0.0_liumeng

# 带二级目录
packages_ui_components_v1.0.0_zhangsan
```

#### 配置分支

```bash
config_vite-config_v1.0.0_wangwu
config_tsconfig_v1.1.0_lisi
config_eslint-config_v2.0.0_zhaoliu
```

#### 功能/修复分支

```bash
# 新功能
feature_user-profile_v1.0.0_zhangsan
feature_payment-integration_v1.0.0_lisi

# Bug 修复
hotfix_login-error_v1.0.1_wangwu
bugfix_memory-leak_v1.0.2_chenqi

# 紧急修复
critical_security-fix_v1.0.3_liumeng
```

### 3. 特殊分支

以下分支名称不需要遵循上述格式：

- `main` / `master` - 生产环境分支
- `develop` / `dev` - 开发环境分支
- `release/*` - 发布分支（可选，建议也遵循规范）

### 4. 自动化检查

项目已配置自动检查分支命名规范：

**检查时机：**

1. **创建分支时** - `git checkout -b` 后自动提示（警告，不阻止）
2. **推送前** - `git push` 时强制检查（必须通过才能推送）
3. **手动检查** - 运行 `node scripts/check-branch-name.js`

**Commit 时的检查：**

- ✅ 只进行代码格式检查（ESLint + Prettier）
- ❌ 不运行测试（避免耗时过长）
- ⚡ 快速反馈，提高开发效率

**跳过检查（不推荐）：**

```bash
SKIP_BRANCH_CHECK=true git push
```

**错误示例：**

```bash
❌ feature-user-login-v1.0.0-zhangsan  # 使用了连字符而非下划线
❌ apps_web-app_zhangsan               # 缺少版本号
❌ apps_web-app_v1.0.0                 # 缺少开发人员
❌ Apps_Web-App_v1.0.0_zhangsan        # 包含大写字母
❌ feature_login                       # 格式完全错误
```

**正确示例：**

```bash
✅ apps_web-app_v1.0.0_zhangsan
✅ packages_ui_v2.1.0_lisi
✅ feature_user-login_v1.0.0_wangwu
✅ hotfix_login-bug_v1.0.1_chenqi
```

### 5. 版本号规范

遵循 [Semantic Versioning](https://semver.org/) 规范：

- **主版本号 (X)**: 不兼容的 API 修改
- **次版本号 (Y)**: 向下兼容的功能性新增
- **修订号 (Z)**: 向下兼容的问题修正

**示例：**

```bash
v1.0.0  # 初始版本
v1.0.1  # Bug 修复
v1.1.0  # 新增功能
v2.0.0  # 重大变更
```

### 6. 分支工作流程

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

### 7. 分支命名规范（旧版，已废弃）

| 分支类型 | 命名格式         | 示例                    |
| -------- | ---------------- | ----------------------- |
| 功能分支 | `feature/<描述>` | `feature/user-login`    |
| 修复分支 | `fix/<描述>`     | `fix/login-bug`         |
| 发布分支 | `release/<版本>` | `release/v1.0.0`        |
| 热修复   | `hotfix/<描述>`  | `hotfix/critical-error` |

> ⚠️ **注意**: 以上为旧版命名方式，请使用新的分支命名格式。

### 8. 工作流程

```bash
# 1. 从 develop 创建功能分支
git checkout develop
git pull
git checkout -b feature/user-profile

# 2. 开发并提交
git add .
git commit -m "feat(profile): 添加用户资料编辑功能"

# 3. 推送到远程
git push origin feature/user-profile

# 4. 创建 Pull Request 到 develop

# 5. Code Review 通过后合并

# 6. 删除功能分支
git branch -d feature/user-profile
```

### 9. Merge 规范

- **必须** 通过 Code Review
- **必须** 通过 CI/CD 检查
- **必须** 解决所有冲突
- **建议** Squash and Merge（压缩提交）

---

## 📁 项目结构

### Monorepo 结构

```
monorepo/
├── apps/                  # 应用
│   └── web-app/          # Web 应用
├── packages/             # 包
│   ├── ui/              # UI 组件库
│   ├── utils/           # 工具函数
│   └── vue-hooks/       # Vue Hooks
├── config/              # 配置
│   ├── vite-config/     # Vite 配置
│   ├── tsconfig/        # TypeScript 配置
│   └── eslint-config/   # ESLint 配置
├── cli/                 # CLI 工具
├── .husky/              # Git Hooks
├── .vscode/             # VSCode 配置
├── package.json         # 根配置
├── pnpm-workspace.yaml  # pnpm workspace
└── README.md            # 项目说明
```

### 应用结构

```
apps/web-app/
├── src/
│   ├── components/      # 通用组件
│   ├── views/          # 页面组件
│   ├── composables/    # 组合式函数
│   ├── stores/         # Pinia stores
│   ├── types/          # 类型定义
│   ├── utils/          # 工具函数
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── public/             # 静态资源
├── package.json
├── vite.config.ts
├── uno.config.ts
└── README.md
```

### 文件命名规范

- **组件**: `PascalCase.vue` (UserProfile.vue)
- **Composables**: `use<PascalCase>.ts` (useUser.ts)
- **Stores**: `use<PascalCase>Store.ts` (useUserStore.ts)
- **Types**: `PascalCase.ts` (User.ts)
- **Utils**: `camelCase.ts` (formatDate.ts)

---

## 🔄 开发流程

### 1. 开始新功能

```bash
# 1. 切换到 develop 分支
git checkout develop
git pull

# 2. 创建功能分支
git checkout -b feature/new-feature

# 3. 安装依赖（如果需要）
pnpm install

# 4. 启动开发服务器
pnpm dev
```

### 2. 开发中

```bash
# 定期提交
git add .
git commit -m "feat: implement feature part 1"

# 同步远程 develop 的更新
git fetch origin
git rebase origin/develop
```

### 3. 完成开发

```bash
# 1. 运行测试
pnpm test

# 2. 运行 lint
pnpm lint:fix

# 3. 构建检查
pnpm build

# 4. 提交最终代码
git add .
git commit -m "feat: complete new feature"

# 5. 推送并创建 PR
git push origin feature/new-feature
```

### 4. Code Review

- 创建 Pull Request 到 `develop`
- 至少需要 1 人 Review
- 解决所有评论和建议
- CI/CD 检查通过

### 5. 合并和部署

```bash
# Review 通过后，Squash and Merge 到 develop

# 发布到生产环境
git checkout main
git merge release/v1.0.0
git tag v1.0.0
git push origin main --tags
```

---

## 👀 Code Review

### 1. Review 清单

#### 代码质量

- [ ] 代码是否清晰易读？
- [ ] 是否有重复代码？
- [ ] 是否遵循项目规范？
- [ ] 是否有适当的注释？

#### 功能正确性

- [ ] 功能是否按需求实现？
- [ ] 边界情况是否处理？
- [ ] 错误处理是否完善？

#### 性能

- [ ] 是否有性能问题？
- [ ] 是否有内存泄漏风险？
- [ ] 是否做了不必要的计算？

#### 安全性

- [ ] 是否有安全漏洞？
- [ ] 敏感信息是否泄露？
- [ ] 输入是否验证？

#### 测试

- [ ] 是否有单元测试？
- [ ] 测试覆盖率是否足够？
- [ ] 测试用例是否合理？

### 2. Review 建议

#### 提建议的方式

````markdown
<!-- ❌ 不好 -->

这段代码有问题

<!-- ✅ 好 -->

建议将这里的 `any` 改为具体的类型，例如：

```typescript
interface UserData {
  id: number
  name: string
}
```
````

这样可以提高类型安全性。

````

#### 关注点

1. **先肯定优点**
2. **指出具体问题**
3. **提供改进建议**
4. **解释原因**

### 3. Review 时间

- 小型 PR (< 200 行): 24 小时内
- 中型 PR (200-500 行): 48 小时内
- 大型 PR (> 500 行): 考虑拆分

---

## 📖 文档规范

### 1. README 结构

每个包/应用都应该有 README.md：

```markdown
# Package Name

简短描述

## 安装

```bash
pnpm add @monorepo/package-name
````

## 使用

```typescript
import { something } from '@monorepo/package-name'
```

## API

### functionName

描述

**参数：**

- param1: 描述

**返回：**

- 返回值描述

**示例：**

```typescript
// 代码示例
```

## 相关文档

- [链接1]()
- [链接2]()

````

### 2. 代码注释

```typescript
/**
 * 获取用户信息
 * @param userId - 用户 ID
 * @returns 用户信息对象
 * @throws {Error} 用户不存在时抛出错误
 *
 * @example
 * ```typescript
 * const user = await getUserById(123)
 * ```
 */
async function getUserById(userId: number): Promise<User> {
  // 实现...
}
````

### 3. 更新日志

在 `CHANGELOG.md` 中记录重要变更：

```markdown
# Changelog

## [1.0.0] - 2024-01-01

### Added

- 添加用户登录功能
- 添加个人资料页面

### Fixed

- 修复登录验证问题

### Changed

- 更新依赖版本
```

---

## ⚡ 性能优化

### 1. Vue 性能

#### 组件懒加载

```typescript
// ✅ 路由级别懒加载
const UserProfile = () => import('@/views/UserProfile.vue')

// ✅ 组件级别懒加载
const HeavyComponent = defineAsyncComponent(() => import('@/components/HeavyComponent.vue'))
```

#### 合理使用响应式

```typescript
// ✅ 只将需要的数据设为响应式
const state = reactive({
  name: '',
  email: '',
})

// ❌ 避免将整个大对象设为响应式
const bigData = reactive(hugeObject)
```

#### 列表优化

```vue
<template>
  <!-- ✅ 使用唯一的 key -->
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>

  <!-- ✅ 虚拟滚动（大数据量） -->
  <RecycleScroller :items="items" :item-size="50">
    <template #default="{ item }">
      <div>{{ item.name }}</div>
    </template>
  </RecycleScroller>
</template>
```

### 2. 打包优化

#### 代码分割

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          vant: ['vant'],
        },
      },
    },
  },
})
```

#### 按需引入

已配置 Vant 和 UnoCSS 的按需引入，无需额外配置。

### 3. 网络优化

#### 图片优化

```vue
<template>
  <!-- ✅ 使用合适的格式和尺寸 -->
  <img src="/images/photo.webp" loading="lazy" width="400" height="300" />
</template>
```

#### API 缓存

```typescript
// 使用 SWR 或 React Query 类似的方案
import { useQuery } from '@tanstack/vue-query'

const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => getUserById(userId),
  staleTime: 5 * 60 * 1000, // 5分钟内不重新请求
})
```

---

## 🔒 安全规范

### 1. 敏感信息

```typescript
// ❌ 不要硬编码敏感信息
const apiKey = 'sk-123456789'

// ✅ 使用环境变量
const apiKey = import.meta.env.VITE_API_KEY
```

**.env 文件：**

```bash
# .env.local (不提交到 Git)
VITE_API_KEY=your-api-key
```

**.gitignore：**

```
.env.local
.env.*.local
```

### 2. XSS 防护

```vue
<template>
  <!-- ✅ Vue 自动转义 -->
  <div>{{ userInput }}</div>

  <!-- ⚠️ 谨慎使用 v-html -->
  <div v-html="sanitizedHtml"></div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'

const sanitizedHtml = computed(() => DOMPurify.sanitize(rawHtml))
</script>
```

### 3. CSRF 防护

```typescript
// API 请求携带 token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### 4. 依赖安全

```bash
# 定期检查依赖漏洞
pnpm audit

# 更新依赖
pnpm update
```

---

## 📊 监控和日志

### 1. 错误监控

```typescript
// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue Error:', err, info)
  // 上报到监控系统
  reportError(err, { component: instance?.type.name })
}

// Promise 错误
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason)
  reportError(event.reason)
})
```

### 2. 性能监控

```typescript
// 页面加载时间
window.addEventListener('load', () => {
  const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  console.log('Page Load Time:', timing.loadEventEnd - timing.startTime)
})
```

---

## 🎯 最佳实践总结

### Do's ✅

- ✅ 编写清晰的代码和注释
- ✅ 遵循命名规范
- ✅ 编写单元测试
- ✅ 及时更新文档
- ✅ 进行 Code Review
- ✅ 使用 TypeScript 类型
- ✅ 处理边界情况
- ✅ 定期更新依赖

### Don'ts ❌

- ❌ 不要使用 `any` 类型
- ❌ 不要硬编码敏感信息
- ❌ 不要提交调试代码
- ❌ 不要忽略 ESLint 错误
- ❌ 不要写超大的组件
- ❌ 不要忽略错误处理
- ❌ 不要直接修改 props
- ❌ 不要忘记清理定时器/监听器

---

## 📚 学习资源

### 官方文档

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vant](https://vant-contrib.gitee.io/vant/)
- [UnoCSS](https://unocss.dev/)
- [pnpm](https://pnpm.io/)

### 规范标准

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

### 工具

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
- [Commitlint](https://commitlint.js.org/)

---

## 🔄 持续改进

本规范会随着项目发展不断完善，欢迎团队成员提出建议和补充。

**如何贡献：**

1. Fork 项目
2. 创建分支 `docs/update-guidelines`
3. 提交修改
4. 创建 Pull Request
5. Team Review 后合并

---

**最后更新：** 2024-01-01  
**维护者：** 开发团队
