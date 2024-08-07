import { defineStore } from 'pinia';
import { ref } from 'vue';
import { startViewTransitionSafe } from '@/utils/tools';

export type TTheme = 'light' | 'dark';

export const useThemeStore = defineStore('theme', () => {
    const theme = ref<TTheme>('light');
    
    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
    }
    
    const setTheme = (themeVal: TTheme) => {
      theme.value = themeVal;
    }
    
    const isTheme = (t: TTheme) => theme.value === t;
    
    const isLight = computed(() => isTheme('light'));
    const isDark = computed(() => isTheme('dark'));
    
    watch(theme, (newTheme) => {
      console.log(newTheme)
      startViewTransitionSafe(() => {
        document.body.dataset.theme = newTheme;
      });
    }, { immediate: true });
    
    return {
      theme,
      toggleTheme,
      setTheme,
      isTheme,
      isLight,
      isDark,
    }
  }, { persist: true }
);
