import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $request: (args: any) => [any, any];
    // $store: any;
  }
}