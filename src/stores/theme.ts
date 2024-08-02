import { defineStore } from 'pinia';
import { ref } from 'vue';
import { startViewTransitionSafe } from '@/utils/tools';

type TTheme = 'light' | 'dark';

export const useThemeStore = defineStore('theme', () => {
    const theme = ref<TTheme>('light');
    
    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
    }
    
    const setTheme = (themeVal: TTheme) => {
      theme.value = themeVal;
    }
    
    watch(() => theme.value, (newTheme) => {
      startViewTransitionSafe(() => {
        document.body.dataset.theme = newTheme;
      });
    }, { immediate: true });
    
    return { theme, toggleTheme, setTheme }
  }, { persist: true }
);
