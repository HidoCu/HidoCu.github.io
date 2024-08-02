<script setup lang="ts">
import { useLoadingStore } from '@/stores';
import { NowLoadingFade } from '@/components';

withDefaults(defineProps<{
  maskColor?: string;
}>(), {
  maskColor: '#0009'
});

const loadingStore = useLoadingStore();
</script>

<template>
  <div class="loading-provider__container">
    <div class="loading-provider__content">
      <slot />
    </div>
    <NowLoadingFade
        class-name="loading-provider__loading"
        :visible="loadingStore.loadingStatus">
      <section class="loading-provider__pc-loading-container">
        <slot name="pcLoading" />
      </section>
      <section class="loading-provider__h5-loading-container">
        <slot name="h5Loading" />
      </section>
    </NowLoadingFade>
  </div>
</template>

<style scoped lang="scss">
.loading-provider__container {
  & .loading-provider__loading {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background-color: v-bind(maskColor);

    transition: all .3s linear;

    & .loading-provider__pc-loading-container {
      display: none;

      @include respond('tablet') {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }

    & .loading-provider__h5-loading-container {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      @include respond('tablet') {
        display: none;
      }
    }
  }
}
</style>