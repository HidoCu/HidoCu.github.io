<script setup lang="ts">
import data from './page.json';
import { random } from '@/utils';
import type { INativeImage } from '@/types';
import NativeAccessor from '@/common/constant-util';

const bgiList = data['background-list'] as INativeImage[];
const bgiMobileList = data['background-list-mobile'] as INativeImage[];

const generateRandomBgi = (bgiList: INativeImage[]) => {
  const randomBgi = bgiList[random(0, bgiList.length - 1)];
  return `url("${NativeAccessor.image('bg', randomBgi)}")`;
}

const bgiUrl = ref('');
const bgiMobileUrl = ref('');

onMounted(() => {
  bgiUrl.value = generateRandomBgi(bgiList);
  bgiMobileUrl.value = generateRandomBgi(bgiMobileList);
});
</script>

<template>
  <div class="home-layout-container">
    <div class="home-layout-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-layout-container {
  height: 100vh;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-image: v-bind(bgiMobileUrl);

  @include respond('tablet') {
    background-image: v-bind(bgiUrl);
  }

  & .home-layout-content {
    padding-block: 200px;
  }
}
</style>