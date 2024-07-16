import { defineStore } from 'pinia';
import { ref } from 'vue';
import { startViewTransitionSafe } from '@/utils/tools';

type TTheme = 'light' | 'dark';

export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = ref<TTheme>('light');
    
    const toggleTheme = () => {
      if (theme.value === 'light') {
        startViewTransitionSafe(() => {
          theme.value = 'dark';
          document.body.dataset.theme = 'dark';
        });
      } else {
        startViewTransitionSafe(() => {
          theme.value = 'light';
          document.body.dataset.theme = 'light';
        });
      }
    }
    
    return { theme, toggleTheme }
  },
  {
    persist: true,
  }
);
