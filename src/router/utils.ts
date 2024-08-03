import { upperCamel2Kebab } from '@/utils';

const getRouteName = (name: string) =>
  name?.replace('Page', '') || null

const getRoutesFlat = () => {
  const pages = import.meta.glob('../views/**/page.ts', {
    eager: true,
    import: 'default'
  });
  const pageComponent = import.meta.glob('../views/**/index.vue');
  const resources = import.meta.glob('../views/**/resources.ts', {
    import: 'default',
  });
  return Object.entries(pages).map(([importPath, config]) => {
    const fullPath = importPath.replace('../views/', '').replace('/page.ts', '') || '/';
    const fullPathArr = fullPath.split('/');
    
    const name = getRouteName(fullPathArr[fullPathArr.length - 1]);
    let path = '/' + upperCamel2Kebab(name || '');
    path = path === '/home-layout' ? '/' : path;
    
    const page = config as any;
    page.meta.resources = () => resources[`../views/${fullPath}/resources.ts`];
    
    return {
      parent: getRouteName(fullPathArr[fullPathArr.length - 2]),
      route: {
        ...page,
        path,
        name,
        component: pageComponent[`../views/${fullPath}/index.vue`],
      }
    }
  });
}

const createRoutes = (routesFlat: any[]) => {
  const nodeMap = new Map();
  routesFlat.forEach(item => {
    nodeMap.set(item.route.name, item.route);
  });
  const routeList: any[] = [];
  routesFlat.forEach(item => {
    if (item.parent) {
      // 是子节点
      const parent = nodeMap.get(item.parent)
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(item.route);
    } else {
      // 是根节点
      routeList.push(item.route);
    }
  });
  return routeList;
}

export const getRoutes = () => {
  const routesFlat = getRoutesFlat();
  const routes = createRoutes(routesFlat);
  routes.push({
    path: '/:catchall(.*)',
    redirect: '/error'
  });
  return routes;
}