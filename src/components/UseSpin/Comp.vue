<script setup lang="ts">
import { OnmyodamaSpin } from '@/components';
import gsap from 'gsap';

const props = withDefaults(defineProps<{
  duration: number;
  mask: boolean;
}>(), {});

const useSpinSelector = ref('use-spin');
const useSpin = computed(() => '.' + useSpinSelector.value);

const fadeIn = () => {
  gsap.to(useSpin.value, {
    opacity: 1,
    duration: props.duration,
    ease: 'none'
  });
}

const fadeOut = () => {
  gsap.to(useSpin.value, {
    opacity: 0,
    duration: props.duration,
    ease: 'none'
  });
}

defineExpose({ fadeOut });

onMounted(() => {
  fadeIn();
});
</script>

<template>
  <div
      class="use-onmyodama-spin"
      :class="[useSpinSelector, { mask }]">
    <div class="use-onmyodama-spin__inner">
      <OnmyodamaSpin />
    </div>
  </div>
</template>

<style scoped lang="scss">
.use-onmyodama-spin {
  position: fixed;
  inset: 0;
  opacity: 0;

  &.mask {
    background-color: #0009;
  }

  & .use-onmyodama-spin__inner {
    position: fixed;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>