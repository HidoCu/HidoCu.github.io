import { upperCamel2Kebab } from '@/utils';

const _getRouteName = (name: string) =>
  name?.replace('Page', '');

const _nativeUrl = ( fileName: string, path = '**') =>
  `../views/${path}/${fileName}`;

const _getRoutesFlat = (index: string) => {
  const pages = import.meta.glob('../views/**/page.ts', {
    eager: true,
    import: 'default'
  });
  const pageComponent = import.meta.glob('../views/**/index.vue');
  const resources = import.meta.glob('../views/**/resources.ts', {
    import: 'default'
  });
  return Object.entries(pages).map(([importPath, config]) => {
    const fullPath = importPath.replace('../views/', '').replace('/page.ts', '') || '/';
    const fullPathArr = fullPath.split('/');
    
    const name = _getRouteName(fullPathArr[fullPathArr.length - 1]);
    let path = '/' + upperCamel2Kebab(name || '');
    path = path === `/${upperCamel2Kebab(index)}` ? '/' : path;
    
    const fileUrl = (fileName: string) => _nativeUrl(fileName, fullPath);
    
    const page = config as any;
    page.meta.resources = () => resources[fileUrl('resources.ts')];
    
    return {
      parent: _getRouteName(fullPathArr[fullPathArr.length - 2]),
      route: {
        ...page,
        path,
        name,
        component: pageComponent[fileUrl('index.vue')],
      }
    }
  });
}

const _createRoutes = (routesFlat: any[]) => {
  const nodeMap = new Map<string, any>(
    routesFlat.map(item => [item.route.name, item.route]));
  return routesFlat.reduce((acc, item) => {
    if (item.parent) {
      // 是子节点
      const parent = nodeMap.get(item.parent)
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(item.route);
    } else {
      // 是根节点
      acc = [...acc, item.route];
    }
    return acc;
  }, []);
}

export const spanningRoutes = () => {
  const routesFlat = _getRoutesFlat('HomeLayout');
  const routes = _createRoutes(routesFlat);
  routes.push({
    path: '/:catchall(.*)',
    redirect: '/error'
  });
  return routes;
}
