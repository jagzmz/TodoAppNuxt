declare module '*.svg?inline' {
  const content: string
  export default content
}

// Path: @types/shims-vue.d.ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
