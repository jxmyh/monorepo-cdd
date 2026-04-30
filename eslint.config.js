import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
    '**/*.md',
    '**/CHANGELOG.md',
    'scripts/**', // 暂时忽略脚本文件
    '**/scripts/**', // 忽略所有子包的 scripts 目录
    '**/STRUCTURE.md', // 忽略结构文档
  ],
  rules: {
    // 禁用 jsx-one-expression-per-line 规则，避免与 Prettier 冲突
    'style/jsx-one-expression-per-line': 'off',
  },
  // 与 Prettier 保持一致的配置
  stylistic: {
    semi: false, // 不使用分号
    quotes: 'single', // 单引号
    arrowParens: false, // 单参数箭头函数省略括号
  },
})
