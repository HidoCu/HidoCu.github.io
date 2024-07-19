import type { IResourcesUsed } from '@/types';

export const usePageResources = () => {
  const route = useRoute();
  
  const resUsed = ref<IResourcesUsed[]>([]);
  const isRouteChange = ref(true);
  
  const loadResources = () => {
    route.matched.forEach(async route => {
      const resModuleGetter = route.meta.resources as (...args: any[]) => any;
      const resGetter = await resModuleGetter();
      const res = resGetter.default();
      if (res) {
        resUsed.value.push(...res);
      }
    });
  }
  
  const updateResources = () => {
    if (isRouteChange.value) {
      loadResources();
      isRouteChange.value = false;
    }
  }
  
  watch(() => route.fullPath, () => {
    isRouteChange.value = true;
  }, { immediate: true });
  
  return { updateResources, resUsed }
}