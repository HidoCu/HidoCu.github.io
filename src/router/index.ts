import { createRouter, createWebHistory } from 'vue-router';

const routes = [{
  path: '/',
  name: 'HomeLayout',
  redirect: '/home',
  component: () => import('@/views/layouts/HomeLayout/index.vue'),
  meta: {
    resources: () => import('@/views/layouts/HomeLayout/resources-used'),
  },
  children: [{
    path: '/home',
    name: 'Home',
    component: () => import('@/views/pages/HomePage/index.vue'),
    meta: {
      title: '首页',
      resources: () => import('@/views/pages/HomePage/resources-used'),
    }
  }]
}, {
  path: '/main',
  name: 'MainLayout',
  redirect: '/recommend',
  component: () => import('@/views/layouts/MainLayout/index.vue'),
  children: [{
    path: '/recommend',
    name: 'Recommend',
    component: () => import('@/views/pages/RecomPage/index.vue'),
    meta: {
      title: '推荐',
      resources: () => import('@/views/pages/RecomPage/resources-used'),
    }
  }, {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/pages/BlogPage/index.vue'),
    meta: {
      title: '发电',
      resources: () => import('@/views/pages/BlogPage/resources-used'),
    }
  }, {
    path: '/collect',
    name: 'Collect',
    component: () => import('@/views/pages/CollectPage/index.vue'),
    meta: {
      title: '收藏',
      resources: () => import('@/views/pages/CollectPage/resources-used'),
    }
  }, {
    path: '/galley',
    name: 'Galley',
    component: () => import('@/views/pages/GalleryPage/index.vue'),
    meta: {
      title: '画廊',
      resources: () => import('@/views/pages/GalleryPage/resources-used'),
    }
  }, {
    path: '/about',
    name: 'About',
    component: () => import('@/views/pages/AboutPage/index.vue'),
    meta: {
      title: '碎碎念',
      resources: () => import('@/views/pages/AboutPage/resources-used'),
    }
  }, {
    path: '/other',
    name: 'Other',
    component: () => import('@/views/pages/OtherPage/index.vue'),
    meta: {
      title: '备用',
      resources: () => import('@/views/pages/OtherPage/resources-used'),
    }
  }]
}, {
  path: '/error',
  name: 'Error',
  component: () => import('@/views/pages/ErrorPage/index.vue'),
  meta: {
    title: '页面被幽幽子吃了',
    resources: () => import('@/views/pages/ErrorPage/resources-used'),
  }
}, {
  path: '/:catchall(.*)',
  redirect: '/error'
}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
