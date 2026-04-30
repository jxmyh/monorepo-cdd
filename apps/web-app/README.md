# Web App 开发指南

完整的 Vue 3 + Vant 4.x + UnoCSS 项目开发配置和使用指南。

## 📋 目录

- [快速开始](#-快速开始)
- [项目配置](#-项目配置)
- [Vant UI 组件库](#-vant-ui-组件库)
- [UnoCSS 原子化 CSS](#-unocss-原子化-css)
- [代码质量保障](#-代码质量保障)
- [类型检查](#-类型检查)
- [VSCode 配置](#-vscode-配置)
- [工作流程](#-工作流程)
- [故障排除](#-故障排除)

---

## 🚀 快速开始

### 开发环境要求

- Node.js >= 18
- pnpm >= 8
- VSCode（推荐）

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问：http://localhost:3000/html/Vue3Test/gitjs/

### 构建生产版本

```bash
pnpm build
```

---

### 目录结构

apps/web-app/
├── public/ ✨ 新增 - 公共资源
├── src/
│ ├── assets/ ✨ 新增 - 静态资源
│ ├── components/ ✅ 已有 - 公共组件 (3个文件)
│ ├── composables/ ✨ 新增 - 组合式函数 (含 index.ts)
│ ├── layouts/ ✨ 新增 - 布局组件
│ ├── pages/ ✨ 新增 - 页面组件
│ ├── router/ ✨ 新增 - 路由配置
│ ├── stores/ ✨ 新增 - Pinia 状态管理
│ ├── styles/ ✨ 新增 - 全局样式 (含 index.css)
│ ├── utils/ ✨ 新增 - 工具函数 (含 index.ts)
│ ├── App.vue ✅ 已有 - 根组件
│ ├── main.ts ✅ 已更新 - 引入全局样式
│ └── README.md ✨ 新增 - 目录说明文档
├── types/ ✅ 已有 - 类型声明 (自动生成)
└── 配置文件...

## ⚙️ 项目配置

### Vite 配置

```typescript
// vite.config.ts
import { createViteConfig } from '@monorepo/vite-config'

export default createViteConfig({
  vant: true, // 启用 Vant 按需引入
  unocss: true, // 启用 UnoCSS
  custom: {
    base: '/html/Vue3Test/gitjs/',
    server: {
      port: 3000,
    },
  },
})
```

### UnoCSS 配置

```typescript
// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['card', 'bg-white rounded-lg shadow p-4'],
    ['btn-primary', 'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600'],
  ],
  theme: {
    colors: {
      primary: '#1989fa',
      success: '#07c160',
      warning: '#ff976a',
      danger: '#ee0a24',
    },
  },
})
```

### main.ts

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css' // 导入 UnoCSS

createApp(App).mount('#app')
```

---

## 📱 Vant UI 组件库

### 三种开发方式

#### 方式 1：代码片段（最快）⭐

**安装插件：** `fishku.vant-snippets`

在 `.vue` 文件中输入前缀 + `Tab`：

| 前缀      | 组件       | 说明   |
| --------- | ---------- | ------ |
| `vbutton` | van-button | 按钮   |
| `vform`   | van-form   | 表单   |
| `vfield`  | van-field  | 输入框 |
| `vtabs`   | van-tabs   | 标签页 |
| `vcell`   | van-cell   | 单元格 |
| `vpicker` | van-picker | 选择器 |

**示例：**

```vue
<!-- 输入 vbutton + Tab -->
<van-button type="primary">按钮</van-button>

<!-- 输入 vform + Tab -->
<van-form @submit="onSubmit">
  <van-field v-model="username" label="用户名" />
</van-form>
```

#### 方式 2：类型提示（最智能）

依赖 **Vue - Official (Volar)** 扩展，提供完整的属性提示和类型检查。

```vue
<van-button
  type="primary"    <!-- 输入 type= 时自动提示可用值 -->
  size="large"      <!-- 输入 size= 时自动提示尺寸选项 -->
  @click="handleClick"
/>
```

#### 方式 3：自动导入（最方便）

无需手动 import，直接使用组件：

```vue
<script setup lang="ts">
// 无需 import { VanButton } from 'vant'
</script>

<template>
  <van-button>按钮</van-button>
  <van-cell>单元格</van-cell>
</template>
```

### 常用组件示例

#### Button 按钮

```vue
<van-button type="primary" size="large" block>
  主要按钮
</van-button>
```

#### Form 表单

```vue
<van-form @submit="onSubmit">
  <van-field
    v-model="username"
    label="用户名"
    placeholder="请输入用户名"
    required
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-button native-type="submit" block type="primary">
    提交
  </van-button>
</van-form>
```

#### Tabs 标签页

```vue
<van-tabs v-model:active="active">
  <van-tab title="标签 1">内容 1</van-tab>
  <van-tab title="标签 2">内容 2</van-tab>
</van-tabs>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
</script>
```

### TypeScript 类型支持

```vue
<script setup lang="ts">
import type { FormInstance, FieldRule } from 'vant'

const formRef = ref<FormInstance>()
const rules: FieldRule[] = [{ required: true, message: '请填写用户名' }]

async function onSubmit() {
  await formRef.value?.validate()
  // 提交逻辑
}
</script>

<template>
  <van-form ref="formRef" :rules="rules" @submit="onSubmit">
    <van-field name="username" label="用户名" />
  </van-form>
</template>
```

---

## 🎨 UnoCSS 原子化 CSS

### 基础用法

```vue
<template>
  <!-- Flexbox -->
  <div class="flex items-center justify-center">Center Content</div>

  <!-- Spacing -->
  <div class="p-4 m-2">Padding and Margin</div>

  <!-- Colors -->
  <div class="bg-blue-500 text-white">Blue Background</div>

  <!-- Typography -->
  <h1 class="text-2xl font-bold">Large Bold Text</h1>

  <!-- Responsive -->
  <div class="w-full md:w-1/2 lg:w-1/3">Responsive Width</div>
</template>
```

### 自定义 Shortcuts

项目中已配置的快捷方式：

```vue
<template>
  <!-- 使用 flex-center -->
  <div class="flex-center h-screen">Centered content</div>

  <!-- 使用 card -->
  <div class="card">Card with white background and shadow</div>

  <!-- 使用 btn-primary -->
  <button class="btn-primary">Primary Button</button>
</template>
```

### 自定义主题色

```vue
<template>
  <div class="bg-primary text-white">Primary Color</div>
  <div class="bg-success text-white">Success Color</div>
  <div class="bg-warning">Warning Color</div>
  <div class="bg-danger text-white">Danger Color</div>
</template>
```

### 属性化模式

```vue
<template>
  <div flex="~" items="center" justify="center" p="4" bg="blue-500" text="white">
    Attribute Mode
  </div>
</template>
```

### 常用类名速查

#### 布局

- `flex`, `flex-col`, `flex-center`
- `grid`, `grid-cols-3`
- `items-center`, `justify-between`

#### 间距

- `p-4`, `px-4`, `py-2` (padding)
- `m-4`, `mx-auto`, `mt-4` (margin)
- `gap-4`, `space-y-2`

#### 尺寸

- `w-full`, `w-1/2`, `w-64`
- `h-screen`, `h-64`

#### 颜色

- `bg-white`, `bg-gray-100`, `bg-blue-500`
- `text-black`, `text-gray-600`, `text-blue-500`
- `bg-primary`, `bg-success` (自定义主题色)

#### 排版

- `text-xs` ~ `text-2xl`
- `font-light`, `font-normal`, `font-bold`

#### 边框和圆角

- `border`, `border-2`, `border-blue-500`
- `rounded`, `rounded-lg`, `rounded-full`

#### 阴影

- `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`

#### 响应式

- `w-full md:w-1/2 lg:w-1/3`
- `hidden md:block`

---

## 🔍 代码质量保障

### ESLint 配置

```javascript
// eslint.config.js
import createConfig from '@monorepo/eslint-config'

export default createConfig({
  vue: true,
  typescript: true,
  ignores: ['**/dist/**', '**/node_modules/**', '**/*.md'],
  rules: {
    'no-console': 'error', // console.log 会被视为错误
  },
})
```

### 构建流程

```json
{
  "scripts": {
    "build": "pnpm lint && vue-tsc --noEmit && vite build",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

**执行顺序：**

1. `pnpm lint` - ESLint 代码质量检查
2. `vue-tsc --noEmit` - TypeScript 类型检查
3. `vite build` - 打包构建

**如果任何一步失败，构建会立即停止！**

### ESLint 检查内容

#### 代码风格

- ✅ 引号风格（单引号）
- ✅ 分号使用
- ✅ 缩进和空格
- ✅ 行尾空白

#### 最佳实践

- ✅ 不允许 `console.log`（只允许 `warn` 和 `error`）
- ✅ 未使用的变量
- ✅ 重复的导入
- ✅ 潜在的错误

#### Vue 特定规则

- ✅ Vue 组件命名规范
- ✅ 模板语法检查
- ✅ Props 定义

#### TypeScript 规则

- ✅ 类型安全
- ✅ 接口定义
- ✅ 泛型使用

### 工作流程

#### 开发阶段

```bash
# 快速启动，不检查（热更新快）
pnpm dev

# IDE 实时显示 ESLint 错误
# VSCode + ESLint 插件
```

#### 提交前

```bash
# 自动修复可修复的问题
pnpm lint:fix

# 检查剩余问题
pnpm lint
```

#### 构建/部署

```bash
# 自动执行所有检查
pnpm build
```

---

## 🔐 类型检查

### vue-tsc 配置

```json
{
  "scripts": {
    "build": "vue-tsc --noEmit && vite build",
    "type-check": "vue-tsc --noEmit"
  }
}
```

### 类型检查范围

vue-tsc 会检查：

- ✅ TypeScript 文件 (.ts, .tsx)
- ✅ Vue 单文件组件 (.vue)
- ✅ 类型定义和接口
- ✅ 导入的类型安全

### 开发体验

**推荐工作流程：**

```bash
# 终端 1：开发服务器（热更新，快速反馈）
pnpm dev

# 或者依赖 IDE 的类型检查
# VSCode + Volar 插件会实时显示类型错误
```

### IDE 配置

#### VSCode 推荐插件

1. **Vue - Official (Volar)** - Vue 3 官方语言支持
   - 实时类型检查
   - 智能提示
   - 错误高亮

2. **ESLint** - 代码质量和类型检查
   - 保存时自动修复
   - 实时错误提示

### 类型错误示例

#### TypeScript 类型错误

```typescript
// ❌ 错误
const count: string = 123

// ✅ 正确
const count: number = 123
```

#### Vue 组件类型错误

```vue
<script setup lang="ts">
// ❌ 错误：类型不匹配
const message: number = 'hello'

// ✅ 正确
const message: string = 'hello'
</script>
```

### 最佳实践

#### 开发阶段

- 使用 `pnpm dev` 快速启动
- 依赖 IDE (Volar) 进行实时类型检查
- 定期运行 `pnpm lint` 检查代码质量

#### 提交前

```bash
# 运行类型检查
pnpm type-check

# 运行 ESLint
pnpm lint

# 或者一起运行
pnpm lint:fix && pnpm type-check
```

---

## 💻 VSCode 配置

### 推荐扩展

已在 `.vscode/extensions.json` 中配置：

```json
{
  "recommendations": [
    // Vue 开发必备
    "Vue.volar",
    "Vue.vscode-typescript-vue-plugin",

    // Vant UI 组件支持
    "fishku.vant-snippets",

    // ESLint 和代码质量
    "dbaeumer.vscode-eslint",

    // CSS 支持
    "unocss.unocss",

    // 格式化
    "esbenp.prettier-vscode",

    // TypeScript 增强
    "christian-kohler.path-intellisense",
    "yoavbls.pretty-ts-errors",

    // Git 增强
    "eamodio.gitlens",

    // 其他
    "formulahendry.auto-rename-tag",
    "naumovs.color-highlight",
    "streetsidesoftware.code-spell-checker",
    "pnpm.coder"
  ]
}
```

### 编辑器设置

```json
{
  // 保存时自动格式化
  "editor.formatOnSave": true,

  // 保存时自动执行 ESLint 修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },

  // Vue 文件格式化器
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },

  // TypeScript 设置
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,

  // Vue 设置
  "vue.server.includeLanguages": ["vue"],
  "vue.autoInsert.dotValue": true,

  // UnoCSS 设置
  "unocss.root": "apps",
  "unocss.disabled": false,

  // ESLint 设置
  "eslint.validate": ["javascript", "typescript", "vue", "html"],
  "eslint.run": "onType"
}
```

### 安装扩展

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 "Extensions: Show Recommended Extensions"
3. 点击 "Install All" 安装所有推荐扩展
4. **重启 VSCode**

---

## 🔄 工作流程

### 快速开发流程

1. **使用代码片段创建组件框架**

   ```
   vform + Tab → 生成表单结构
   ```

2. **使用类型提示完善属性**

   ```vue
   <van-field
     type="text"      <!-- Volar 提示可用类型 -->
     placeholder=""   <!-- Volar 提示这是 string -->
   />
   ```

3. **使用 UnoCSS 添加样式**
   ```vue
   <van-button class="w-full mt-4">
     全宽按钮，上边距
   </van-button>
   ```

### 完整示例

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'vant'

const username = ref('')
const password = ref('')
const formRef = ref<FormInstance>()

async function onSubmit() {
  await formRef.value?.validate()
  console.log('提交', {
    username: username.value,
    password: password.value,
  })
}
</script>

<template>
  <div class="p-4">
    <!-- 1. 使用 vform 代码片段生成表单 -->
    <van-form ref="formRef" @submit="onSubmit">
      <!-- 2. 使用 vfield 代码片段生成字段 -->
      <van-field v-model="username" label="用户名" placeholder="请输入用户名" required />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />

      <!-- 3. 使用 UnoCSS 添加间距 -->
      <div class="mt-4">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>
```

### 组合使用三种 Vant 开发方式

```vue
<script setup lang="ts">
// 方式 3：自动导入（无需 import）
const show = ref(false)
</script>

<template>
  <!-- 方式 1：代码片段快速创建 -->
  <van-button type="primary" @click="show = true">
    打开弹窗
  </van-button>

  <!-- 方式 2：类型提示确保正确性 -->
  <van-popup
    v-model:show="show"
    position="bottom"  <!-- Volar 会提示可用的位置 -->
    round
  >
    弹窗内容
  </van-popup>
</template>
```

---

## 🔧 故障排除

### Vant 相关问题

#### 问题 1：代码片段不工作

**解决方案：**

1. 确认已安装 `fishku.vant-snippets`
2. 重启 VSCode
3. 确认文件是 `.vue` 格式

#### 问题 2：类型提示不工作

**解决方案：**

1. 确认已安装 `Vue - Official` 扩展
2. 禁用 Vetur（如果安装了）
3. 重启 TypeScript 服务器：`Ctrl+Shift+P` → "TypeScript: Restart TS Server"

#### 问题 3：组件无法识别

**解决方案：**

1. 确认 `vant: true` 已配置
2. 运行 `pnpm install`
3. 重启开发服务器

### UnoCSS 相关问题

#### 问题 1：没有智能提示

**解决方案：**

1. 确认扩展已安装：`Ctrl+Shift+X` → 搜索 "UnoCSS"
2. 检查扩展是否启用
3. 重启 VSCode
4. 重新加载窗口：`Ctrl+Shift+P` → "Developer: Reload Window"

#### 问题 2：类名不生效

**解决方案：**

1. 确认 `unocss: true` 已设置
2. 确认 `uno.config.ts` 存在
3. 在 main.ts 中导入 UnoCSS：`import 'virtual:uno.css'`

### 类型检查相关问题

#### 问题 1：vue-tsc 报错但不显示具体错误

**解决方案：**

```bash
# 使用 --pretty 标志
npx vue-tsc --noEmit --pretty

# 或者查看详细输出
npx vue-tsc --noEmit --verbose
```

#### 问题 2：IDE 显示错误但构建成功

**原因：** IDE 可能使用了不同的 TypeScript 版本

**解决方案：**

```bash
# 确保使用工作区的 TypeScript
# VSCode: Ctrl+Shift+P → "TypeScript: Select TypeScript Version"
# 选择 "Use Workspace Version"
```

#### 问题 3：类型检查很慢

**优化方案：**

```json
// tsconfig.json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "incremental": true
  }
}
```

### ESLint 相关问题

#### 问题 1：构建时 ESLint 报错

**解决方案：**

```bash
# 1. 查看错误信息
pnpm lint

# 2. 自动修复可修复的问题
pnpm lint:fix

# 3. 手动修复剩余问题

# 4. 重新构建
pnpm build
```

#### 问题 2：想临时跳过 ESLint 检查

**不推荐**，但如果确实需要：

```bash
# 直接运行 vite build，跳过检查
npx vite build
```

---

## 📊 CI/CD 集成

### GitHub Actions 示例

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install pnpm
        uses: pnpm/action-setup@v2

      - name: Install dependencies
        run: pnpm install

      - name: ESLint Check
        run: pnpm lint

      - name: Type Check
        run: pnpm type-check

      - name: Build
        run: pnpm build
```

**优势：**

- ✅ PR 合并前自动检查
- ✅ 防止有问题的代码进入主分支
- ✅ 保证代码质量

---

## 📚 相关资源

### 官方文档

- [Vant 官方文档](https://vant-contrib.gitee.io/vant/)
- [UnoCSS 官方文档](https://unocss.dev/)
- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)

### VSCode 扩展

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=unocss.unocss)
- [Vant Snippets](https://github.com/fishku/vant-snippets)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### 工具库

- [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)
- [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

---

## ✨ 总结

现在你的项目拥有完整的开发支持：

### Vant UI

✅ **代码片段** - 快速生成组件结构  
✅ **类型提示** - 智能补全和错误检测  
✅ **自动导入** - 按需加载，无需手动 import

### UnoCSS

✅ **原子化 CSS** - 极速开发体验  
✅ **智能提示** - 类名自动补全  
✅ **自定义主题** - 灵活的主题配置

### 代码质量

✅ **ESLint 检查** - 代码风格和质量  
✅ **TypeScript 检查** - 类型安全  
✅ **自动化流程** - 构建前自动检查  
✅ **错误阻断** - 任何问题都会阻止构建

### 开发体验

✅ **IDE 集成** - 实时反馈  
✅ **保存时修复** - 自动格式化  
✅ **热更新** - 快速开发迭代

享受高效的 Vue 3 + Vant + UnoCSS 开发体验吧！🎉
