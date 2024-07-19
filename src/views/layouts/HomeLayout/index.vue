<script setup lang="ts">
import data from './page.json';
import { random } from '@/utils';
import type { INativeImage } from '@/types';
import NativeAccessor from '@/common/constant-util';
import { NavigationMenu } from '@/components';

/* -------------------- Background -------------------- */
const bgiList = data['background-list'] as INativeImage[];
const bgiMobileList = data['background-list-mobile'] as INativeImage[];

const generateRandomBgi = (bgiList: INativeImage[]) => {
  const randomBgi = bgiList[random(0, bgiList.length - 1)];
  return `url("${NativeAccessor.image('bg', randomBgi)}")`;
}

const bgiUrl = ref('');
const bgiMobileUrl = ref('');
/* -------------------- Background -------------------- */

onMounted(() => {
  bgiUrl.value = generateRandomBgi(bgiList);
  bgiMobileUrl.value = generateRandomBgi(bgiMobileList);
});
</script>

<template>
  <div class="home-layout__container">
    <header class="home-layout__header">
      <NavigationMenu />
    </header>
    <main class="home-layout__content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.home-layout__container {
  height: 100vh;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-image: v-bind(bgiMobileUrl);

  & .home-layout__header {
    position: fixed;
    bottom: 20px;
    right: 10px;

    @include respond('tablet') {
      display: none;
    }
  }

  & .home-layout__content {
    padding-top: 50px;

    @include respond('tablet') {
      padding-top: 200px;
    }
  }

  @include respond('tablet') {
    background-image: v-bind(bgiUrl);
  }
}
</style>