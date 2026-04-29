// JSX 类型声明
// 让 TypeScript 能够识别 Vue 3 的 JSX 语法

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

export {}
