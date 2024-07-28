import { defineStore } from 'pinia';
import type { TFunction } from '@/types/type-utils';

export const useLoadingStore = defineStore('loading', () => {
  const show = ref(false);
  
  const loading = () => {
    show.value = true;
  }

  const done = () => {
    show.value = false;
  }
  
  const delayDone = (delay = 1000, doneCb?: TFunction) => {
    if (delay <= 0) {
      done();
      return;
    }
    const id = setTimeout(() => {
      done();
      doneCb && doneCb();
      clearTimeout(id);
    }, delay);
  }
  
  return { show, loading, done, delayDone }
});
