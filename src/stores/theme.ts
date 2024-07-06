import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { GlobalTheme } from 'naive-ui';
import { darkTheme } from 'naive-ui';

type TTheme = 'light' | 'dark';
type TNaiveTheme = null | GlobalTheme;

export const useThemeStore: any = defineStore(
  'theme',
  () => {
    const isDarkTheme = ref(false);
    const naiveTheme = ref<TNaiveTheme>(null);
    const theme = ref<TTheme>('light');
    
    const toggleTheme = () => {
      console.log('toggleTheme');
      if (isDarkTheme.value) {
        naiveTheme.value = darkTheme;
        theme.value = 'dark';
      } else {
        naiveTheme.value = null;
        theme.value = 'light';
      }
      isDarkTheme.value = !isDarkTheme.value;
    }
    
    return { isDarkTheme, naiveTheme, theme, toggleTheme }
  },
  {
    persist: true,
  }
);
