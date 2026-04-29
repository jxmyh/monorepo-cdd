// JSX 类型声明
// 让 TypeScript 能够识别 Vue 3 的 JSX 语法

declare global {
  namespace JSX {
    interface Element {}

    interface ElementClass {}
    interface IntrinsicElements {
      [elem: string]: any
    }
    // 添加 children 和其他常用属性支持
    interface IntrinsicAttributes {
      children?: any
      class?: string
      style?: any
      key?: any
      ref?: any
    }
  }
}

export {}
