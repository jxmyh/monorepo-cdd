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
    'no-console': 'warn', // console.log 视为警告而非错误
  },
  // 与 Prettier 保持一致的配置
  stylistic: {
    semi: false, // 不使用分号
    quotes: 'single', // 单引号
    arrowParens: false, // 单参数箭头函数省略括号
  },
})
