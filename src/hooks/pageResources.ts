import type { IResourcesUsed } from '@/types';

export const usePageResources = () => {
  const route = useRoute();
  
  const resources = ref<IResourcesUsed[]>([]);
  const isRouteChange = ref(true);
  
  const getPageResources = () => {
    route.matched.map(async route => {
      const resModuleGetter = route.meta.resources as (...args: any[]) => any;
      const resGetter = await resModuleGetter();
      const res = resGetter.default();
      if (res) {
        resources.value.push(...res);
      }
    });
    console.log(resources.value)
  }
  
  const update = () => {
    if (isRouteChange.value) {
      getPageResources();
      isRouteChange.value = false;
    }
  }
  
  watch(() => route.fullPath, () => {
    isRouteChange.value = true;
  }, { immediate: true });
  
  return { update, resources }
}