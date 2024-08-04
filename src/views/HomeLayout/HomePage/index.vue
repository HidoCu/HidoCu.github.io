<script setup lang="ts">
import pageDataJson from './data.json';
import type { INativeImage } from '@/types';
import { Revolver } from '@/components';
import NativeAccessor from '@/common/constant-util';
import { get } from '@vueuse/core';
import navs from '@/router/nav-list';
import { randomHexColor } from '@/utils';

const data = ref(pageDataJson);

const useHeader = () => {
  const avatarList = ref(get(data)['background-list'] as INativeImage[]);
  const avatarUrlList = ref<string[]>([]);
  avatarUrlList.value = avatarList.value.map(img => NativeAccessor.image('revolver', img));

  const navList = ref(navs);

  return { avatarUrlList, navList }
}

const { avatarUrlList, navList } = useHeader();
</script>

<template>
  <div class="home-container">

  </div>
</template>

<style scoped lang="scss">

</style>