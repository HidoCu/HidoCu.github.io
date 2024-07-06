<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
</script>

<template>
  <div class="app-container">
    <n-config-provider :theme="themeStore.naiveTheme">
      <div class="app-content" :data-theme="themeStore.theme">
        <RouterView />
      </div>
    </n-config-provider>
  </div>
</template>

<style scoped lang="scss">

</style>
