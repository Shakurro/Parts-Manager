import { defineNuxtPlugin } from '#app';
import naiveUI from 'naive-ui';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(naiveUI);
});