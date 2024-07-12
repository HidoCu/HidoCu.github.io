<script setup lang="ts">
import data from './page.json';
import { random } from '@/utils';
import type { IImageInfo } from '@/types';
import { AsideToolbox } from '@/components';
import { Constant } from '@/common/constant';

const bgiList = data['background-list'] as IImageInfo[];
const bgiMobileList = data['background-list-mobile'] as IImageInfo[];

const generateRandomBgi = (bgiList: IImageInfo[]) => {
  const randomBgi = bgiList[random(0, bgiList.length - 1)];
  // /images/bg/${randomBgi.id}_p${randomBgi.p}.${randomBgi.suffix}
  return `url("${Constant.getNativeImgUrl(randomBgi, 'bg')}")`;
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
      <AsideToolbox />
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