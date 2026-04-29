import createConfig from '@monorepo/eslint-config'

export default createConfig({
  vue: false,
  typescript: true,
  rules: {
    'no-console': 'off', // CLI 工具允许 console
  },
})
