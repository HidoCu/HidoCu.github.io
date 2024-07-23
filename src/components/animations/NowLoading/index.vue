<script setup lang="ts">
import gsap from 'gsap';
import { Sakura } from '@/components/icons';
import sakuraConfigList, { type ISakura, type TDistance } from './config';
import { useWindowSize } from '@vueuse/core';
import type { TAxis } from '@/types/type-utils';

const { width, height } = useWindowSize();

const AxisMap = Object.freeze({
  x: width.value,
  y: height.value,
});

const sakuraList = toRef(sakuraConfigList);

const getDistanceCSSProp = (distance: TDistance) => distance[1] ? `${distance[0]}%` : `${distance[0]}px`

const calcDistance = (distance: TDistance, axis: TAxis) => {
  const [disData, disMode] = distance;
  if (disMode && disData >= 0 && disData <= 100) {
    const screenAxisSize = AxisMap[axis];
    return Math.round(screenAxisSize * (disData / 100));
  }
  return disData;
}

const sakuraAnimation = (
    config: ISakura,
    selectorIndex: number,
    defaultConfig: object = {}
) => {
  const selector = `.sakura-${selectorIndex}`;

  const calcStartDistanceVal = calcDistance(config.beginEndDistance, 'y');
  const calcDistanceVal = calcStartDistanceVal + calcDistance(config.distance, 'y');
  const calcEndDistanceVal = calcDistanceVal + calcDistance(config.beginEndDistance, 'y');

  gsap.to(selector, {
    rotate: config.rotation,
    duration: config.rotateDuration,
    repeat: -1,
    ease: 'linear'
  });

  gsap.timeline({
    repeat: -1,
    delay: config.delay,
  })// 初始态
      .from(selector, {
        ...defaultConfig,
        scale: 0,
        opacity: 0,
      })
      // 初段出现
      .to(selector, {
        ...defaultConfig,
        y: calcStartDistanceVal,
        duration: config.beginEndDuration,
      }, '<')
      // 下落
      .to(selector, {
        ...defaultConfig,
        y: calcDistanceVal,
        duration: config.duration,
      })
      // 尾段缩放
      .to(selector, {
        ...defaultConfig,
        y: calcEndDistanceVal,
        duration: config.beginEndDuration,
      })
      // 消失
      .to(selector, {
        ...defaultConfig,
        scale: 0,
        opacity: 0,
        duration: 1,
      }, '<')
      // 下次刷新等待
      .to(selector, {
        duration: config.broadcastDuration,
      });
}

const registerAnimation = (defaultConfig: object = {}) => {
  sakuraList.value.forEach((sakura, index) => sakuraAnimation(sakura, index, defaultConfig));
}

onMounted(() => {
  registerAnimation({
    ease: 'linear',
  });
});
</script>

<template>
  <div class="nl__container">
    <div class="sakura-box">
      <div
          class="sakura"
          v-for="(sakura, index) in sakuraList"
          :key="index"
          :class="[`sakura-${index}`]"
          :style="{
            '--i': index,
            top: getDistanceCSSProp(sakura.x),
            left: getDistanceCSSProp(sakura.y)
          }">
        <Sakura :size="sakura.size" :fill-color="sakura.color" />
      </div>
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