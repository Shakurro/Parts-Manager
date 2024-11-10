import { defineNuxtPlugin } from '#app';
import { create, NTimeline, NTimelineItem } from 'naive-ui';

export default defineNuxtPlugin((nuxtApp) => {
  const naive = create({
    components: [NTimeline, NTimelineItem]
  });

  nuxtApp.vueApp.use(naive);
});