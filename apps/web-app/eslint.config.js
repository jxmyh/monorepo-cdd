import createConfig from '@monorepo/eslint-config'

export default createConfig({
  vue: true,
  typescript: true,
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
    '**/*.md', // 忽略 Markdown 文件
  ],
  rules: {
    'no-console': 'error',
    // 禁用 jsx-one-expression-per-line 规则，避免与 Prettier 冲突
    'style/jsx-one-expression-per-line': 'off',
  },
})
