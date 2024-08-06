<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { AsideToolbox, DrawerToolbox, LoadingProvider, NowLoading, OnmyodamaSpin } from '@/components';
import { darkTheme, type GlobalTheme } from 'naive-ui';
import { useLoadingStore, useToolDrawerStore } from '@/stores';

const themeStore = useThemeStore();
const loadingStore = useLoadingStore();
const toolStore = useToolDrawerStore();
const route = useRoute();

const naiveTheme = computed<GlobalTheme | null>(() =>
    themeStore.theme === 'light' ? null : darkTheme);
</script>

<template>
  <div class="app-container app-theme">
    <n-config-provider :theme="naiveTheme">
      <n-dialog-provider>
        <LoadingProvider>

          <!-- Content -->
          <div class="app-content">
            <RouterView v-slot="{Component}">
              <Transition name="app-layout" mode="out-in">
                <component :is="Component" />
              </Transition>
            </RouterView>
          </div>
          <!-- Content -->

          <!-- Extra Components -->
          <AsideToolbox :blur="route.name === 'Home'" />
          <DrawerToolbox v-model:show="toolStore.show" />
          <!-- Extra Components -->

          <!-- Loading -->
          <template #pcLoading>
            <NowLoading :animation="loadingStore.withAnimation">
              <OnmyodamaSpin />
            </NowLoading>
          </template>
          <template #h5Loading>
            <OnmyodamaSpin :need-text="false" :icon-size="100" />
          </template>
          <!-- Loading -->

        </LoadingProvider>
      </n-dialog-provider>
    </n-config-provider>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  background-color: var(--bg-color-dark);
}

/* ---------------------------------------- */

%transition-animation {
  transition: all .5s ease-out;

  @include respond('tablet') {
    transition: all .2s linear;
  }
}

// 进入起始态
.app-layout-enter-from {
  opacity: .5;

  @include respond('tablet') {
    transform: scale(0.95);
    opacity: 0;
  }
}

// 进入中
.app-layout-enter-active {
  @extend %transition-animation;
}

// 进入结束态
.app-layout-enter-to {
  opacity: 1;

  @include respond('tablet') {
    transform: scale(1);
    opacity: 1;
  }
}

// 离开起始态
.app-layout-leave-from {
  transform: translateX(0);

  @include respond('tablet') {
    transform: translateX(0);
    opacity: 1;
  }
}

// 离开中
.app-layout-leave-active {
  @extend %transition-animation;
}

// 离开结束态
.app-layout-leave-to {
  transform: translateX(-100vw);

  @include respond('tablet') {
    transform: translateX(30px);
    opacity: 0;
  }
}
</style>
