<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { AsideToolbox, LoadingProvider, NowLoading, OnmyodamaSpin } from '@/components';
import { darkTheme, type GlobalTheme } from 'naive-ui';

const themeStore = useThemeStore();
const route = useRoute();

const naiveTheme = computed<GlobalTheme | null>(() =>
    themeStore.theme === 'light' ? null : darkTheme
);

</script>

<template>
  <div class="app-container app-theme">
    <n-config-provider :theme="naiveTheme">
      <LoadingProvider>
        <div class="app-content">
          <RouterView />
          <AsideToolbox :blur="route.name === 'Home'" />
        </div>
        <template #pcLoading>
          <NowLoading>
            <OnmyodamaSpin />
          </NowLoading>
        </template>
      </LoadingProvider>
    </n-config-provider>
  </div>
</template>

<style scoped lang="scss">
// #app-theme {}
</style>
