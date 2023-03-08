declare module '*.svg?inline' {
  import Vue, { VueConstructor } from 'vue'
  const content: VueConstructor<Vue>
  export default content
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
