<script setup lang="ts">
import gsap from 'gsap';
import { Sakura } from '@/components/icons';
import animationItemConfigs, { type IAnimationItemConfig, type IDistance } from './config';
import type { TAxis } from '@/types/type-utils';
import { useMediaRespond } from '@/hooks/mediaRespond';

const { percentage2Px } = useMediaRespond();

const animationItemConfigList = ref<IAnimationItemConfig[]>(animationItemConfigs);

/**
 * 根据距离配置对象直接导出css属性值
 * @param distance 对应坐标轴距离
 */
const getDistanceCSSProp = (distance: IDistance) =>
    `${distance.val}${distance.perUnit ? '%' : 'px'}`;


/**
 * 将百分比形式距离根据屏幕大小换算为实际的像素值（px）
 * @param distance 对应坐标轴距离
 * @param axis 换算到的坐标
 */
const calcDistance = (distance: IDistance, axis: TAxis) =>
    distance.perUnit ?
        Math.round(percentage2Px(distance.val, axis)) :
        distance.val

/**
 * 获取目标动画对象
 * @param index 目标序列
 * @param isSelector 是否添加css选择器
 */
const getAnimeItemByIndex = (index: number, isSelector = false) =>
    `${isSelector ? '.' : ''}sakura-${index}`;

/**
 * 计算初始定位位置
 * @param index 目标动画元素序列
 * @param target 目标动画元素配置对象
 */
const calcInitOffset = (index: number, target: IAnimationItemConfig) => {
  const { x, y } = target;

  const screenX = getDistanceCSSProp(x);
  const screenY = getDistanceCSSProp(y);

  const offsetXProp = x.reverse ? 'right' : 'left';
  const offsetYProp = y.reverse ? 'bottom' : 'top'

  return {
    '--i': index,
    [offsetYProp]: screenY,
    [offsetXProp]: screenX
  }
}

/**
 * 根据配置对象设置每一个元素的动画
 * @param config 元素动画配置对象
 * @param index 元素序列
 * @param defaultConfig 所有动画的默认配置（如动画函数）
 */
const setAnimation = (
    config: IAnimationItemConfig,
    index: number,
    defaultConfig: object = {}
) => {
  const selector = getAnimeItemByIndex(index, true);

  const calcStartDistanceVal = calcDistance(config.beginEndDistance, 'y');
  const calcDistanceVal = calcStartDistanceVal + calcDistance(config.distance, 'y');
  const calcEndDistanceVal = calcDistanceVal + calcDistance(config.beginEndDistance, 'y');

  gsap.to(selector, {
    ...defaultConfig,
    rotate: config.rotation,
    duration: config.rotateDuration,
    repeat: -1,
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

/**
 * 根据动画配置对象添加动画
 * @param defaultConfig 默认配置
 */
const registerAnimation = (defaultConfig: any = {}) => {
  animationItemConfigList.value.map((sakura, index) =>
      setAnimation(sakura, index, defaultConfig)
  );
}

onMounted(() => {
  registerAnimation({
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
          :key="index"
          :class="[getAnimeItemByIndex(index)]"
          :style="calcInitOffset(index, sakura)">
        <Sakura
            :size="sakura.size"
            :fill-color="sakura.color"
            :opacity="80"
            :serial="index" />
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