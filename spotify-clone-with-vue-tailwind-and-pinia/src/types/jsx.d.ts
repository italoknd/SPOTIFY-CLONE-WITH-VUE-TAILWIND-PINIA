/// <reference types="vue/macros-global" />
/// <reference types="vue/macros-global" />
/// <reference types="vite/client" />

import { VNode } from "vue";

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends VNode {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}