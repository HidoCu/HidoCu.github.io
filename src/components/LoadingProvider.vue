<script setup lang="ts">
import { useLoadingStore } from '@/stores';
import { VisibleFade } from '@/components';

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
    <VisibleFade
        class-name="loading-provider__loading"
        :visible="loadingStore.loadingStatus">
      <section class="loading-provider__pc-loading-container">
        <slot name="pcLoading" />
      </section>
      <section class="loading-provider__h5-loading-container">
        <slot name="h5Loading" />
      </section>
    </VisibleFade>
    <div v-show="loadingStore.spinState" class="loading-provider__spin">
      <slot name="spin" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading-provider__container {
  & .loading-provider__loading {
    position: fixed;
    z-index: 1000;
    inset: 0;
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
      width: 100%;
      height: 100%;

      @include respond('tablet') {
        display: none;
      }
    }
  }
}
</style>