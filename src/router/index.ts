import { createRouter, createWebHistory } from 'vue-router';
import { getRoutes } from './utils';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: getRoutes()
});

router.beforeEach((_to, _from, next) => {
  next();
});

router.afterEach(() => {});

export default router;
