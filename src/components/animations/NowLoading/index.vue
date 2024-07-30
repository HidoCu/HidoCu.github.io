<script setup lang="ts">
import { Sakura } from '@/components/icons';
import animationItemConfigs from './config';
import { useSnowAnimation } from '@/hooks/animation';
import type { IAnimationConfig, TPosition } from '@/hooks/animation/snow/types';

const props = withDefaults(defineProps<{
  position?: TPosition;
}>(), {
  position: 'end-bottom'
});

const animationItemConfigList = ref<IAnimationConfig[]>(animationItemConfigs);

const {
  setSelector,
  getInitOffsetStyle,
  registerAnimation
} = useSnowAnimation(animationItemConfigList);

onMounted(() => {
  registerAnimation('.sakura', {
    ease: 'none',
  });
});
</script>

<template>
  <div class="nl__container">
    <div class="sakura-box">
      <div
          class="sakura"
          v-for="(sakura, index) in animationItemConfigList"
          :key="sakura.id"
          :class="[setSelector('sakura', sakura)]"
          :style="getInitOffsetStyle(index, sakura)">
        <Sakura
            :size="sakura.size"
            :fill-color="sakura.color"
            :opacity="80"
            :serial="index" />
      </div>
    </div>
    <div class="loading-text">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.nl__container {
  width: 100%;
  height: 100%;

  position: relative;

  & .sakura-box {

    & .sakura {
      position: absolute;
    }
  }
}
</style>