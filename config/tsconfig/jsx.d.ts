// config/tsconfig/jsx.d.ts
declare global {
  namespace JSX {
    interface Element {}
    interface ElementClass {}
    interface IntrinsicElements {
      [elem: string]: any
    }
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
