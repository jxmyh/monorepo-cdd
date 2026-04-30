/// <reference types="vite/client" />

// JSX/TSX 模块类型声明
import type { DefineComponent } from 'vue'

declare module '*.jsx' {
  const component: DefineComponent<any, any, any>
  export default component
}

declare module '*.tsx' {
  const component: DefineComponent<any, any, any>
  export default component
}
