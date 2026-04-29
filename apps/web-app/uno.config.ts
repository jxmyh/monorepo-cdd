import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(), // 默认预设
    presetAttributify(), // 属性化模式（可选）
  ],
  // 自定义快捷方式
  shortcuts: [
    // 布局
    ['flex-center', 'flex items-center justify-center'],
    ['flex-col-center', 'flex flex-col items-center justify-center'],

    // 卡片样式
    ['card', 'bg-white rounded-lg shadow p-4'],

    // 按钮样式
    ['btn', 'px-4 py-2 rounded transition-colors'],
    ['btn-primary', 'btn bg-blue-500 text-white hover:bg-blue-600'],

    // 文本
    ['text-title', 'text-xl font-bold'],
    ['text-subtitle', 'text-lg font-semibold'],
  ],
  // 主题配置
  theme: {
    colors: {
      primary: '#1989fa',
      success: '#07c160',
      warning: '#ff976a',
      danger: '#ee0a24',
    },
  },
})
