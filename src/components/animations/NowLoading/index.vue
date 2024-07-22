<script setup lang="ts">
import gsap from 'gsap';
import { Sakura } from '@/components/icons';
import sakuraConfigList, { type ISakura } from './config';

const sakuraList = toRef(sakuraConfigList);

const isPerMode = (mode: boolean, offset: number) => mode ? `${offset}%` : `${offset}px`;

const sakuraAnimation = (config: ISakura, selectorIndex: number) => {
  const selector = `.sakura-${selectorIndex}`;

  const calcStartDistance = config.beginEndDistance;
  const calcDistance = calcStartDistance + config.distance;
  const calcEndDistance = calcDistance + config.beginEndDistance;

  gsap.to(selector, {
    rotate: config.rotation,
    duration: config.rotateDuration,
    repeat: -1,
    ease: 'linear'
  });

  gsap.timeline({
    repeat: -1,
  })  // 初始态
      .from(selector, {
        scale: 0,
        opacity: 0,
        ease: 'linear'
      })
      // 初段出现
      .to(selector, {
        y: calcStartDistance,
        duration: config.beginEndDuration,
        ease: 'linear'
      }, '<')
      // 下落
      .to(selector, {
        y: calcDistance,
        duration: config.duration,
        ease: 'linear'
      })
      // 尾段缩放
      .to(selector, {
        y: calcEndDistance,
        duration: config.beginEndDuration,
        ease: 'linear'
      })
      // 消失
      .to(selector, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: 'linear'
      }, '<')
      // 下次刷新等待
      .to(selector, {
        duration: config.broadcastDuration,
      });
}

onMounted(() => {
  sakuraList.value.forEach((sakura, index) => sakuraAnimation(sakura, index));
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
            top: isPerMode(sakura.xPerMode, sakura.x),
            left: isPerMode(sakura.yPerMode, sakura.y)
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