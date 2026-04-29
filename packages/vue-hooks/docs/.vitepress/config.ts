import { defineConfig } from "vitepress";
import { resolve } from "node:path";
import { readdirSync, statSync } from "node:fs";

// 自动扫描 src 目录下所有 use* 目录
function getHooksSidebar() {
  const rootDir = resolve(__dirname, '../..')
  const srcDir = resolve(rootDir, 'src')
  const items: any[] = []

  try {
    const dirs = readdirSync(srcDir).filter((dir) => {
      const fullPath = resolve(srcDir, dir);
      return dir.startsWith("use") && statSync(fullPath).isDirectory();
    });

    dirs.forEach((dir) => {
      const hookName = dir.replace(/^use/, "");
      items.push({
        text: `use${hookName}`,
        link: `/api/${dir}/`,
      });
    });
  } catch (error) {
    console.error("Failed to scan hooks directory:", error);
  }

  return items;
}

export default defineConfig({
  title: "@monorepo/vue-hooks",
  description: "Vue 3 Composition API Hooks 文档",

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "API", link: "/api/" },
    ],

    sidebar: {
      "/api/": [
        {
          text: "Hooks",
          items: getHooksSidebar(),
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/your-repo/monorepo" },
    ],

    footer: {
      message: "Released under the ISC License.",
      copyright: "Copyright © 2024-present Monorepo Team",
    },
  },

  markdown: {
    lineNumbers: true,
  },
});
