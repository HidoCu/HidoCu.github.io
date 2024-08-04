<script setup lang="ts">
import { Sakura } from '@/components/icons';
import animationItemConfigs from './animation-config';
import { useSnowAnimation } from '@/hooks/animation'

const props = withDefaults(defineProps<{
  padding?: number;
  animation?: boolean;
}>(), {
  padding: 100,
  animation: false,
});

/* ******************** Animation ******************** */
const animationItemConfigList = ref(animationItemConfigs);
const {  setSelector, getInitOffsetStyle, registerAnimation } = useSnowAnimation(animationItemConfigList);
onMounted(() => {
  registerAnimation('.sakura', {
    ease: 'none',
  });
});
/* ******************** Animation ******************** */

/* ******************** Spin ******************** */
const pd = computed(() => props.padding + 'px');
/* ******************** Spin ******************** */
</script>

<template>
  <div class="nl__container">
    <div v-show="animation" class="sakura-box">
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
            :serial="sakura.id" />
      </div>
    </div>
    <div class="loading-text">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.nl__container {
  --now-loading-pd: v-bind(pd);

  .sakura-box {
    width: 100%;
    height: 100%;
    position: relative;

    .sakura {
      position: absolute;
    }
  }

  .loading-text {
    position: fixed;
    bottom: var(--now-loading-pd);
    right: var(--now-loading-pd);
  }
}
</style>