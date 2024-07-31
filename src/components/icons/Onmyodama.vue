<script setup lang="ts">
import { getColorByPreset, type TPreset } from '../../common/colors';

const props = withDefaults(defineProps<{
  yinColor?: string | TPreset;
  yangColor?: string | TPreset;
  size?: number;
  luminescence?: boolean;
  luminescenceColor?: string | TPreset;
  blurRadius?: number;
  diffusionRadius?: number;
}>(), {
  yinColor: 'classic',
  yangColor: '#ffffff',
  size: 100,
  luminescence: false,
  luminescenceColor: 'classic',
  blurRadius: 20,
  diffusionRadius: 4
});

const yin = computed(() => getColorByPreset(props.yinColor));
const yang = computed(() => getColorByPreset(props.yangColor));
const lColor = computed(() => getColorByPreset(props.luminescenceColor));
const size = computed(() => Math.abs(props.size) + 'px');
const blur = computed(() => props.blurRadius + 'px');
const diffusion = computed(() => props.diffusionRadius + 'px');
</script>

<template>
  <div class="onmyodama__container" :class="{ luminescence }">
    <section class="onmyodama__item yin-half"></section>
    <section class="onmyodama__item yany-half"></section>
  </div>
</template>

<style scoped lang="scss">
.onmyodama__container {
  --onmyodama-size: v-bind(size);
  --onmyodama-yin-color: v-bind(yin);
  --onmyodama-yang-color: v-bind(yang);
  --onmyodama-luminescence-color: v-bind(lColor);

  --onmyodama-luminescence-blur: v-bind(blur);
  --onmyodama-luminescence-diffusion: v-bind(diffusion);

  width: var(--onmyodama-size);
  height: var(--onmyodama-size);
  position: relative;
  border-radius: 50%;

  &.luminescence {
    box-shadow: 0 0 var(--onmyodama-luminescence-blur) var(--onmyodama-luminescence-diffusion) var(--onmyodama-luminescence-color);
  }

  &::before,
  &::after {
    content: ' ';
    display: block;
    width: 20%;
    height: 20%;
    border-radius: 50%;
    position: absolute;
    z-index: 2;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    top: 25%;
    background-color: var(--onmyodama-yang-color);
  }
  &::after {
    top: 75%;
    background-color: var(--onmyodama-yin-color);
  }

  & .onmyodama__item {
    width: var(--onmyodama-size);
    height: var(--onmyodama-size);
    border-radius: 50%;
    position: absolute;
    overflow: hidden;

    &::before,
    &::after {
      content: ' ';
      display: block;
    }

    &::before {
      width: 50%;
      height: 100%;
    }

    &::after {
      width: 50%;
      height: 50%;
      border-radius: 50%;
      position: absolute;
    }

    &.yin-half {
      &::before {
        background-color: var(--onmyodama-yin-color);
      }
      &::after {
        background-color: var(--onmyodama-yin-color);
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
      }
    }

    &.yany-half {
      transform: rotate(180deg);

      &::before {
        background-color: var(--onmyodama-yang-color);
      }
      &::after {
        background-color: var(--onmyodama-yang-color);
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
      }
    }
  }
}
</style>