<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { AsideToolbox, Loading } from '@/components';
import { darkTheme, type GlobalTheme } from 'naive-ui';

type TNaiveTheme = null | GlobalTheme;

const themeStore = useThemeStore();
const route = useRoute();

const naiveTheme = computed<TNaiveTheme>(() =>
    themeStore.theme === 'light' ? null : darkTheme
);

onMounted(() => {
});
</script>

<template>
  <div class="app-container app-theme">
    <n-config-provider :theme="naiveTheme">
      <div class="app-content">
        <RouterView />
        <AsideToolbox :blur="route.name === 'Home'" />
      </div>
      <div class="app-loading">
        <Loading />
      </div>
    </n-config-provider>
  </div>
</template>

<style scoped lang="scss">
// #app-theme {}
</style>
