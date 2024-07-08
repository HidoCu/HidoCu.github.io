import { createRouter, createWebHistory } from 'vue-router';

const routes = [{
  path: '/',
  redirect: '/home',
  component: () => import('@/views/layouts/HomeLayout/index.vue'),
  children: [{
    path: '/home',
    name: 'home',
    component: () => import('@/views/pages/HomePage/index.vue'),
    meta: {
      title: '首页'
    }
  }]
}, {
  path: '/main',
  redirect: '/recommend',
  component: () => import('@/views/layouts/MainLayout/index.vue'),
  children: [{
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/pages/RecomPage/index.vue'),
    meta: {
      title: '推荐'
    }
  }, {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/pages/BlogPage/index.vue'),
    meta: {
      title: '发电'
    }
  }, {
    path: '/collect',
    name: 'collect',
    component: () => import('@/views/pages/CollectPage/index.vue'),
    meta: {
      title: '收藏'
    }
  }, {
    path: '/galley',
    name: 'galley',
    component: () => import('@/views/pages/GalleryPage/index.vue'),
    meta: {
      title: '画廊'
    }
  }, {
    path: '/about',
    name: 'about',
    component: () => import('@/views/pages/AboutPage/index.vue'),
    meta: {
      title: '碎碎念'
    }
  }, {
    path: '/other',
    name: 'other',
    component: () => import('@/views/pages/OtherPage/index.vue'),
    meta: {
      title: '备用'
    }
  }]
}, {
  path: '/error',
  name: 'error',
  component: () => import('@/views/pages/ErrorPage/index.vue')
}, {
  path: '/:catchall(.*)',
  redirect: '/error'
}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
