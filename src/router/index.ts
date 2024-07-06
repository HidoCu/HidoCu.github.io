import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layouts/MainLayout.vue'),
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('@/views/pages/HomePage.vue'),
    }]
  }, {
    path: '/error',
    name: 'error',
    component: () => import('@/views/pages/NotFoundPage.vue')
  }, {
    path: '/:catchall(.*)',
    redirect: '/error'
  }]
});

export default router;
