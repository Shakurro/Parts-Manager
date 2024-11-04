import Vue from 'vue';
import Router from 'vue-router';
import PartView from '~/pages/parts/view.vue';
import PartsList from '@/pages/parts/list.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/parts',
      name: 'PartsList',
      component: PartsList
    },
    {
      path: '/parts/view/:id',
      name: 'PartView',
      component: PartView
    }
  ]
});
