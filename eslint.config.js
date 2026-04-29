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
  ],
  rules: {
    'no-console': 'warn', // console.log 视为警告而非错误
  },
})
