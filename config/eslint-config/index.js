import antfu from '@antfu/eslint-config'

/**
 * 创建基础的 ESLint 配置
 * @param options 配置选项
 */
export default function createConfig(options = {}) {
  const { vue = true, typescript = true, ignores = [], rules = {}, settings = {} } = options

  return antfu({
    vue,
    typescript,
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.vitepress/cache/**',
      '**/*.md',
      '**/scripts/**',
      ...ignores,
    ],
    rules: {
      // 禁用 jsx-one-expression-per-line 规则，避免与 Prettier 冲突
      'style/jsx-one-expression-per-line': 'off',
      // 可以在这里添加自定义规则
      ...rules,
    },
    settings: {
      ...settings,
    },
    // 与 Prettier 保持一致的配置
    stylistic: {
      semi: false, // 不使用分号
      quotes: 'single', // 单引号
      arrowParens: false, // 单参数箭头函数省略括号
    },
  })
}
