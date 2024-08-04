import { createRouter, createWebHistory } from 'vue-router';
import { spanningRoutes } from './utils';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: spanningRoutes()
});

router.beforeEach((_to, _from, next) => {
  next();
});

router.afterEach(() => {});

export default router;
