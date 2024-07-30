<script setup lang="ts">
import { Sakura } from '@/components/icons';
import animationItemConfigs from './animation-config';
import { useSnowAnimation } from '@/hooks/animation'

type TPosition =
    'start-top'    | 'center-top'    | 'end-top'    |
    'start-center' | 'center'        | 'end-center' |
    'start-bottom' | 'center-bottom' | 'end-bottom' ;

const props = withDefaults(defineProps<{
  position?: TPosition;
}>(), {
  position: 'end-bottom'
});

const animationItemConfigList = ref(animationItemConfigs);

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
  & .sakura-box {
    width: 100vw;
    height: 100vh;
    position: relative;

    & .sakura {
      position: absolute;
    }
  }
}
</style>