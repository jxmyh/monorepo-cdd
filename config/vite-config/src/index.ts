import { defineConfig, type UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import Unocss from "unocss/vite";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export interface ViteConfigOptions {
  /**
   * 是否为库模式构建
   * @default false
   */
  lib?: boolean;

  /**
   * 库的入口文件（仅在 lib 模式下使用）
   */
  entry?: string;

  /**
   * 库的名称（仅在 lib 模式下使用）
   */
  name?: string;

  /**
   * 外部依赖（仅在 lib 模式下使用）
   * @default ['vue']
   */
  external?: string[];

  /**
   * 是否生成类型声明文件（仅在 lib 模式下使用）
   * @default true
   */
  dts?: boolean;

  /**
   * 自定义配置，会与默认配置合并
   */
  custom?: UserConfig;

  /**
   * 是否优化 monorepo workspace 包（开发时直接引用源码）
   * @default true
   */
  optimizeDeps?: boolean;

  /**
   * 是否启用 Vant UI 组件库支持（按需引入）
   * @default false
   */
  vant?: boolean;

  /**
   * 是否启用 UnoCSS 原子化 CSS 引擎
   * @default false
   */
  unocss?: boolean;
}

/**
 * 创建基础的 Vite 配置
 * @param options 配置选项
 */
export function createViteConfig(options: ViteConfigOptions = {}): UserConfig {
  const {
    lib = false,
    entry,
    name,
    external = ["vue"],
    dts: enableDts = true,
    custom = {},
    optimizeDeps: enableOptimizeDeps = true,
    vant = false,
    unocss = false,
  } = options;

  // 基础插件
  const plugins: any[] = [vue()];

  // 启用 UnoCSS
  if (unocss) {
    plugins.push(Unocss());
  }

  // 启用 Vant 按需引入
  if (vant) {
    plugins.push(
      Components({
        resolvers: [VantResolver()],
        dts: true, // 生成类型声明文件
      }),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        dts: true, // 生成类型声明文件
      }),
    );
  }

  // 如果是库模式，添加 dts 插件
  if (lib && enableDts) {
    plugins.push(
      dts({
        insertTypesEntry: true,
      }),
    );
  }

  // 基础配置
  const baseConfig: UserConfig = {
    plugins,
  };

  // 如果是库模式，添加构建配置
  if (lib && entry) {
    baseConfig.build = {
      lib: {
        entry: resolve(entry),
        name: name || "MonorepoLib",
        formats: ["es", "cjs"],
        fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
      },
      rollupOptions: {
        external,
        output: {
          globals: external.reduce(
            (acc, dep) => {
              acc[dep] = dep.charAt(0).toUpperCase() + dep.slice(1);
              return acc;
            },
            {} as Record<string, string>,
          ),
        },
      },
    };
  }

  // 开发时优化：将 @monorepo/* 包添加到 optimizeDeps.include
  // 这样 Vite 会预构建这些依赖，支持直接引用 TypeScript 源码
  if (enableOptimizeDeps && !lib) {
    baseConfig.optimizeDeps = {
      include: ["@monorepo/ui", "@monorepo/utils"],
    };

    // 确保 SSR 时也包含这些依赖
    baseConfig.ssr = {
      noExternal: ["@monorepo/ui", "@monorepo/utils"],
    };
  }

  // 合并自定义配置
  return defineConfig({
    ...baseConfig,
    ...custom,
    plugins: [...plugins, ...(custom.plugins || [])],
    build: custom.build
      ? {
          ...baseConfig.build,
          ...custom.build,
        }
      : baseConfig.build,
    optimizeDeps:
      enableOptimizeDeps && !lib
        ? {
            ...baseConfig.optimizeDeps,
            ...custom.optimizeDeps,
            include: [
              ...(baseConfig.optimizeDeps?.include || []),
              ...(custom.optimizeDeps?.include || []),
            ],
          }
        : custom.optimizeDeps,
  });
}

/**
 * 默认的 Vite 配置（用于应用）
 */
export const defaultConfig = defineConfig({
  plugins: [vue()],
});

/**
 * 默认的库配置
 * @param entry 入口文件路径
 * @param name 库名称
 */
export function createLibConfig(
  entry: string,
  name: string,
  external: string[] = ["vue"],
) {
  return createViteConfig({
    lib: true,
    entry,
    name,
    external,
  });
}
