import { defineStore } from 'pinia';

export const useToolDrawerStore = defineStore('drawerToolbox', () => {
  const show = ref(false);
  
  const open = () => {
    show.value = true;
  }
  
  const close = () => {
    show.value = false;
  }
  
  return { show, open, close }
});
