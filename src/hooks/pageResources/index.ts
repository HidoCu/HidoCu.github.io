import type { IResourcesUsed } from '@/types';
import type { TFunction } from '@/types/type-utils';

export const usePageResources = () => {
  const route = useRoute();
  
  const resourcesUsedList = ref<IResourcesUsed[]>([]);
  const isRouteChange = ref(true);
  
  const loadResources = () => {
    route.matched.map(async route => {
      const resModuleGetter = route.meta.resources as TFunction;
      const resGetter = await resModuleGetter();
      const res = resGetter.default();
      if (res) {
        resourcesUsedList.value.push(...res);
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
  
  return { updateResources, resourcesUsedList }
}