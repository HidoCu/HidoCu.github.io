<script setup lang="ts">
import data from './page.json';
import { random } from '@/utils';
import type { INativeImage } from '@/types';
import NativeAccessor from '@/common/constant-util';
import { MenuButton } from '@/components';

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



/* -------------------- Header -------------------- */
const isMenuOpen = ref(false);
/* -------------------- Header -------------------- */

onMounted(() => {
  bgiUrl.value = generateRandomBgi(bgiList);
  bgiMobileUrl.value = generateRandomBgi(bgiMobileList);

});
</script>

<template>
  <div class="home-layout__container">
    <header class="home-layout__header">
      <div class="home-layout__header-inner">
        <div class="home-layout__header-left">
          <div class="home-layout__menu-btn">
            <MenuButton v-model:active="isMenuOpen" :border-width="3" />
          </div>
        </div>
        <div class="home-layout__header-right">
          <div class="home-layout__theme-switch"></div>
          <div class="home-layout__resources-used"></div>
        </div>
      </div>
    </header>
    <div class="home-layout__content">
      <RouterView />
    </div>
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
    backdrop-filter: blur(10px);
    height: 60px;
    padding: 5px;

    & .home-layout__header-inner {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & .home-layout__header-left {
        & .home-layout__menu-btn {}
      }
      & .home-layout__header-right {}
    }

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