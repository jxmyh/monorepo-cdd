import { defineConfig, presetUno, presetAttributify } from "unocss";

export default defineConfig({
  presets: [
    presetUno(), // 默认预设
    presetAttributify(), // 属性化模式（可选）
  ],
  // 自定义规则
  rules: [
    // 例如：自定义快捷方式
    [
      "btn-primary",
      {
        "background-color": "#1989fa",
        color: "#fff",
        padding: "8px 16px",
        "border-radius": "4px",
      },
    ],
  ],
  // 自定义快捷方式
  shortcuts: [
    ["center", "flex items-center justify-center"],
    ["card", "bg-white rounded-lg shadow p-4"],
  ],
});
