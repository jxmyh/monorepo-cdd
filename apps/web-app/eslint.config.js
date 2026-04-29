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
  },
})
