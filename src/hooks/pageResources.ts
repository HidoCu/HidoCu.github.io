import type { IResourcesUsed } from '@/types';

export const usePageResources = () => {
  const route = useRoute();
  
  const pageRes = ref<IResourcesUsed[]>([]);
  const isRouteChange = ref(true);
  
  const update = () => {
    route.matched.forEach(async route => {
      const resModuleGetter = route.meta.resources as (...args: any[]) => any;
      const resGetter = await resModuleGetter();
      const res = resGetter.default();
      if (res) {
        pageRes.value.push(res);
      }
    });
    isRouteChange.value = false;
  }
  
  watch(() => route.fullPath, () => {
    isRouteChange.value = true;
  }, { immediate: true });
  
  return { update }
}