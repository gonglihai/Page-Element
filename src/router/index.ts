import { createRouter, createWebHistory } from 'vue-router'

import PageTest from '../views/page/PageTest.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'page',
      component: PageTest
    }
  ]
})

export default router
