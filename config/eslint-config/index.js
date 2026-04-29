import antfu from '@antfu/eslint-config'

/**
 * 创建基础的 ESLint 配置
 * @param options 配置选项
 */
export default function createConfig(options = {}) {
  const {
    vue = true,
    typescript = true,
    ignores = [],
    rules = {},
    settings = {},
  } = options

  return antfu({
    vue,
    typescript,
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.vitepress/cache/**',
      ...ignores,
    ],
    rules: {
      // 可以在这里添加自定义规则
      ...rules,
    },
    settings: {
      ...settings,
    },
  })
}
