<script setup lang="ts">
import { useLoadingStore } from '@/stores';
import { NowLoading } from '@/components/animations';

const loadingStore = useLoadingStore();
</script>

<template>
  <div class="loading-provider__container">
    <div class="loading-provider__content">
      <slot></slot>
    </div>
    <div
        v-show="loadingStore.show"
        class="loading-provider__loading">
      <section class="loading-provider__pc-loading-container">
        <NowLoading />
      </section>
      <section class="loading-provider__h5-loading-container"></section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading-provider__container {
  & .loading-provider__loading {
    position: fixed;
    z-index: 1000;
    inset: 0;
    background-color: #0009;

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